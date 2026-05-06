import { extractErrorMessage } from "./apiError";

const API_URL = "http://localhost:8080/tasks";

function getAuthHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getTasks({ page, size, sortBy, sortDir, completed, search, token }) {
    const params = new URLSearchParams({
        page,
        size,
        sortBy,
        sortDir,
    });

    if (completed !== "") {
        params.append("completed", completed);
    }

    if (search.trim() !== "") {
        params.append("search", search.trim());
    }

    const response = await fetch(`${API_URL}?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await extractErrorMessage(response, "Failed to fetch tasks");
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function createTask(taskPayload, token) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(taskPayload),
    });

    if (!response.ok) {
        const errorMessage = await extractErrorMessage(response, "Failed to create task");
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function updateTask(id, taskPayload, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(token),
        body: JSON.stringify(taskPayload),
    });

    if (!response.ok) {
        const errorMessage = await extractErrorMessage(response, "Failed to update task");
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function deleteTaskById(id, token) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await extractErrorMessage(response, "Failed to delete task");
        throw new Error(errorMessage);
    }
}