export const apiService = async (url, method = 'GET', body) => {
    try {

        const accessToken = localStorage.getItem('accessToken');

        // Setup headers, skip Content-Type for FormData
        const isFormData = body instanceof FormData;

        const headers = {
            Authorization: `Bearer ${accessToken}`
        };

        // Only set Content-Type for JSON
        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }

        const options = {
            method,
            headers,
            body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
        };

        const response = await fetch(`${url}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Something went wrong!");
        }

        return data;
    } catch (err) {
        throw new Error(err?.message || "Request failed");
    }
};
