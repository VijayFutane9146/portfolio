// Admin Dashboard Component
const { useState, useEffect } = React;

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, messages, projects, skills, education
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full Stack Web',
    description: '',
    detailed_description: '',
    technologies: '',
    image_url: 'assets/images/project-portfolio.svg',
    live_url: '',
    github_url: '',
    featured: 1,
    order_index: 0,
  });

  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend Development',
    proficiency: 85,
    icon: 'fas fa-code',
    order_index: 0,
  });

  const [changePwdOpen, setChangePwdOpen] = useState(false);
  const [pwdForm, setPwdForm] = useState({ current_password: '', new_password: '' });

  // Load all admin data
  const loadData = async () => {
    setLoading(true);
    try {
      const [sRes, mRes, pRes, skRes] = await Promise.all([
        window.portfolioApi.getStats().catch(() => ({})),
        window.portfolioApi.getContacts().catch(() => ({})),
        window.portfolioApi.getProjects().catch(() => ({})),
        window.portfolioApi.getSkills().catch(() => ({})),
      ]);

      if (sRes.success) setStats(sRes.data);
      if (mRes.success) setMessages(mRes.data);
      if (pRes.success) setProjects(pRes.data);
      if (skRes.success) setSkills(skRes.data);
    } catch (err) {
      window.portfolioUtils.showToast('Failed to load dashboard data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handlers for Messages
  const handleMessageStatus = async (id, status) => {
    try {
      await window.portfolioApi.updateContactStatus(id, status);
      window.portfolioUtils.showToast(`Message marked as ${status}`, 'success');
      loadData();
    } catch (err) {
      window.portfolioUtils.showToast(err.message, 'error');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    try {
      await window.portfolioApi.deleteContact(id);
      window.portfolioUtils.showToast('Message deleted', 'success');
      loadData();
    } catch (err) {
      window.portfolioUtils.showToast(err.message, 'error');
    }
  };

  // Handlers for Projects
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'Full Stack Web',
      description: '',
      detailed_description: '',
      technologies: '',
      image_url: 'assets/images/project-portfolio.svg',
      live_url: '',
      github_url: '',
      featured: 1,
      order_index: projects.length + 1,
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      category: proj.category || 'Full Stack Web',
      description: proj.description || '',
      detailed_description: proj.detailed_description || '',
      technologies: proj.technologies || '',
      image_url: proj.image_url || 'assets/images/project-portfolio.svg',
      live_url: proj.live_url || '',
      github_url: proj.github_url || '',
      featured: proj.featured ? 1 : 0,
      order_index: proj.order_index || 0,
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await window.portfolioApi.updateProject(editingProject.id, projectForm);
        window.portfolioUtils.showToast('Project updated successfully!', 'success');
      } else {
        await window.portfolioApi.createProject(projectForm);
        window.portfolioUtils.showToast('Project created successfully!', 'success');
      }
      setProjectModalOpen(false);
      loadData();
    } catch (err) {
      window.portfolioUtils.showToast(err.message, 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await window.portfolioApi.deleteProject(id);
      window.portfolioUtils.showToast('Project deleted successfully', 'success');
      loadData();
    } catch (err) {
      window.portfolioUtils.showToast(err.message, 'error');
    }
  };

  // Handlers for Skills
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      await window.portfolioApi.createSkill(skillForm);
      window.portfolioUtils.showToast('Skill added successfully!', 'success');
      setSkillModalOpen(false);
      setSkillForm({
        name: '',
        category: 'Frontend Development',
        proficiency: 85,
        icon: 'fas fa-code',
        order_index: skills.length + 1,
      });
      loadData();
    } catch (err) {
      window.portfolioUtils.showToast(err.message, 'error');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await window.portfolioApi.deleteSkill(id);
      window.portfolioUtils.showToast('Skill removed', 'success');
      loadData();
    } catch (err) {
      window.portfolioUtils.showToast(err.message, 'error');
    }
  };

  // Handler for Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await window.portfolioApi.changePassword(
        pwdForm.current_password,
        pwdForm.new_password
      );
      window.portfolioUtils.showToast('Password updated securely!', 'success');
      setChangePwdOpen(false);
      setPwdForm({ current_password: '', new_password: '' });
    } catch (err) {
      window.portfolioUtils.showToast(err.message, 'error');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    localStorage.removeItem('portfolio_admin_user');
    window.portfolioUtils.showToast('Logged out successfully', 'info');
    if (onLogout) onLogout();
    else window.location.hash = '#home';
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Header Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/25 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-md">
            <i className="fas fa-crown"></i>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              Admin <span className="text-gradient">Control Center</span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>Database Engine:</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-cyan-300 border border-purple-500/40">
                {stats?.database_type || 'CONNECTED'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#home"
            className="btn-outline-glass px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <i className="fas fa-globe"></i>
            <span>View Live Site</span>
          </a>
          <button
            onClick={() => setChangePwdOpen(true)}
            className="btn-outline-glass px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <i className="fas fa-key"></i>
            <span>Change Password</span>
          </button>
          <button
            onClick={handleAdminLogout}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 hover:text-white transition-colors cursor-pointer"
          >
            <i className="fas fa-sign-out-alt mr-1.5"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { label: 'Total Projects', value: stats?.total_projects || projects.length, icon: 'fas fa-briefcase', color: 'text-purple-400' },
          { label: 'Technical Skills', value: stats?.total_skills || skills.length, icon: 'fas fa-code', color: 'text-cyan-400' },
          { label: 'Total Inquiries', value: stats?.total_contacts || messages.length, icon: 'fas fa-envelope', color: 'text-emerald-400' },
          { label: 'Unread Messages', value: stats?.unread_contacts || 0, icon: 'fas fa-bell', color: 'text-amber-400' },
        ].map((card, i) => (
          <div key={i} className="glass-card p-5 rounded-2xl border border-purple-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-mono">{card.label}</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{card.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl bg-white/5 border border-purple-500/20 flex items-center justify-center text-xl ${card.color}`}>
              <i className={card.icon}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Dashboard Tabs Header */}
      <div className="flex border-b border-purple-500/20 mb-8 overflow-x-auto gap-2 pb-2">
        {[
          { id: 'overview', label: 'Overview & Messages', icon: 'fas fa-inbox' },
          { id: 'projects', label: 'Projects Management', icon: 'fas fa-project-diagram' },
          { id: 'skills', label: 'Skills & Proficiencies', icon: 'fas fa-layer-group' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'glass-panel text-slate-300 hover:text-white'
            }`}
          >
            <i className={tab.icon}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & MESSAGES */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-purple-500/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Contact Submissions</h2>
                <p className="text-xs text-slate-400">Stored in MySQL table: `contacts`</p>
              </div>
              <button
                onClick={loadData}
                className="btn-outline-glass px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <i className="fas fa-inbox text-4xl mb-3 opacity-50 block"></i>
                <p className="text-sm">No contact submissions received yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase font-mono text-purple-300 border-b border-purple-500/20 bg-purple-950/20">
                    <tr>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">From</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    {messages.map((m) => (
                      <tr key={m.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              m.status === 'unread'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : m.status === 'read'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-500/20 text-slate-300'
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-white">{m.name}</td>
                        <td className="py-3 px-4 text-cyan-300 font-mono text-xs">{m.email}</td>
                        <td className="py-3 px-4 text-slate-200">{m.subject}</td>
                        <td className="py-3 px-4 max-w-xs truncate text-xs text-slate-400" title={m.message}>
                          {m.message}
                        </td>
                        <td className="py-3 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                          {window.portfolioUtils.formatDate(m.created_at)}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                          {m.status === 'unread' ? (
                            <button
                              onClick={() => handleMessageStatus(m.id, 'read')}
                              className="text-xs text-emerald-400 hover:text-emerald-300 p-1"
                              title="Mark as Read"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleMessageStatus(m.id, 'unread')}
                              className="text-xs text-amber-400 hover:text-amber-300 p-1"
                              title="Mark as Unread"
                            >
                              <i className="fas fa-envelope"></i>
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="text-xs text-rose-400 hover:text-rose-300 p-1"
                            title="Delete Message"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-purple-500/20">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Projects Management</h2>
                <p className="text-xs text-slate-400">Add, update, or remove portfolio showcase projects</p>
              </div>
              <button
                onClick={openNewProjectModal}
                className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <i className="fas fa-plus"></i>
                <span>Add New Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-panel p-5 rounded-2xl border border-purple-500/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {proj.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        Order: {proj.order_index}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-3 mb-4">{proj.description}</p>
                    <p className="text-[11px] text-cyan-300 font-mono mb-4">
                      {proj.technologies}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-500/20">
                    <button
                      onClick={() => openEditProjectModal(proj)}
                      className="text-xs text-cyan-300 hover:text-white px-3 py-1.5 rounded-lg glass-card flex items-center gap-1.5"
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="text-xs text-rose-400 hover:text-rose-200 px-3 py-1.5 rounded-lg bg-rose-500/20 flex items-center gap-1.5"
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SKILLS MANAGEMENT */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-purple-500/20">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Skills &amp; Proficiencies</h2>
                <p className="text-xs text-slate-400">Manage developer skill sets and animated progress percentages</p>
              </div>
              <button
                onClick={() => setSkillModalOpen(true)}
                className="btn-gradient px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <i className="fas fa-plus"></i>
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skills.map((s) => (
                <div
                  key={s.id}
                  className="glass-panel p-4 rounded-xl border border-purple-500/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-300 text-lg">
                      <i className={s.icon || 'fas fa-code'}></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{s.name}</h4>
                      <p className="text-[10px] text-slate-400">{s.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-cyan-400 font-mono">
                      {s.proficiency}%
                    </span>
                    <button
                      onClick={() => handleDeleteSkill(s.id)}
                      className="text-xs text-rose-400 hover:text-white p-1"
                      title="Delete Skill"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PROJECT */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl glass-panel border border-purple-500/40 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h3>
            
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Title</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  >
                    <option value="Full Stack Web">Full Stack Web</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Database & Analytics">Database &amp; Analytics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Order Index</label>
                  <input
                    type="number"
                    value={projectForm.order_index}
                    onChange={(e) => setProjectForm({ ...projectForm, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Short Description</label>
                <textarea
                  rows="3"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-input text-sm resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Detailed Spec / Architecture</label>
                <textarea
                  rows="3"
                  value={projectForm.detailed_description}
                  onChange={(e) => setProjectForm({ ...projectForm, detailed_description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-input text-sm resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  placeholder="React.js, Python Flask, MySQL, Tailwind CSS"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={projectForm.live_url}
                    onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl glass-input text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gradient px-6 py-2.5 rounded-xl text-xs font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SKILL */}
      {skillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel border border-purple-500/40 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-4">Add Technical Skill</h3>
            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Skill Name</label>
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. Docker / Pandas"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                >
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend & Core">Backend &amp; Core</option>
                  <option value="Databases">Databases</option>
                  <option value="Data Analytics & BI">Data Analytics &amp; BI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">
                  Proficiency: {skillForm.proficiency}%
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={skillForm.proficiency}
                  onChange={(e) => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setSkillModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gradient px-6 py-2.5 rounded-xl text-xs font-bold">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CHANGE PASSWORD */}
      {changePwdOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel border border-purple-500/40 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-4">Change Admin Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">Current Password</label>
                <input
                  type="password"
                  value={pwdForm.current_password}
                  onChange={(e) => setPwdForm({ ...pwdForm, current_password: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 font-bold mb-1">New Password</label>
                <input
                  type="password"
                  value={pwdForm.new_password}
                  onChange={(e) => setPwdForm({ ...pwdForm, new_password: e.target.value })}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-purple-500/20">
                <button
                  type="button"
                  onClick={() => setChangePwdOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gradient px-6 py-2.5 rounded-xl text-xs font-bold">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

window.AdminDashboard = AdminDashboard;
