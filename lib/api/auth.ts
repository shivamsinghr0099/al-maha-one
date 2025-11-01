// Authentication Service

import { apiClient } from "./client"
import { API_ENDPOINTS, AUTH_TOKEN_KEY, USER_DATA_KEY } from "./config"

export interface LoginCredentials {
  email?: string
  name?: string
  password: string
}

export interface AuthResponse {
  token: string
  expiresAt: number
  existUser: {
    id: string
    firstName: { name: string }
    lastName: { name: string }
    email: string
    phoneNumber: string
    roleId: string
    domainId: string
    status: string
  }
}

export class AuthService {
  static setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
    }
  }

  static getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(AUTH_TOKEN_KEY)
    }
    return null
  }

  static setUserData(userData: any): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
    }
  }

  static getUserData(): any | null {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(USER_DATA_KEY)
      return data ? JSON.parse(data) : null
    }
    return null
  }

  static clearAuth(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(USER_DATA_KEY)
    }
  }

  static isAuthenticated(): boolean {
    return !!this.getAuthToken()
  }

  static async loginSuperAdmin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.SUPER_ADMIN.LOGIN, credentials, false)

    if (response.success && response.data) {
      this.setAuthToken(response.data.token)
      this.setUserData(response.data.existUser)
      return response.data
    }

    throw new Error("Login failed")
  }

  static async loginBuildingManager(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.BUILDING_MANAGER.AUTH.LOGIN, credentials, false)

    if (response.success && response.data) {
      this.setAuthToken(response.data.token)
      this.setUserData(response.data.existUser)
      return response.data
    }

    throw new Error("Login failed")
  }

  static async getProfile(): Promise<any> {
    const response = await apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.AUTH.PROFILE_GET, {})
    return response.data
  }

  static async updateProfile(data: any): Promise<any> {
    const response = await apiClient.post(API_ENDPOINTS.BUILDING_MANAGER.AUTH.PROFILE_EDIT, data)
    return response.data
  }

  static logout(): void {
    this.clearAuth()
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }
}

export const authService = AuthService
