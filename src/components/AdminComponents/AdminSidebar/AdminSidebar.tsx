import React from 'react'
import { Link } from 'react-router-dom'
import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  Event as EventIcon,
  Group as GroupIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'

export default function AdminSidebar() {
  return (
    <aside className='fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 shadow-md'>
      <div className='p-4'>
        <ul className='space-y-4'>
          {[
            { text: 'Home', icon: <HomeIcon />, link: '/' },
            { text: 'Hotels', icon: <HotelIcon />, link: '/admin/hotel-list' },
            { text: 'Bookings', icon: <EventIcon />, link: '/admin/bookings' },
            { text: 'Users', icon: <GroupIcon />, link: '/admin/users' },
            { text: 'Settings', icon: <SettingsIcon />, link: '/admin/settings' }
          ].map((item) => (
            <li key={item.text} className='flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer'>
              <Link to={item.link} className='flex items-center space-x-3 w-full'>
                {item.icon}
                <span className='font-medium'>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
