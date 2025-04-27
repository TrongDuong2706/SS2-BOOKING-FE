import React from 'react'

export default function HotelCard() {
  return (
    <div className='w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-white'>
      <img
        className='w-full h-48 object-cover'
        src='https://ak-d.tripcdn.com/images/hotel/440000/439463/1d79cd06790d41d1b38a2b94033666bf_R_300_225_R5.jpg'
        alt='Luxury Hotel'
      />
      <div className='px-6 py-4'>
        <h2 className='font-bold text-xl mb-2'>Luxury Hotel</h2>
        <p className='text-gray-700 text-base mb-2'>New York City</p>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
              3/5
            </span>
            <span className='text-gray-500 text-sm'>reviews</span>
          </div>
          <p className='text-gray-500 text-sm'>3Km</p>
        </div>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-gray-500 text-sm'>Free WiFi</p>
          <p className='text-gray-500 text-sm'>Breakfast Included</p>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-gray-700 font-bold'>From $34,500</span>
          <button className='bg-teal-500 text-white px-3 py-1 rounded-full text-sm'>Book Now</button>
        </div>
      </div>
    </div>
  )
}
