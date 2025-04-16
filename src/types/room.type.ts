import { Image } from './image.type'
import { SuccessResponse } from './utils.type'

export type Room = {
  id: number
  bedCount: number
  description: string
  roomArea: number
  roomNumber: string // Đảm bảo kiểu là string
  roomType: string
  status: string
  hotelId: number
  images: Image[]
  available: boolean
  price: number
}

// Đảm bảo rằng result là một mảng của Room

export type RoomResponse = SuccessResponse<Room[]>

export type OneRoomResponse = SuccessResponse<{
  id: number
  bedCount: number
  description: string
  roomArea: number
  roomNumber: string // Đảm bảo kiểu là string
  roomType: string
  status: string
  hotelId: number
  images: Image[]
  available: boolean
  price: number
}>
