import React from 'react'
import DefaultHeader from 'src/components/DefaultHeader'
import Footer from 'src/components/Footer'
interface Props {
  children?: React.ReactNode
}
export default function DefaultLayout({ children }: Props) {
  return (
    <div>
      <DefaultHeader />
      {children}
      <Footer />
    </div>
  )
}
