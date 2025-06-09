import axios, { AxiosError, HttpStatusCode } from 'axios'

import { jwtDecode } from 'jwt-decode'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

interface DecodedToken {
  scope?: string
  roles?: string[]
}

export function isAdmin() {
  const token = localStorage.getItem('access_token')
  if (!token) return false

  try {
    const decoded: DecodedToken = jwtDecode(token)
    return decoded.scope?.includes('ROLE_ADMIN') || decoded.roles?.includes('ROLE_ADMIN')
  } catch (error) {
    return false
  }
}
