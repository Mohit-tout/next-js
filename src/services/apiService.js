import { ENV } from "@/config/env.config";

const baseUrl = ENV.BASE_URL;

export const apiService = async (url, method = 'GET', body) => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        };

        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        };

        const response = await fetch(`${baseUrl}${url}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Something went wrong!");
        }
        return data;
    } catch (err) {
        throw new Error(err?.message || "Request failed");
    }
};
