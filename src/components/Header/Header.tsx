import React from 'react'
import Search from '../Search/Search'
import HeaderInfomation from '../HeaderInfomation'
import headerImage from '../../images/picture.png' // Đường dẫn tương đối từ Header.tsx đến ảnh

export default function Header() {
  return (
    <div className='relative'>
      <img className='w-full object-cover' src={headerImage} alt='Header' />
      <div className='absolute top-0 left-0 right-0 text-white py-4 z-10'>
        <HeaderInfomation containerClass='max-w-screen-xl mx-auto px-4 flex justify-between items-center' />
        <Search containerClass='container mx-auto text-center mt-12' showTitle={true} />
      </div>
    </div>
  )
}
