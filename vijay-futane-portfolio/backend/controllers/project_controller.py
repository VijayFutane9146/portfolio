import re
from flask import request, jsonify

try:
    from database.db import execute_query
except (ImportError, ValueError):
    from ..database.db import execute_query


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    return re.sub(r'[-\s]+', '-', text)


class ProjectController:
    @staticmethod
    def get_all():
        category = request.args.get('category')
        featured = request.args.get('featured')

        query = "SELECT * FROM projects"
        params = []
        conditions = []

        if category and category.lower() != 'all':
            conditions.append("category = %s")
            params.append(category)

        if featured is not None and featured.lower() in ('true', '1'):
            conditions.append("featured = 1")

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        query += " ORDER BY order_index ASC, id DESC"

        projects = execute_query(query, params, fetch_all=True) or []
        return jsonify({'success': True, 'count': len(projects), 'data': projects})

    @staticmethod
    def get_by_id(project_id):
        project = execute_query(
            "SELECT * FROM projects WHERE id = %s",
            (project_id,),
            fetch_one=True
        )
        if not project:
            return jsonify({'success': False, 'message': 'Project not found.'}), 404
        return jsonify({'success': True, 'data': project})

    @staticmethod
    def create():
        data = request.get_json() or {}
        title = data.get('title', '').strip()
        category = data.get('category', '').strip()
        description = data.get('description', '').strip()
        detailed_description = data.get('detailed_description', '').strip()
        technologies = data.get('technologies', '').strip()
        image_url = data.get('image_url', '').strip() or 'assets/images/project-default.svg'
        live_url = data.get('live_url', '').strip()
        github_url = data.get('github_url', '').strip()
        featured = 1 if data.get('featured') else 0
        order_index = int(data.get('order_index', 0))

        if not title or not category or not description or not technologies:
            return jsonify({'success': False, 'message': 'Title, category, description, and technologies are required.'}), 400

        slug = slugify(title)
        # Ensure unique slug
        existing = execute_query("SELECT id FROM projects WHERE slug = %s", (slug,), fetch_one=True)
        if existing:
            slug = f"{slug}-{int(request.environ.get('REQUEST_TIME', 1))}"

        result = execute_query(
            """INSERT INTO projects 
               (title, slug, category, description, detailed_description, technologies, image_url, live_url, github_url, featured, order_index)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (title, slug, category, description, detailed_description, technologies, image_url, live_url, github_url, featured, order_index),
            commit=True
        )

        return jsonify({
            'success': True,
            'message': 'Project created successfully.',
            'id': result['lastrowid']
        }), 201

    @staticmethod
    def update(project_id):
        project = execute_query("SELECT id FROM projects WHERE id = %s", (project_id,), fetch_one=True)
        if not project:
            return jsonify({'success': False, 'message': 'Project not found.'}), 404

        data = request.get_json() or {}
        title = data.get('title', '').strip()
        category = data.get('category', '').strip()
        description = data.get('description', '').strip()
        detailed_description = data.get('detailed_description', '').strip()
        technologies = data.get('technologies', '').strip()
        image_url = data.get('image_url', '').strip()
        live_url = data.get('live_url', '').strip()
        github_url = data.get('github_url', '').strip()
        featured = 1 if data.get('featured') else 0
        order_index = int(data.get('order_index', 0))

        if not title or not category or not description or not technologies:
            return jsonify({'success': False, 'message': 'Title, category, description, and technologies are required.'}), 400

        execute_query(
            """UPDATE projects 
               SET title = %s, category = %s, description = %s, detailed_description = %s,
                   technologies = %s, image_url = %s, live_url = %s, github_url = %s,
                   featured = %s, order_index = %s
               WHERE id = %s""",
            (title, category, description, detailed_description, technologies, image_url, live_url, github_url, featured, order_index, project_id),
            commit=True
        )

        return jsonify({'success': True, 'message': 'Project updated successfully.'})

    @staticmethod
    def delete(project_id):
        project = execute_query("SELECT id FROM projects WHERE id = %s", (project_id,), fetch_one=True)
        if not project:
            return jsonify({'success': False, 'message': 'Project not found.'}), 404

        execute_query("DELETE FROM projects WHERE id = %s", (project_id,), commit=True)
        return jsonify({'success': True, 'message': 'Project deleted successfully.'})
