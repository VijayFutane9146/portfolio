// Hero Component
const { useState, useEffect } = React;

function Hero() {
  // Rotating typing text for professional titles
  const titles = [
    'Python Full Stack Developer',
    'Data Analyst & BI Specialist',
    'MCA Graduate & Software Architect',
    'MySQL & Database Optimizer',
    'React & Modern Web Engineer',
  ];

  const [currentText, setCurrentText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullTitle.substring(0, currentText.length + 1));
        if (currentText === fullTitle) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullTitle.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 text-xs sm:text-sm font-medium text-purple-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5"></span>
              <span>Available for Full-time Roles &amp; High-Impact Projects</span>
            </div>

            {/* Main Greeting & Name */}
            <div>
              <p className="text-sm sm:text-base font-semibold text-cyan-400 uppercase tracking-widest mb-2 font-mono">
                Hello World, I'm
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                Vijay <span className="text-gradient">Futane</span>
              </h1>
            </div>

            {/* Animated Typing Title */}
            <div className="h-12 flex items-center justify-center lg:justify-start">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-200">
                I am a{' '}
                <span className="text-purple-400 font-mono">
                  {currentText}
                </span>
                <span className="typing-cursor"></span>
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Passionate <strong className="text-white">Python Full Stack Developer</strong> and{' '}
              <strong className="text-white">Data Analyst</strong> with an <strong className="text-cyan-300">MCA</strong> degree. 
              I design resilient REST APIs, build reactive glassmorphism web applications with React, 
              and turn raw business telemetry into high-impact interactive dashboards with SQL &amp; Power BI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => window.portfolioUtils.downloadResume()}
                className="btn-gradient px-7 py-3.5 rounded-xl font-bold text-base flex items-center gap-3 cursor-pointer shadow-lg shadow-purple-600/40 hover:shadow-purple-500/60"
              >
                <i className="fas fa-download"></i>
                <span>Download Resume</span>
              </button>

              <button
                onClick={() => window.portfolioUtils.scrollTo('contact')}
                className="btn-outline-glass px-7 py-3.5 rounded-xl font-bold text-base flex items-center gap-3 cursor-pointer"
              >
                <i className="fas fa-envelope-open-text text-purple-400"></i>
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mr-1 font-mono">
                Connect:
              </span>
              {[
                { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/vijayfutane', hover: 'hover:text-purple-400' },
                { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/in/vijayfutane', hover: 'hover:text-cyan-400' },
                { name: 'Email', icon: 'fas fa-envelope', url: 'mailto:vijay.futane@example.com', hover: 'hover:text-rose-400' },
                { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/vijayfutane', hover: 'hover:text-sky-400' },
                { name: 'Database', icon: 'fas fa-database', url: '#projects', hover: 'hover:text-emerald-400' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-300 ${s.hover} transition-all duration-300 hover:scale-110 cursor-pointer`}
                  title={s.name}
                >
                  <i className={`${s.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Glowing Avatar & Tech Badges (5 cols) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88">
              {/* Outer Orbit Glow */}
              <div className="avatar-orbit w-full h-full p-2">
                <div className="avatar-inner w-full h-full bg-slate-900 border-2 border-purple-500/30">
                  <img
                    src="assets/images/profile-avatar.svg"
                    alt="Vijay Futane - Full Stack Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Tech Orbit Badge 1 (Python) */}
              <div className="absolute -top-4 -left-4 glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-purple-500/30 shadow-lg animate-bounce" style={{ animationDuration: '4s' }}>
                <i className="fab fa-python text-2xl text-yellow-400"></i>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono">Backend</p>
                  <p className="text-xs font-bold text-white">Python / Flask</p>
                </div>
              </div>

              {/* Floating Tech Orbit Badge 2 (React) */}
              <div className="absolute top-1/2 -right-6 glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-cyan-500/30 shadow-lg animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
                <i className="fab fa-react text-2xl text-cyan-400"></i>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono">Frontend</p>
                  <p className="text-xs font-bold text-white">React.js</p>
                </div>
              </div>

              {/* Floating Tech Orbit Badge 3 (SQL & Power BI) */}
              <div className="absolute -bottom-5 left-8 glass-card px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-purple-500/30 shadow-lg animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
                <i className="fas fa-chart-pie text-2xl text-purple-400"></i>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono">Analytics</p>
                  <p className="text-xs font-bold text-white">MySQL &amp; Power BI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fast Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Degree', value: 'MCA', sub: 'Master of Computer App.', icon: 'fas fa-graduation-cap' },
            { label: 'Core Expertise', value: 'Python & SQL', sub: 'Full Stack & Analytics', icon: 'fas fa-laptop-code' },
            { label: 'Featured Projects', value: '4+ Live', sub: 'Dashboards & Portfolios', icon: 'fas fa-project-diagram' },
            { label: 'Data Visuals', value: 'Power BI', sub: 'Interactive Telemetry', icon: 'fas fa-chart-line' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 sm:p-5 rounded-2xl border border-purple-500/20 text-center relative overflow-hidden group">
              <div className="flex items-center justify-center gap-3 mb-1">
                <i className={`${stat.icon} text-purple-400 text-lg group-hover:scale-110 transition-transform`}></i>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</h3>
              </div>
              <p className="text-xs font-semibold text-slate-300">{stat.label}</p>
              <p className="text-[11px] text-slate-400">{stat.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

window.Hero = Hero;
