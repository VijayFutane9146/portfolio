// Project Detail Modal Component
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const techList = project.technologies
    ? project.technologies.split(',').map((t) => t.trim())
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl glass-panel border border-purple-500/30 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-400 transition-colors cursor-pointer"
        >
          <i className="fas fa-times text-lg"></i>
        </button>

        {/* Project Header */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-purple-300 bg-purple-600/20 border border-purple-500/30 mb-2">
            {project.category}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
        </div>

        {/* Project Image Preview */}
        <div className="w-full rounded-2xl overflow-hidden border border-purple-500/20 mb-6 bg-slate-900 shadow-lg">
          <img
            src={project.image_url || 'assets/images/project-portfolio.svg'}
            alt={project.title}
            className="w-full h-auto max-h-72 object-cover object-top"
          />
        </div>

        {/* Overview & Detailed Specs */}
        <div className="space-y-4 mb-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <i className="fas fa-info-circle text-cyan-400"></i> Project Overview
          </h3>
          <p>{project.description}</p>
          
          {project.detailed_description && (
            <div className="p-4 rounded-xl glass-panel border border-purple-500/20 text-sm text-slate-300">
              <strong className="text-purple-300 block mb-1">Architecture &amp; Features:</strong>
              <p>{project.detailed_description}</p>
            </div>
          )}
        </div>

        {/* Technologies Used */}
        <div className="mb-8">
          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-3">
            Technologies &amp; Frameworks
          </h4>
          <div className="flex flex-wrap gap-2">
            {techList.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-500/20">
          <div className="flex gap-3">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="btn-gradient px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <i className="fas fa-external-link-alt text-xs"></i>
                Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="btn-outline-glass px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <i className="fab fa-github"></i>
                GitHub Repo
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}

window.ProjectModal = ProjectModal;
