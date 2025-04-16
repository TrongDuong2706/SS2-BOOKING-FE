import { Image } from './image.type'
import { SuccessResponse } from './utils.type'

export type HotelResponse = SuccessResponse<{
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  hotels: Hotel[]
}>

export type HotelCategoryResponse = SuccessResponse<Hotel[]>

export interface Hotel {
  hotelId: number
  name: String
  address: String
  city: String
  country: String
  phone: String
  email: String
  description: String
  freeWifi: Boolean
  breakfastIncluded: Boolean
  images: Image[]
  averageRating: number
  categoryId: number
  price: number
}

export type OneHotelDetail = SuccessResponse<{
  hotelId: number
  name: string
  address: string
  city: string
  country: string
  phone: string
  email: string
  description: string
  freeWifi: boolean
  breakfastIncluded: boolean
  images: Image[]
  categoryId: number
  price: number
}>
