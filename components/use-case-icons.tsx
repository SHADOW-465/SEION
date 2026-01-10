export const FactoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 21H21M3 7L9 4L15 7L21 4V21H3V7Z"
      stroke="url(#factory-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 21V12H15V21" stroke="url(#factory-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 9H8M16 9H17" stroke="url(#factory-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="factory-gradient" x1="3" y1="4" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700" />
        <stop offset="1" stopColor="#FFA500" />
      </linearGradient>
    </defs>
  </svg>
)

export const LogisticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 18V6C14 5.44772 13.5523 5 13 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H13C13.5523 19 14 18.5523 14 18Z"
      stroke="url(#logistics-gradient)"
      strokeWidth="2"
      fill="url(#logistics-gradient)"
      fillOpacity="0.2"
    />
    <path
      d="M14 8H17L21 12V18C21 18.5523 20.5523 19 20 19H14V8Z"
      stroke="url(#logistics-gradient)"
      strokeWidth="2"
      fill="url(#logistics-gradient)"
      fillOpacity="0.2"
    />
    <circle cx="6.5" cy="19" r="2.5" stroke="url(#logistics-gradient)" strokeWidth="2" fill="#ffffff" />
    <circle cx="17.5" cy="19" r="2.5" stroke="url(#logistics-gradient)" strokeWidth="2" fill="#ffffff" />
    <defs>
      <linearGradient id="logistics-gradient" x1="3" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF8C00" />
        <stop offset="1" stopColor="#DAA520" />
      </linearGradient>
    </defs>
  </svg>
)

export const RetailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7"
      stroke="url(#retail-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 7H21L20 21H4L3 7Z"
      stroke="url(#retail-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#retail-gradient)"
      fillOpacity="0.2"
    />
    <path d="M9 11V17M15 11V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="retail-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DAA520" />
        <stop offset="1" stopColor="#B8860B" />
      </linearGradient>
    </defs>
  </svg>
)

export const EnergyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      stroke="url(#energy-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#energy-gradient)"
      fillOpacity="0.2"
    />
    <defs>
      <linearGradient id="energy-gradient" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFC107" />
        <stop offset="1" stopColor="#FF8F00" />
      </linearGradient>
    </defs>
  </svg>
)

// Keep existing icons
export const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 19H17V5H7V19H9M15 19V13C15 12.4477 14.5523 12 14 12H10C9.44772 12 9 12.4477 9 13V19M15 19H9"
      stroke="url(#building-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 19H20" stroke="url(#building-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="10" y="7" width="4" height="3" rx="0.5" fill="#ffffff" />
    <rect x="10" y="14" width="4" height="3" rx="0.5" fill="#ffffff" />
    <defs>
      <linearGradient id="building-gradient" x1="4" y1="5" x2="20" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700" />
        <stop offset="1" stopColor="#FFA500" />
      </linearGradient>
    </defs>
  </svg>
)

export const HealthcareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 12.5L8 16L12 12L16 16L19.5 12.5M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
      stroke="url(#healthcare-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 7V13M9 10H15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="healthcare-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA500" />
        <stop offset="1" stopColor="#FF8C00" />
      </linearGradient>
    </defs>
  </svg>
)
