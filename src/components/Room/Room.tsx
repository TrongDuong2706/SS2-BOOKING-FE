import React from 'react'
import Slider from 'react-slick'
import Arrows from '../Arrows'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getRoomByHotelId } from 'src/apis/room.api'

export default function Room() {
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrows className='custom-prev-arrow' style={{}} onClick={() => {}} direction='prev' />,
    nextArrow: <Arrows className='custom-next-arrow' style={{}} onClick={() => {}} direction='next' />
  }

  const { hotelId } = useParams<{ hotelId: string }>()
  const id = hotelId ? parseInt(hotelId, 10) : 0

  const { data, isLoading, isError } = useQuery({
    queryKey: ['room', id],
    queryFn: () => getRoomByHotelId(id)
  })
  console.log(data)
  const rooms = data?.data.result
  return (
    <div>
      {rooms?.map((room, dx) => (
        <div
          key={dx}
          className='bg-white rounded-lg max-w-7xl mx-auto mt-8 shadow-md p-6'
          style={{
            backgroundImage:
              'url("https://png.pngtree.com/background/20210711/original/pngtree-blue-gradient-geometric-business-card-background-picture-image_1094861.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 55%'
          }}
        >
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='md:col-span-1'>
              <h2 className='text-2xl font-bold mb-4 text-white'>{room.roomType}</h2>
              <Slider {...sliderSettings}>
                {room?.images && room.images.length > 0 ? (
                  room.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      className='w-full h-48 object-cover rounded-lg mb-4'
                      alt={`Image ${index + 1}`}
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </Slider>
              <div>
                <p className='text-gray-600 mb-2'>Area: {room.roomArea}</p>
                <p className='text-gray-600 mb-2'>Check-in time: 14:00 - Check-out time: 12:00</p>
              </div>
            </div>
            <div className='md:col-span-2 flex flex-col justify-center mb-5'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col'>
                  <p className='font-bold mb-4 text-center'>Room Information</p>
                  <div className='mb-6'>
                    <p className='text-gray-600 font-semibold'>Number of beds: {room.bedCount}</p>
                    <p className='text-gray-600 font-semibold'>Maximum occupancy: 2 adults + 1 child</p>
                    <p className='text-gray-500 text-sm'>{room.description}</p>
                  </div>
                  <div className='mb-6'>
                    <p className='text-gray-600 font-semibold'>Amenities:</p>
                    <ul className='text-gray-500 list-disc ml-5'>
                      <li>Air conditioning</li>
                      <li>Free Wi-Fi</li>
                      <li>Cable TV</li>
                      <li>Private bathroom</li>
                      <li>Minibar</li>
                      <li>Balcony</li>
                    </ul>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <p className='font-bold mb-4 text-center'>Policies</p>
                  <div className='mb-6'>
                    <p className='text-gray-600 font-semibold'>Cancellation policy:</p>
                    <p className='text-gray-500 text-sm'>
                      Free cancellation within 24 hours. After 24 hours, a cancellation fee of 50% of the total order
                      value applies.
                    </p>
                  </div>
                  <div className='mb-6'>
                    <p className='text-gray-600 font-semibold'>Refund policy:</p>
                    <p className='text-gray-500 text-sm'>
                      100% refund if canceled 1 week before. No refund after 1 week.
                    </p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div>
                      <span className='text-red-500 line-through mr-2'>
                        {(Number(room.price) + 500000).toLocaleString('vi-VN')}₫
                      </span>

                      <span className='font-bold'>{Number(room.price).toLocaleString('vi-VN')}₫</span>
                    </div>
                    <Link
                      to={`/payment/${room.id}`}
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                      Select Room
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
