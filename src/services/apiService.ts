import { ENV } from "@/config/env.config"

const baseUrl = ENV.BASE_URL;

export const apiService = async (url: string, method: string = 'GET', body: any) => {
    try {
        const accessToken = localStorage.getItem('accessToken')

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }

        const options: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        }

        const response = await fetch(`${baseUrl}${url}`, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message || "Something went wrong!");
        }

        return data;

    }
    catch (err: any) {
        throw new Error(err?.message)
    }
}