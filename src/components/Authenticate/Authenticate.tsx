import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginWithGoogle } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { LoginResponse } from 'src/types/auth.type'
import { clearAccessTokenFromLS } from 'src/utils/auth'

export default function Authenticate() {
  const [authCode, setAuthCode] = useState<string | null>(null)
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/
    const isMatch = window.location.href.match(authCodeRegex)

    if (isMatch) {
      const code = isMatch[1]
      setAuthCode(code)
    }
  }, [])

  const { data, isLoading, isError, isSuccess } = useQuery<LoginResponse>({
    queryKey: ['loginWithGoogle', authCode],
    queryFn: () => loginWithGoogle(authCode as string),
    enabled: !!authCode
  })

  useEffect(() => {
    if (isSuccess && data) {
      // Không cần gọi setAccessToken ở đây
      queryClient.invalidateQueries({ queryKey: ['getInfo'] })
      navigate('/') // Navigate to the desired route after successful login
      setIsAuthenticated(true)
    }
  }, [isSuccess, data, queryClient, navigate])

  useEffect(() => {
    if (isError) {
      console.error('Error occurred during login')
      clearAccessTokenFromLS()
    }
  }, [isError])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div></div>
}
