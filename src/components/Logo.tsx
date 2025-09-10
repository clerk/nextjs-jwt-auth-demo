import React from 'react'

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-label="Padlock Logo" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#2563EB"/>
      <g>
        {/* Padlock body */}
        <rect x="10" y="14" width="12" height="10" rx="3" fill="white"/>
        {/* Padlock shackle */}
        <path d="M12 14V12a4 4 0 1 1 8 0v2" stroke="white" strokeWidth="2" fill="none"/>
        {/* Keyhole */}
        <circle cx="16" cy="19" r="1.2" fill="#2563EB"/>
        <rect x="15.5" y="20.2" width="1" height="2" rx="0.5" fill="#2563EB"/>
      </g>
    </svg>
  )
}

export default Logo