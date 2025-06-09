import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { changeAvatar } from 'src/apis/auth.api'
import { getUserId } from 'src/utils/auth'

export default function Messenger() {
  const conversations = [
    { id: 1, name: 'John Doe', lastMessage: 'Hello!', avatar: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Jane Smith', lastMessage: 'How are you?', avatar: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Alice Johnson', lastMessage: 'See you later.', avatar: 'https://via.placeholder.com/50' }
  ]
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const queryClient = useQueryClient()

  const updateAvatarMutation = useMutation({
    mutationFn: (body: FormData) => {
      const userId = getUserId()
      if (!userId) {
        throw new Error('User ID not found in local storage')
      }
      return changeAvatar(userId, body)
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['getInfo'] })
      toast('thay đổi avatar thành công')
    },
    onError: (err) => {
      console.error('Error updating avatar', err)
    }
  })

  const onSubmit = handleSubmit((data) => {
    if (data.images && data.images.length > 0) {
      const formData = new FormData()
      formData.append('file', data.images[0])
      updateAvatarMutation.mutate(formData)
    } else {
      toast('Please select an image')
    }
  })

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <form onSubmit={onSubmit}>
        <div className=''>
          <label className='block text-sm font-medium text-gray-700' htmlFor='image'>
            Image
          </label>
          <input id='image' type='file' accept='image/*' multiple className='mt-1' {...register('images')} />
        </div>
        <button>Submit</button>
      </form>
      <div className='w-1/4 bg-gray-100 border-r border-gray-200'>
        <div className='p-4 border-b border-gray-200'>
          <input
            type='text'
            placeholder='Search Messenger'
            className='w-full px-4 py-2 rounded-full bg-gray-200 focus:outline-none'
          />
        </div>
        <ul className='overflow-y-auto'>
          {conversations.map((conv) => (
            <li key={conv.id} className='p-4 cursor-pointer hover:bg-gray-200 flex items-center'>
              <img src={conv.avatar} alt={conv.name} className='w-10 h-10 rounded-full mr-4' />
              <div>
                <div className='font-bold'>{conv.name}</div>
                <div className='text-sm text-gray-600'>{conv.lastMessage}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className='flex-1 flex flex-col'>
        <div className='p-4 bg-gray-200 border-b border-gray-200 flex items-center'>
          <img src='https://via.placeholder.com/50' alt='John Doe' className='w-10 h-10 rounded-full mr-4' />
          <div className='font-bold'>John Doe</div>
        </div>
        <div className='flex-1 p-4 overflow-y-auto'>
          <div className='mb-4'>
            <div className='text-right'>
              <div className='inline-block bg-blue-500 text-white p-2 rounded-lg'>Hello!</div>
            </div>
            <div className='text-left mt-2'>
              <div className='inline-block bg-gray-300 p-2 rounded-lg'>Hi there!</div>
            </div>
          </div>
        </div>
        <div className='p-4 border-t border-gray-200'>
          <input
            type='text'
            placeholder='Type a message...'
            className='w-full px-4 py-2 rounded-full bg-gray-200 focus:outline-none'
          />
        </div>
      </div>
    </div>
  )
}
