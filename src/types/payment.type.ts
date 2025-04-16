import { SuccessResponse } from './utils.type'

export type paymentResponse = SuccessResponse<{
  code: string
  message: string
  paymentUrl: string
}>
