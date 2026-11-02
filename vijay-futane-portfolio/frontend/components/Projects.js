// Projects Section Component
const { useState, useEffect } = React;

function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default projects fallback matching requirements
  const defaultProjects = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      slug: 'e-commerce-dashboard',
      category: 'Full Stack Web',
      description: 'A high-performance modern e-commerce analytics and management dashboard featuring real-time revenue KPIs, customer acquisition metrics, inventory alerts, and sales performance charts.',
      detailed_description: 'Built with React, Python Flask, and MySQL. Features include comprehensive sales analytics, interactive revenue graphs, inventory stock monitoring, order tracking, and exportable financial reports.',
      technologies: 'React.js, Python Flask, MySQL, Chart.js, Tailwind CSS, REST API',
      image_url: 'assets/images/project-ecommerce.svg',
      live_url: 'https://ecommerce-dashboard-demo.com',
      github_url: 'https://github.com/vijayfutane/ecommerce-dashboard',
      featured: 1,
    },
    {
      id: 2,
      title: 'Energy Consumption Dashboard',
      slug: 'energy-consumption-dashboard',
      category: 'Data Analytics',
      description: 'An interactive enterprise telemetry and energy consumption dashboard monitoring grid load, peak demand periods, carbon footprint metrics, and predictive anomaly warnings.',
      detailed_description: 'Designed for energy audit and cost optimization. Employs Python data pipelines, Power BI interactive embeds, SQL aggregation queries, and real-time sensor analytics.',
      technologies: 'Python, Power BI, SQL, Pandas, Flask, Data Visualization',
      image_url: 'assets/images/project-energy.svg',
      live_url: 'https://energy-analytics-demo.com',
      github_url: 'https://github.com/vijayfutane/energy-consumption-dashboard',
      featured: 1,
    },
    {
      id: 3,
      title: 'React Portfolio Website',
      slug: 'react-portfolio-website',
      category: 'Full Stack Web',
      description: 'A premium Glassmorphism personal portfolio web application with dynamic MySQL REST API backend, dark/light theme switching, and secure administrative content management.',
      detailed_description: 'Engineered with modern React, responsive Tailwind styling, glassmorphism visual hierarchy, Flask microservice architecture, and full CRUD admin control.',
      technologies: 'React.js, Tailwind CSS, Python Flask, MySQL, JWT Auth',
      image_url: 'assets/images/project-portfolio.svg',
      live_url: 'https://vijayfutane.dev',
      github_url: 'https://github.com/vijayfutane/developer-portfolio',
      featured: 1,
    },
    {
      id: 4,
      title: 'SQL HR Database Project',
      slug: 'sql-hr-database-project',
      category: 'Database & Analytics',
      description: 'An enterprise relational database architecture for Human Resource management, implementing stored procedures, salary audit triggers, attrition analysis, and departmental analytics.',
      detailed_description: 'Includes complex relational normalization (3NF), automated trigger logs for payroll updates, indexing optimization for high-concurrency queries, and Power BI reporting views.',
      technologies: 'MySQL, Advanced SQL, Python, Excel ETL, Stored Procedures, Triggers',
      image_url: 'assets/images/project-hr-sql.svg',
      live_url: 'https://hr-database-demo.com',
      github_url: 'https://github.com/vijayfutane/sql-hr-database-system',
      featured: 1,
    },
  ];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await window.portfolioApi.getProjects();
        if (res.success && res.data && res.data.length > 0) {
          setProjects(res.data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (err) {
        console.warn('Using default projects fallback:', err);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = ['All', 'Full Stack Web', 'Data Analytics', 'Database & Analytics'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-purple-500/30 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
            <i className="fas fa-folder-open text-cyan-400"></i>
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Real-world full stack web applications and data analytics platforms built with clean code and modern architecture.
          </p>
        </div>

        {/* Category Filters */}
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

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="glass-card rounded-3xl animate-pulse h-96"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => {
              const techList = project.technologies
                ? project.technologies.split(',').map((t) => t.trim())
                : [];

              return (
                <div
                  key={project.id || project.slug}
                  className="glass-card rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 flex flex-col group transition-all duration-300"
                >
                  {/* Project Image Box with Hover Overlay */}
                  <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 border-b border-purple-500/20">
                    <img
                      src={project.image_url || 'assets/images/project-portfolio.svg'}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

                    {/* Category Tag Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 backdrop-blur-md border border-purple-400/40 text-purple-200">
                        {project.category}
                      </span>
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute bottom-4 right-4 glass-card px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:border-purple-400 cursor-pointer"
                    >
                      <i className="fas fa-search-plus text-cyan-400"></i>
                      <span>Inspect Architecture</span>
                    </button>
                  </div>

                  {/* Project Info Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2.5">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {techList.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {techList.length > 5 && (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-white/5 text-slate-400">
                            +{techList.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-purple-500/15">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-gradient flex-1 py-2.5 rounded-xl text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          <i className="fas fa-external-link-alt text-xs"></i>
                          <span>Live Demo</span>
                        </a>
                      )}

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-outline-glass flex-1 py-2.5 rounded-xl text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <i className="fab fa-github text-sm"></i>
                          <span>GitHub Repo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <window.ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

window.Projects = Projects;
