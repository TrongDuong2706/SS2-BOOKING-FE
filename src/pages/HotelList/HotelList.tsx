import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import Arrows from 'src/components/Arrows'
import Slider from 'react-slick'
import { useQuery } from '@tanstack/react-query'
import { getHotels } from 'src/apis/hotel.api'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import MyPagination from 'src/components/MyPagination'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { removeCityLS } from 'src/utils/auth'
import { useForm } from 'react-hook-form'

export default function HotelList() {
  useEffect(() => {
    Aos.init({
      duration: 1000 // Duration of animations in ms
    })
  }, []) // Thêm dependency array để chỉ chạy 1 lần

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrows className='custom-prev-arrow' style={{}} onClick={() => {}} direction='prev' />,
    nextArrow: <Arrows className='custom-next-arrow' style={{}} onClick={() => {}} direction='next' />
  }

  const [page, setPage] = useState(1)
  const pageSize = 5 // You can make this configurable if needed

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (hotelApi?.totalPages || 1)) {
      setPage(newPage)
    }
  }

  // Phần hotel Filter
  const [name, setName] = useState('')
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const initialCity = localStorage.getItem('city') || null
  const [city, setCity] = useState(initialCity)

  const handleSearch = () => {
    const filters = {
      name,
      minPrice,
      maxPrice,
      categoryId
    }
    console.log('Filters:', filters)
  }

  const handleClearFilters = () => {
    setName('')
    setMinPrice(null)
    setMaxPrice(null)
    setCategoryId(null)
  }

  const handlePriceRangeChange = (rangeId: number) => {
    switch (rangeId) {
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
  }

  const handleCategoryChange = (categoryId: number) => {
    setCategoryId(categoryId)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotels', page, city, name, minPrice, maxPrice, categoryId],
    queryFn: () => getHotels(page, pageSize, city, name, minPrice, maxPrice, categoryId)
  })
  const hotelApi = data?.data.result
  console.log(data)

  const handleRemoveCity = () => {
    removeCityLS() // Xóa city khỏi localStorage
    setCity(null) // Cập nhật state để không hiển thị city nữa
  }

  return (
    <div className='w-screen h-auto bg-white rounded-3xl absolute top-36 z-0 p-6'>
      <div className='max-w-[1340px] mx-auto flex gap-6 mt-14'>
        {/* Đoạn Lọc */}
        <div data-aos='slide-up'>
          {city && (
            <div className='bg-white rounded-md shadow-md p-4 w-auto max-w-xs mb-4'>
              Một số lọc phổ biến của khách sạn ở {city}:{' '}
              <Button onClick={handleRemoveCity}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </Button>
            </div>
          )}
          {/* Filter by Name */}
          <div className='bg-white rounded-md shadow-md p-4 w-auto max-w-xs mb-4'>
            <h2 className='text-xl font-bold mb-4'>Filter by Name</h2>
            <input
              type='text'
              placeholder='Search by name'
              className='w-full p-2 border border-gray-300 rounded-md'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Filter by Price */}
          <div className='bg-white rounded-md shadow-md p-4 w-auto max-w-xs mb-4'>
            <h2 className='text-xl font-bold mb-4'>Filter by Price</h2>
            <div className='flex flex-col space-y-2'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='priceRange'
                  value={1}
                  onChange={() => handlePriceRangeChange(1)}
                  className='mr-2'
                />
                Under 500,000 VND
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='priceRange'
                  value={2}
                  onChange={() => handlePriceRangeChange(2)}
                  className='mr-2'
                />
                500,000 - 1,000,000 VND
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='priceRange'
                  value={3}
                  onChange={() => handlePriceRangeChange(3)}
                  className='mr-2'
                />
                1,000,000 - 2,000,000 VND
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='priceRange'
                  value={4}
                  onChange={() => handlePriceRangeChange(4)}
                  className='mr-2'
                />
                2,000,000 - 3,000,000 VND
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='priceRange'
                  value={5}
                  onChange={() => handlePriceRangeChange(5)}
                  className='mr-2'
                />
                More Than 3,000,000 VND
              </label>
            </div>
          </div>

          {/* Filter by Category */}
          <div className='bg-white rounded-md shadow-md p-4 w-auto max-w-xs mb-4'>
            <h2 className='text-xl font-bold mb-4'>Filter by Category</h2>
            <div className='flex flex-col space-y-2'>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='category'
                  value={1}
                  checked={categoryId === 1}
                  onChange={() => handleCategoryChange(1)}
                  className='mr-2'
                />
                Luxury Hotel
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='category'
                  value={2}
                  checked={categoryId === 2}
                  onChange={() => handleCategoryChange(2)}
                  className='mr-2'
                />
                Modern Hotel
              </label>
              <label className='flex items-center'>
                <input
                  type='radio'
                  name='category'
                  value={3}
                  checked={categoryId === 3}
                  onChange={() => handleCategoryChange(3)}
                  className='mr-2'
                />
                Stunning Hotel
              </label>
            </div>
          </div>

          {/* Search and Clear Buttons */}
          <div className='bg-white rounded-md shadow-md p-4 w-auto max-w-xs mt-4'>
            <div className='flex justify-between'>
              <button onClick={handleSearch} className='py-2 px-4 rounded-md bg-teal-500 text-white hover:bg-teal-600'>
                Search
              </button>
              <button
                onClick={handleClearFilters}
                className='py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600'
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        {/* Đoạn Khách sạn */}
        <div className='w-full max-w-4xl mx-auto flex flex-col gap-6' data-aos='fade-left'>
          {hotelApi?.hotels.map((hotel) => (
            <div key={hotel.hotelId} className='bg-white shadow-md rounded-lg overflow-hidden flex hover:bg-gray-100'>
              <div className='w-64 h-64 relative'>
                <Slider {...sliderSettings}>
                  {hotel.images.map((img, idx) => (
                    <div key={idx} className='w-full h-full relative'>
                      <img src={img.url} alt={`Hotel ${idx}`} className='w-full h-full object-cover' />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className='p-4 flex-1'>
                <h2 className='text-xl font-bold'>{hotel.name} ⭐</h2>
                <p className='text-gray-500'>{hotel.description}</p>
                <div className='flex items-center mt-2'>
                  {/* Thêm phần đánh giá */}
                  <span className='text-yellow-500'>★★★★☆</span>
                </div>
                <p className='text-gray-500 mt-2'>
                  {hotel.address}, {hotel.city}
                </p>
                <p className='mt-2 text-gray-600'>{hotel.description}</p>
                <div className='flex items-center mt-4'>
                  <span className='text-red-500 font-bold'>{hotel.price}$/night</span>
                  <Link
                    to={`/hotel-detail/${hotel.hotelId}`}
                    className='bg-teal-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded ml-4'
                  >
                    Booking
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between mx-auto mt-4'>
            <MyPagination
              page={page}
              totalPages={hotelApi?.totalPages ?? 1}
              hasNextPage={hotelApi?.hasNextPage ?? false} // Đảm bảo giá trị là boolean
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
