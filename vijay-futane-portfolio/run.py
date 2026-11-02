"""
Vijay Futane's Portfolio Web Application Runner.
Executes the Flask server that powers both the REST API and the React Frontend.
"""
import sys
from pathlib import Path

# Add backend directory to sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR / 'backend'))

from config import Config  # type: ignore[reportMissingImports]
from database.db import init_db, get_db_type  # type: ignore[reportMissingImports]
from app import app  # type: ignore[reportMissingImports]

if __name__ == '__main__':
    print("=" * 65)
    print(">> VIJAY FUTANE - FULL STACK DEVELOPER PORTFOLIO WEB APP")
    print(f">> Local Server:  http://localhost:{Config.PORT}")
    print(f">> Database:      {get_db_type().upper()} (Target: {Config.MYSQL_DB})")
    print(f">> Admin Panel:   http://localhost:{Config.PORT}/#/admin")
    print(f">> Default Login: admin / Admin@123")
    print("=" * 65)
    
    init_db()
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
