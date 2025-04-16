import { BookingResponse } from 'src/types/booking.type'
import http from 'src/utils/http'

export const booking = (body: {
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
  amount: number
  bankCode: string
}) => http.post<BookingResponse>('/bookings', body)

export const getTotalBookings = () => http.get('/bookings/totalBookings')

export const chartRevenue = () => http.get('/bookings/monthly')
