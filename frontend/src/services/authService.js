import { extractErrorMessage } from "./apiError";

const AUTH_API_URL = "http://localhost:8080/auth";

export async function registerUser(registerPayload) {
    const response = await fetch(`${AUTH_API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerPayload),
    });

    if (!response.ok) {
        const errorMessage = await extractErrorMessage(response, "Failed to register");
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function loginUser(loginPayload) {
    const response = await fetch(`${AUTH_API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
    });

    if (!response.ok) {
        const errorMessage = await extractErrorMessage(response, "Failed to login");
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function getCurrentUser(token) {
    const response = await fetch(`${AUTH_API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await extractErrorMessage(response, "Failed to fetch user");
        throw new Error(errorMessage);
    }

    return response.json();
}