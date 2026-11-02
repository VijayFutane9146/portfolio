// Utilities for Vijay Futane's Portfolio Web Application

const utils = {
  // Toast notifications
  toastListeners: [],

  onToast(callback) {
    this.toastListeners.push(callback);
    return () => {
      this.toastListeners = this.toastListeners.filter(cb => cb !== callback);
    };
  },

  showToast(message, type = 'info', duration = 4000) {
    const toast = {
      id: Date.now() + Math.random(),
      message,
      type, // 'success', 'error', 'info', 'warning'
      duration,
    };
    this.toastListeners.forEach(cb => cb(toast));
  },

  // Trigger professional resume download
  downloadResume() {
    this.showToast('Preparing Vijay Futane\'s Resume for download...', 'info');
    const link = document.createElement('a');
    link.href = '/api/resume/download';
    link.setAttribute('download', 'Vijay_Futane_Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      this.showToast('Resume downloaded successfully!', 'success');
    }, 1200);
  },

  // Format date helper
  formatDate(dateString) {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  },

  // Scroll smoothly to section
  scrollTo(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  },
};

window.portfolioUtils = utils;
