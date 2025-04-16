import { OneRoomResponse, RoomResponse } from 'src/types/room.type'
import http from 'src/utils/http'

export const getRoomByHotelId = (hotelId: number) => {
  return http.get<RoomResponse>(`/rooms/${hotelId}`)
}

export const getOneRoom = (roomId: number) => {
  return http.get<OneRoomResponse>(`/rooms/payment/${roomId}`)
}
