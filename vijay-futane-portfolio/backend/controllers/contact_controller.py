import re
from flask import request, jsonify

try:
    from database.db import execute_query
except (ImportError, ValueError):
    from ..database.db import execute_query

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


class ContactController:
    @staticmethod
    def submit():
        data = request.get_json() or {}
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()

        # Validation
        errors = {}
        if not name or len(name) < 2:
            errors['name'] = 'Full Name must be at least 2 characters.'
        if not email or not re.match(EMAIL_REGEX, email):
            errors['email'] = 'A valid email address is required.'
        if not subject or len(subject) < 3:
            errors['subject'] = 'Subject must be at least 3 characters.'
        if not message or len(message) < 10:
            errors['message'] = 'Message must be at least 10 characters.'

        if errors:
            return jsonify({'success': False, 'message': 'Validation failed.', 'errors': errors}), 422

        client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)

        result = execute_query(
            """INSERT INTO contacts (name, email, subject, message, status, ip_address)
               VALUES (%s, %s, %s, %s, 'unread', %s)""",
            (name, email, subject, message, client_ip),
            commit=True
        )

        return jsonify({
            'success': True,
            'message': 'Thank you! Your message has been sent successfully. Vijay will get back to you shortly.',
            'id': result['lastrowid']
        }), 201

    @staticmethod
    def get_all():
        status = request.args.get('status')
        query = "SELECT * FROM contacts"
        params = []
        if status and status.lower() != 'all':
            query += " WHERE status = %s"
            params.append(status)
        query += " ORDER BY id DESC"

        contacts = execute_query(query, params, fetch_all=True) or []
        return jsonify({'success': True, 'count': len(contacts), 'data': contacts})

    @staticmethod
    def get_by_id(contact_id):
        contact = execute_query("SELECT * FROM contacts WHERE id = %s", (contact_id,), fetch_one=True)
        if not contact:
            return jsonify({'success': False, 'message': 'Message not found.'}), 404

        # Automatically mark as read if currently unread
        if contact.get('status') == 'unread':
            execute_query("UPDATE contacts SET status = 'read' WHERE id = %s", (contact_id,), commit=True)
            contact['status'] = 'read'

        return jsonify({'success': True, 'data': contact})

    @staticmethod
    def update_status(contact_id):
        contact = execute_query("SELECT id FROM contacts WHERE id = %s", (contact_id,), fetch_one=True)
        if not contact:
            return jsonify({'success': False, 'message': 'Message not found.'}), 404

        data = request.get_json() or {}
        new_status = data.get('status', '').strip().lower()
        if new_status not in ('unread', 'read', 'archived'):
            return jsonify({'success': False, 'message': 'Invalid status. Must be unread, read, or archived.'}), 400

        execute_query("UPDATE contacts SET status = %s WHERE id = %s", (new_status, contact_id), commit=True)
        return jsonify({'success': True, 'message': f'Status updated to {new_status}.'})

    @staticmethod
    def delete(contact_id):
        contact = execute_query("SELECT id FROM contacts WHERE id = %s", (contact_id,), fetch_one=True)
        if not contact:
            return jsonify({'success': False, 'message': 'Message not found.'}), 404

        execute_query("DELETE FROM contacts WHERE id = %s", (contact_id,), commit=True)
        return jsonify({'success': True, 'message': 'Message deleted successfully.'})
