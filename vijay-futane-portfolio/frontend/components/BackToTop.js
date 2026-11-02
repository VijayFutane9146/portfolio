// Back To Top Floating Component
const { useState, useEffect } = React;

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = totalScroll / winHeight;
      setScrollProgress(scrollPercent);
      setVisible(totalScroll > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-2xl glass-panel border border-purple-500/40 text-purple-300 hover:text-white flex items-center justify-center shadow-lg shadow-purple-900/50 hover:border-purple-400 hover:scale-110 transition-all cursor-pointer group"
      title="Back to Top"
    >
      <i className="fas fa-arrow-up group-hover:-translate-y-1 transition-transform"></i>
    </button>
  );
}

window.BackToTop = BackToTop;
