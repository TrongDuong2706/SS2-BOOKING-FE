import { AxiosResponse } from 'axios'
import { AuthResponse, CreatePasswordResponse, LoginResponse, LogoutResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

// API đăng ký
export const registerAccount = (body: { username: string; firstName: string; password: string; lastName: string }) =>
  http.post<AuthResponse>('/users', body)

// API đăng nhập
export const loginAccount = (body: { username: string; password: string }) =>
  http.post<AuthResponse>('/auth/token', body)

// API getInfo
export const getMyInfo = () => http.get<AuthResponse>('/users/myInfo')

export const loginWithGoogle = async (authCode: string): Promise<LoginResponse> => {
  const response = await http.post<LoginResponse>(`/auth/outbound/authentication?code=${authCode}`)
  return response.data // Chỉ trả về data, không phải toàn bộ AxiosResponse
}
//API Logout
export const LogoutAccount = (body: { token: string }) => http.post<LogoutResponse>('/auth/logout', body)

//API CreatePassword
export const createPassword = (body: { password: string }) =>
  http.post<CreatePasswordResponse>('/users/create-password', body)

//API đổi avatar
export const changeAvatar = (userId: string, body: FormData) =>
  http.post(`/users/avatar/${userId}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

//API đổi thông tin user
export const updateUser = (userId: string, body: { firstName: string; lastName: string; dob: string }) =>
  http.put(`/users/${userId}`, body)

//API đổi mật khẩu
export const changePassword = (userId: string, body: { password: string; newPassword: string }) =>
  http.post(`/users/password/${userId}`, body)

//API lấy tổng số user
export const getTotalUser = () => http.get('/users/totalUsers')
