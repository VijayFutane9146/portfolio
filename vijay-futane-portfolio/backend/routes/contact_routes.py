from flask import Blueprint

try:
    from controllers.contact_controller import ContactController
    from controllers.auth_controller import token_required
except (ImportError, ValueError):
    from ..controllers.contact_controller import ContactController
    from ..controllers.auth_controller import token_required

contact_bp = Blueprint('contact_bp', __name__)

# Public submission
contact_bp.route('', methods=['POST'])(ContactController.submit)

# Protected admin routes
contact_bp.route('', methods=['GET'])(token_required(ContactController.get_all))
contact_bp.route('/<int:contact_id>', methods=['GET'])(token_required(ContactController.get_by_id))
contact_bp.route('/<int:contact_id>/status', methods=['PUT'])(token_required(ContactController.update_status))
contact_bp.route('/<int:contact_id>', methods=['DELETE'])(token_required(ContactController.delete))
