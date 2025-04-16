import { SuccessResponse } from './utils.type'

export interface ratingHotel {
  hotelId: number
  userId: string
  content: string
  userName: string
  userAvatar: string // Đảm bảo kiểu là string
  createAt: Date
}

export type ratingHotelResponse = SuccessResponse<{
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  ratingHotel: ratingHotel[]
}>

export type CreateRatingResponse = SuccessResponse<{
  hotelId: number
  userId: string
  content: string
  userName: string
  userAvatar: string // Đảm bảo kiểu là string
  createAt: Date
}>
