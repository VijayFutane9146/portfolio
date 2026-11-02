// Navigation Bar Component
const { useState, useEffect } = React;

function Navbar({ currentTheme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home', icon: 'fas fa-home' },
    { name: 'About', id: 'about', icon: 'fas fa-user' },
    { name: 'Skills', id: 'skills', icon: 'fas fa-code' },
    { name: 'Projects', id: 'projects', icon: 'fas fa-briefcase' },
    { name: 'Experience', id: 'experience', icon: 'fas fa-graduation-cap' },
    { name: 'Contact', id: 'contact', icon: 'fas fa-paper-plane' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    window.portfolioUtils.scrollTo(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 glass-panel border-b border-purple-500/20 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
              VF
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Vijay<span className="text-purple-400">.</span>Futane
              </span>
              <span className="block text-[10px] tracking-wider uppercase text-cyan-400 font-semibold">
                Full Stack &amp; Analytics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-purple-600/30 border border-purple-500/40 shadow-sm shadow-purple-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className={`${link.icon} mr-1.5 text-xs ${isActive ? 'text-purple-400' : 'text-slate-400'}`}></i>
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl border border-purple-500/20 hover:border-purple-500/50 bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-white transition-all cursor-pointer"
              title={currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`fas ${currentTheme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-purple-400'}`}></i>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => window.portfolioUtils.downloadResume()}
              className="btn-gradient px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <i className="fas fa-file-download text-xs"></i>
              <span>Resume</span>
            </button>

            {/* Admin Portal Shortcut */}
            <a
              href="#/admin"
              className="text-xs text-slate-400 hover:text-purple-300 p-2 transition-colors cursor-pointer"
              title="Admin Control Center"
            >
              <i className="fas fa-shield-alt text-base"></i>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-300 hover:text-white"
            >
              <i className={`fas ${currentTheme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-purple-400'}`}></i>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white focus:outline-none"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-purple-500/20 px-4 pt-3 pb-6 mt-3 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium flex items-center gap-3 ${
                activeSection === link.id
                  ? 'text-white bg-purple-600/30 border border-purple-500/40'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <i className={`${link.icon} text-purple-400 w-5`}></i>
              {link.name}
            </button>
          ))}
          <div className="pt-3 border-t border-purple-500/20 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.portfolioUtils.downloadResume();
              }}
              className="flex-1 btn-gradient py-2.5 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2"
            >
              <i className="fas fa-file-download"></i>
              Download Resume
            </button>
            <a
              href="#/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-outline-glass px-4 py-2.5 rounded-xl text-sm flex items-center justify-center"
            >
              <i className="fas fa-lock"></i>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

window.Navbar = Navbar;
