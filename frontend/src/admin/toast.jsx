import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (message, tone = 'success') => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((current) => [...current, { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 2800);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
        {toasts.map((entry) => (
          <div
            key={entry.id}
            role="status"
            className={`pointer-events-auto flex items-center gap-2.5 rounded-lg border px-4 py-3 text-[12px] shadow-luxe backdrop-blur-md ${
              entry.tone === 'error'
                ? 'border-[#e07a7a]/40 bg-[#241718]/95 text-[#f0b4b4]'
                : 'border-[#C6A16A]/40 bg-[#1c1a18]/95 text-[#f2ece8]'
            }`}
          >
            {entry.tone === 'error' ? (
              <AlertCircle size={15} className="shrink-0" />
            ) : (
              <Check size={15} className="shrink-0 text-[#C6A16A]" />
            )}
            <span className="flex-1">{entry.message}</span>
            <button
              type="button"
              onClick={() => dismiss(entry.id)}
              aria-label="Dismiss"
              className="text-current opacity-60 transition-opacity hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
