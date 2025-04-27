import React from 'react'
interface ArrowProps {
  className: string
  style: React.CSSProperties
  onClick: () => void
  direction: 'prev' | 'next'
}
export default function Arrows({ className, style, onClick, direction }: ArrowProps) {
  const isPrev = direction === 'prev'
  return (
    <div
      className={`${className} ${isPrev ? 'slick-prev' : 'slick-next'}`}
      style={{
        ...style,
        display: 'block',
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: isPrev ? '10px' : 'auto',
        right: isPrev ? 'auto' : '10px',
        zIndex: 10,
        transform: 'translateY(-50%)',
        cursor: 'pointer'
      }}
      onClick={onClick}
    />
  )
}
