import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onToggleComplete, onStartEdit, isSaving }) {
    if (tasks.length === 0) {
        return <p className="status-text">No tasks found.</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDeleteTask={onDeleteTask}
                    onToggleComplete={onToggleComplete}
                    onStartEdit={onStartEdit}
                    isSaving={isSaving}
                />
            ))}
        </div>
    );
}

export default TaskList;