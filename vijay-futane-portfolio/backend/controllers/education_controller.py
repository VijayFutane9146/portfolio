from flask import request, jsonify

try:
    from database.db import execute_query
except (ImportError, ValueError):
    from ..database.db import execute_query


class EducationController:
    @staticmethod
    def get_all():
        item_type = request.args.get('type')
        query = "SELECT * FROM education"
        params = []
        if item_type:
            query += " WHERE type = %s"
            params.append(item_type)
        query += " ORDER BY order_index ASC, id ASC"

        items = execute_query(query, params, fetch_all=True) or []
        return jsonify({'success': True, 'count': len(items), 'data': items})

    @staticmethod
    def create():
        data = request.get_json() or {}
        title = data.get('title', '').strip()
        institution = data.get('institution', '').strip()
        field_of_study = data.get('field_of_study', '').strip()
        start_year = data.get('start_year', '').strip()
        end_year = data.get('end_year', '').strip()
        grade = data.get('grade', '').strip()
        description = data.get('description', '').strip()
        item_type = data.get('type', 'education').strip()
        order_index = int(data.get('order_index', 0))

        if not title or not institution or not start_year:
            return jsonify({'success': False, 'message': 'Title, institution, and start year are required.'}), 400

        result = execute_query(
            """INSERT INTO education 
               (title, institution, field_of_study, start_year, end_year, grade, description, type, order_index)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (title, institution, field_of_study, start_year, end_year, grade, description, item_type, order_index),
            commit=True
        )

        return jsonify({'success': True, 'message': 'Timeline item created.', 'id': result['lastrowid']}), 201

    @staticmethod
    def update(item_id):
        item = execute_query("SELECT id FROM education WHERE id = %s", (item_id,), fetch_one=True)
        if not item:
            return jsonify({'success': False, 'message': 'Item not found.'}), 404

        data = request.get_json() or {}
        title = data.get('title', '').strip()
        institution = data.get('institution', '').strip()
        field_of_study = data.get('field_of_study', '').strip()
        start_year = data.get('start_year', '').strip()
        end_year = data.get('end_year', '').strip()
        grade = data.get('grade', '').strip()
        description = data.get('description', '').strip()
        item_type = data.get('type', 'education').strip()
        order_index = int(data.get('order_index', 0))

        if not title or not institution:
            return jsonify({'success': False, 'message': 'Title and institution are required.'}), 400

        execute_query(
            """UPDATE education 
               SET title = %s, institution = %s, field_of_study = %s, start_year = %s,
                   end_year = %s, grade = %s, description = %s, type = %s, order_index = %s
               WHERE id = %s""",
            (title, institution, field_of_study, start_year, end_year, grade, description, item_type, order_index, item_id),
            commit=True
        )

        return jsonify({'success': True, 'message': 'Item updated successfully.'})

    @staticmethod
    def delete(item_id):
        item = execute_query("SELECT id FROM education WHERE id = %s", (item_id,), fetch_one=True)
        if not item:
            return jsonify({'success': False, 'message': 'Item not found.'}), 404

        execute_query("DELETE FROM education WHERE id = %s", (item_id,), commit=True)
        return jsonify({'success': True, 'message': 'Item deleted successfully.'})
