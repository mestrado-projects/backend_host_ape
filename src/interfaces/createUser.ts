import { UserRole } from "../models/index.js"

export interface createUser {
  email: string
  password: string
  name: string
  role: UserRole
  is_active?: boolean
}
