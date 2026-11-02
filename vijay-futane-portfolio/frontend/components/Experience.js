// Experience & Education Timeline Component
const { useState, useEffect } = React;

function Experience() {
  const [timelineItems, setTimelineItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const defaultTimeline = [
    {
      id: 1,
      title: 'Master of Computer Applications (MCA)',
      institution: 'Reputed University / Institute',
      field_of_study: 'Computer Science & Application Software',
      start_year: '2023',
      end_year: '2025',
      grade: 'First Class with Distinction',
      description: 'Specialized in advanced Software Engineering, Database Management Systems (RDBMS), Data Structures & Algorithms, and Cloud-enabled Web Architectures. Built a scalable full-stack web application capstone.',
      type: 'education',
    },
    {
      id: 2,
      title: 'Bachelor of Computer Applications / Science',
      institution: 'University College of Science',
      field_of_study: 'Computer Applications',
      start_year: '2019',
      end_year: '2022',
      grade: 'First Class with Distinction',
      description: 'Developed foundational mastery in Object-Oriented Programming (Python, C++), Relational Database Design (SQL), Web Technologies (HTML, CSS, JS), and Operating Systems.',
      type: 'education',
    },
    {
      id: 3,
      title: 'Full Stack Python Developer & Data Analyst Intern',
      institution: 'Tech Innovators Solutions',
      field_of_study: 'Software & Analytics Engineering',
      start_year: '2023',
      end_year: '2025',
      grade: 'Exemplary Performance',
      description: 'Engineered high-throughput RESTful API endpoints using Python Flask and MySQL. Designed interactive Power BI and React analytics dashboards reducing data compilation overhead by 40%.',
      type: 'experience',
    },
    {
      id: 4,
      title: 'Full Stack & Data Engineering Certifications',
      institution: 'Professional Learning & Industry Programs',
      field_of_study: 'Python, SQL, React & Power BI Specialization',
      start_year: '2026',
      end_year: 'Present',
      grade: 'Verified Credentials',
      description: 'Completed rigorous coursework in Advanced SQL Query Optimization, Python Data Analysis (Pandas, NumPy), React Modern Hook architecture, and Business Intelligence reporting.',
      type: 'certification',
    },
  ];

  useEffect(() => {
    async function fetchTimeline() {
      try {
        const res = await window.portfolioApi.getEducation();
        if (res.success && res.data && res.data.length > 0) {
          setTimelineItems(res.data);
        } else {
          setTimelineItems(defaultTimeline);
        }
      } catch (err) {
        console.warn('Using default timeline fallback:', err);
        setTimelineItems(defaultTimeline);
      } finally {
        setLoading(false);
      }
    }
    fetchTimeline();
  }, []);

  const filteredItems = activeFilter === 'all'
    ? timelineItems
    : timelineItems.filter((item) => item.type === activeFilter);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'experience':
        return { icon: 'fas fa-briefcase', color: 'text-cyan-400', label: 'Work Experience' };
      case 'certification':
        return { icon: 'fas fa-award', color: 'text-amber-400', label: 'Certification' };
      default:
        return { icon: 'fas fa-graduation-cap', color: 'text-purple-400', label: 'Education' };
    }
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-purple-500/30 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
            <i className="fas fa-history text-cyan-400"></i>
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education &amp; <span className="text-gradient">Experience</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A chronological timeline of my academic degrees, hands-on developer internships, and technical certifications.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex justify-center gap-2 mb-14">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'education', label: 'Education (MCA)' },
            { id: 'experience', label: 'Internships & Experience' },
            { id: 'certification', label: 'Certifications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/50'
                  : 'glass-panel text-slate-300 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-8 sm:pl-10 space-y-10">
          {/* Vertical connecting gradient line */}
          <div className="timeline-line"></div>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="glass-card p-6 rounded-2xl animate-pulse h-40"></div>
              ))}
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const meta = getTypeIcon(item.type);
              return (
                <div
                  key={item.id || index}
                  className="timeline-dot glass-card p-6 sm:p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 relative group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      {/* Badge */}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold glass-panel border border-purple-500/30 ${meta.color} mb-2`}>
                        <i className={meta.icon}></i>
                        {meta.label}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-400 mt-0.5">
                        {item.institution}
                      </p>
                      {item.field_of_study && (
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {item.field_of_study}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      {/* Year Range */}
                      <span className="inline-block px-3.5 py-1.5 rounded-xl glass-panel text-xs sm:text-sm font-mono font-bold text-purple-300 border border-purple-500/30">
                        {item.start_year} – {item.end_year}
                      </span>
                      {item.grade && (
                        <span className="block text-xs font-medium text-emerald-400 mt-1">
                          {item.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mt-4 pt-4 border-t border-purple-500/15">
                    {item.description}
                  </p>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}

window.Experience = Experience;
