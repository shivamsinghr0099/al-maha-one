// API Client with Authentication and Error Handling

import { AUTH_TOKEN_KEY, API_BASE_URL } from "./config"

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class APIClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (includeAuth) {
      const token = this.getAuthToken()
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
    }

    return headers
  }

  async request<T = any>(endpoint: string, options: RequestInit = {}, includeAuth = true): Promise<APIResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      const headers = this.getHeaders(includeAuth)

      console.log("[v0] API Request:", { url, method: options.method || "GET" })

      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      })

      const data = await response.json()

      console.log("[v0] API Response:", { status: response.status, data })

      if (!response.ok) {
        throw new APIError(data.message || data.error || "API request failed", response.status, data)
      }

      return data
    } catch (error) {
      console.error("[v0] API Error:", error)
      if (error instanceof APIError) {
        throw error
      }
      throw new APIError(error instanceof Error ? error.message : "Network error occurred")
    }
  }

  async get<T = any>(endpoint: string, includeAuth = true): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" }, includeAuth)
  }

  async post<T = any>(endpoint: string, body?: any, includeAuth = true): Promise<APIResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      },
      includeAuth,
    )
  }

  async put<T = any>(endpoint: string, body?: any, includeAuth = true): Promise<APIResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
      },
      includeAuth,
    )
  }

  async delete<T = any>(endpoint: string, includeAuth = true): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" }, includeAuth)
  }
}

export const apiClient = new APIClient()
