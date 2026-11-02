// Contact Section Component
const { useState } = React;

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full Name must be at least 2 characters.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.portfolioUtils.showToast('Please fix the errors in the form.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await window.portfolioApi.submitContact(formData);
      if (res.success) {
        setSubmittedSuccess(true);
        window.portfolioUtils.showToast(
          'Message received! Thank you, Vijay will reply promptly.',
          'success'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmittedSuccess(false), 6000);
      } else {
        window.portfolioUtils.showToast(res.message || 'Submission failed.', 'error');
      }
    } catch (err) {
      window.portfolioUtils.showToast(
        err.message || 'Network error submitting message. Please retry.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-purple-500/30 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-3">
            <i className="fas fa-paper-plane text-cyan-400"></i>
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Have a project in mind, a software role opening, or want to collaborate on Python &amp; Data Analytics? Send a message directly into my database inbox!
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status Card */}
            <div className="glass-card p-6 rounded-3xl border border-purple-500/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <h3 className="text-lg font-bold text-white">Employment Status</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Actively seeking full-time opportunities as a{' '}
                <strong className="text-purple-300">Python Full Stack Developer</strong> or{' '}
                <strong className="text-cyan-300">Data Analyst</strong>. Open to remote or on-site roles.
              </p>
              <div className="inline-block px-3 py-1.5 rounded-xl glass-panel text-xs font-bold text-emerald-400 border border-emerald-500/30">
                ✓ Available for Immediate Joining
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-purple-500/20 space-y-5">
              <h3 className="text-lg font-bold text-white mb-2">Direct Contact Channels</h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <i className="fas fa-envelope text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Email Address</p>
                  <a
                    href="mailto:vijay.futane@example.com"
                    className="text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                  >
                    vijayfutane9146@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                  <i className="fas fa-map-marker-alt text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Location</p>
                  <p className="text-sm font-semibold text-white">
                    Pune / Maharashtra, India (Open to Relocation)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-300 shrink-0">
                  <i className="fas fa-graduation-cap text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Academic Background</p>
                  <p className="text-sm font-semibold text-white">
                    Master of Computer Applications (MCA)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="glass-card p-6 rounded-3xl border border-purple-500/20 text-center">
              <p className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">
                Social Profiles &amp; Code Repositories
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href="https://github.com/vijayfutane"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-400 transition-all hover:scale-110"
                  title="GitHub"
                >
                  <i className="fab fa-github text-lg"></i>
                </a>
                <a
                  href="https://linkedin.com/in/vijayfutane"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all hover:scale-110"
                  title="LinkedIn"
                >
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
                <a
                  href="mailto:vijay.futane@example.com"
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-rose-400 hover:border-rose-400 transition-all hover:scale-110"
                  title="Email"
                >
                  <i className="fas fa-envelope text-lg"></i>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Working Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-9 rounded-3xl border border-purple-500/20 relative">
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">Send a Direct Message</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Submissions are stored securely in MySQL (`portfolio_db.contacts`) via Flask REST API.
                </p>
              </div>

              {submittedSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 animate-fadeIn">
                  <i className="fas fa-check-circle text-xl shrink-0"></i>
                  <p className="text-sm">
                    Thank you! Your message has been received and saved. Vijay will get back to you shortly!
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                      Full Name <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-xl glass-input text-sm ${
                        errors.name ? 'border-rose-500' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                      Email Address <span className="text-pink-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-4 py-3 rounded-xl glass-input text-sm ${
                        errors.email ? 'border-rose-500' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                    Subject <span className="text-pink-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Job Opportunity / Full Stack Python Developer"
                    className={`w-full px-4 py-3 rounded-xl glass-input text-sm ${
                      errors.subject ? 'border-rose-500' : ''
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                    Message <span className="text-pink-400">*</span>
                  </label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your project details, interview invite, or inquiry here..."
                    className={`w-full px-4 py-3 rounded-xl glass-input text-sm resize-none ${
                      errors.message ? 'border-rose-500' : ''
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/40 hover:shadow-purple-500/60 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-sm"></i>
                      <span>Saving to Database...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane text-sm"></i>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

window.Contact = Contact;
