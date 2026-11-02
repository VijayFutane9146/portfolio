// About Me Component
function About() {
  const technicalInterests = [
    {
      title: 'Full Stack Web Architecture',
      desc: 'Building responsive web SPAs with React, backed by modular Flask REST microservices, asynchronous workers, and secure JWT authentication.',
      icon: 'fas fa-layer-group',
      color: 'text-purple-400',
    },
    {
      title: 'Data Analytics & Business Intelligence',
      desc: 'Transforming multi-source transactional data into interactive Power BI dashboards, automated Excel reports, and executive analytical KPIs.',
      icon: 'fas fa-chart-pie',
      color: 'text-cyan-400',
    },
    {
      title: 'Relational Database Engineering',
      desc: 'Architecting 3NF normalized schemas in MySQL, writing complex indexing schemes, stored procedures, audit triggers, and query performance tuning.',
      icon: 'fas fa-database',
      color: 'text-emerald-400',
    },
    {
      title: 'API Integrations & Cloud Deployment',
      desc: 'Designing OpenAPI compliant RESTful interfaces, third-party webhook integrations, and containerized deployment pipelines.',
      icon: 'fas fa-cloud',
      color: 'text-pink-400',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-purple-500/30 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
            <i className="fas fa-user-circle text-cyan-400"></i>
            About Me
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineering Code &amp; <span className="text-gradient">Decoding Data</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A developer who bridges the gap between scalable software engineering and intelligent data analytics.
          </p>
        </div>

        {/* Top Split: Professional Summary & Career Objective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Professional Summary (7 cols) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/20 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <i className="fas fa-id-badge text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Professional Summary</h3>
                <p className="text-xs text-purple-300 font-mono">Master of Computer Applications (MCA)</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am <strong className="text-white">Vijay Futane</strong>, a results-oriented{' '}
                <strong className="text-white">Python Full Stack Developer</strong> and{' '}
                <strong className="text-white">Data Analyst</strong> with advanced academic qualification in{' '}
                <span className="text-cyan-300 font-semibold">Master of Computer Applications (MCA)</span>.
              </p>
              <p>
                My dual expertise combines rigorous software craftsmanship—crafting high-performance, 
                cleanly architected web applications using React.js, Python Flask, and MySQL—with 
                analytical rigor in data modeling, SQL query optimization, Power BI dashboards, and Excel modeling.
              </p>
              <p>
                Whether designing transactional database tables with audit triggers or architecting 
                glassmorphism web user interfaces, my focus is delivering high-performance, maintainable, 
                and user-delighting digital products.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="mt-6 pt-6 border-t border-purple-500/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="glass-panel p-3 rounded-xl border border-purple-500/20 text-center">
                <p className="text-[11px] text-slate-400 font-mono">Qualification</p>
                <p className="text-sm font-bold text-white">MCA Graduate</p>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-purple-500/20 text-center">
                <p className="text-[11px] text-slate-400 font-mono">Core Stack</p>
                <p className="text-sm font-bold text-white">Python + React</p>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-purple-500/20 text-center col-span-2 sm:col-span-1">
                <p className="text-[11px] text-slate-400 font-mono">Specialization</p>
                <p className="text-sm font-bold text-cyan-300">Data Analytics &amp; SQL</p>
              </div>
            </div>
          </div>

          {/* Career Objective & Education Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Career Objective */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                  <i className="fas fa-bullseye text-lg"></i>
                </div>
                <h3 className="text-lg font-bold text-white">Career Objective</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                "To leverage strong analytical skills and full-stack development expertise in Python, React, and MySQL 
                to architect scalable, user-centric software solutions and data-driven applications in an innovative 
                tech organization where I can contribute to business growth while continuously mastering state-of-the-art technologies."
              </p>
            </div>

            {/* Education Highlight */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-purple-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <i className="fas fa-graduation-cap text-lg"></i>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Master of Computer Applications</h3>
                  <p className="text-xs text-purple-300">MCA • First Class with Distinction</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Specialized in Object-Oriented Software Engineering, Relational Database Management Systems (RDBMS), 
                Data Structures, Web Architectures, and Business Data Analytics.
              </p>
            </div>
          </div>
        </div>

        {/* Development Journey Showcase */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/20 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-300">
              <i className="fas fa-route text-lg"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">My Development Journey</h3>
              <p className="text-xs text-slate-400">From algorithmic foundations to full-stack engineering</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-5 rounded-2xl border border-purple-500/20">
              <div className="text-cyan-400 text-xs font-mono font-bold mb-2">PHASE 1: FOUNDATION</div>
              <h4 className="text-base font-bold text-white mb-2">Core Computer Science &amp; Logic</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Began with data structures, algorithms, and relational database normalization. Developed deep appreciation for clean code patterns and algorithmic efficiency in Python and C++.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-purple-500/20">
              <div className="text-purple-400 text-xs font-mono font-bold mb-2">PHASE 2: FULL STACK EXPANSION</div>
              <h4 className="text-base font-bold text-white mb-2">Modern Web &amp; API Systems</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mastered React component architecture, RESTful API design with Python Flask, JWT authentication, and responsive UI paradigms with Tailwind CSS and Glassmorphism design systems.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-purple-500/20">
              <div className="text-emerald-400 text-xs font-mono font-bold mb-2">PHASE 3: DATA ANALYTICS &amp; BI</div>
              <h4 className="text-base font-bold text-white mb-2">Actionable Intelligence</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bridged full-stack applications with enterprise business intelligence. Built telemetry dashboards, Power BI data models, and complex MySQL queries driving operational decision-making.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Interests Grid */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <i className="fas fa-microchip text-purple-400"></i>
            <span>Technical Interests &amp; Focus Areas</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalInterests.map((interest, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
              >
                <i className={`${interest.icon} text-2xl ${interest.color} mb-4 block group-hover:scale-110 transition-transform`}></i>
                <h4 className="text-base font-bold text-white mb-2">{interest.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{interest.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

window.About = About;
