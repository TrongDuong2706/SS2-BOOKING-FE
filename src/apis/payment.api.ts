import { paymentResponse } from 'src/types/payment.type'
import http from 'src/utils/http'

export const payment = (vnpResponseCode: string | null) =>
  http.get<paymentResponse>(`/payment/vn-pay-callback?vnp_ResponseCode=${vnpResponseCode}`)
