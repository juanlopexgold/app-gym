import { z } from "zod"

export const loginSchema = z.object({
  username: z.string().min(1, "El usuario es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
})

export type LoginForm = z.infer<typeof loginSchema>

export interface AuthUser {
  id: string
  username: string
  email?: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
}
