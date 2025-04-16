import { Role } from './role.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  id: string
  username: String
  firstName: String
  lastName: String
  dob: string | null
  noPassword: boolean | null
  avatar: string
  roles: Role[]
}>

export type LoginResponse = SuccessResponse<{
  token: String
  authenticated: boolean
}>
export type LogoutResponse = {
  code: number
}
export type CreatePasswordResponse = {
  password: String
}
