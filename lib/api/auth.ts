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

const DEMO_CREDENTIALS = {
  "admin@mahaone.ae": { password: "admin123", role: "super-admin" },
  "manager@mahaone.ae": { password: "manager123", role: "building-manager" },
  "landlord@mahaone.ae": { password: "landlord123", role: "landlord" },
  "tenant@mahaone.ae": { password: "tenant123", role: "tenant" },
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

  static async loginDemo(email: string, password: string): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const demoUser = DEMO_CREDENTIALS[email as keyof typeof DEMO_CREDENTIALS]

    if (!demoUser || demoUser.password !== password) {
      throw new Error("Invalid credentials")
    }

    // Create mock auth response
    const mockResponse: AuthResponse = {
      token: `demo_token_${Date.now()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      existUser: {
        id: `user_${Date.now()}`,
        firstName: { name: email.split("@")[0] },
        lastName: { name: "User" },
        email: email,
        phoneNumber: "+971501234567",
        roleId: demoUser.role,
        domainId: "mahaone",
        status: "active",
      },
    }

    this.setAuthToken(mockResponse.token)
    this.setUserData(mockResponse.existUser)

    return mockResponse
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const credentials: LoginCredentials = {
      email,
      password,
    }

    try {
      // Check if this is a demo credential
      if (email in DEMO_CREDENTIALS) {
        console.log("[v0] Using demo login for:", email)
        return await this.loginDemo(email, password)
      }

      // Otherwise try real API
      console.log("[v0] Attempting real API login for:", email)

      // Determine which login endpoint to use based on email domain or user type
      if (email.includes("admin@")) {
        return await this.loginSuperAdmin(credentials)
      } else {
        return await this.loginBuildingManager(credentials)
      }
    } catch (error) {
      console.error("[v0] API login failed, trying demo login:", error)
      // If API fails, try demo login as fallback
      return await this.loginDemo(email, password)
    }
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
