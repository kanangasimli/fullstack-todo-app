import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskControls from "../components/TaskControls";
import Pagination from "../components/Pagination";
import Toast from "../components/Toast";
import { getCurrentUser } from "../services/authService";
import {
    createTask,
    deleteTaskById,
    getTasks,
    updateTask,
} from "../services/taskService";

function TaskPage() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [toast, setToast] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [lastPage, setLastPage] = useState(false);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [completedFilter, setCompletedFilter] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortDir, setSortDir] = useState("desc");

    const [editingTask, setEditingTask] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getCurrentUser(token);
                setUser(data);
            } catch {
                handleLogout();
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        if (!toast) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setToast(null);
        }, 2500);

        return () => clearTimeout(timeoutId);
    }, [toast]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(0);
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchTasks = async () => {
        if (!token) {
            return;
        }

        try {
            setIsLoading(true);

            const data = await getTasks({
                page: currentPage,
                size: pageSize,
                sortBy,
                sortDir,
                completed: completedFilter,
                search: debouncedSearch,
                token,
            });

            setTasks(data.content ?? []);
            setTotalPages(data.totalPages ?? 1);
            setLastPage(data.last ?? true);
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [token, currentPage, pageSize, debouncedSearch, completedFilter, sortBy, sortDir]);

    const handleSubmitTask = async (taskPayload) => {
        try {
            setIsSaving(true);

            if (editingTask) {
                await updateTask(editingTask.id, taskPayload, token);
                showToast("Task updated successfully");
            } else {
                await createTask(taskPayload, token);
                showToast("Task added successfully");
            }

            setEditingTask(null);
            setCurrentPage(0);
            await fetchTasks();
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteTask = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");

        if (!confirmed) {
            return;
        }

        try {
            setIsSaving(true);

            await deleteTaskById(id, token);
            showToast("Task deleted successfully");

            if (editingTask && editingTask.id === id) {
                setEditingTask(null);
            }

            if (currentPage > 0 && tasks.length === 1) {
                setCurrentPage((prev) => prev - 1);
            } else {
                await fetchTasks();
            }
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleComplete = async (task) => {
        const updatedTask = {
            title: task.title,
            description: task.description,
            completed: !task.completed,
        };

        try {
            setIsSaving(true);

            await updateTask(task.id, updatedTask, token);
            showToast(task.completed ? "Task marked as pending" : "Task completed");

            if (editingTask && editingTask.id === task.id) {
                setEditingTask({
                    ...editingTask,
                    completed: !editingTask.completed,
                });
            }

            await fetchTasks();
        } catch (error) {
            showToast(error.message, "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleStartEdit = (task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
    };

    const handleCompletedFilterChange = (value) => {
        setCompletedFilter(value);
        setCurrentPage(0);
    };

    const handleSortByChange = (value) => {
        setSortBy(value);
        setCurrentPage(0);
    };

    const handleSortDirChange = (value) => {
        setSortDir(value);
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        if (currentPage > 0 && !isLoading) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (!lastPage && !isLoading) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div className="container">
            <Toast toast={toast} onClose={() => setToast(null)} />

            <div className="top-bar">
                <h1>ToDo App</h1>

                <div className="top-bar-right">
                    {user && <span className="welcome-text">Welcome, {user.name}</span>}
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <TaskForm
                onSubmitTask={handleSubmitTask}
                editingTask={editingTask}
                onCancelEdit={handleCancelEdit}
                isSaving={isSaving}
                onValidationError={(message) => showToast(message, "error")}
            />

            <TaskControls
                search={search}
                onSearchChange={handleSearchChange}
                completedFilter={completedFilter}
                onCompletedFilterChange={handleCompletedFilterChange}
                sortBy={sortBy}
                onSortByChange={handleSortByChange}
                sortDir={sortDir}
                onSortDirChange={handleSortDirChange}
                isLoading={isLoading}
            />

            {isLoading ? (
                <p className="status-text">Loading tasks...</p>
            ) : (
                <TaskList
                    tasks={tasks}
                    onDeleteTask={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                    onStartEdit={handleStartEdit}
                    isSaving={isSaving}
                />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                lastPage={lastPage}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                isLoading={isLoading}
            />
        </div>
    );
}

export default TaskPage;