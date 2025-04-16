export interface ErrorResponse<Data> {
  code: number
  message: string
  result?: Data
}

export interface SuccessResponse<Data> {
  code: number
  result: Data
}
