import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllRoom, deleteRoom } from 'src/apis/room.api'
import MyPagination from 'src/components/MyPagination'
import { toast } from 'react-toastify'

export default function AdminRoomList() {
  const [page, setPage] = useState(1)
  const pageSize = 4
  const queryClient = useQueryClient()

  // Fetch rooms
  const { data, isLoading, isError } = useQuery({
    queryKey: ['rooms', page],
    queryFn: () => getAllRoom(page, pageSize)
  })

  const roomData = data?.data.result
  const rooms = roomData?.hotels ?? []

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (roomData?.totalPages || 1)) {
      setPage(newPage)
    }
  }

  // Delete room mutation
  const deleteRoomMutation = useMutation({
    mutationFn: (roomId: number) => deleteRoom(roomId),
    onSuccess: () => {
      toast.success('Xoá phòng thành công')
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
    },
    onError: () => {
      toast.error('Xoá phòng thất bại')
    }
  })

  const handleDelete = (roomId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xoá phòng này?')
    if (confirmDelete) {
      deleteRoomMutation.mutate(roomId)
    }
  }

  return (
    <div className='p-6'>
      <div className='mb-6 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Room List</h1>
        <Link to='/admin/room-add'>
          <button
            type='button'
            className='bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'
          >
            Add Room
          </button>
        </Link>
      </div>

      {/* Room Table */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 p-2'>ID</th>
              <th className='border border-gray-300 p-2'>Room Number</th>
              <th className='border border-gray-300 p-2'>Image</th>
              <th className='border border-gray-300 p-2'>Room Type</th>
              <th className='border border-gray-300 p-2'>Bed Count</th>
              <th className='border border-gray-300 p-2'>Room Area</th>
              <th className='border border-gray-300 p-2'>Price</th>
              <th className='border border-gray-300 p-2'>Available</th>
              <th className='border border-gray-300 p-2'>Hotel ID</th>
              <th className='border border-gray-300 p-2'>Description</th>
              <th className='border border-gray-300 p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={12} className='text-center p-4'>
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={12} className='text-center p-4 text-red-500'>
                  Error loading rooms.
                </td>
              </tr>
            ) : rooms.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center p-4'>
                  No rooms found.
                </td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room.id} className='hover:bg-gray-50'>
                  <td className='border border-gray-300 p-2'>{room.id}</td>
                  <td className='border border-gray-300 p-2'>{room.roomNumber}</td>
                  <td className='border border-gray-300 p-2'>
                    {room.images && room.images.length > 0 ? (
                      <img src={room.images[0].url} alt='Room' className='w-14 h-14 object-cover' />
                    ) : (
                      <div className='w-14 h-14 bg-gray-200 flex items-center justify-center'>No Image</div>
                    )}
                  </td>
                  <td className='border border-gray-300 p-2'>{room.roomType}</td>
                  <td className='border border-gray-300 p-2'>{room.bedCount}</td>
                  <td className='border border-gray-300 p-2'>{room.roomArea}</td>
                  <td className='border border-gray-300 p-2'>{room.price.toLocaleString()} VND</td>
                  <td className='border border-gray-300 p-2'>{room.available ? 'Yes' : 'No'}</td>
                  <td className='border border-gray-300 p-2'>{room.hotelId}</td>
                  <td className='border border-gray-300 p-2'>{room.description}</td>
                  <td className='border border-gray-300 p-2'>
                    <div className='flex space-x-2'>
                      <Link to={`/admin/room-edit/${room.id}`}>
                        <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(room.id)}
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                      >
                        Delete
                      </button>
                    </div>
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
          totalPages={roomData?.totalPages ?? 1}
          hasNextPage={roomData?.hasNextPage ?? false}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
