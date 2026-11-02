from flask import Blueprint

try:
    from controllers.skill_controller import SkillController
    from controllers.auth_controller import token_required
except (ImportError, ValueError):
    from ..controllers.skill_controller import SkillController
    from ..controllers.auth_controller import token_required

skill_bp = Blueprint('skill_bp', __name__)

skill_bp.route('', methods=['GET'])(SkillController.get_all)
skill_bp.route('', methods=['POST'])(token_required(SkillController.create))
skill_bp.route('/<int:skill_id>', methods=['PUT'])(token_required(SkillController.update))
skill_bp.route('/<int:skill_id>', methods=['DELETE'])(token_required(SkillController.delete))
