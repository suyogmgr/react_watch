const Toast = ({ message, type, onClose }) => {
  if (!message) return null;

  const styles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    pending: "bg-yellow-500 text-white",
  };

  const icons = {
    success: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>,
    error: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>,
    pending: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01" /></svg>,
  };

  return (
    <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl ${styles[type] || styles.pending} animate-slide-down`}>
      {icons[type] || icons.pending}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

export default Toast;
