import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

export const schema = yup.object({
  username: yup
    .string()
    .required('Username là bắt buộc')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp'),
  lastName: yup
    .string()
    .required('Nhập lại last name là bắt buộc')
    .min(1, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự'),
  firstName: yup
    .string()
    .required('Nhập lại first name là bắt buộc')
    .min(1, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự')
})

export const schemaLogin = yup.object({
  username: yup
    .string()
    .required('Username là bắt buộc')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(3, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 đến 160 ký tự')
})

export const schemaPassword = yup.object({
  password: yup.string().required('password là bắt buộc'),
  newPassword: yup.string().required('Nhập mật khẩu mới là bắt buộc'),
  confirmPassword: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .oneOf([yup.ref('newPassword')], 'Nhập lại password không khớp')
})
export type PasswordFormData = yup.InferType<typeof schemaPassword>
export type LoginSchema = yup.InferType<typeof schemaLogin>
export type Schema = yup.InferType<typeof schema>
