import React from 'react'

export default function AboutUs() {
  return (
    <div className='about-us p-8 max-w-5xl mx-auto text-gray-800'>
      <h1 className='text-4xl font-bold text-blue-700 mb-6'>About Trip.com</h1>

      <section className='mb-10'>
        <h2 className='text-2xl font-semibold mb-2'>Who We Are</h2>
        <p>
          Trip.com is a leading online travel agency that helps millions of customers book hotels, flights, and
          experiences around the globe. With our user-friendly platform and 24/7 customer support, we aim to make travel
          easier and more enjoyable.
        </p>
      </section>
      <section className='mb-10'>
        <h2 className='text-2xl font-semibold mb-2'>Our Mission</h2>
        <p>
          To empower travelers worldwide by offering reliable, affordable, and seamless booking services with a focus on
          customer satisfaction and innovation.
        </p>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-semibold mb-2'>Our Vision</h2>
        <p>
          To become the most trusted and preferred travel platform globally by delivering exceptional travel experiences
          and solutions.
        </p>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-semibold mb-2'>Meet Our Team</h2>
        <p>
          Our diverse team of travel experts, engineers, and customer service professionals work tirelessly to ensure
          you get the best experience, every time you book with Trip.com.
        </p>
      </section>

      <section className='mb-10'>
        <h2 className='text-2xl font-semibold mb-2'>Contact Us</h2>
        <p>
          📍 Address: 123 Travel Avenue, Hanoi, Vietnam
          <br />
          📞 Phone: +84 123 456 789
          <br />
          📧 Email: support@trip.com
        </p>
      </section>
    </div>
  )
}
