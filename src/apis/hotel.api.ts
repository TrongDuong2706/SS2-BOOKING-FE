import { HotelCategoryResponse, HotelResponse, OneHotelDetail } from 'src/types/hotel.type'
import http from 'src/utils/http'

//Lấy tất cả Khách sạn
export const getHotels = (
  page: number,
  size: number,
  city: string | null = null,
  name: string,
  minPrice: number | null = null,
  maxPrice: number | null = null,
  categoryId: number | null = null
) => http.get<HotelResponse>('/hotels', { params: { page, size, city, name, minPrice, maxPrice, categoryId } })

export const getHotelHome = (page: number, size: number) =>
  http.get<HotelResponse>('/hotels/hotel_home', { params: { page, size } })

//Lấy một khách sạn
export const getOneHotel = (hotelId: number) => {
  return http.get<OneHotelDetail>(`/hotels/${hotelId}`)
}

//Lấy khách sạn theo categoryId
export const getHotelByCategory = (categoryId: number) => {
  return http.get<HotelCategoryResponse>(`/hotels/category/${categoryId}`)
}

//Tạo Hotel
export const createHotel = (body: FormData) =>
  http.post('/hotels', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
//update Hotel
export const updateHotel = (hotelId: number, body: FormData) =>
  http.put(`/hotels/${hotelId}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
//Xóa Hotel
export const deleteHotel = (hotelId: number) => http.delete(`/hotels/${hotelId}`)

//Đếm tổng bao nhiêu hotel
export const getTotalHotels = () => http.get('/hotels/totalHotels')
