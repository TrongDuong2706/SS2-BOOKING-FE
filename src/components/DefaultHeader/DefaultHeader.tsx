import React from 'react'
import Search from '../Search/Search'
import HeaderInfomation from '../HeaderInfomation'

export default function DefaultHeader() {
  return (
    <div>
      <div className='bg-teal-500 relative'>
        <HeaderInfomation containerClass='max-w-screen-2xl mx-auto p-4 flex justify-between items-center' />
        <Search containerClass='container mx-auto text-center mt-2 z-10 relative' showTitle={false} />
      </div>
    </div>
  )
}
