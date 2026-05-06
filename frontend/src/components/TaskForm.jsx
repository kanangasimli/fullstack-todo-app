import { useEffect, useState } from "react";

function TaskForm({ onSubmitTask, editingTask, onCancelEdit, isSaving, onValidationError }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title || "");
            setDescription(editingTask.description || "");
        } else {
            setTitle("");
            setDescription("");
        }
    }, [editingTask]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSaving) {
            return;
        }

        if (!title.trim()) {
            onValidationError("Title cannot be blank");
            return;
        }

        await onSubmitTask({
            title: title.trim(),
            description: description.trim(),
            completed: editingTask ? editingTask.completed : false,
        });

        if (!editingTask) {
            setTitle("");
            setDescription("");
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="task-form-row">
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSaving}
                />

                <input
                    type="text"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSaving}
                />
            </div>

            <div className="task-form-actions">
                <button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : editingTask ? "Save Changes" : "Add Task"}
                </button>

                {editingTask && (
                    <button
                        type="button"
                        id="cancel-edit-btn"
                        onClick={onCancelEdit}
                        disabled={isSaving}
                    >
                        Cancel Edit
                    </button>
                )}
            </div>
        </form>
    );
}

export default TaskForm;