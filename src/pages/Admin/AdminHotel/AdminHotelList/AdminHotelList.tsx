import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getMyInfo } from 'src/apis/auth.api'
import { deleteHotel, getHotels } from 'src/apis/hotel.api'
import MyPagination from 'src/components/MyPagination'

export default function AdminHotelList() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [city, setCity] = useState(null)
  const pageSize = 10 // You can make this configurable if needed

  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotels', page, city, name, minPrice, maxPrice, categoryId],
    queryFn: () => getHotels(page, pageSize, city, name, minPrice, maxPrice, categoryId)
  })
  const hotels = data?.data.result.hotels
  const hotelApi = data?.data.result
  console.log(hotels)

  //Hàm để chuyển trang
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (hotelApi?.totalPages || 1)) {
      setPage(newPage)
    }
  }
  // Hàm để reset filter
  const handleClearFilters = () => {
    setCity(null)
    setName('')
    setMinPrice(null)
    setMaxPrice(null)
    setCategoryId(null)
  }
  const onSubmit = handleSubmit((dataFilter) => {
    setCity(dataFilter.city || null)
    setName(dataFilter.name || null)
    const priceRange = parseInt(dataFilter.priceRange, 10)
    switch (priceRange) {
      case 1:
        setMinPrice(null)
        setMaxPrice(500000)
        break
      case 2:
        setMinPrice(500000)
        setMaxPrice(1000000)
        break
      case 3:
        setMinPrice(1000000)
        setMaxPrice(2000000)
        break
      case 4:
        setMinPrice(2000000)
        setMaxPrice(3000000)
        break
      case 5:
        setMinPrice(3000000)
        setMaxPrice(null)
        break
      default:
        setMinPrice(null)
        setMaxPrice(null)
        break
    }
    const categoryId = parseInt(dataFilter.categoryId, 10)
    // Thiết lập giá trị categoryId
    setCategoryId(categoryId || null)
    console.log('Lọc: ', JSON.stringify(dataFilter, null, 2))
  })

  //Xóa Hotel

  // Define the mutation for deleting a hotel
  const deleteMutation = useMutation({
    mutationFn: (hotelId: number) => deleteHotel(hotelId),
    onSuccess: () => {
      toast('Delete thành công')
      // Optionally refetch data or handle other success actions
    }
  })

  // Define the delete handler
  const handleDelete = (hotelId: number) => () => {
    deleteMutation.mutate(hotelId)
  }

  return (
    <div className='p-6'>
      <div className='mb-6 flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-gray-800'>Hotel List</h1>
        <Link to='/admin/hotel-add'>
          <button
            type='button'
            className='bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75'
          >
            Add Hotel
          </button>
        </Link>
      </div>

      {/* Filter Form */}
      <div className='mb-4'>
        <form onSubmit={onSubmit} className='flex flex-wrap items-center gap-4'>
          <div className='flex items-center'>
            <input
              placeholder='Search by city'
              type='text'
              {...register('city')}
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex items-center'>
            <input
              placeholder='Search by name'
              type='text'
              {...register('name')}
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex items-center'>
            <select {...register('priceRange')} className='p-2 border border-gray-300 rounded'>
              <option value=''>Select Price Range</option>
              <option value='1'>Dưới 500,000 VND</option>
              <option value='2'>500,000 - 1,000,000 VND</option>
              <option value='3'>1,000,000 - 2,000,000 VND</option>
              <option value='4'>2,000,000 - 3,000,000 VND</option>
              <option value='5'>Trên 3,000,000 VND</option>
            </select>
          </div>
          <div className='flex items-center'>
            <select {...register('categoryId')} className='p-2 border border-gray-300 rounded'>
              <option value=''>Hotel Category</option>
              <option value='1'>Luxury Hotel</option>
              <option value='2'>Modern Hotel</option>
              <option value='3'>Stunning Hotel</option>
            </select>
          </div>
          <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Search</button>
          <button
            type='button'
            onClick={handleClearFilters}
            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
          >
            Clear Filters
          </button>
        </form>
      </div>

      {/* Hotel Table */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border border-gray-300 p-2'>ID</th>
              <th className='border border-gray-300 p-2'>Avatar</th>
              <th className='border border-gray-300 p-2'>Name</th>
              <th className='border border-gray-300 p-2'>Address</th>
              <th className='border border-gray-300 p-2'>City</th>
              <th className='border border-gray-300 p-2'>Country</th>
              <th className='border border-gray-300 p-2'>Price</th>
              <th className='border border-gray-300 p-2'>Breakfast Included</th>
              <th className='border border-gray-300 p-2'>Free Wi-Fi</th>
              <th className='border border-gray-300 p-2'>Phone</th>
              <th className='border border-gray-300 p-2'>Category</th>
              <th className='border border-gray-300 p-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels?.map((hotel) => (
              <tr key={hotel.hotelId} className='hover:bg-gray-50'>
                <td className='border border-gray-300 p-2'>{hotel.hotelId}</td>
                <td className='border border-gray-300 p-2'>
                  {/* Để acp có hotel ko có images */}
                  {hotel.images && hotel.images.length > 0 && hotel.images[0]?.url ? (
                    <img src={hotel.images[0].url} className='w-14 h-14 object-cover' alt='Hotel Image' />
                  ) : (
                    <div className='w-14 h-14 flex items-center justify-center bg-gray-200'>No Image</div>
                  )}{' '}
                </td>
                <td className='border border-gray-300 p-2'>{hotel.name}</td>
                <td className='border border-gray-300 p-2'>{hotel.address}</td>
                <td className='border border-gray-300 p-2'>{hotel.city}</td>
                <td className='border border-gray-300 p-2'>{hotel.country}</td>
                <td className='border border-gray-300 p-2'>{hotel.price}</td>
                <td className='border border-gray-300 p-2'>{hotel.breakfastIncluded ? 'Yes' : 'No'}</td>
                <td className='border border-gray-300 p-2'>{hotel.freeWifi ? 'Yes' : 'No'}</td>
                <td className='border border-gray-300 p-2'>{hotel.phone}</td>
                <td className='border border-gray-300 p-2'>{hotel.categoryId}</td>
                <td className='border border-gray-300 p-2'>
                  <div className='flex space-x-2'>
                    <Link to={`/admin/hotel-edit/${hotel.hotelId}`}>
                      <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>Edit</button>
                    </Link>
                    <button
                      onClick={handleDelete(hotel.hotelId)}
                      className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between mx-auto mt-4'>
        <MyPagination
          page={page}
          totalPages={hotelApi?.totalPages ?? 1}
          hasNextPage={hotelApi?.hasNextPage ?? false} // Đảm bảo giá trị là boolean
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
