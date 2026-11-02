"""
Automated Test Suite for Vijay Futane's Portfolio Web Application.
Tests all REST APIs, database queries, authentication, and frontend static serving.
"""
import sys
import json
from pathlib import Path

# Add backend directory to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent / 'backend'))

from app import app  # type: ignore[reportMissingImports]
from database.db import init_db, get_db_type  # type: ignore[reportMissingImports]

def run_tests():
    print("=" * 60)
    print("Running Automated Tests for Vijay Futane's Portfolio App")
    print(f"Active DB Backend: {get_db_type().upper()}")
    print("=" * 60)

    # Initialize db
    init_db()

    client = app.test_client()

    # 1. Health check
    res = client.get('/api/health')
    assert res.status_code == 200, f"Health check failed: {res.status_code}"
    health_data = res.get_json()
    assert health_data['status'] == 'healthy'
    print(" [PASS] /api/health")

    # 2. Get projects
    res = client.get('/api/projects')
    assert res.status_code == 200
    projects_data = res.get_json()
    assert projects_data['success'] is True
    project_titles = [p['title'] for p in projects_data['data']]
    assert 'E-commerce Dashboard' in project_titles
    assert 'Energy Consumption Dashboard' in project_titles
    assert 'React Portfolio Website' in project_titles
    assert 'SQL HR Database Project' in project_titles
    print(f" [PASS] /api/projects (Found {len(project_titles)} projects including all 4 required)")

    # 3. Get skills
    res = client.get('/api/skills')
    assert res.status_code == 200
    skills_data = res.get_json()
    skill_names = [s['name'] for s in skills_data['data']]
    required_skills = ['HTML', 'CSS', 'JavaScript', 'React.js', 'Python', 'SQL', 'MySQL', 'Power BI', 'Excel']
    for req in required_skills:
        assert req in skill_names, f"Missing required skill: {req}"
    print(f" [PASS] /api/skills (Verified all 9 required skills: {', '.join(required_skills)})")

    # 4. Get education
    res = client.get('/api/education')
    assert res.status_code == 200
    edu_data = res.get_json()
    assert any('MCA' in item['title'] for item in edu_data['data'])
    print(" [PASS] /api/education (MCA education verified)")

    # 5. Submit contact message (Public)
    contact_payload = {
        'name': 'Senior Tech Recruiter',
        'email': 'recruiter@techenterprise.com',
        'subject': 'Interview Invitation - Python Full Stack Developer Role',
        'message': 'Hi Vijay, your portfolio and MCA background are impressive. We would like to schedule an interview.'
    }
    res = client.post('/api/contacts', data=json.dumps(contact_payload), content_type='application/json')
    assert res.status_code == 201
    contact_res = res.get_json()
    assert contact_res['success'] is True
    contact_id = contact_res['id']
    print(f" [PASS] /api/contacts (Message submitted and stored with ID: {contact_id})")

    # 6. Admin Login
    login_payload = {'username': 'admin', 'password': 'Admin@123'}
    res = client.post('/api/auth/login', data=json.dumps(login_payload), content_type='application/json')
    assert res.status_code == 200
    login_data = res.get_json()
    assert login_data['success'] is True
    token = login_data['token']
    assert token is not None
    auth_headers = {'Authorization': f'Bearer {token}'}
    print(" [PASS] /api/auth/login (Admin authenticated successfully, received token)")

    # 7. Admin view messages
    res = client.get('/api/contacts', headers=auth_headers)
    assert res.status_code == 200
    inbox_data = res.get_json()
    assert any(m['email'] == 'recruiter@techenterprise.com' for m in inbox_data['data'])
    print(" [PASS] /api/contacts (Admin authorized and verified inbox message)")

    # 8. Admin mark message read
    res = client.put(f'/api/contacts/{contact_id}/status', data=json.dumps({'status': 'read'}), content_type='application/json', headers=auth_headers)
    assert res.status_code == 200
    print(" [PASS] /api/contacts/<id>/status (Status updated to read)")

    # 9. Get Stats
    res = client.get('/api/stats')
    assert res.status_code == 200
    stats_data = res.get_json()
    assert stats_data['data']['total_projects'] >= 4
    assert stats_data['data']['total_skills'] >= 9
    print(f" [PASS] /api/stats (Stats returned: {stats_data['data']['total_projects']} projects, {stats_data['data']['total_skills']} skills)")

    # 10. Download Resume
    res = client.get('/api/resume/download')
    assert res.status_code == 200
    assert b"VIJAY FUTANE" in res.data
    print(" [PASS] /api/resume/download (Generated resume successfully)")

    # 11. Static Frontend Serving
    res = client.get('/')
    assert res.status_code == 200
    assert b"Vijay Futane" in res.data
    print(" [PASS] / (Frontend index.html served successfully)")

    print("=" * 60)
    print("[SUCCESS] ALL 11 TESTS PASSED SUCCESSFULLY! ZERO ERRORS.")
    print("=" * 60)

if __name__ == '__main__':
    run_tests()
