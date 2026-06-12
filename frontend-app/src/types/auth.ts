export interface User {
  id: number
  email: string
  rol: "admin" | "user"
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  rol?: "admin" | "user"
}