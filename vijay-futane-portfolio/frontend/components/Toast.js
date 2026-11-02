// Custom Toast Notification Component
const { useState, useEffect } = React;

function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = window.portfolioUtils.onToast((toast) => {
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration || 4000);
    });

    return unsubscribe;
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getToastStyle = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: 'fas fa-check-circle text-emerald-400',
          bg: 'bg-emerald-950/80 border-emerald-500/50 text-white',
        };
      case 'error':
        return {
          icon: 'fas fa-exclamation-triangle text-rose-400',
          bg: 'bg-rose-950/80 border-rose-500/50 text-white',
        };
      case 'warning':
        return {
          icon: 'fas fa-exclamation-circle text-amber-400',
          bg: 'bg-amber-950/80 border-amber-500/50 text-white',
        };
      default:
        return {
          icon: 'fas fa-info-circle text-cyan-400',
          bg: 'bg-purple-950/80 border-purple-500/50 text-white',
        };
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => {
        const style = getToastStyle(t.type);
        return (
          <div
            key={t.id}
            className={`toast-item border ${style.bg} transition-all duration-300`}
          >
            <i className={`${style.icon} text-lg shrink-0`}></i>
            <p className="text-xs sm:text-sm font-medium flex-1">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}

window.Toast = Toast;
