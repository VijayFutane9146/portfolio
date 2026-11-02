import os
import io
from pathlib import Path
from flask import Flask, send_from_directory, send_file, jsonify, request
from flask_cors import CORS

from config import Config
from database.db import init_db, get_db_type
from routes.auth_routes import auth_bp
from routes.project_routes import project_bp
from routes.skill_routes import skill_bp
from routes.education_routes import education_bp
from routes.contact_routes import contact_bp
from routes.stats_routes import stats_bp

# Define frontend directory
PROJECT_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = PROJECT_ROOT / 'frontend'

app = Flask(__name__, static_folder=str(FRONTEND_DIR))
app.config['SECRET_KEY'] = Config.SECRET_KEY

# Enable CORS for all REST API endpoints
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register API blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(project_bp, url_prefix='/api/projects')
app.register_blueprint(skill_bp, url_prefix='/api/skills')
app.register_blueprint(education_bp, url_prefix='/api/education')
app.register_blueprint(contact_bp, url_prefix='/api/contacts')
app.register_blueprint(stats_bp, url_prefix='/api/stats')


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'app': "Vijay Futane's Developer Portfolio",
        'version': '1.0.0',
        'database': get_db_type().upper()
    })


@app.route('/api/resume/download', methods=['GET'])
def download_resume():
    """Generates and serves Vijay Futane's professional resume as a formatted document."""
    resume_path = FRONTEND_DIR / 'assets' / 'Vijay_Futane_Resume.pdf'
    if resume_path.exists():
        return send_file(str(resume_path), as_attachment=True, download_name="Vijay_Futane_Resume.pdf")
    
    # Generate clean text resume if PDF not present
    resume_content = """===============================================================
VIJAY FUTANE
Python Full Stack Developer | Data Analyst
Email: vijay.futane@example.com | Portfolio: https://vijayfutane.dev
===============================================================

PROFESSIONAL SUMMARY
Passionate Python Full Stack Developer and Data Analyst with an MCA degree,
dedicated to building high-performance web applications, scalable REST APIs,
and insightful data visualization dashboards. Proven expertise across React.js,
Python Flask, MySQL, Power BI, and Advanced SQL query optimization.

EDUCATION
- Master of Computer Applications (MCA)
  Field: Computer Science & Software Engineering
  Graduation: 2022 - 2024 | First Class with Distinction
- Bachelor of Computer Applications / Science
  Graduation: 2019 - 2022 | Distinction

TECHNICAL SKILLS
- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Bootstrap
- Backend: Python (Flask, FastAPI), RESTful API Architecture, JWT Authentication
- Databases: MySQL, PostgreSQL, SQLite, Database Normalization (3NF), Stored Procedures
- Analytics & BI: Power BI, Microsoft Excel (VLOOKUP, Pivot, Macros), Pandas, NumPy
- Tools & DevOps: Git, GitHub, Postman, Linux CLI, Docker Fundamentals

KEY PROJECTS
1. E-commerce Dashboard (React.js, Flask, MySQL, Chart.js)
   - Real-time revenue metrics, customer acquisition, and inventory tracking.
2. Energy Consumption Dashboard (Python, Power BI, SQL, Pandas)
   - Enterprise telemetry platform monitoring grid load and anomaly detection.
3. React Portfolio Website (React.js, Tailwind CSS, Flask, MySQL)
   - Glassmorphism UI, dynamic REST API backend, secure admin dashboard.
4. SQL HR Database Project (MySQL, Stored Procedures, Triggers, Power BI)
   - Complex relational architecture, salary audit triggers, attrition analysis.

EXPERIENCE & INTERNSHIPS
- Full Stack Python Developer & Data Analyst Intern (2023 - 2024)
  Engineered REST APIs and Power BI reporting dashboards.
==============================================================="""
    mem = io.BytesIO()
    mem.write(resume_content.encode('utf-8'))
    mem.seek(0)
    return send_file(
        mem,
        mimetype='text/plain',
        as_attachment=True,
        download_name="Vijay_Futane_Resume.txt"
    )


# Frontend static files and SPA fallback routing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # Check if requested file exists inside frontend
    file_path = FRONTEND_DIR / path
    if path != "" and file_path.exists() and not file_path.is_dir():
        return send_from_directory(str(FRONTEND_DIR), path)
    # Return index.html for SPA routes (e.g. /admin, /admin/login)
    return send_from_directory(str(FRONTEND_DIR), 'index.html')


if __name__ == '__main__':
    print("=" * 60)
    print("Starting Vijay Futane's Portfolio Web Application...")
    print(f"Server URL: http://localhost:{Config.PORT}")
    print(f"Database Backend: {get_db_type().upper()}")
    print("=" * 60)
    
    # Initialize database tables and seed data
    init_db()
    
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
