import { api } from "./api"
import type { AuthResponse, LoginCredentials, RegisterCredentials } from "../types/auth"

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials)
    return response
  },

  async register(data: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", data)
    return response
  },

  async refresh(): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) {
      throw new Error("No refresh token")
    }
    const response = await api.post<{ accessToken: string; refreshToken: string }>("/auth/refresh", { refreshToken })
    return response
  },

  async me() {
    const response = await api.get<{ id: number; email: string; rol: string }>("/auth/me")
    return response
  },

  logout() {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
  },
}
