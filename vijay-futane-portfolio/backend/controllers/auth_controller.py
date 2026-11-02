import secrets
import time
from functools import wraps
from flask import request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash

try:
    from database.db import execute_query
except (ImportError, ValueError):
    from ..database.db import execute_query

# Simple and robust token store (token -> {user_id, username, expires_at})
ACTIVE_SESSIONS = {}
SESSION_EXPIRY_SECONDS = 86400  # 24 hours


def token_required(f):
    """Decorator to require a valid Bearer token for admin endpoints."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        token = None
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ', 1)[1].strip()

        if not token:
            return jsonify({'success': False, 'message': 'Authentication token is missing!'}), 401

        session = ACTIVE_SESSIONS.get(token)
        if not session or session['expires_at'] < time.time():
            if token in ACTIVE_SESSIONS:
                del ACTIVE_SESSIONS[token]
            return jsonify({'success': False, 'message': 'Token is invalid or has expired!'}), 401

        # Pass current admin info in request context
        request.current_admin = session
        return f(*args, **kwargs)
    return decorated


class AuthController:
    @staticmethod
    def login():
        data = request.get_json() or {}
        username = data.get('username', '').strip()
        password = data.get('password', '')

        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required.'}), 400

        user = execute_query(
            "SELECT id, username, email, password_hash, full_name, role FROM admins WHERE username = %s OR email = %s",
            (username, username),
            fetch_one=True
        )

        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({'success': False, 'message': 'Invalid username or password.'}), 401

        # Generate session token
        token = secrets.token_hex(32)
        ACTIVE_SESSIONS[token] = {
            'id': user['id'],
            'username': user['username'],
            'email': user['email'],
            'full_name': user['full_name'],
            'role': user['role'],
            'expires_at': time.time() + SESSION_EXPIRY_SECONDS
        }

        # Update last_login
        execute_query(
            "UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = %s",
            (user['id'],),
            commit=True
        )

        return jsonify({
            'success': True,
            'message': 'Login successful.',
            'token': token,
            'admin': {
                'id': user['id'],
                'username': user['username'],
                'email': user['email'],
                'full_name': user['full_name'],
                'role': user['role']
            }
        })

    @staticmethod
    def get_current_user():
        admin = getattr(request, 'current_admin', None)
        if not admin:
            return jsonify({'success': False, 'message': 'Not authenticated'}), 401
        return jsonify({
            'success': True,
            'admin': {
                'id': admin['id'],
                'username': admin['username'],
                'email': admin['email'],
                'full_name': admin['full_name'],
                'role': admin['role']
            }
        })

    @staticmethod
    def change_password():
        admin = getattr(request, 'current_admin', None)
        data = request.get_json() or {}
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')

        if not current_password or not new_password:
            return jsonify({'success': False, 'message': 'Current and new passwords are required.'}), 400

        if len(new_password) < 6:
            return jsonify({'success': False, 'message': 'New password must be at least 6 characters.'}), 400

        user = execute_query(
            "SELECT password_hash FROM admins WHERE id = %s",
            (admin['id'],),
            fetch_one=True
        )

        if not user or not check_password_hash(user['password_hash'], current_password):
            return jsonify({'success': False, 'message': 'Current password does not match.'}), 400

        new_hash = generate_password_hash(new_password)
        execute_query(
            "UPDATE admins SET password_hash = %s WHERE id = %s",
            (new_hash, admin['id']),
            commit=True
        )

        return jsonify({'success': True, 'message': 'Password updated successfully.'})
