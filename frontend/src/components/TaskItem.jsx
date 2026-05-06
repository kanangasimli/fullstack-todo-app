function TaskItem({ task, onDeleteTask, onToggleComplete, onStartEdit, isSaving }) {
    return (
        <div className={`task-item ${task.completed ? "completed" : ""}`}>
            <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`task-badge ${task.completed ? "done" : "pending"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
            </div>

            <p>{task.description || "No description"}</p>

            <div className="task-meta">
                <small>Created: {formatDate(task.createdAt)}</small>
                <small>Updated: {formatDate(task.updatedAt)}</small>
            </div>

            <div className="task-actions">
                <button
                    className="edit-btn"
                    onClick={() => onStartEdit(task)}
                    disabled={isSaving}
                >
                    Edit
                </button>

                <button
                    className="complete-btn"
                    onClick={() => onToggleComplete(task)}
                    disabled={isSaving}
                >
                    {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDeleteTask(task.id)}
                    disabled={isSaving}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

function formatDate(dateString) {
    if (!dateString) {
        return "";
    }

    return new Date(dateString).toLocaleString();
}

export default TaskItem;