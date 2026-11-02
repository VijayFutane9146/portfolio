from flask import jsonify

try:
    from database.db import execute_query, get_db_type
except (ImportError, ValueError):
    from ..database.db import execute_query, get_db_type


class StatsController:
    @staticmethod
    def get_stats():
        # Projects count
        p_res = execute_query("SELECT COUNT(*) as total FROM projects", fetch_one=True)
        total_projects = p_res['total'] if p_res else 0

        # Skills count
        s_res = execute_query("SELECT COUNT(*) as total FROM skills", fetch_one=True)
        total_skills = s_res['total'] if s_res else 0

        # Contacts count
        c_res = execute_query("SELECT COUNT(*) as total FROM contacts", fetch_one=True)
        total_contacts = c_res['total'] if c_res else 0

        # Unread contacts count
        u_res = execute_query("SELECT COUNT(*) as unread FROM contacts WHERE status = 'unread'", fetch_one=True)
        unread_contacts = u_res['unread'] if u_res else 0

        # Education count
        e_res = execute_query("SELECT COUNT(*) as total FROM education", fetch_one=True)
        total_education = e_res['total'] if e_res else 0

        # Recent 5 contacts
        recent_contacts = execute_query(
            "SELECT id, name, email, subject, status, created_at FROM contacts ORDER BY id DESC LIMIT 5",
            fetch_all=True
        ) or []

        # Skills category distribution
        categories = execute_query(
            "SELECT category, COUNT(*) as count FROM skills GROUP BY category",
            fetch_all=True
        ) or []

        return jsonify({
            'success': True,
            'data': {
                'total_projects': total_projects,
                'total_skills': total_skills,
                'total_contacts': total_contacts,
                'unread_contacts': unread_contacts,
                'total_education': total_education,
                'database_type': get_db_type().upper(),
                'recent_contacts': recent_contacts,
                'skill_categories': categories
            }
        })
