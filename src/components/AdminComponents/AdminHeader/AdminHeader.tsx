import React from 'react'
import { Mail as MailIcon, Notifications as NotificationsIcon, Message as MessageIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import SettingPage from 'src/components/SettingPage'
import Popper from 'src/components/Popper'
import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from 'src/apis/auth.api'
import Tippy from '@tippyjs/react/headless'

export default function AdminHeader() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getInfo'],
    queryFn: getMyInfo
  })
  const user = data?.data.result
  return (
    <header className='fixed top-0 left-0 w-full bg-[#2196f3] z-10 shadow-md'>
      <div className='flex justify-between items-center p-4'>
        <Link to='/admin'>
          <h6 className='text-lg font-bold text-white'>Travelling.vn</h6>
        </Link>
        <div className='flex items-center space-x-4'>
          <button className='relative p-2 text-white hover:bg-[#1976d2] rounded-full'>
            <MailIcon />
            <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs'>4</span>
          </button>
          <button className='relative p-2 text-white hover:bg-[#1976d2] rounded-full'>
            <NotificationsIcon />
            <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs'>3</span>
          </button>
          <button className='relative p-2 text-white hover:bg-[#1976d2] rounded-full'>
            <MessageIcon />
          </button>
          <Tippy
            interactive
            placement='bottom-end'
            render={(attrs) => (
              <div tabIndex={-1} {...attrs} className='z-40'>
                <Popper>
                  <SettingPage />
                </Popper>
              </div>
            )}
          >
            <div className='flex items-center space-x-2'>
              <img src={user?.avatar} alt='User Avatar' className='rounded-full w-8 h-8 bg-white' />
              <span className='text-white'>
                Hi, {user?.firstName} {user?.lastName}
              </span>
            </div>
          </Tippy>
        </div>
      </div>
    </header>
  )
}
