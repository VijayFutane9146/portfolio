// Admin Login Component
const { useState } = React;

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await window.portfolioApi.login(username, password);
      if (res.success && res.token) {
        localStorage.setItem('portfolio_admin_token', res.token);
        localStorage.setItem('portfolio_admin_user', JSON.stringify(res.admin));
        window.portfolioUtils.showToast(`Welcome back, ${res.admin.full_name}!`, 'success');
        if (onLoginSuccess) {
          onLoginSuccess(res.admin);
        } else {
          window.location.hash = '#/admin';
        }
      } else {
        setErrorMsg(res.message || 'Invalid credentials.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative pt-24 pb-16">
      <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/30 shadow-2xl relative">
        
        {/* Back Link */}
        <a
          href="#home"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-purple-300 mb-6 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Return to Portfolio</span>
        </a>

        {/* Brand & Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-violet-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-purple-600/40">
            <i className="fas fa-user-shield"></i>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin <span className="text-gradient">Control Portal</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Authenticate to manage projects, skills &amp; messages
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
            <i className="fas fa-exclamation-circle text-base shrink-0"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
              Username or Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl glass-input text-sm text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white cursor-pointer"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
              </button>
            </div>
          </div>

          {/* Preset hint box */}
          <div className="p-3 rounded-xl glass-card border border-purple-500/20 text-[11px] text-slate-400">
            <span className="text-purple-300 font-bold block mb-0.5">Default Admin Credentials:</span>
            User: <code className="text-cyan-300 font-mono">admin</code> | Password: <code className="text-cyan-300 font-mono">Admin@123</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/40 disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin text-sm"></i>
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt text-sm"></i>
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

window.AdminLogin = AdminLogin;
