import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react/headless'
import Popper from '../Popper'
import SettingPage from '../SettingPage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createPassword, getMyInfo } from 'src/apis/auth.api'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getAccessTokenFromLS, setUserId } from 'src/utils/auth'
import ThemeDarkLight from '../ThemeDarkLight'

interface HeaderInfomartionProps {
  containerClass?: string
}

export default function HeaderInfomation({ containerClass }: HeaderInfomartionProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(true)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ password: string }>()

  // Call API CreatePassword
  const createPasswordMutation = useMutation({
    mutationFn: (password: string) => createPassword({ password }),
    onSuccess: () => {
      toast('Tạo mật khẩu thành công')
      setModalOpen(false) // Close the modal on success
    },
    onError: (error) => {
      console.error('Error creating password:', error)
    }
  })

  const onSubmit = (data: { password: string }) => {
    createPasswordMutation.mutate(data.password)
  }

  const token = getAccessTokenFromLS()

  // Call API getMyInfo
  const { data, error, isLoading } = useQuery({
    queryKey: ['getInfo'],
    queryFn: getMyInfo,
    enabled: !!token // Only enable the query if token exists
  })

  const user = data?.data.result
  const { isAuthenticated } = useContext(AppContext)
  //Đưa user Id lên local Storage
  setUserId(user?.id ?? 'defaultId')

  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
  const userAvatar = user?.avatar !== null && user?.avatar !== '' ? user?.avatar : defaultAvatar
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error occurred while fetching data</div>
  }

  return (
    <div className={containerClass}>
      <div className='flex items-center space-x-4'>
        <Link to='/'>
          <h1 className='text-3xl font-bold text-white'>Travelling.vn</h1>
        </Link>
        <nav className='space-x-4'>
          <Link to='/hotel-list' className='hover:underline text-white'>
            Hotels
          </Link>
          <a href='#' className='hover:underline text-white'>
            Flights
          </a>
          <a href='#' className='hover:underline text-white'>
            Personal Tour
          </a>
          <a href='#' className='hover:underline text-white'>
            Preference
          </a>

          <span className='bg-red-500 text-white px-2 py-1 rounded'>News</span>
        </nav>
      </div>
      <div className='flex items-center space-x-4'>
        <a href='#' className='hover:underline text-white'>
          List Your Property
        </a>
        <a href='#' className='hover:underline text-white'>
          Customer Support
        </a>
        <ThemeDarkLight />

        {isAuthenticated ? (
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
              <img src={userAvatar} alt='User Avatar' className='rounded-full w-8 h-8 bg-white' />

              {
                <span className='text-white'>
                  Hi, {user?.firstName} {user?.lastName}
                </span>
              }
            </div>
          </Tippy>
        ) : (
          <Link to='/login' className='bg-white hover:bg-blue-800 text-black px-4 py-2 rounded'>
            Sign in / Register
          </Link>
        )}
      </div>

      {/* Modal yêu cầu nhập password */}
      {user?.noPassword && isModalOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50'>
            <div className='bg-white p-8 rounded-lg shadow-xl max-w-md w-full'>
              <h2 className='text-2xl font-semibold mb-6 text-center text-gray-800'>Welcome to Travelling.vn</h2>
              <div className='mb-6'>
                <label htmlFor='password' className='block text-gray-700 text-sm font-medium mb-2'>
                  Enter password:
                </label>
                <input
                  id='password'
                  {...register('password', { required: true })}
                  type='password'
                  className='text-black w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <button className='w-full bg-teal-500 text-white py-2 rounded-md shadow-md hover:bg-teal-600 transition duration-300'>
                Create Password
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
