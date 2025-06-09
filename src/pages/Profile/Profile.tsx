import React, { useState, useRef } from 'react'
import HeaderInfomation from 'src/components/HeaderInfomation'
import { faStar, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeAvatar, changePassword, getMyInfo, updateUser } from 'src/apis/auth.api'
import { getUserId } from 'src/utils/auth'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaPassword } from 'src/utils/rules'
import ThemeDarkLight from 'src/components/ThemeDarkLight'

type UserFormData = {
  firstName: string
  lastName: string
  dob: string
}
type PasswordFormData = {
  password: string
  newPassword: string
  confirmPassword: string
}
const Profile = () => {
  const [activeSection, setActiveSection] = useState('accountInfo')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const queryClient = useQueryClient()

  //Quản lý form sửa thông tin user
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormData>()

  // Quản lý form sửa mật khẩu với validation schema và Call Api thay đổi mật khẩu
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword }
  } = useForm<PasswordFormData>({
    resolver: yupResolver(schemaPassword)
  })

  const changePasswordMutation = useMutation({
    mutationFn: (body: { password: string; newPassword: string }) => {
      const userId = getUserId()
      return changePassword(userId, body)
    },
    onSuccess: (response) => {
      toast('Change password successfully')
    },
    onError: (err) => {
      console.log('Password is not correct')
    }
  })

  const onSubmitPassword: SubmitHandler<PasswordFormData> = (data) => {
    changePasswordMutation.mutate(data)
  }

  //Call API thay đổi thông tin User
  const updateUserMutation = useMutation({
    mutationFn: (body: { firstName: string; lastName: string; dob: string }) => {
      const userId = getUserId()
      return updateUser(userId, body)
    },
    onSuccess: (response) => {
      // Handle successful response
      toast('User information updated successfully')
    },
    onError: (err) => {
      console.error('Error updating user information', err)
    }
  })

  const onSubmit = handleSubmit((data: UserFormData) => {
    updateUserMutation.mutate(data)
  })

  // Call API getMyInfo
  const { data, error, isLoading } = useQuery({
    queryKey: ['getInfo'],
    queryFn: getMyInfo
  })
  const user = data?.data.result

  // Sử dụng useMutation với wrapper
  const updateAvatarMutation = useMutation({
    mutationFn: (body: FormData) => {
      const userId = getUserId()
      if (!userId) {
        throw new Error('User ID not found in local storage')
      }
      return changeAvatar(userId, body)
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['getInfo'] })
      toast('thay đổi avatar thành công')
    },
    onError: (err) => {
      console.error('Error updating avatar', err)
    }
  })

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    setFile(fileFromLocal)
    if (fileFromLocal) {
      const formData = new FormData()
      formData.append('file', fileFromLocal)
      updateAvatarMutation.mutate(formData) // Call the mutation function
    }
  }
  console.log(file)

  return (
    <div className='bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen'>
      <HeaderInfomation containerClass='max-w-screen-2xl mx-auto p-4 flex justify-between items-center bg-teal-500 dark:bg-gray-700' />
      <div className='flex max-w-screen-lg mx-auto mt-10'>
        {/* Sidebar */}
        <div className='w-1/4 bg-white p-4 shadow-md dark:bg-gray-800 dark:shadow-md'>
          <div className='flex items-center mb-4'>
            <div className=''>
              <img
                className='w-14 h-14 object-cover rounded-full mx-auto'
                src={user?.avatar}
                alt='User Avatar'
                // onClick={handleImageClick}
              />
              <input type='file' ref={fileInputRef} className='hidden' onChange={onFileChange} />
              <button
                className='mt-2 px-2 text-xs  bg-teal-500 text-white rounded hover:bg-teal-600'
                onClick={handleUpload}
              >
                Chọn ảnh
              </button>
            </div>
            <div className='ml-2'>
              <div className='font-bold dark:text-white'>
                {user?.firstName} {user?.lastName}
              </div>
              <div className='text-sm text-gray-500'>Google</div>
              <div className='bg-yellow-400 text-xs px-2 py-1 rounded mt-1 flex items-center'>
                <FontAwesomeIcon icon={faStar} className='mr-1' />
                Bạn là thành viên Trip.com
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <div className='flex items-center mb-2'>
              <FontAwesomeIcon icon={faEnvelope} className='mr-2 text-gray-500 dark:text-white' />
              <span className='text-sm text-gray-600 dark:text-white'>trongduong@example.com</span>
            </div>
            <div className='flex items-center'>
              <FontAwesomeIcon icon={faPhone} className='mr-2 text-gray-500 dark:text-white' />
              <span className='text-sm text-gray-600 dark:text-white'>+84 123 456 789</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='w-3/4 p-4 dark:bg-gray-900'>
          <h1 className='text-2xl font-bold mb-4'>Cài đặt</h1>
          <div className='flex mb-4'>
            <div
              className={`mr-4 cursor-pointer ${activeSection === 'accountInfo' ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveSection('accountInfo')}
            >
              Thông tin tài khoản
            </div>
            <div
              className={`mr-4 cursor-pointer ${activeSection === 'security' ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveSection('security')}
            >
              Mật khẩu & Bảo mật
            </div>
            <div
              className={`cursor-pointer ${activeSection === 'newsletter' ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveSection('newsletter')}
            >
              Bản tin & tin Khuyến mại
            </div>
          </div>

          {activeSection === 'accountInfo' && (
            <form onSubmit={onSubmit}>
              <div>
                <div className='bg-blue-50 p-4 mb-4 dark:bg-gray-700'>
                  <div className='flex items-center'>
                    <span className='ml-2'>
                      Bạn muốn nhận thông báo đăng nhập mới và các hoạt động khác của tài khoản?
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className='text-xl font-bold mb-4'>Dữ liệu cá nhân</h2>
                  <div className='mb-4'>
                    <label className='block mb-2'>First Name</label>
                    <input
                      type='text'
                      className='w-full border p-2 dark:bg-gray-900'
                      placeholder='Your First Name'
                      {...register('firstName')}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2'>Last Name</label>
                    <input
                      type='text'
                      className='w-full border p-2 dark:bg-gray-900'
                      placeholder='Your Last Name'
                      {...register('lastName')}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block mb-2'>Date of Birth</label>
                    <input type='date' className='w-full border p-2 dark:bg-gray-900' {...register('dob')} />
                  </div>
                  <div className='flex justify-end'>
                    <button className='bg-gray-300 px-4 py-2 mr-2'>Huỷ</button>
                    <button className='bg-blue-500 text-white px-4 py-2'>Lưu</button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {activeSection === 'security' && (
            <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
              <div>
                <h2 className='text-xl font-bold mb-4'>Mật khẩu & Bảo mật</h2>
                <div className='mb-4'>
                  <label className='block mb-2'>Mật khẩu hiện tại</label>
                  <input
                    placeholder='Mật khẩu hiện tại'
                    type='password'
                    className='w-full border p-2 dark:bg-gray-900'
                    {...registerPassword('password')}
                  />
                  {errorsPassword.password && <p className='text-red-500'>{errorsPassword.password.message}</p>}
                </div>
                <div className='mb-4'>
                  <label className='block mb-2'>Mật khẩu mới</label>
                  <input
                    placeholder='Mật khẩu mới'
                    type='password'
                    className='w-full border p-2 dark:bg-gray-900'
                    {...registerPassword('newPassword')}
                  />
                  {errorsPassword.newPassword && <p className='text-red-500'>{errorsPassword.newPassword.message}</p>}
                </div>
                <div className='mb-4'>
                  <label className='block mb-2'>Xác nhận mật khẩu mới</label>
                  <input
                    placeholder='Xác nhận mật khẩu'
                    type='password'
                    className='w-full border p-2 dark:bg-gray-900'
                    {...registerPassword('confirmPassword')}
                  />
                  {errorsPassword.confirmPassword && (
                    <p className='text-red-500'>{errorsPassword.confirmPassword.message}</p>
                  )}
                </div>
                <div className='flex justify-end'>
                  <button className='bg-gray-300 px-4 py-2 mr-2 '>Huỷ</button>
                  <button className='bg-blue-500 text-white px-4 py-2 '>Lưu</button>
                </div>
              </div>
            </form>
          )}

          {activeSection === 'newsletter' && (
            <div>
              <h2 className='text-xl font-bold mb-4'>Bản tin & tin Khuyến mại</h2>
              {/* Add newsletter related content here */}
              <div className='mb-4'>
                <label className='block mb-2'>Đăng ký nhận bản tin</label>
                <input type='text' className='w-full border p-2' />
              </div>
              <div className='flex justify-end'>
                <button className='bg-gray-300 px-4 py-2 mr-2'>Huỷ</button>
                <button className='bg-blue-500 text-white px-4 py-2'>Lưu</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
