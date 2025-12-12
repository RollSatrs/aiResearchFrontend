import axios, { AxiosResponse } from 'axios';
import {
    User,
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    SearchRequest,
    SearchResponse,
    SummarizeRequest,
    SummaryResponse,
} from '../types';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 30000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    register: (data: RegisterRequest): Promise<AxiosResponse<User>> =>
        api.post('/auth/register', data),

    login: (data: LoginRequest): Promise<AxiosResponse<AuthResponse>> =>
        api.post('/auth/login', data),

    getProfile: (): Promise<AxiosResponse<User>> =>
        api.get('/auth/me'),
};

export const searchApi = {
    search: (params: SearchRequest): Promise<AxiosResponse<SearchResponse>> =>
        api.get('/search', { params }),
};

export const summarizeApi = {
    summarize: (data: SummarizeRequest): Promise<AxiosResponse<SummaryResponse>> =>
        api.post('/summarize', data),
};

export default api;
