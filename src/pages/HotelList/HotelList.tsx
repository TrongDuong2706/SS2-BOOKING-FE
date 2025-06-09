import React, { useEffect, useState } from 'react'
import Aos from 'aos'
import Arrows from 'src/components/Arrows'
import Slider from 'react-slick'
import { useQuery } from '@tanstack/react-query'
import { getHotels } from 'src/apis/hotel.api'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import MyPagination from 'src/components/MyPagination'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mui/material'
import { removeCityLS } from 'src/utils/auth'

export default function HotelList() {
  useEffect(() => {
    Aos.init({ duration: 1000 })
  }, [])

  const location = useLocation()
  const [page, setPage] = useState(1)
  const pageSize = 5

  const [name, setName] = useState('')
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const initialCity = localStorage.getItem('city') || null
  const [city, setCity] = useState(initialCity)

  const [inputName, setInputName] = useState('')
  const [inputMinPrice, setInputMinPrice] = useState<number | null>(null)
  const [inputMaxPrice, setInputMaxPrice] = useState<number | null>(null)
  const [inputCategoryId, setInputCategoryId] = useState<number | null>(null)

  useEffect(() => {
    if (location.state?.city) {
      const newCity = location.state.city
      localStorage.setItem('city', newCity)
      setCity(newCity)
      setPage(1)
    }
  }, [location.state])

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (hotelApi?.totalPages || 1)) {
      setPage(newPage)
    }
  }

  const handleSearch = () => {
    setName(inputName)
    setMinPrice(inputMinPrice)
    setMaxPrice(inputMaxPrice)
    setCategoryId(inputCategoryId)
    setPage(1)
  }

  const handleClearFilters = () => {
    setInputName('')
    setInputMinPrice(null)
    setInputMaxPrice(null)
    setInputCategoryId(null)

    setName('')
    setMinPrice(null)
    setMaxPrice(null)
    setCategoryId(null)
    setPage(1)
  }

  const handlePriceRangeChange = (rangeId: number) => {
    switch (rangeId) {
      case 1:
        setInputMinPrice(null)
        setInputMaxPrice(500000)
        break
      case 2:
        setInputMinPrice(500000)
        setInputMaxPrice(1000000)
        break
      case 3:
        setInputMinPrice(1000000)
        setInputMaxPrice(2000000)
        break
      case 4:
        setInputMinPrice(2000000)
        setInputMaxPrice(3000000)
        break
      case 5:
        setInputMinPrice(3000000)
        setInputMaxPrice(null)
        break
      default:
        setInputMinPrice(null)
        setInputMaxPrice(null)
        break
    }
  }

  const handleCategoryChange = (id: number) => {
    setInputCategoryId(id)
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotels', page, city, name, minPrice, maxPrice, categoryId],
    queryFn: () => getHotels(page, pageSize, city, name, minPrice, maxPrice, categoryId)
  })

  const hotelApi = data?.data.result

  const handleRemoveCity = () => {
    removeCityLS()
    setCity(null)
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrows className='custom-prev-arrow' style={{}} onClick={() => {}} direction='prev' />,
    nextArrow: <Arrows className='custom-next-arrow' style={{}} onClick={() => {}} direction='next' />
  }

  return (
    <div className='w-screen h-auto bg-white rounded-3xl absolute top-36 z-0 p-6'>
      <div className='max-w-[1340px] mx-auto flex gap-6 mt-14'>
        <div data-aos='slide-up'>
          {city && (
            <div className='flex items-center justify-between bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 max-w-md w-full shadow-sm mb-4'>
              <div className='flex flex-col'>
                <span className='font-semibold text-sm'>Bộ lọc đang áp dụng</span>
                <span className='text-base'>
                  Khách sạn tại <strong>{city}</strong>
                </span>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={handleRemoveCity}
                className='text-blue-500 hover:text-red-500'
              >
                <FontAwesomeIcon icon={faCircleXmark} className='w-5 h-5' />
              </Button>
            </div>
          )}

          <div className='bg-white rounded-md shadow-md p-4 w-auto max-w-xs mb-4'>
            <h2 className='text-xl font-bold mb-4'>Filter by Name</h2>
            <input
              type='text'
              placeholder='Search by name'
              className='w-full p-2 border border-gray-300 rounded-md'
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>

          <div className='bg-white rounded-md shadow-md p-4 w-auto max-w-xs mb-4'>
            <h2 className='text-xl font-bold mb-4'>Filter by Price</h2>
            <div className='flex flex-col space-y-2'>
              {[1, 2, 3, 4, 5].map((id) => (
                <label key={id} className='flex items-center'>
                  <input
                    type='radio'
                    name='priceRange'
                    value={id}
                    onChange={() => handlePriceRangeChange(id)}
                    className='mr-2'
                  />
                  {
                    [
                      'Under 500,000 VND',
                      '500,000 - 1,000,000 VND',
                      '1,000,000 - 2,000,000 VND',
                      '2,000,000 - 3,000,000 VND',
                      'More Than 3,000,000 VND'
                    ][id - 1]
                  }
                </label>
              ))}
            </div>
          </div>

          <div className='bg-white rounded-md shadow-md p-4 w-auto max-w-xs mb-4'>
            <h2 className='text-xl font-bold mb-4'>Filter by Category</h2>
            <div className='flex flex-col space-y-2'>
              {[1, 2, 3].map((id) => (
                <label key={id} className='flex items-center'>
                  <input
                    type='radio'
                    name='category'
                    value={id}
                    checked={inputCategoryId === id}
                    onChange={() => handleCategoryChange(id)}
                    className='mr-2'
                  />
                  {['Luxury Hotel', 'Modern Hotel', 'Stunning Hotel'][id - 1]}
                </label>
              ))}
            </div>
          </div>

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

        <div className='w-full max-w-4xl mx-auto flex flex-col gap-6' data-aos='fade-left'>
          {isLoading ? (
            <div className='text-center text-gray-500 text-lg'>Đang tải dữ liệu khách sạn...</div>
          ) : isError ? (
            <div className='text-center text-red-500 text-lg'>Có lỗi xảy ra khi tải dữ liệu.</div>
          ) : hotelApi?.hotels.length === 0 ? (
            <div className='text-center text-gray-600 text-lg font-semibold mt-10'>
              Không tìm thấy khách sạn nào phù hợp với tiêu chí lọc của bạn.
            </div>
          ) : (
            hotelApi?.hotels.map((hotel) => (
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
                  <p className='text-gray-500 mt-2'>
                    {hotel.address}, {hotel.city}
                  </p>
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
            ))
          )}

          {/* Phân trang */}
          {!isLoading && !isError && hotelApi?.hotels?.length > 0 && (
            <div className='flex justify-between mx-auto mt-4'>
              <MyPagination
                page={page}
                totalPages={hotelApi?.totalPages ?? 1}
                hasNextPage={hotelApi?.hasNextPage ?? false}
                handlePageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
