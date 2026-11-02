from flask import Blueprint

try:
    from controllers.project_controller import ProjectController
    from controllers.auth_controller import token_required
except (ImportError, ValueError):
    from ..controllers.project_controller import ProjectController
    from ..controllers.auth_controller import token_required

project_bp = Blueprint('project_bp', __name__)

project_bp.route('', methods=['GET'])(ProjectController.get_all)
project_bp.route('/<int:project_id>', methods=['GET'])(ProjectController.get_by_id)
project_bp.route('', methods=['POST'])(token_required(ProjectController.create))
project_bp.route('/<int:project_id>', methods=['PUT'])(token_required(ProjectController.update))
project_bp.route('/<int:project_id>', methods=['DELETE'])(token_required(ProjectController.delete))
