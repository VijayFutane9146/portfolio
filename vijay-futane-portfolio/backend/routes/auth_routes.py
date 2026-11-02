from flask import Blueprint

try:
    from controllers.auth_controller import AuthController, token_required
except (ImportError, ValueError):
    from ..controllers.auth_controller import AuthController, token_required

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/login', methods=['POST'])(AuthController.login)
auth_bp.route('/me', methods=['GET'])(token_required(AuthController.get_current_user))
auth_bp.route('/change-password', methods=['POST'])(token_required(AuthController.change_password))
