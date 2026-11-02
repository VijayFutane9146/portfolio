import sqlite3
import re
import pymysql
import pymysql.cursors
from werkzeug.security import generate_password_hash
try:
    from config import Config
except (ImportError, ValueError):
    from ..config import Config

_current_db_type = None

def get_db_type():
    """Returns 'mysql' or 'sqlite' depending on active engine."""
    global _current_db_type
    if _current_db_type is None:
        # Check MySQL connection availability
        try:
            conn = pymysql.connect(
                host=Config.MYSQL_HOST,
                port=Config.MYSQL_PORT,
                user=Config.MYSQL_USER,
                password=Config.MYSQL_PASSWORD,
                database=Config.MYSQL_DB,
                cursorclass=pymysql.cursors.DictCursor,
                connect_timeout=2
            )
            conn.close()
            _current_db_type = 'mysql'
            print("[DB INFO] Connected successfully to MySQL database 'portfolio_db'.")
        except Exception as e:
            if Config.ALLOW_SQLITE_FALLBACK:
                _current_db_type = 'sqlite'
                print(f"[DB INFO] MySQL not currently available ({e}). Seamlessly using SQLite database fallback at {Config.SQLITE_PATH}.")
            else:
                _current_db_type = 'mysql'
                print(f"[DB ERROR] MySQL connection failed: {e}")
    return _current_db_type


def get_db_connection():
    """Returns an active database connection."""
    db_type = get_db_type()
    if db_type == 'mysql':
        return pymysql.connect(
            host=Config.MYSQL_HOST,
            port=Config.MYSQL_PORT,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            database=Config.MYSQL_DB,
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=True
        )
    else:
        Config.SQLITE_PATH.parent.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(str(Config.SQLITE_PATH))
        conn.row_factory = sqlite3.Row
        return conn


def execute_query(query, params=None, fetch_all=False, fetch_one=False, commit=False):
    """
    Executes a query safely on the active database engine (MySQL or SQLite).
    Automatically adapts placeholders (%s for MySQL, ? for SQLite).
    """
    db_type = get_db_type()
    params = params or ()
    
    if db_type == 'sqlite':
        # Adapt %s to ? for SQLite
        adapted_query = re.sub(r'%s', '?', query)
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(adapted_query, params)
            if commit:
                conn.commit()
                last_id = cursor.lastrowid
                row_count = cursor.rowcount
                cursor.close()
                conn.close()
                return {'lastrowid': last_id, 'rowcount': row_count}
            if fetch_one:
                row = cursor.fetchone()
                cursor.close()
                conn.close()
                return dict(row) if row else None
            if fetch_all:
                rows = cursor.fetchall()
                cursor.close()
                conn.close()
                return [dict(r) for r in rows]
            cursor.close()
            conn.close()
            return None
        except Exception as err:
            conn.close()
            raise err
    else:
        # MySQL execution
        conn = get_db_connection()
        try:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                if commit:
                    last_id = cursor.lastrowid
                    row_count = cursor.rowcount
                    conn.close()
                    return {'lastrowid': last_id, 'rowcount': row_count}
                if fetch_one:
                    res = cursor.fetchone()
                    conn.close()
                    return res
                if fetch_all:
                    res = cursor.fetchall()
                    conn.close()
                    return res
                conn.close()
                return None
        except Exception as err:
            conn.close()
            raise err


def init_db():
    """Initializes tables and seeds initial data if not already present."""
    db_type = get_db_type()
    
    if db_type == 'sqlite':
        _init_sqlite()
    else:
        _init_mysql()


def _init_sqlite():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Admins
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
    );
    ''')

    # Contacts
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'unread',
        ip_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # Projects
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        detailed_description TEXT,
        technologies TEXT NOT NULL,
        image_url TEXT,
        live_url TEXT,
        github_url TEXT,
        featured INTEGER DEFAULT 0,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # Skills
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        proficiency INTEGER NOT NULL,
        icon TEXT,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')

    # Education & Experience
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        institution TEXT NOT NULL,
        field_of_study TEXT,
        start_year TEXT NOT NULL,
        end_year TEXT NOT NULL,
        grade TEXT,
        description TEXT,
        type TEXT DEFAULT 'education',
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ''')
    conn.commit()

    # Seed Admin if not exists
    cursor.execute("SELECT id FROM admins WHERE username = 'admin'")
    if not cursor.fetchone():
        pwd_hash = generate_password_hash('Admin@123')
        cursor.execute(
            "INSERT INTO admins (username, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)",
            ('admin', 'vijay.futane@example.com', pwd_hash, 'Vijay Futane', 'admin')
        )
        conn.commit()

    # Seed Skills if empty
    cursor.execute("SELECT COUNT(*) as count FROM skills")
    if cursor.fetchone()[0] == 0:
        skills = [
            ('Python', 'Backend & Core', 92, 'fab fa-python', 1),
            ('SQL', 'Databases', 90, 'fas fa-database', 2),
            ('MySQL', 'Databases', 88, 'fas fa-server', 3),
            ('React.js', 'Frontend Development', 85, 'fab fa-react', 4),
            ('JavaScript', 'Frontend Development', 88, 'fab fa-js-square', 5),
            ('HTML', 'Frontend Development', 95, 'fab fa-html5', 6),
            ('CSS', 'Frontend Development', 90, 'fab fa-css3-alt', 7),
            ('Power BI', 'Data Analytics & BI', 85, 'fas fa-chart-pie', 8),
            ('Excel', 'Data Analytics & BI', 85, 'fas fa-file-excel', 9)
        ]
        cursor.executemany(
            "INSERT INTO skills (name, category, proficiency, icon, order_index) VALUES (?, ?, ?, ?, ?)",
            skills
        )
        conn.commit()

    # Seed Projects if empty
    cursor.execute("SELECT COUNT(*) as count FROM projects")
    if cursor.fetchone()[0] == 0:
        projects = [
            (
                'E-commerce Dashboard',
                'e-commerce-dashboard',
                'Full Stack Web',
                'A high-performance modern e-commerce analytics and management dashboard featuring real-time revenue KPIs, customer acquisition metrics, inventory alerts, and sales performance charts.',
                'Built with React, Python Flask, and MySQL. Features include comprehensive sales analytics, interactive revenue graphs, inventory stock monitoring, order tracking, and exportable financial reports.',
                'React.js, Python Flask, MySQL, Chart.js, Tailwind CSS, REST API',
                'assets/images/project-ecommerce.svg',
                'https://ecommerce-dashboard-demo.com',
                'https://github.com/vijayfutane/ecommerce-dashboard',
                1,
                1
            ),
            (
                'Energy Consumption Dashboard',
                'energy-consumption-dashboard',
                'Data Analytics',
                'An interactive enterprise telemetry and energy consumption dashboard monitoring grid load, peak demand periods, carbon footprint metrics, and predictive anomaly warnings.',
                'Designed for energy audit and cost optimization. Employs Python data pipelines, Power BI interactive embeds, SQL aggregation queries, and real-time sensor analytics.',
                'Python, Power BI, SQL, Pandas, Flask, Data Visualization',
                'assets/images/project-energy.svg',
                'https://energy-analytics-demo.com',
                'https://github.com/vijayfutane/energy-consumption-dashboard',
                1,
                2
            ),
            (
                'React Portfolio Website',
                'react-portfolio-website',
                'Full Stack Web',
                'A premium Glassmorphism personal portfolio web application with dynamic MySQL REST API backend, dark/light theme switching, and secure administrative content management.',
                'Engineered with modern React, responsive Tailwind styling, glassmorphism visual hierarchy, Flask microservice architecture, and full CRUD admin control.',
                'React.js, Tailwind CSS, Python Flask, MySQL, JWT Auth',
                'assets/images/project-portfolio.svg',
                'https://vijayfutane.dev',
                'https://github.com/vijayfutane/developer-portfolio',
                1,
                3
            ),
            (
                'SQL HR Database Project',
                'sql-hr-database-project',
                'Database & Analytics',
                'An enterprise relational database architecture for Human Resource management, implementing stored procedures, salary audit triggers, attrition analysis, and departmental analytics.',
                'Includes complex relational normalization (3NF), automated trigger logs for payroll updates, indexing optimization for high-concurrency queries, and Power BI reporting views.',
                'MySQL, Advanced SQL, Python, Excel ETL, Stored Procedures, Triggers',
                'assets/images/project-hr-sql.svg',
                'https://hr-database-demo.com',
                'https://github.com/vijayfutane/sql-hr-database-system',
                1,
                4
            )
        ]
        cursor.executemany(
            '''INSERT INTO projects 
               (title, slug, category, description, detailed_description, technologies, image_url, live_url, github_url, featured, order_index)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
            projects
        )
        conn.commit()

    # Seed Education & Experience if empty
    cursor.execute("SELECT COUNT(*) as count FROM education")
    if cursor.fetchone()[0] == 0:
        edu_entries = [
            (
                'Master of Computer Applications (MCA)',
                'Reputed University / Institute',
                'Computer Science & Application Software',
                '2022',
                '2024',
                'Distinction / First Class',
                'Specialized in advanced Software Engineering, Database Management Systems, Data Structures & Algorithms, and Cloud-enabled Web Architectures. Completed major capstone project in scalable full-stack web applications.',
                'education',
                1
            ),
            (
                'Bachelor of Computer Science / Applications',
                'University College of Science',
                'Computer Applications',
                '2019',
                '2022',
                'First Class with Distinction',
                'Core foundations in Object-Oriented Programming (Python, C++), Relational Databases, Web Technologies (HTML, CSS, JS), and Computer Networks.',
                'education',
                2
            ),
            (
                'Full Stack Python Developer & Data Analyst Intern',
                'Tech Innovators Solutions',
                'Software & Analytics Engineering',
                '2023',
                '2024',
                'Exemplary Performance',
                'Developed high-throughput RESTful endpoints using Python Flask and MySQL. Designed interactive Power BI and React analytics dashboards reducing data compilation time by 40%.',
                'experience',
                3
            ),
            (
                'Full Stack & Data Engineering Certifications',
                'Professional Learning & Certifications',
                'Python, SQL, React & Power BI Specialization',
                '2023',
                'Present',
                'Certified',
                'Completed intensive coursework in Advanced SQL Query Optimization, Python Data Analysis (Pandas, NumPy), React Modern Hook architecture, and Business Intelligence reporting.',
                'certification',
                4
            )
        ]
        cursor.executemany(
            '''INSERT INTO education 
               (title, institution, field_of_study, start_year, end_year, grade, description, type, order_index)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
            edu_entries
        )
        conn.commit()

    cursor.close()
    conn.close()
    print("[DB INFO] Database initialized and verified successfully.")


def _init_mysql():
    """Initializes tables in MySQL if not present."""
    try:
        # Create database if not exists
        temp_conn = pymysql.connect(
            host=Config.MYSQL_HOST,
            port=Config.MYSQL_PORT,
            user=Config.MYSQL_USER,
            password=Config.MYSQL_PASSWORD,
            autocommit=True
        )
        with temp_conn.cursor() as c:
            c.execute(f"CREATE DATABASE IF NOT EXISTS `{Config.MYSQL_DB}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        temp_conn.close()

        schema_path = Config.BASE_DIR / 'database' / 'schema.sql'
        if schema_path.exists():
            with open(schema_path, 'r', encoding='utf-8') as f:
                sql_content = f.read()
            conn = get_db_connection()
            with conn.cursor() as cursor:
                # Split and execute statements
                for statement in sql_content.split(';'):
                    stmt = statement.strip()
                    if stmt and not stmt.lower().startswith('create database') and not stmt.lower().startswith('use '):
                        cursor.execute(stmt)
            conn.close()
            print(f"[DB INFO] MySQL database '{Config.MYSQL_DB}' schema verified.")
    except Exception as e:
        print(f"[DB WARNING] Could not auto-apply MySQL schema: {e}")
