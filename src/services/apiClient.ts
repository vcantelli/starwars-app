import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

// Create an Axios instance with default configuration.
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global variables for managing token refresh
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/**
 * Response interceptor to handle token refresh.
 *
 * When a response returns a 401 status, it attempts to refresh the token.
 * If a refresh request is already in progress, it waits for that promise to resolve.
 * Once a new token is obtained, it sets the Authorization header on the original request
 * and re-sends it.
 *
 * @param error - The AxiosError object.
 * @returns A promise resolving to the re-sent request, or rejects with the error.
 */
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    // If the error status is 401, try to refresh the token
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      // If not already refreshing, start the refresh process
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = axios
          .post('/api/auth/refresh', {}, { withCredentials: true })
          .then((refreshResponse) => {
            const newAccessToken = refreshResponse.data.newAccessToken || process.env.NEXT_PUBLIC_MOCKED_NEW_ACCESS_TOKEN;
            isRefreshing = false;
            return newAccessToken;
          })
          .catch((err) => {
            isRefreshing = false;
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(err);
          });
      }

      try {
        // Wait for the refresh promise to resolve
        const newAccessToken = await refreshPromise;
        // Ensure headers are properly initialized
        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        } else if (!(originalRequest.headers instanceof AxiosHeaders)) {
          originalRequest.headers = new AxiosHeaders(originalRequest.headers);
        }
        // Update the Authorization header with the new token
        originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
        // Retry the original request with the new token
        return apiClient.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Request interceptor to disable "withCredentials" for external URLs.
 *
 * For requests to external APIs (such as SWAPI and the Star Wars Databank),
 * cookies are not needed, so we disable withCredentials.
 *
 * @param config - The Axios request configuration.
 * @returns The modified request configuration.
 */
apiClient.interceptors.request.use(
  (config) => {
    const internalConfig = config as InternalAxiosRequestConfig;
    if (
      internalConfig.url &&
      (internalConfig.url.startsWith('https://swapi.dev') ||
       internalConfig.url.startsWith('https://starwars-databank.vercel.app'))
    ) {
      internalConfig.withCredentials = false;
    }
    return internalConfig;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
