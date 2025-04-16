import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'

type FormData = Schema
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        toast('Đăng ký thành công')
        console.log(data)
      }
    })
  })

  return (
    <div className='flex items-center justify-center min-h-screen w-screen bg-teal-500'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md min-h-[500px]'>
        {' '}
        {/* Thêm min-height ở đây */}
        <h2 className='text-2xl font-semibold text-center text-teal-600 mb-4'>Register</h2>
        <form noValidate onSubmit={onSubmit}>
          <Input
            name='username'
            register={register}
            type='text'
            errorMessage={errors.username?.message}
            placeholder='Username'
          />
          <Input
            name='firstName'
            register={register}
            type='text'
            errorMessage={errors.firstName?.message}
            placeholder='First Name'
          />
          <Input
            name='lastName'
            register={register}
            type='text'
            errorMessage={errors.lastName?.message}
            placeholder='Last Name'
          />
          <Input
            name='password'
            register={register}
            type='password'
            errorMessage={errors.password?.message}
            placeholder='Password'
          />
          <Input
            name='confirm_password'
            register={register}
            type='password'
            errorMessage={errors.confirm_password?.message}
            placeholder='Confirm Password'
          />

          <button
            type='submit'
            className='w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-transform transform hover:scale-105'
          >
            Register
          </button>
          <div className='flex justify-center items-center mt-4'>
            <Link className='text-teal-500 hover:text-teal-700 font-semibold transition-all duration-200' to='/login'>
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
