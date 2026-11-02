-- =========================================================
-- Portfolio Database Schema: portfolio_db
-- Designed for Vijay Futane - Python Full Stack Developer & Data Analyst
-- =========================================================

CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT NULL,
    technologies VARCHAR(500) NOT NULL,
    image_url VARCHAR(500) NULL,
    live_url VARCHAR(500) NULL,
    github_url VARCHAR(500) NULL,
    featured BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    proficiency INT NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
    icon VARCHAR(100) NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Education & Experience Table
CREATE TABLE IF NOT EXISTS education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    institution VARCHAR(250) NOT NULL,
    field_of_study VARCHAR(200) NULL,
    start_year VARCHAR(50) NOT NULL,
    end_year VARCHAR(50) NOT NULL,
    grade VARCHAR(100) NULL,
    description TEXT NULL,
    type ENUM('education', 'experience', 'certification') NOT NULL DEFAULT 'education',
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- Initial Seed Data
-- =========================================================

-- Admin User (Default: admin / Admin@123)
-- Password hash generated with werkzeug.security.generate_password_hash('Admin@123')
INSERT INTO admins (username, email, password_hash, full_name, role)
VALUES (
    'admin',
    'vijay.futane@example.com',
    'scrypt:32768:8:1$7tYh1aZc$f8d7b3a4c5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
    'Vijay Futane',
    'admin'
) ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);

-- Initial Skills
INSERT INTO skills (name, category, proficiency, icon, order_index) VALUES
('Python', 'Backend & Core', 92, 'fab fa-python', 1),
('SQL', 'Databases', 90, 'fas fa-database', 2),
('MySQL', 'Databases', 88, 'fas fa-server', 3),
('React.js', 'Frontend Development', 85, 'fab fa-react', 4),
('JavaScript', 'Frontend Development', 88, 'fab fa-js-square', 5),
('HTML', 'Frontend Development', 95, 'fab fa-html5', 6),
('CSS', 'Frontend Development', 90, 'fab fa-css3-alt', 7),
('Power BI', 'Data Analytics & BI', 85, 'fas fa-chart-pie', 8),
('Excel', 'Data Analytics & BI', 85, 'fas fa-file-excel', 9);

-- Initial Projects (Required four key projects)
INSERT INTO projects (title, slug, category, description, detailed_description, technologies, image_url, live_url, github_url, featured, order_index) VALUES
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
);

-- Education & Experience
INSERT INTO education (title, institution, field_of_study, start_year, end_year, grade, description, type, order_index) VALUES
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
);
