import HeaderInfomation from 'src/components/HeaderInfomation'
import Search from 'src/components/Search/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faBed,
  faWifi,
  faSmokingBan,
  faRulerCombined,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import Footer from 'src/components/Footer'
import { getOneHotel } from 'src/apis/hotel.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getOneRoom } from 'src/apis/room.api'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { differenceInDays } from 'date-fns'
import { useForm } from 'react-hook-form'
import { booking } from 'src/apis/booking.api'
import { getCheckOutDate, getUserId } from 'src/utils/auth'
import { CommentsDisabledOutlined } from '@mui/icons-material'

type RegisterFormData = {
  checkInDate: Date
  checkOutDate: Date
  paymentMethod: string
  specialRequest: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export default function Payment() {
  const { roomId } = useParams<{ roomId: string }>() // Lấy hotelId dưới dạng chuỗi
  const id = roomId ? parseInt(roomId, 10) : 0

  const initialCheckInDate = localStorage.getItem('checkInDate') || ''
  const initialCheckOutDate = localStorage.getItem('checkOutDate') || ''

  const [checkInDate, setCheckInDate] = useState<string>(initialCheckInDate)
  const [checkOutDate, setCheckOutDate] = useState<string>(initialCheckOutDate)

  //API getOneRoom
  const {
    data: roomData,
    isLoading: isRoomLoading,
    isError: isRoomError
  } = useQuery({
    queryKey: ['room', id],
    queryFn: () => getOneRoom(id)
  })

  const room = roomData?.data.result
  const hotelId = room?.hotelId
  console.log('Index hotelId cua Room: ' + hotelId)
  //use form  để lấy thông tin
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>()
  const totalNights = checkInDate && checkOutDate ? differenceInDays(new Date(checkOutDate), new Date(checkInDate)) : 0
  const totalPrice = room?.price ? totalNights * room.price : 0
  console.log('Giá room ' + room?.price)
  console.log('test: ' + room?.description)
  console.log('bed count: ' + room?.bedCount)
  console.log('Room data:', JSON.stringify(room, null, 2))

  //Call API BOOKING
  const bookingMutation = useMutation({
    mutationFn: (body: {
      checkInDate: Date
      checkOutDate: Date
      totalPrice: number
      roomId: number
      userId: string
      hotelId: number
      paymentMethod: string
      specialRequest: string
      code: string
      email: string
      firstName: string
      lastName: string
      phoneNumber: string
      numberOfRoom: number
      amount: number
      bankCode: string
    }) => booking(body)
  })

  const onSubmit = (data: RegisterFormData) => {
    const body = {
      ...data,
      totalPrice,
      roomId: roomId ? parseInt(roomId, 10) : 0,
      userId: getUserId(),
      hotelId: room?.hotelId || 0,
      amount: totalPrice,
      bankCode: 'NCB',
      code: '',
      numberOfRoom: totalNights // Thay thế bằng số lượng phòng thực tế
    }
    bookingMutation.mutate(body, {
      onSuccess: (response) => {
        window.location.href = response.data.result.paymentUrl
      },
      onError: (error) => {
        console.error('Booking failed:', error)
      }
    })
  }

  //API getOneHotel
  const {
    data: hotelData,
    isLoading: isHotelLoading,
    isError: isHotelError
  } = useQuery({
    queryKey: ['hotel', hotelId],
    queryFn: () => getOneHotel(hotelId as number),
    enabled: !!hotelId // Chỉ thực hiện khi có hotelId
  })

  const hotelInfomation = hotelData?.data.result

  return (
    <div>
      <div className='bg-teal-500 relative'>
        <HeaderInfomation containerClass='max-w-screen-2xl mx-auto p-4 pb-[120px] flex justify-between items-center' />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white absolute top-40 w-screen rounded-xl p-6'>
          <div className='max-w-[1200px] mx-auto relative'>
            <div className='absolute top-[-100px] w-full z-10'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='col-span-2 flex flex-col'>
                  <div className='bg-white p-6 rounded-lg shadow-md'>
                    <div className='flex'>
                      <img
                        src={hotelInfomation?.images[0].url}
                        alt='Hotel Cupid'
                        className='w-36 h-36 rounded-lg object-cover'
                      />
                      <div className='ml-6 flex flex-col justify-between w-full'>
                        <div>
                          <h2 className='text-xl font-semibold mb-2'>{hotelInfomation?.name} ⭐️⭐️⭐️</h2>
                          <p className='text-gray-600 mb-4'>Deluxe Room | 2 adults | 1 queen bed</p>
                          <div className='flex space-x-4'>
                            <p>
                              <FontAwesomeIcon icon={faBed} /> 2 adults
                            </p>
                            <p>
                              <FontAwesomeIcon icon={faBed} /> 1 queen bed
                            </p>
                            <p>
                              <FontAwesomeIcon icon={faWifi} /> Free wifi
                            </p>
                            <p>
                              <FontAwesomeIcon icon={faSmokingBan} /> Non Smoking
                            </p>
                            <p>
                              <FontAwesomeIcon icon={faRulerCombined} /> 20-22m²
                            </p>
                          </div>
                          <div>
                            <FontAwesomeIcon icon={faCalendarAlt} /> Free Calendar
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-4 space-x-8'>
                      <p className='text-gray-600'>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Check-in: 14:00
                      </p>
                      <p className='text-gray-600'>
                        <FontAwesomeIcon icon={faCalendarAlt} /> Check-out: 12:00
                      </p>
                      <p className='text-gray-600'>
                        <FontAwesomeIcon icon={faEnvelope} /> {hotelInfomation?.email}
                      </p>
                    </div>
                  </div>
                  {/* Customer Information */}
                  <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                    <h2 className='text-2xl font-bold mb-6'>Customer Information</h2>
                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <label htmlFor='firstName' className='block text-sm font-medium text-gray-700 mb-2'>
                            First Name
                          </label>
                          <input
                            type='text'
                            id='firstName'
                            className='block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                            placeholder='Enter your first name'
                            {...register('firstName')}
                          />
                        </div>
                        <div>
                          <label htmlFor='lastName' className='block text-sm font-medium text-gray-700 mb-2'>
                            Last Name
                          </label>
                          <input
                            type='text'
                            id='lastName'
                            {...register('lastName')}
                            className='block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                            placeholder='Enter your last name'
                          />
                        </div>
                      </div>
                      <div className='grid grid-cols-1 gap-6'>
                        <div className='flex space-x-6'>
                          <div className='flex-1'>
                            <label htmlFor='checkInDate' className='block text-sm font-medium text-gray-700 mb-2'>
                              Check-in Date
                            </label>
                            <input
                              type='date'
                              id='checkInDate'
                              value={checkInDate}
                              {...register('checkInDate')}
                              onChange={(e) => setCheckInDate(e.target.value)}
                              className='block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                            />
                          </div>
                          <div className='flex-1'>
                            <label htmlFor='checkOutDate' className='block text-sm font-medium text-gray-700 mb-2'>
                              Check-out Date
                            </label>
                            <input
                              type='date'
                              id='checkOutDate'
                              {...register('checkOutDate')}
                              value={checkOutDate}
                              onChange={(e) => setCheckOutDate(e.target.value)}
                              className='block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                          Email
                        </label>
                        <input
                          type='email'
                          id='email'
                          {...register('email')}
                          className='block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                          placeholder='Enter your email'
                        />
                      </div>
                      <div>
                        <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
                          Phone Number
                        </label>
                        <input
                          type='tel'
                          id='phone'
                          {...register('phoneNumber')}
                          className='block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                          placeholder='Enter your phone number'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className='bg-white p-8 rounded-lg shadow-lg mt-6 '>
                    <h2 className='text-2xl font-bold mb-6 text-gray-800'>Special Requests</h2>
                    <div className='space-y-4'>
                      <div>
                        <textarea
                          id='otherRequests'
                          {...register('specialRequest')}
                          className='block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                          placeholder='Enter other special requests'
                          style={{ height: '120px' }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Payment Method */}
                  <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                    <h2 className='text-2xl font-bold mb-6 text-gray-800'>Payment Method</h2>
                    <div className='space-y-4'>
                      <div className='flex items-center p-4 bg-gray-50 rounded-lg shadow-inner'>
                        <input
                          type='radio'
                          id='vnPay'
                          {...register('paymentMethod')}
                          value='NCB'
                          className='h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
                        />
                        <label htmlFor='vnPay' className='ml-3 text-sm font-medium text-gray-700'>
                          Pay via VNPay
                        </label>
                      </div>
                      <div className='flex items-center p-4 bg-gray-50 rounded-lg shadow-inner'>
                        <input
                          type='radio'
                          id='payOnArrival'
                          {...register('paymentMethod')}
                          className='h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
                        />
                        <label htmlFor='payOnArrival' className='ml-3 text-sm font-medium text-gray-700'>
                          Pay on Arrival
                        </label>
                      </div>
                      <button
                        type='submit'
                        className='w-full bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500'
                      >
                        Book Room
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total Price Information */}
                <div className='bg-white p-6 rounded-lg shadow-md max-h-[25vh] '>
                  <h2 className='text-xl font-semibold mb-4'>Total Price Information</h2>
                  <p className='mb-2'>Room Price per Night: {room?.price}</p>
                  <p className='mb-2'>Number of Nights: {totalNights}</p>
                  <p className='mb-2 font-semibold'>Total Price: ${totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
