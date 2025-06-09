import { AdminRoomResponse, OneRoomResponse, RoomResponse } from 'src/types/room.type'
import http from 'src/utils/http'

export const getRoomByHotelId = (hotelId: number) => {
  return http.get<RoomResponse>(`/rooms/${hotelId}`)
}

export const getOneRoom = (roomId: number) => {
  return http.get<OneRoomResponse>(`/rooms/payment/${roomId}`)
}

export const getAllRoom = (page: number, size: number) =>
  http.get<AdminRoomResponse>('/rooms', { params: { page, size } })

export const createRoom = (body: FormData) =>
  http.post('/rooms', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

//update Hotel
export const updateRoom = (roomId: number, body: FormData) =>
  http.put(`/rooms/${roomId}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const deleteRoom = (roomId: number) => http.delete(`/rooms/${roomId}`)
