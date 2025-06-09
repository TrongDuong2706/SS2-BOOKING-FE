import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOneRoom, updateRoom } from 'src/apis/room.api'

export default function AdminEditRoom() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const { roomId } = useParams<{ roomId: string }>()
  const id = roomId ? parseInt(roomId, 10) : 0

  // Fetch room info
  const {
    data: roomData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['room', id],
    queryFn: () => getOneRoom(id)
  })

  const room = roomData?.data.result

  useEffect(() => {
    if (room) {
      setValue('roomNumber', room.roomNumber)
      setValue('roomType', room.roomType)
      setValue('bedCount', room.bedCount)
      setValue('roomArea', room.roomArea)
      setValue('price', room.price)
      setValue('status', room.status)
      setValue('isAvailable', room.available)
      setValue('hotelId', room.hotelId)
      setValue('description', room.description)
    }
  }, [room, setValue])

  const updateRoomMutation = useMutation({
    mutationFn: ({ roomId, formData }: { roomId: number; formData: FormData }) => updateRoom(roomId, formData),
    onSuccess: () => {
      toast.success('Cập nhật Room thành công')
    },
    onError: (error) => {
      toast.error('Cập nhật thất bại')
      console.error('Error updating room:', error)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData()

    const roomData = {
      bedCount: Number(data.bedCount),
      description: data.description,
      isAvailable: data.isAvailable ? true : false,
      price: parseFloat(data.price),
      roomArea: parseFloat(data.roomArea),
      roomNumber: data.roomNumber,
      roomType: data.roomType,
      status: data.status,
      hotelId: Number(data.hotelId)
    }

    formData.append('room', new Blob([JSON.stringify(roomData)], { type: 'application/json' }))

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('room_images', data.images[i])
      }
    }

    updateRoomMutation.mutate({ roomId: id, formData })
  })

  return (
    <div className='p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-5'>
      <h1 className='text-2xl font-bold mb-6'>Edit Room</h1>
      <form onSubmit={onSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='col-span-1'>
          <label htmlFor='roomNumber' className='block text-sm font-medium text-gray-700'>
            Room Number
          </label>
          <input
            id='roomNumber'
            type='text'
            className='mt-1 block w-full border rounded p-2'
            {...register('roomNumber', { required: 'Room Number is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label htmlFor='roomType' className='block text-sm font-medium text-gray-700'>
            Room Type
          </label>
          <input
            id='roomType'
            type='text'
            className='mt-1 block w-full border rounded p-2'
            {...register('roomType', { required: 'Room Type is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label htmlFor='bedCount' className='block text-sm font-medium text-gray-700'>
            Bed Count
          </label>
          <input
            id='bedCount'
            type='number'
            className='mt-1 block w-full border rounded p-2'
            {...register('bedCount', { required: 'Bed Count is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label htmlFor='roomArea' className='block text-sm font-medium text-gray-700'>
            Room Area (m²)
          </label>
          <input
            id='roomArea'
            type='number'
            step='0.1'
            className='mt-1 block w-full border rounded p-2'
            {...register('roomArea', { required: 'Room Area is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
            Price (VND)
          </label>
          <input
            id='price'
            type='number'
            step='1000'
            className='mt-1 block w-full border rounded p-2'
            {...register('price', { required: 'Price is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label htmlFor='status' className='block text-sm font-medium text-gray-700'>
            Status
          </label>
          <select
            id='status'
            className='mt-1 block w-full border rounded p-2'
            {...register('status', { required: 'Status is required' })}
          >
            <option value=''>Select Status</option>
            <option value='Available'>Available</option>
            <option value='Unavailable'>Unavailable</option>
            <option value='Maintenance'>Maintenance</option>
          </select>
        </div>
        <div className='col-span-1 flex items-center space-x-2 mt-4'>
          <input id='isAvailable' type='checkbox' className='h-4 w-4 border rounded' {...register('isAvailable')} />
          <label htmlFor='isAvailable' className='text-sm font-medium text-gray-700'>
            Is Available
          </label>
        </div>
        <div className='col-span-1'>
          <label htmlFor='hotelId' className='block text-sm font-medium text-gray-700'>
            Hotel ID
          </label>
          <input
            id='hotelId'
            type='number'
            className='mt-1 block w-full border rounded p-2'
            {...register('hotelId', { required: 'Hotel ID is required' })}
          />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            id='description'
            rows={4}
            className='mt-1 block w-full border rounded p-2'
            {...register('description')}
          />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <label htmlFor='images' className='block text-sm font-medium text-gray-700'>
            Room Images
          </label>
          <input
            id='images'
            type='file'
            accept='image/*'
            multiple
            className='mt-1 block w-full border rounded p-2'
            {...register('images')}
          />
        </div>
        <div className='col-span-1 md:col-span-2 flex justify-end'>
          <button type='submit' className='mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
