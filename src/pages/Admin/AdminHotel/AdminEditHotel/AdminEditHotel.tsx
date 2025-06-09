import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOneHotel, updateHotel } from 'src/apis/hotel.api'

export default function AdminEditHotel() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  // Lấy hotelId từ URL
  const { hotelId } = useParams<{ hotelId: string }>()
  const id = hotelId ? parseInt(hotelId, 10) : 0

  // Call API để lấy dữ liệu khách sạn
  const {
    data: hotelData,
    isLoading: isHotelLoading,
    isError: isHotelError
  } = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getOneHotel(id)
  })

  const hotel = hotelData?.data.result
  // Cập nhật form khi dữ liệu hotel được tải về
  useEffect(() => {
    if (hotel) {
      setValue('name', hotel.name)
      setValue('address', hotel.address)
      setValue('city', hotel.city)
      setValue('country', hotel.country)
      setValue('phone', hotel.phone)
      setValue('email', hotel.email)
      setValue('description', hotel.description)
      setValue('categoryId', hotel.categoryId)
      setValue('price', hotel.price)
      setValue('freeWifi', hotel.freeWifi)
      setValue('breakfastIncluded', hotel.breakfastIncluded)
    }
  }, [hotel, setValue]) // Cập nhật khi hotel thay đổi

  // Call API update hotel
  const updateHotelMutation = useMutation({
    mutationFn: ({ hotelId, formData }: { hotelId: number; formData: FormData }) => updateHotel(hotelId, formData),
    onSuccess: (data) => {
      toast('Update Hotel thành công')
    },
    onError: (error) => {
      console.error('Error updating hotel:', error)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData()

    const hotelData = {
      name: data.name,
      address: data.address,
      city: data.city,
      country: data.country,
      phone: data.phone,
      email: data.email,
      description: data.description,
      categoryId: data.categoryId,
      price: data.price,
      freeWifi: data.freeWifi ? 'true' : 'false',
      breakfastIncluded: data.breakfastIncluded ? 'true' : 'false'
    }
    formData.append('hotel', new Blob([JSON.stringify(hotelData)], { type: 'application/json' }))

    // Append các hình ảnh
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i])
      }
    }

    // Gọi API để update
    updateHotelMutation.mutate({ hotelId: id, formData })
  })

  return (
    <div className='p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-5'>
      <h1 className='text-2xl font-bold mb-6'>Edit Hotel</h1>
      <form onSubmit={onSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='name'>
            Name
          </label>
          <input
            id='name'
            type='text'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('name', { required: 'Name is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='address'>
            Address
          </label>
          <input
            id='address'
            type='text'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('address', { required: 'Address is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='city'>
            City
          </label>
          <input
            id='city'
            type='text'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('city', { required: 'City is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='country'>
            Country
          </label>
          <input
            id='country'
            type='text'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('country', { required: 'Country is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='phone'>
            Phone
          </label>
          <input
            id='phone'
            type='text'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('phone', { required: 'Phone is required' })}
          />
        </div>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('email', { required: 'Email is required' })}
          />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='description'>
            Description
          </label>
          <textarea
            id='description'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('description')}
          />
        </div>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='categoryId'>
            Category
          </label>
          <select
            id='categoryId'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('categoryId', { required: 'Category is required' })}
          >
            <option value=''>Select Category</option>
            <option value='1'>Luxury Hotel</option>
            <option value='2'>Modern Hotel</option>
            <option value='3'>Stunning Hotel</option>
          </select>
        </div>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='price'>
            Price
          </label>
          <input
            id='price'
            type='number'
            step='0.01'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('price', { required: 'Price is required' })}
          />
        </div>
        <div className='col-span-1 md:col-span-2 flex items-center space-x-4'>
          <div className='flex items-center'>
            <input
              id='freeWifi'
              type='checkbox'
              className='h-4 w-4 text-blue-600 border-gray-300 rounded'
              {...register('freeWifi')}
            />
            <label htmlFor='freeWifi' className='ml-2 text-sm text-gray-900'>
              Free Wifi
            </label>
          </div>
          <div className='flex items-center'>
            <input
              id='breakfastIncluded'
              type='checkbox'
              className='h-4 w-4 text-blue-600 border-gray-300 rounded'
              {...register('breakfastIncluded')}
            />
            <label htmlFor='breakfastIncluded' className='ml-2 text-sm text-gray-900'>
              Breakfast Included
            </label>
          </div>
        </div>
        <div className='col-span-1 md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='images'>
            Images
          </label>
          <input
            id='images'
            type='file'
            accept='image/*'
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            {...register('images')}
            multiple
          />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <button
            type='submit'
            className='mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
