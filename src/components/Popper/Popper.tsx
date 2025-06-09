import React from 'react'

interface Props {
  children?: React.ReactNode
}
export default function Popper({ children }: Props) {
  return <div className='w-full bg-white shadow-[#0000001f 0px 2px 12px] rounded-lg'>{children}</div>
}
