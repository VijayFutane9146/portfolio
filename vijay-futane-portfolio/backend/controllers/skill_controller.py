from flask import request, jsonify

try:
    from database.db import execute_query
except (ImportError, ValueError):
    from ..database.db import execute_query


class SkillController:
    @staticmethod
    def get_all():
        grouped = request.args.get('grouped', 'false').lower() == 'true'
        skills = execute_query(
            "SELECT * FROM skills ORDER BY order_index ASC, id ASC",
            fetch_all=True
        ) or []

        if grouped:
            result = {}
            for s in skills:
                cat = s['category']
                if cat not in result:
                    result[cat] = []
                result[cat].append(s)
            return jsonify({'success': True, 'data': result})

        return jsonify({'success': True, 'count': len(skills), 'data': skills})

    @staticmethod
    def create():
        data = request.get_json() or {}
        name = data.get('name', '').strip()
        category = data.get('category', '').strip()
        proficiency = int(data.get('proficiency', 80))
        icon = data.get('icon', 'fas fa-code').strip()
        order_index = int(data.get('order_index', 0))

        if not name or not category:
            return jsonify({'success': False, 'message': 'Name and category are required.'}), 400

        proficiency = max(0, min(100, proficiency))

        result = execute_query(
            "INSERT INTO skills (name, category, proficiency, icon, order_index) VALUES (%s, %s, %s, %s, %s)",
            (name, category, proficiency, icon, order_index),
            commit=True
        )

        return jsonify({'success': True, 'message': 'Skill created successfully.', 'id': result['lastrowid']}), 201

    @staticmethod
    def update(skill_id):
        skill = execute_query("SELECT id FROM skills WHERE id = %s", (skill_id,), fetch_one=True)
        if not skill:
            return jsonify({'success': False, 'message': 'Skill not found.'}), 404

        data = request.get_json() or {}
        name = data.get('name', '').strip()
        category = data.get('category', '').strip()
        proficiency = int(data.get('proficiency', 80))
        icon = data.get('icon', 'fas fa-code').strip()
        order_index = int(data.get('order_index', 0))

        if not name or not category:
            return jsonify({'success': False, 'message': 'Name and category are required.'}), 400

        proficiency = max(0, min(100, proficiency))

        execute_query(
            "UPDATE skills SET name = %s, category = %s, proficiency = %s, icon = %s, order_index = %s WHERE id = %s",
            (name, category, proficiency, icon, order_index, skill_id),
            commit=True
        )

        return jsonify({'success': True, 'message': 'Skill updated successfully.'})

    @staticmethod
    def delete(skill_id):
        skill = execute_query("SELECT id FROM skills WHERE id = %s", (skill_id,), fetch_one=True)
        if not skill:
            return jsonify({'success': False, 'message': 'Skill not found.'}), 404

        execute_query("DELETE FROM skills WHERE id = %s", (skill_id,), commit=True)
        return jsonify({'success': True, 'message': 'Skill deleted successfully.'})
