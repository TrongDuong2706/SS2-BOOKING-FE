import React from 'react'
import AdminHeader from 'src/components/AdminComponents/AdminHeader'
import AdminSidebar from 'src/components/AdminComponents/AdminSidebar/AdminSidebar'
interface Props {
  children?: React.ReactNode
}
export default function DefaultLayoutAdmin({ children }: Props) {
  return (
    <div className='flex h-screen'>
      <AdminHeader />
      <AdminSidebar />
      <main className='flex-1 pt-16 p-6 ml-64'>{children}</main>
    </div>
  )
}
