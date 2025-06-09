import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createHotel } from 'src/apis/hotel.api'

export default function HotelAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const createHotelMutation = useMutation({
    mutationFn: (formData: FormData) => createHotel(formData),
    onSuccess: (data) => {
      toast('Tạo Hotel thành công')
      console.log('Hotel created successfully:', data)
    },
    onError: (error) => {
      console.error('Error creating hotel:', error)
    }
  })
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData()

    // Append the hotel JSON data as a string
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

    // Append each image file to the FormData object
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i])
      }
    }
    // Trigger the mutation
    createHotelMutation.mutate(formData)
  })

  return (
    <div className='p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md mt-5'>
      <h1 className='text-2xl font-bold mb-6'>Add New Hotel</h1>
      <form className='grid grid-cols-1 md:grid-cols-2 gap-6' onSubmit={onSubmit}>
        {/* Column 1 */}
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
            <label htmlFor='freeWifi' className='ml-2 text-sm font-medium text-gray-700'>
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
            <label htmlFor='breakfastIncluded' className='ml-2 text-sm font-medium text-gray-700'>
              Breakfast Included
            </label>
          </div>
        </div>
        <div className='col-span-1'>
          <label className='block text-sm font-medium text-gray-700' htmlFor='image'>
            Image
          </label>
          <input id='image' type='file' accept='image/*' multiple className='mt-1' {...register('images')} />
        </div>
        <div className='col-span-1 md:col-span-2 flex justify-end'>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Add Hotel
          </button>
        </div>
      </form>
    </div>
  )
}
