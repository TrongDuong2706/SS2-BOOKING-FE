import React from 'react'
import { Link } from 'react-router-dom'
import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  Event as EventIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon
} from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { getTotalHotels } from 'src/apis/hotel.api'
import { chartRevenue, getTotalBookings } from 'src/apis/booking.api'
import { getTotalUser } from 'src/apis/auth.api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AdminDashBoard() {
  //Call API lấy
  const {
    data: dataGetTotalHotels,
    isError: totalHotelsIsError,
    isLoading: totalHotelsIsLoading
  } = useQuery({
    queryKey: ['totalHotels'],
    queryFn: getTotalHotels
  })
  const {
    data: dataGetTotalBookings,
    isError: totalBookingsIsError,
    isLoading: totalBookingsIsLoading
  } = useQuery({
    queryKey: ['totalBookings'],
    queryFn: getTotalBookings
  })
  const {
    data: dataGetTotalUser,
    isError: totalUserIsError,
    isLoading: totalUserIsLoading
  } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: getTotalUser
  })

  const {
    data: revenueData,
    isError: revenueIsError,
    isLoading: revenueIsLoading
  } = useQuery({
    queryKey: ['monthlyRevenue'],
    queryFn: chartRevenue
  })

  //Hàm để chuyển object thành mảng và sắp xếp giá trị tháng chính xác từ tháng 1 -> 12
  const formattedData = Object.keys(revenueData?.data?.result || {})
    .map((key) => ({
      month: key, // '2024-11', '2024-10', etc.
      value: revenueData?.data.result[key]
    }))
    .sort((a, b) => {
      const [yearA, monthA] = a.month.split('-').map(Number)
      const [yearB, monthB] = b.month.split('-').map(Number)
      return new Date(yearA, monthA - 1).getTime() - new Date(yearB, monthB - 1).getTime()
    })

  return (
    <div className='space-y-8 mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Các mục dashboard khác */}
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h5 className='text-lg font-semibold mb-2'>Total Hotels</h5>
          <h4 className='text-3xl font-bold mb-4'>{dataGetTotalHotels?.data.result}</h4>
          <button className='text-sm text-blue-600 hover:text-blue-800'>View Details</button>
        </div>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h5 className='text-lg font-semibold mb-2'>Total Bookings</h5>
          <h4 className='text-3xl font-bold mb-4'>{dataGetTotalBookings?.data.result}</h4>
          <button className='text-sm text-blue-600 hover:text-blue-800'>View Details</button>
        </div>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h5 className='text-lg font-semibold mb-2'>Total Users</h5>
          <h4 className='text-3xl font-bold mb-4'>{dataGetTotalUser?.data.result}</h4>
          <button className='text-sm text-blue-600 hover:text-blue-800'>View Details</button>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className='bg-white rounded-lg shadow-lg p-6 mt-8'>
        <h5 className='text-lg font-semibold mb-2'>Monthly Revenue</h5>
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey='month' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            <Area type='monotone' dataKey='value' stroke='#2563eb' fill='#3b82f6' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
