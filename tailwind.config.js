/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Hoặc 'media', tùy theo cách bạn muốn kích hoạt Dark Mode
  theme: {
    extend: {
      maxWidth: {
        'custom-xl': '1200px' // Thêm giá trị tùy chỉnh
      }
    }
  },
  plugins: []
}
