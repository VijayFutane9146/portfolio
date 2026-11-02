from .auth_routes import auth_bp
from .project_routes import project_bp
from .skill_routes import skill_bp
from .education_routes import education_bp
from .contact_routes import contact_bp
from .stats_routes import stats_bp

__all__ = [
    'auth_bp',
    'project_bp',
    'skill_bp',
    'education_bp',
    'contact_routes',
    'stats_bp'
]
