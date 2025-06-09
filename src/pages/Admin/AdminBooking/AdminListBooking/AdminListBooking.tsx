import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAllBooking } from 'src/apis/booking.api'
import MyPagination from 'src/components/MyPagination'

export default function AdminListBooking() {
  const [page, setPage] = useState(1)
  const pageSize = 4

  const { data, isLoading, isError } = useQuery({
    queryKey: ['bookings', page],
    queryFn: () => getAllBooking(page, pageSize)
  })

  const bookingData = data?.data.result
  const bookings = bookingData?.hotels ?? []

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (bookingData?.totalPages || 1)) {
      setPage(newPage)
    }
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Booking List</h1>

      <div className='overflow-x-auto'>
        <table className='w-full border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 p-2'>ID</th>
              <th className='border border-gray-300 p-2'>Check-in</th>
              <th className='border border-gray-300 p-2'>Check-out</th>
              <th className='border border-gray-300 p-2'>Total Price</th>
              <th className='border border-gray-300 p-2'>Room ID</th>
              <th className='border border-gray-300 p-2'>User ID</th>
              <th className='border border-gray-300 p-2'>Hotel ID</th>
              <th className='border border-gray-300 p-2'>Payment Method</th>
              <th className='border border-gray-300 p-2'>Special Request</th>
              <th className='border border-gray-300 p-2'>Code</th>
              <th className='border border-gray-300 p-2'>Email</th>
              <th className='border border-gray-300 p-2'>First Name</th>
              <th className='border border-gray-300 p-2'>Last Name</th>
              <th className='border border-gray-300 p-2'>Phone</th>
              <th className='border border-gray-300 p-2'># Rooms</th>
              <th className='border border-gray-300 p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={17} className='text-center p-4'>
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={17} className='text-center p-4 text-red-500'>
                  Error loading bookings.
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={17} className='text-center p-4'>
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className='hover:bg-gray-50'>
                  <td className='border border-gray-300 p-2'>{booking.id}</td>
                  <td className='border border-gray-300 p-2'>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                  <td className='border border-gray-300 p-2'>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                  <td className='border border-gray-300 p-2'>{booking.totalPrice.toLocaleString()} VND</td>
                  <td className='border border-gray-300 p-2'>{booking.roomId}</td>
                  <td className='border border-gray-300 p-2'>{booking.userId}</td>
                  <td className='border border-gray-300 p-2'>{booking.hotelId}</td>
                  <td className='border border-gray-300 p-2'>{booking.paymentMethod}</td>
                  <td className='border border-gray-300 p-2'>{booking.specialRequest}</td>
                  <td className='border border-gray-300 p-2'>{booking.code}</td>
                  <td className='border border-gray-300 p-2'>{booking.email}</td>
                  <td className='border border-gray-300 p-2'>{booking.firstName}</td>
                  <td className='border border-gray-300 p-2'>{booking.lastName}</td>
                  <td className='border border-gray-300 p-2'>{booking.phoneNumber}</td>
                  <td className='border border-gray-300 p-2'>{booking.numberOfRoom}</td>
                  <td className='border border-gray-300 p-2'>
                    <Link
                      to={`/admin/booking-detail/${booking.id}`}
                      className='inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition-colors duration-200'
                    >
                      View Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='flex justify-between mx-auto mt-4'>
        <MyPagination
          page={page}
          totalPages={bookingData?.totalPages ?? 1}
          hasNextPage={bookingData?.hasNextPage ?? false}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
