// Skills Section Component
const { useState, useEffect } = React;

function Skills() {
  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Default initial skills fallback matching requirements
  const defaultSkills = [
    { id: 1, name: 'Python', category: 'Backend & Core', proficiency: 92, icon: 'fab fa-python', level: 'Expert' },
    { id: 2, name: 'SQL', category: 'Databases', proficiency: 90, icon: 'fas fa-database', level: 'Advanced' },
    { id: 3, name: 'MySQL', category: 'Databases', proficiency: 88, icon: 'fas fa-server', level: 'Advanced' },
    { id: 4, name: 'React.js', category: 'Frontend Development', proficiency: 85, icon: 'fab fa-react', level: 'Advanced' },
    { id: 5, name: 'JavaScript', category: 'Frontend Development', proficiency: 88, icon: 'fab fa-js-square', level: 'Advanced' },
    { id: 6, name: 'HTML', category: 'Frontend Development', proficiency: 95, icon: 'fab fa-html5', level: 'Expert' },
    { id: 7, name: 'CSS', category: 'Frontend Development', proficiency: 90, icon: 'fab fa-css3-alt', level: 'Expert' },
    { id: 8, name: 'Power BI', category: 'Data Analytics & BI', proficiency: 85, icon: 'fas fa-chart-pie', level: 'Advanced' },
    { id: 9, name: 'Excel', category: 'Data Analytics & BI', proficiency: 85, icon: 'fas fa-file-excel', level: 'Advanced' },
  ];

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await window.portfolioApi.getSkills();
        if (res.success && res.data && res.data.length > 0) {
          setSkills(res.data);
        } else {
          setSkills(defaultSkills);
        }
      } catch (err) {
        console.warn('Using default skills fallback:', err);
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  const categories = ['All', 'Frontend Development', 'Backend & Core', 'Databases', 'Data Analytics & BI'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const getLevelBadge = (percent) => {
    if (percent >= 90) return { label: 'Mastery', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    if (percent >= 85) return { label: 'Advanced', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
    return { label: 'Proficient', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' };
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-purple-500/30 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
            <i className="fas fa-terminal text-cyan-400"></i>
            Technical Skills
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tools, Stacks &amp; <span className="text-gradient">Proficiencies</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A comprehensive overview of my technical capabilities spanning frontend, backend microservices, relational databases, and business intelligence.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400/50 scale-105'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-purple-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid with Animated Progress Bars */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="glass-card p-6 rounded-2xl animate-pulse h-32"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => {
              const badge = getLevelBadge(skill.proficiency);
              return (
                <div
                  key={skill.id || skill.name}
                  className="glass-card p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/45 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                        <i className={`${skill.icon || 'fas fa-code'} text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-mono">{skill.category}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-extrabold text-cyan-400 font-mono">
                        {skill.proficiency}%
                      </span>
                      <span className={`block text-[10px] px-2 py-0.5 rounded-full border mt-0.5 ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-purple-500/20">
                    <div
                      className="progress-fill h-full rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-400 shadow-sm shadow-purple-500/50"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Technical Ecosystem Strip */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 text-center">
          <h3 className="text-base font-bold text-white mb-4">
            Integrated Tech Stack &amp; Workflow Ecosystem
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-sm">
            <span className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
              <i className="fab fa-git-alt text-orange-400 text-lg"></i> Git &amp; GitHub
            </span>
            <span className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
              <i className="fas fa-network-wired text-purple-400 text-lg"></i> RESTful Architecture
            </span>
            <span className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
              <i className="fas fa-key text-yellow-400 text-lg"></i> JWT Auth &amp; Password Hashing
            </span>
            <span className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
              <i className="fas fa-table text-emerald-400 text-lg"></i> Power BI DAX &amp; Modeling
            </span>
            <span className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
              <i className="fas fa-wind text-sky-400 text-lg"></i> Tailwind CSS &amp; Glassmorphism
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

window.Skills = Skills;
