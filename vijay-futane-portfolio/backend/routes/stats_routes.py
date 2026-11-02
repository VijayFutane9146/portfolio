from flask import Blueprint

try:
    from controllers.stats_controller import StatsController
    from controllers.auth_controller import token_required
except (ImportError, ValueError):
    from ..controllers.stats_controller import StatsController
    from ..controllers.auth_controller import token_required

stats_bp = Blueprint('stats_bp', __name__)

# Can be queried by admin dashboard or public stats counters
stats_bp.route('', methods=['GET'])(StatsController.get_stats)
