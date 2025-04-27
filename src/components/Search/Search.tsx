import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import '../../CustomDatepicker.css'
import { format, addDays, differenceInDays } from 'date-fns'
import { setCheckInDate, setCheckOutDate, setCityToLS, setNumberOfDays } from 'src/utils/auth'
import { useNavigate } from 'react-router-dom'

interface SearchProps {
  containerClass?: string
  showTitle?: boolean
}

export default function Search({ containerClass, showTitle = true }: SearchProps) {
  const [city, setCity] = useState('')
  const [guests, setGuests] = useState(1)
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  })
  const [showCalendar, setShowCalendar] = useState(false)
  const [dates, setDates] = useState<{ checkInDate: Date; checkOutDate: Date }>({
    checkInDate: new Date(),
    checkOutDate: addDays(new Date(), 7)
  })

  const navigate = useNavigate() // useNavigate hook

  const handleSelect = (ranges: any) => {
    const { selection } = ranges
    setSelectionRange(selection)
    setDates({
      checkInDate: selection.startDate,
      checkOutDate: selection.endDate
    })
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const numberOfDays =
    dates.checkInDate && dates.checkOutDate ? differenceInDays(dates.checkOutDate, dates.checkInDate) : 0

  const handleSearch = () => {
    const checkInDateFormatted = format(dates.checkInDate, 'yyyy-MM-dd')
    const checkOutDateFormatted = format(dates.checkOutDate, 'yyyy-MM-dd')

    // Lưu dữ liệu vào localStorage
    setCheckInDate(checkInDateFormatted)
    setCheckOutDate(checkOutDateFormatted)
    setNumberOfDays(numberOfDays)
    setCityToLS(city)

    const searchData = {
      city,
      guests,
      checkInDate: checkInDateFormatted,
      checkOutDate: checkOutDateFormatted,
      numberOfDays
    }
    console.log('Search Data:', searchData)
    // Điều hướng đến trang danh sách khách sạn với dữ liệu tìm kiếm
    navigate('/hotel-list', { state: searchData })
  }

  return (
    <div className={containerClass}>
      {showTitle && <h2 className='text-5xl font-extrabold mb-8 text-white'>Hotels</h2>}
      <div className='bg-white text-gray-900 p-4 rounded-lg shadow-xl inline-block relative'>
        <div className='flex flex-col md:flex-row md:space-x-4 items-start'>
          {/* Destination */}
          <div className='flex flex-col border border-gray-300 p-3 rounded-lg w-full md:w-[400px]'>
            <div className='text-teal-500 font-bold text-sm md:text-base mb-1 text-left'>Destination</div>
            <div className='flex items-center'>
              <input
                type='text'
                id='destination'
                placeholder='Vietnam'
                className='text-blue-700 font-semibold focus:outline-none w-full'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button className='text-gray-500 hover:text-gray-700 focus:outline-none ml-2'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Date Range */}
          <div className='relative flex flex-col md:flex-row md:space-x-4 items-center border border-gray-300 p-3 rounded-lg w-full md:w-auto'>
            <div className='cursor-pointer w-full' onClick={toggleCalendar}>
              <div className='grid grid-cols-3 gap-4 text-sm'>
                <div className='font-bold text-teal-500'>Check-in</div>
                <div className='font-bold text-teal-500'>Total Days</div>
                <div className='font-bold text-teal-500'>Check-out</div>
                <div className='text-gray-800'>{format(dates.checkInDate, 'yyyy-MM-dd')}</div>
                <div className='text-gray-800 text-center'>{numberOfDays} days</div>
                <div className='text-gray-800 text-center'>{format(dates.checkOutDate, 'yyyy-MM-dd')}</div>
              </div>
            </div>
            {showCalendar && (
              <div className='absolute z-10 right-[300px] mt-4' style={{ width: '300px', top: '100%' }}>
                <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} months={2} direction='horizontal' />
              </div>
            )}
          </div>

          {/* Guests */}
          <div className='flex flex-col border border-gray-300 p-3 rounded-lg w-full md:w-[250px]'>
            <div className='text-teal-500 font-bold text-sm md:text-base mb-1 text-left'>Guests</div>
            <div className='flex items-center'>
              <input
                type='number'
                id='guests'
                min='1'
                placeholder='1'
                className='text-blue-700 font-semibold focus:outline-none w-full'
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Search Button */}
          <div className='flex flex-col justify-between md:justify-center md:justify-start md:ml-4 mt-4 md:mt-0 flex-1'>
            <button
              className='bg-teal-500 text-white font-bold py-7 px-6 rounded-lg hover:bg-teal-600 transition duration-300 w-full'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
