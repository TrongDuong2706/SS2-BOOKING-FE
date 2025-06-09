import { SuccessResponse } from './utils.type'

export type BookingResponse = SuccessResponse<{
  id: number
  checkInDate: Date
  checkOutDate: Date
  totalPrice: number
  roomId: number
  userId: string
  hotelId: number
  paymentMethod: string
  specialRequest: string
  code: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  numberOfRoom: number
  paymentUrl: string
}>

export interface Booking {
  id: number
  checkInDate: Date
  checkOutDate: Date
  totalPrice: number
  roomId: number
  userId: string
  hotelId: number
  paymentMethod: string
  specialRequest: string
  code: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  numberOfRoom: number
  paymentUrl: string
}

export type BookingsResponse = SuccessResponse<{
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  hotels: Booking[]
}>
