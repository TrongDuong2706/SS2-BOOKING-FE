import React, { useState } from 'react'

export default function FAQs() {
  const [open, setOpen] = useState(null)

  const toggleAccordion = (index: any) => {
    setOpen(open === index ? null : index)
  }

  return (
    <div id='accordion-open' data-accordion='open'>
      <h2 className='text-3xl text-teal-500 font-bold mb-3'>FAQs</h2>
      <h2 id='accordion-open-heading-1'>
        <button
          type='button'
          className='flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3'
          onClick={() => toggleAccordion(1)}
          aria-expanded={open === 1}
          aria-controls='accordion-open-body-1'
        >
          <span className='text-teal-500 flex items-center'>
            <svg
              className='w-5 h-5 me-2 shrink-0'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                clipRule='evenodd'
              ></path>
            </svg>
            How do i book a hotel in Stay Finder?
          </span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${open === 1 ? 'rotate-180' : ''} shrink-0`}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5 5 1 1 5' />
          </svg>
        </button>
      </h2>
      <div
        id='accordion-open-body-1'
        className={`${open === 1 ? 'block' : 'hidden'}`}
        aria-labelledby='accordion-open-heading-1'
      >
        <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900'>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
            dropdowns, modals, navbars, and more.
          </p>
          <p className='text-gray-500 dark:text-gray-400'>
            Check out this guide to learn how to{' '}
            <a href='/docs/getting-started/introduction/' className='text-blue-600 dark:text-blue-500 hover:underline'>
              get started
            </a>{' '}
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </div>
      </div>

      <h2 id='accordion-open-heading-2'>
        <button
          type='button'
          className='flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3'
          onClick={() => toggleAccordion(2)}
          aria-expanded={open === 2}
          aria-controls='accordion-open-body-2'
        >
          <span className='text-teal-500 flex items-center'>
            <svg
              className='w-5 h-5 me-2 shrink-0'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                clipRule='evenodd'
              ></path>
            </svg>
            Is there a Figma file available?
          </span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${open === 2 ? 'rotate-180' : ''} shrink-0`}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5 5 1 1 5' />
          </svg>
        </button>
      </h2>
      <div
        id='accordion-open-body-2'
        className={`${open === 2 ? 'block' : 'hidden'}`}
        aria-labelledby='accordion-open-heading-2'
      >
        <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700'>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
            has a design equivalent in our Figma file.
          </p>
          <p className='text-gray-500 dark:text-gray-400'>
            Check out the{' '}
            <a href='https://flowbite.com/figma/' className='text-blue-600 dark:text-blue-500 hover:underline'>
              Figma design system
            </a>{' '}
            based on the utility classes from Tailwind CSS and components from Flowbite.
          </p>
        </div>
      </div>

      <h2 id='accordion-open-heading-3'>
        <button
          type='button'
          className='flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3'
          onClick={() => toggleAccordion(3)}
          aria-expanded={open === 3}
          aria-controls='accordion-open-body-3'
        >
          <span className='text-teal-500 flex items-center'>
            <svg
              className='w-5 h-5 me-2 shrink-0'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                clipRule='evenodd'
              ></path>
            </svg>
            What are the differences between Flowbite and Tailwind UI?
          </span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${open === 3 ? 'rotate-180' : ''} shrink-0`}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 10 6'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5 5 1 1 5' />
          </svg>
        </button>
      </h2>
      <div
        id='accordion-open-body-3'
        className={`${open === 3 ? 'block' : 'hidden'}`}
        aria-labelledby='accordion-open-heading-3'
      >
        <div className='p-5 border border-t-0 border-gray-200 dark:border-gray-700'>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>
            The main difference is that Flowbite is an open-source library of interactive components based on Tailwind
            CSS, whereas Tailwind UI is a paid product with more advanced components and designs.
          </p>
          <p className='text-gray-500 dark:text-gray-400'>
            Learn more about these technologies by reading the{' '}
            <a
              href='https://flowbite.com/docs/getting-started/faq/'
              className='text-blue-600 dark:text-blue-500 hover:underline'
            >
              frequently asked questions
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
