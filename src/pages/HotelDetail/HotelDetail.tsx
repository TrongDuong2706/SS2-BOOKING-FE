import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { getHotelByCategory, getOneHotel } from 'src/apis/hotel.api'
import { createRating, getRatingByHotelId } from 'src/apis/rating.api'
import MyPagination from 'src/components/MyPagination'
import Room from 'src/components/Room'
import { getUserId } from 'src/utils/auth'

// Định nghĩa kiểu dữ liệu cho form
interface FormValues {
  content: string
  point: number
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '-25px', zIndex: 1 }} // Tuỳ chỉnh vị trí và giao diện của mũi tên
      onClick={onClick}
    >
      <svg
        className='w-8 h-8 text-teal-500'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7' />
      </svg>
    </div>
  )
}

function NextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '-25px', zIndex: 1 }} // Tuỳ chỉnh vị trí và giao diện của mũi tên
      onClick={onClick}
    >
      <svg
        className='w-8 h-8 text-teal-500'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
      </svg>
    </div>
  )
}

export default function HotelDetail() {
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index: any) {
      console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`)
    },
    prevArrow: <PrevArrow />, // Mũi tên trước
    nextArrow: <NextArrow /> // Mũi tên sau
  }
  const { hotelId } = useParams<{ hotelId: string }>() // Lấy hotelId dưới dạng chuỗi
  const id = hotelId ? parseInt(hotelId, 10) : 0

  // Khai báo useForm với kiểu dữ liệu FormValues
  const { register, handleSubmit, reset } = useForm<FormValues>()
  const queryClient = useQueryClient()

  // Truy vấn thông tin chi tiết của một khách sạn cụ thể
  const {
    data: hotelData,
    isLoading: isHotelLoading,
    isError: isHotelError
  } = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => getOneHotel(id)
  })
  const categoryId = hotelData?.data.result.categoryId
  const { data: hotelCategoryData, isLoading: isHotelCateogryLoading } = useQuery({
    queryKey: ['hotel_category', categoryId],
    queryFn: () => getHotelByCategory(categoryId as number),
    enabled: !!categoryId // Chỉ kích hoạt khi categoryId tồn tại (khác undefined và null)
  })
  const hotelCategory = hotelCategoryData?.data.result

  // Truy vấn danh sách đánh giá của khách sạn
  //Phân trang Rating
  const [page, setPage] = useState(1)
  const pageSize = 4 // You can make this configurable if needed
  const {
    data: ratingData,
    isLoading: isRatingLoading,
    isError: isRatingError
  } = useQuery({
    queryKey: ['rating', id, page, pageSize],
    queryFn: () => getRatingByHotelId(id, page, pageSize)
  })

  const createRatingMutation = useMutation({
    mutationFn: ({
      hotelId,
      userId,
      content,
      point
    }: {
      hotelId: string | number
      userId: string | number
      content: string
      point: number
    }) => createRating({ hotelId, userId, content, point }),
    onSuccess: (newRating) => {
      // Làm mới dữ liệu từ server
      queryClient.invalidateQueries({ queryKey: ['rating', id] })
      // Reset form
      reset()
      console.log('Success')
    },
    onError: (error) => {
      console.error('Failed to create rating:', error)
      // Xử lý lỗi nếu có
    }
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const userId = getUserId()

    createRatingMutation.mutate({
      hotelId: id,
      userId: userId,
      content: data.content,
      point: data.point
    })
  }

  const hotelDetail = hotelData?.data.result
  const ratingAndComment = ratingData?.data.result
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'

  //Phân trang Rating And Comment
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= (ratingAndComment?.totalPages || 1)) {
      setPage(newPage)
    }
  }
  return (
    <div className='w-screen h-auto bg-white rounded-3xl absolute top-36 z-0 p-6'>
      {/* Ảnh khách sạn */}
      <div className='p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md space-y-4 mt-10 '>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold'>
              {hotelDetail?.name} <span className='text-yellow-500'>⭐⭐</span>
            </h1>
            <div className='flex items-center space-x-2'>
              <span className='bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>
                Renovated in 2024
              </span>
              <p className='text-sm text-gray-500'>
                {hotelDetail?.address}
                <span className='text-blue-500 cursor-pointer'>Show on Map</span>
              </p>
            </div>
            <p className='text-sm text-gray-500'>
              {hotelDetail?.description}
              <span className='text-blue-500 cursor-pointer'>Show More</span>
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='text-right'>
              <p className='text-gray-500 line-through'>
                {hotelDetail?.price ? `${Number(hotelDetail.price) + 500000}₫` : ''}
              </p>{' '}
              <p className='text-2xl font-bold text-blue-500'>US${hotelDetail?.price}</p>
              <p className='text-sm text-green-500'>We Price Match</p>
            </div>
          </div>
        </div>
        <div className='flex space-x-2 overflow-hidden'>
          {hotelDetail?.images && hotelDetail.images.length > 0 && (
            <img className='w-1/2 h-[270px] object-cover rounded-lg' alt='' src={hotelDetail.images[0].url} />
          )}

          <div className='grid grid-cols-3 gap-2 w-1/2'>
            {hotelDetail?.images
              .slice(1)
              .map((image, index) => (
                <img
                  key={index}
                  className='w-full h-32 object-cover rounded-lg'
                  src={image.url}
                  alt={`image ${index + 1}`}
                />
              ))}
          </div>
        </div>
      </div>
      {/* Ảnh Các phòng */}
      <Room />
      {/* Guess Review */}
      <div className='bg-white rounded-lg max-w-7xl mx-auto mt-8 shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-4'>Guest Reviews</h2>
        <div className='space-y-4'>
          {/* Existing guest reviews */}
          {ratingAndComment?.ratingHotel
            ?.slice()
            .reverse()
            .map((rating, index) => (
              <div key={index} className='border border-gray-200 p-4 rounded-lg'>
                <div className='flex items-center space-x-4 mb-2'>
                  <img
                    src={rating.userAvatar || defaultAvatar}
                    alt='Reviewer'
                    className='w-12 h-12 object-cover rounded-full'
                  />
                  <div>
                    <p className='font-semibold'>{rating.userName}</p>
                    <p className='text-sm text-gray-500'>August 2024</p>
                  </div>
                </div>
                <p className='text-gray-700'>"{rating.content}"</p>
              </div>
            ))}

          {/* Add more reviews here */}
        </div>
        <div className='flex justify-center mx-auto mt-4'>
          <MyPagination
            page={page}
            totalPages={ratingAndComment?.totalPages ?? 1}
            hasNextPage={ratingAndComment?.hasNextPage ?? false} // Đảm bảo giá trị là boolean
            handlePageChange={handlePageChange}
          />
        </div>
        {/* Review form */}
        <div className='bg-white rounded-lg shadow-md p-6 mt-8'>
          <h2 className='text-2xl font-bold mb-4'>Write Your Review</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label htmlFor='review' className='block text-gray-700 font-semibold mb-1'>
                Your Review
              </label>
              <textarea
                id='review'
                placeholder='Write your review here...'
                className='w-full p-2 border border-gray-300 rounded-lg'
                {...register('content', { required: true })}
              ></textarea>
            </div>
            <div>
              <label htmlFor='rating' className='block text-gray-700 font-semibold mb-1'>
                Rating
              </label>
              <select
                id='rating'
                className='w-full p-2 border border-gray-300 rounded-lg'
                {...register('point', { required: true })}
              >
                <option value='5'>5 Stars</option>
                <option value='4'>4 Stars</option>
                <option value='3'>3 Stars</option>
                <option value='2'>2 Stars</option>
                <option value='1'>1 Star</option>
              </select>
            </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>
              Submit Review
            </button>
          </form>
        </div>
      </div>
      {/* Phần khách sạn liên quan */}
      <h2 className='max-w-7xl text-center mx-auto text-3xl font-bold mt-5'>Related hotel</h2>
      <div className='flex justify-center max-w-7xl mx-auto mt-2  '>
        <Slider {...settings} className='w-full'>
          {hotelCategory?.map((hotelcategory, index) => (
            <div key={index} className='bg-white rounded-lg max-w-xs  mt-4 shadow-md p-4'>
              <img
                src={hotelcategory.images[0].url}
                alt='Hotel Image'
                className='w-full h-48 object-cover rounded-lg mb-4'
              />
              <h3 className='text-lg font-semibold mb-2'>{hotelcategory.name}</h3>
              <p className='text-gray-600 mb-2'>Địa chỉ: {hotelcategory.address}</p>

              <div className='flex items-center text-gray-600 mb-4'>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 5h16M4 10h16m-7 5h7' />
                </svg>
                <span className='mr-2'>Wifi miễn phí</span>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
                <span>Bữa sáng bao gồm</span>
              </div>
              <p className='text-md font-semibold mb-4'>Từ {Number(hotelcategory.price).toLocaleString('vi-VN')}₫</p>
              <Link to={`/hotel-detail/${hotelcategory.hotelId}`}>
                <button className='bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300'>
                  Đặt phòng ngay
                </button>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
