import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { payment } from 'src/apis/payment.api'

export default function VnpayCallBack() {
  const navigate = useNavigate()

  // Lấy giá trị của vnp_ResponseCode từ URL
  const urlParams = new URLSearchParams(window.location.search)
  const vnpResponseCode = urlParams.get('vnp_ResponseCode')

  const { data, error, isLoading } = useQuery({
    queryKey: ['payment', vnpResponseCode], // Thêm vnpResponseCode vào queryKey để phụ thuộc
    queryFn: () => payment(vnpResponseCode) // Truyền vnpResponseCode vào hàm payment
  })

  useEffect(() => {
    if (data?.data.result.code === '00') {
      navigate(`/thank-you`)
    } else {
      // Xử lý khi thanh toán thất bại
    }
  }, [data, navigate])

  return <div></div>
}
