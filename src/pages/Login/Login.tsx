import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { OAuthConfig } from 'src/configurations/configuration'
import { AppContext } from 'src/contexts/app.context'
import { LoginSchema, schemaLogin } from 'src/utils/rules'

type FormData = LoginSchema
export default function Login() {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  //Login with google
  const handleContinueWithGoogle = () => {
    const callbackUrl = OAuthConfig.redirectUri
    const authUrl = OAuthConfig.authUri
    const googleClientId = OAuthConfig.clientId

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline&prompt=consent`

    console.log(targetUrl)

    window.location.href = targetUrl
  }

  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin)
  })

  //CALL API LOGIN
  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = data
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        toast('Đăng nhập thành công')
        navigate('/')
        setIsAuthenticated(true)
        console.log(data)
      }
    })
  })

  return (
    <div className='flex items-center justify-center min-h-screen w-screen bg-teal-500'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-semibold text-center text-teal-600 mb-4'>Login</h2>
        <div className='flex justify-center space-x-4 mb-4'>
          <button className='p-2 rounded-full bg-gray-200 transition-transform transform hover:scale-110'>
            <i className='fab fa-facebook-f'></i>
          </button>
          <button className='p-2 rounded-full bg-gray-200 transition-transform transform hover:scale-110'>
            <i className='fab fa-twitter'></i>
          </button>
          <button className='p-2 rounded-full bg-gray-200 transition-transform transform hover:scale-110'>
            <i className='fab fa-google'></i>
          </button>
        </div>
        <form noValidate onSubmit={onSubmit}>
          <Input
            name='username'
            register={register}
            type='text'
            errorMessage={errors.username?.message}
            placeholder='Username'
          />
          <Input
            name='password'
            register={register}
            type='password'
            errorMessage={errors.password?.message}
            placeholder='Password'
          />

          <button
            type='submit'
            className='w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-transform transform hover:scale-105'
          >
            Login
          </button>
          <div className='mb-6 flex justify-center mt-4'>
            <button
              onClick={handleContinueWithGoogle}
              type='button'
              className='w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 transition-transform transform hover:scale-105'
            >
              Continue with Google
            </button>
          </div>
          <div className='flex justify-center items-center mt-4'>
            <Link
              className='text-teal-500 hover:text-teal-700 font-semibold transition-all duration-200'
              to='/register'
            >
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
