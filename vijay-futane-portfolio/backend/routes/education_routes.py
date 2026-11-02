from flask import Blueprint

try:
    from controllers.education_controller import EducationController
    from controllers.auth_controller import token_required
except (ImportError, ValueError):
    from ..controllers.education_controller import EducationController
    from ..controllers.auth_controller import token_required

education_bp = Blueprint('education_bp', __name__)

education_bp.route('', methods=['GET'])(EducationController.get_all)
education_bp.route('', methods=['POST'])(token_required(EducationController.create))
education_bp.route('/<int:item_id>', methods=['PUT'])(token_required(EducationController.update))
education_bp.route('/<int:item_id>', methods=['DELETE'])(token_required(EducationController.delete))
