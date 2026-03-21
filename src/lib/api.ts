/**
 * API utility for making requests to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Generic fetch wrapper with error handling
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: data.message || 'An error occurred',
        status: response.status,
      };
    }

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Network error',
      status: 0,
    };
  }
}

/**
 * Products API
 */
export const productsApi = {
  getAll: (params?: Record<string, string>) =>
    apiFetch('/products', { params }),

  getById: (id: string) =>
    apiFetch(`/products/${id}`),

  create: (data: unknown) =>
    apiFetch('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: unknown) =>
    apiFetch(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/products/${id}`, {
      method: 'DELETE',
    }),
};

/**
 * Auth API
 */
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  signup: (data: { email: string; password: string; phone?: string }) =>
    apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiFetch('/auth/logout', {
      method: 'POST',
    }),

  me: () =>
    apiFetch('/auth/me'),
};

/**
 * Orders API
 */
export const ordersApi = {
  getAll: (params?: Record<string, string>) =>
    apiFetch('/orders', { params }),

  getById: (id: string) =>
    apiFetch(`/orders/${id}`),

  create: (data: unknown) =>
    apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: string) =>
    apiFetch(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

