import React, { useEffect, useState } from 'react'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ThemeDarkLight() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className='flex items-center p-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full shadow-md transition-colors hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
    >
      <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className='mr-2' size='lg' />
      {darkMode ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}
