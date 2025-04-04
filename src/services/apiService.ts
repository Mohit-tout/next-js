import { ENV } from "@/config/env.config";

const baseUrl = ENV.BASE_URL;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiResponse<T = unknown> {
    success?: boolean;
    message?: string;
    data?: T;
    [key: string]: unknown;
}

export const apiService = async <T = unknown>(
    url: string,
    method: HttpMethod = 'GET',
    body?: Record<string, unknown>
): Promise<ApiResponse<T>> => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        };

        const options: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        };

        const response = await fetch(`${baseUrl}${url}`, options);
        const data: ApiResponse<T> = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Something went wrong!");
        }

        return data;
    } catch (err) {
        const error = err instanceof Error ? err.message : "Something went wrong";
        throw new Error(error);
    }
};
