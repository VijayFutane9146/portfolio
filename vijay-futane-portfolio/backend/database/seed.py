"""
Database Seeding Script for Vijay Futane's Portfolio.
Can be run directly via: python backend/database/seed.py
"""
import sys
from pathlib import Path

# Add backend directory to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from database.db import init_db, get_db_type

if __name__ == '__main__':
    print("Starting database initialization and seeding...")
    db_type = get_db_type()
    print(f"Active database backend: {db_type.upper()}")
    init_db()
    print("Database seeding completed successfully!")
