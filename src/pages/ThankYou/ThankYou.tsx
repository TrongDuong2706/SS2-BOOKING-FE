import React from 'react'
import { Link } from 'react-router-dom'
import HeaderInfomation from 'src/components/HeaderInfomation'

export default function ThankYou() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-teal-500 p-4'>
      <div
        className='absolute inset-0 bg-cover bg-center opacity-20'
        style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?travel')" }}
      ></div>
      <div className='relative max-w-lg w-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl p-10 text-center transform transition duration-500 hover:scale-105'>
        <div className='relative'>
          <div className='absolute -top-14 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl'>
            <svg
              className='w-14 h-14 text-white animate-pulse'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
              ></path>
            </svg>
          </div>
        </div>
        <h1 className='text-4xl font-bold text-teal-700 mt-16 mb-6'>Cảm ơn bạn đã đặt hàng!</h1>
        <p className='text-xl text-gray-800 mb-4'>
          Chào mừng bạn đến với <strong>Trip.com</strong>.
        </p>
        <p className='text-lg text-gray-700 mb-6'>
          Đơn hàng của bạn đã được xác nhận. Vui lòng kiểm tra email để biết thêm thông tin chi tiết về đơn hàng.
        </p>
        <div className='border-t border-teal-300 my-6'></div>
        <div className='text-left text-gray-800 space-y-2'>
          <p>
            <strong>Mã đơn hàng:</strong> #123456789
          </p>
          <p>
            <strong>Ngày đặt hàng:</strong> 19/08/2024
          </p>
          <p>
            <strong>Email của bạn:</strong> example@example.com
          </p>
        </div>
        <Link to='/'>
          <button className='mt-8 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl hover:opacity-90 focus:outline-none transition-opacity duration-300'>
            Về trang chủ
          </button>
        </Link>
      </div>
    </div>
  )
}
