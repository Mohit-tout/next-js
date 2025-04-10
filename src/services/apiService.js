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

        let response = await fetch(`${url}`, options);

        if (response.status === 440) {
            const newToken = await reGenerateAccessToken();
            if (!newToken) throw new Error("Failed to refresh access token");
            headers.Authorization = `Bearer ${newToken}`;
            options.headers = headers;

            response = await fetch(url, options);
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Something went wrong!");
        }

        return data;

    } catch (err) {
        throw new Error(err?.message || "Request failed");
    }
};



const reGenerateAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        if (!refreshToken) {
            // window.location.href = '/login'; // Redirect if no refresh token
            return;
        }

        const response = await fetch('/api/auth/refresh-token', {
            method: 'POST',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Refresh failed");
        }

        // Save the new access token
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;

    } catch (error) {
        localStorage.clear();
        console.error("Failed to refresh token:", error);
        // window.location.href = '/login'; // Redirect on error
    }
};

