import { CreateRatingResponse, ratingHotelResponse } from 'src/types/ratingHotel.type'
import http from 'src/utils/http'

//Lấy Rating và Comment theo HotelId
export const getRatingByHotelId = (hotelId: number, page: number, size: number) => {
  return http.get<ratingHotelResponse>(`/ratings/${hotelId}`, { params: { page, size } })
}

//Tạo Rating và Comment
export const createRating = (body: {
  hotelId: string | number
  userId: string | number
  content: string
  point: number
}) => http.post<CreateRatingResponse>('/ratings', body)
