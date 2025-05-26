import React from 'react'

export default function AboutUs() {
  return (
    <div className='bg-white text-gray-800'>
      {/* Hero Section */}
      <section className='bg-blue-600 text-white py-16 px-6 text-center'>
        <h1 className='text-5xl font-bold mb-4'>About Trip.com</h1>
        <p className='text-lg max-w-3xl mx-auto'>
          Discover the story behind Trip.com – your trusted partner for unforgettable hotel bookings and travel
          experiences worldwide.
        </p>
      </section>

      {/* Company Overview */}
      <section className='max-w-6xl mx-auto px-6 py-12'>
        <div className='grid md:grid-cols-2 gap-10 items-center'>
          <div>
            <h2 className='text-3xl font-semibold mb-4'>Who We Are</h2>
            <p className='text-gray-700'>
              Trip.com is a global travel service provider dedicated to helping customers book hotels, flights, and tour
              experiences effortlessly. With innovative technology and a user-first mindset, we bring the world closer
              to you.
            </p>
          </div>
          <img
            src='https://images.unsplash.com/photo-1506744038136-46273834b3fb'
            alt='Hotel Booking'
            className='rounded-xl shadow-md'
          />
        </div>
      </section>

      {/* Mission and Vision */}
      <section className='bg-gray-50 py-12 px-6'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-10'>
          <div>
            <h3 className='text-2xl font-bold mb-2'>Our Mission</h3>
            <p>
              To empower travelers by providing reliable, affordable, and seamless booking services across the globe.
            </p>
          </div>
          <div>
            <h3 className='text-2xl font-bold mb-2'>Our Vision</h3>
            <p>
              To become the world’s most trusted travel platform by delivering exceptional service and unforgettable
              experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='max-w-6xl mx-auto py-12 px-6'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Meet Our Team</h2>
        <div className='grid md:grid-cols-3 gap-8 text-center'>
          {[
            { name: 'Anna Tran', role: 'CEO & Founder', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { name: 'Minh Nguyen', role: 'CTO', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            {
              name: 'Linh Pham',
              role: 'Head of Customer Experience',
              img: 'https://randomuser.me/api/portraits/women/68.jpg'
            }
          ].map((member, index) => (
            <div key={index} className='bg-white p-6 rounded-xl shadow hover:shadow-lg transition'>
              <img src={member.img} alt={member.name} className='w-24 h-24 rounded-full mx-auto mb-4 object-cover' />
              <h4 className='text-xl font-semibold'>{member.name}</h4>
              <p className='text-blue-600'>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className='bg-blue-50 py-12 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-4'>Contact Us</h2>
          <p className='mb-6'>Have questions or feedback? We're here to help.</p>
          <div className='text-gray-700 space-y-2'>
            <p>📍 123 Travel Avenue, Hanoi, Vietnam</p>
            <p>📞 +84 123 456 789</p>
            <p>📧 support@trip.com</p>
          </div>
          <button className='mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition'>
            Send a Message from branch about-us-1 Send a Message from branch about-us-2
          </button>
        </div>
      </section>
    </div>
  )
}
