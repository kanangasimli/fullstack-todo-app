function Toast({ toast, onClose }) {
    if (!toast) {
        return null;
    }

    return (
        <div className={`toast toast-${toast.type}`}>
            <span>{toast.message}</span>
            <button onClick={onClose}>×</button>
        </div>
    );
}

export default Toast;