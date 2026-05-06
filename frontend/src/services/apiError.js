export async function extractErrorMessage(response, fallbackMessage) {
    try {
        const data = await response.json();

        if (data.message) {
            return data.message;
        }

        return fallbackMessage;
    } catch {
        return fallbackMessage;
    }
}