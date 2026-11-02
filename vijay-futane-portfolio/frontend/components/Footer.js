// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-12 border-t border-purple-500/20 glass-panel mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center text-white font-bold text-base shadow-md">
                VF
              </div>
              <span className="text-xl font-extrabold text-white">
                Vijay<span className="text-purple-400">.</span>Futane
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Python Full Stack Developer &amp; Data Analyst with MCA degree. Dedicated to architecting robust web solutions and business intelligence tools.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/vijayfutane"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-400 transition-colors"
                title="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/vijayfutane"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="mailto:vijayfutane9146@.com"
                className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-rose-400 hover:border-rose-400 transition-colors"
                title="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Quick Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-purple-300 font-bold mb-3">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
              <a href="#home" className="hover:text-purple-300 transition-colors">Home</a>
              <a href="#about" className="hover:text-purple-300 transition-colors">About Me</a>
              <a href="#skills" className="hover:text-purple-300 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-purple-300 transition-colors">Projects</a>
              <a href="#experience" className="hover:text-purple-300 transition-colors">Education (MCA)</a>
              <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
            </div>
          </div>

          {/* Technology & Admin Link (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-purple-300 font-bold mb-3">
              Developer Ecosystem
            </h4>
            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <p>• Python 3 &amp; Flask REST API</p>
              <p>• React 18 &amp; Tailwind CSS</p>
              <p>• MySQL Relational DB</p>
              <p>• Power BI Data Modeling</p>
            </div>
            <div className="pt-2">
              <a
                href="#/admin"
                className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-white glass-panel px-3 py-1.5 rounded-lg border border-purple-500/30 transition-all hover:border-purple-400"
              >
                <i className="fas fa-user-shield text-cyan-400"></i>
                <span>Admin Control Panel</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Vijay Futane. All rights reserved. Designed with Glassmorphism &amp; Modern Web Standards.</p>
          <p className="flex items-center gap-1">
            Built with <i className="fas fa-heart text-rose-500 text-xs mx-0.5"></i> in Python, React &amp; MySQL
          </p>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
