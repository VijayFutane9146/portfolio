// Main React Application Component
const { useState, useEffect } = React;

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'dark';
  });

  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash || '#home';
  });

  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('portfolio_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Apply theme class to body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  // Listen to hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentRoute(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    window.location.hash = '#/admin';
  };

  const handleLogout = () => {
    setAdminUser(null);
    window.location.hash = '#home';
  };

  // Determine active view based on hash
  const renderCurrentView = () => {
    if (currentRoute === '#/admin') {
      const token = localStorage.getItem('portfolio_admin_token');
      if (!token) {
        return <window.AdminLogin onLoginSuccess={handleLoginSuccess} />;
      }
      return <window.AdminDashboard onLogout={handleLogout} />;
    }

    if (currentRoute === '#/admin/login') {
      return <window.AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return <window.HomePage />;
  };

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Ambient Moving Gradient Blobs */}
      <div className="ambient-glow">
        <div className="ambient-blob-1"></div>
        <div className="ambient-blob-2"></div>
        <div className="ambient-blob-3"></div>
      </div>

      {/* Glassmorphism Navigation Bar */}
      <window.Navbar currentTheme={theme} toggleTheme={toggleTheme} />

      {/* Main View Router */}
      <div className="relative z-10">
        {renderCurrentView()}
      </div>

      {/* Global Interactive Elements */}
      <window.Toast />
      <window.BackToTop />
      <window.Footer />
    </div>
  );
}

// Mount React Root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
