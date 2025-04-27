import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css' // import AOS styles
import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from 'src/apis/auth.api'
import FAQs from 'src/components/FAQs'
import HotelCard from 'src/components/HotelCard'
import Slider from 'react-slick'
import { getHotelHome } from 'src/apis/hotel.api'

const userAvatar = {
  avatar:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/800px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg'
}

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in ms
      easing: 'ease-in-out' // Easing function
    })
  }, [])
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index: any) {
      console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`)
    }
  }
  const pageSize = 20
  const page = 1
  const { data, isLoading, isError } = useQuery({
    queryKey: ['hotels', page],
    queryFn: () => getHotelHome(page, pageSize)
  })
  const hotels = data?.data.result.hotels
  // Data news
  const cardsData = [
    {
      title: 'Have Fun This Summer in Chengdu',
      description: 'Deals that open up a world of travel',
      image: 'https://dimg04.tripcdn.com/images/0a14012000ej50ymxE92F.jpg',
      buttonText: 'Book Now'
    },
    {
      title: 'Have Fun This Summer in Chengdu',
      description: 'Deals that open up a world of travel',
      image: 'https://ak-d.tripcdn.com/images/1gz1h12000d5icpilD452.jpg',
      buttonText: 'Book Now'
    },
    {
      title: 'Have Fun This Summer in Chengdu',
      description: 'Deals that open up a world of travel',
      image: 'https://ak-d.tripcdn.com/images/0a10y12000atsised0E0B.jpg',
      buttonText: 'Book Now'
    }
    // ... other cards
  ]

  return (
    <div className='max-w-screen-xl mx-auto mt-5'>
      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-center' data-aos='fade-up'>
          What's New
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {cardsData.map((card, index) => (
            <div key={index} className='max-w-sm rounded overflow-hidden shadow-lg' data-aos='fade-up'>
              <img className='w-full' src={card.image} alt='Sunset in the mountains' />
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>{card.title}</div>
                <p className='text-gray-700 text-base'>{card.description}</p>
              </div>
              <div className='px-6 py-4'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-teal-200 p-10 rounded-lg shadow-md mt-7' data-aos='fade-up'>
        <div className='flex items-start'>
          <img
            src='https://ak-d.tripcdn.com/images/1re0b12000dks6fbe0CFA.png'
            alt='Banner'
            className='w-64 h-48 object-cover'
          />
          <div className='ml-6 flex-1'>
            <h2 className='text-2xl font-bold text-gray-800'>
              Welcome aboard! Enjoy a <span className='text-blue-500 font-extrabold'>10%</span> discount on hotels!
            </h2>
            <ul className='list-disc list-inside mt-4'>
              <li>Snag a promo code and save up to 5%</li>
              <li>Download the app to earn Trip Coins worth around 5% of your booking total, with a max. of US$20</li>
            </ul>
            <div className='flex justify-end mt-4'>
              <button className='bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Claim Discount
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List of hotels */}
      <section className='container mx-auto px-4 py-8'>
        <h2 className='text-3xl font-bold mb-6 text-center' data-aos='fade-up'>
          Top Luxury 5-star Hotels
        </h2>
        <div className='flex flex-wrap -mx-4'>
          {hotels?.map((hotel, index) => (
            <div key={index} className='w-full md:w-1/2 lg:w-1/4 px-4 mb-6' data-aos='fade-up'>
              <div className='flex flex-col h-full w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-white'>
                <img className='w-full h-48 object-cover flex-shrink-0' src={hotel.images[0].url} alt='Luxury Hotel' />
                <div className='px-6 py-4 flex-grow flex flex-col'>
                  <h2 className='font-bold text-xl mb-2'>{hotel.name}</h2>
                  <p className='text-gray-700 text-base mb-2'>{hotel.address}</p>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center'>
                      <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
                        3/5
                      </span>
                      <span className='text-gray-500 text-sm'>reviews</span>
                    </div>
                    <p className='text-gray-500 text-sm'>3Km</p>
                  </div>
                  <div className='flex items-center justify-between mb-4'>
                    <p className='text-gray-500 text-sm'>{hotel.freeWifi ? 'Free wifi' : 'No wifi'}</p>
                    <p className='text-gray-500 text-sm'>
                      {hotel.breakfastIncluded ? 'Breakfast included' : 'No breakfast'}
                    </p>
                  </div>
                  <div className='flex items-center justify-between mt-auto'>
                    <span className='text-gray-700 font-bold'>From ${hotel.price}</span>
                    <button className='bg-teal-500 text-white px-3 py-1 rounded-full text-sm'>Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <FAQs />
    </div>
  )
}
