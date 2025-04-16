export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenFromLS = () => {
  localStorage.removeItem('access_token')
}

export const getAccessTokenFromLS = (): string => {
  return localStorage.getItem('access_token') || ''
}

export const KEY_TOKEN = 'accessToken'

export const setToken = (token: any) => {
  localStorage.setItem(KEY_TOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(KEY_TOKEN)
}

export const removeToken = () => {
  return localStorage.removeItem(KEY_TOKEN)
}

//Lấy userId
export const setUserId = (user_id: string) => {
  localStorage.setItem('user_id', user_id)
}

export const getUserId = (): string => {
  return localStorage.getItem('user_id') || ''
}
export const removeUserId = () => {
  return localStorage.removeItem('user_id')
}
// Lưu checkInDate vào localStorage
export const setCheckInDate = (checkInDate: string) => {
  localStorage.setItem('checkInDate', checkInDate)
}

// Lấy checkInDate từ localStorage
export const getCheckInDate = (): string => {
  return localStorage.getItem('checkInDate') || ''
}

// Xóa checkInDate từ localStorage
export const removeCheckInDate = () => {
  localStorage.removeItem('checkInDate')
}

// Lưu checkOutDate vào localStorage
export const setCheckOutDate = (checkOutDate: string) => {
  localStorage.setItem('checkOutDate', checkOutDate)
}

// Lấy checkOutDate từ localStorage
export const getCheckOutDate = (): string => {
  return localStorage.getItem('checkOutDate') || ''
}

// Xóa checkOutDate từ localStorage
export const removeCheckOutDate = () => {
  localStorage.removeItem('checkOutDate')
}

// Lưu numberOfDays vào localStorage
export const setNumberOfDays = (numberOfDays: number) => {
  localStorage.setItem('numberOfDays', numberOfDays.toString())
}

// Lấy numberOfDays từ localStorage
export const getNumberOfDays = (): number => {
  return parseInt(localStorage.getItem('numberOfDays') || '0', 10)
}

// Xóa numberOfDays từ localStorage
export const removeNumberOfDays = () => {
  localStorage.removeItem('numberOfDays')
}

// Lưu destination vào localStorage
export const setCityToLS = (city: string) => {
  localStorage.setItem('city', city)
}

// Lấy destination từ localStorage
export const getCityFromLS = (): string => {
  return localStorage.getItem('city') || ''
}

// Xóa destination từ localStorage
export const removeCityLS = () => {
  localStorage.removeItem('city')
}
