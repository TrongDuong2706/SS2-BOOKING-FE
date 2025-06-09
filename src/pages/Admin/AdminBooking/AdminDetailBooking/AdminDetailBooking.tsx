import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneBooking, getRoomByBookingId } from 'src/apis/booking.api'

export default function AdminDetailBooking() {
  const { bookingId } = useParams()

  const {
    data: bookingData,
    isLoading: isBookingLoading,
    isError: isBookingError
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getOneBooking(Number(bookingId)),
    enabled: !!bookingId
  })

  const {
    data: roomData,
    isLoading: isRoomLoading,
    isError: isRoomError
  } = useQuery({
    queryKey: ['room-by-booking', bookingId],
    queryFn: () => getRoomByBookingId(Number(bookingId)),
    enabled: !!bookingId
  })

  const booking = bookingData?.data.result
  const room = roomData?.data.result

  if (isBookingLoading || isRoomLoading) return <div className='p-6 text-center text-lg'>Loading...</div>
  if (isBookingError || !booking)
    return <div className='p-6 text-center text-red-500'>Error loading booking detail.</div>
  if (isRoomError || !room) return <div className='p-6 text-center text-red-500'>Error loading room detail.</div>

  return (
    <div className='p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-8'>
      <h1 className='text-3xl font-bold text-gray-800'>Booking Detail</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700'>
        <div>
          <strong>ID:</strong> {booking.id}
        </div>
        <div>
          <strong>Check-in Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}
        </div>
        <div>
          <strong>Check-out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}
        </div>
        <div>
          <strong>Total Price:</strong> {booking.totalPrice.toLocaleString()} VND
        </div>
        <div>
          <strong>Room ID:</strong> {booking.roomId}
        </div>
        <div>
          <strong>Hotel ID:</strong> {booking.hotelId}
        </div>
        <div>
          <strong>User ID:</strong> {booking.userId}
        </div>
        <div>
          <strong>Number of Rooms:</strong> {booking.numberOfRoom}
        </div>
        <div>
          <strong>Payment Method:</strong> {booking.paymentMethod}
        </div>
        {/* <div><strong>Status:</strong> {booking.status ?? 'Pending'}</div> */}
        <div>
          <strong>Code:</strong> {booking.code}
        </div>
        <div>
          <strong>Special Request:</strong> {booking.specialRequest || 'None'}
        </div>
        <div>
          <strong>First Name:</strong> {booking.firstName}
        </div>
        <div>
          <strong>Last Name:</strong> {booking.lastName}
        </div>
        <div>
          <strong>Email:</strong> {booking.email}
        </div>
        <div>
          <strong>Phone:</strong> {booking.phoneNumber}
        </div>
        <div>
          <strong>Payment URL:</strong>{' '}
          <a href={booking.paymentUrl} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
            View
          </a>
        </div>
      </div>

      <div className='pt-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Room Information</h2>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='w-full md:w-1/3'>
            {room.images && room.images.length > 0 ? (
              <img src={room.images[0].url} alt='Room' className='rounded-lg shadow-md w-full h-48 object-cover' />
            ) : (
              <div className='w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg'>No Image</div>
            )}
          </div>
          <div className='w-full md:w-2/3 space-y-2 text-gray-700'>
            <div>
              <strong>Room Number:</strong> {room.roomNumber}
            </div>
            <div>
              <strong>Room Type:</strong> {room.roomType}
            </div>
            <div>
              <strong>Bed Count:</strong> {room.bedCount}
            </div>
            <div>
              <strong>Room Area:</strong> {room.roomArea} m²
            </div>
            <div>
              <strong>Price:</strong> {room.price.toLocaleString()} VND
            </div>
            <div>
              <strong>Description:</strong> {room.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
