import React from 'react'
import './SpinningTyreLoader.css'
const SpinningTyreLoader = () => {
  return (
    <div className="ajax-loader">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 111">
    <g transform="translate(20 0)">
      <circle className="wheel" cx="220.61" cy="55" r="55" />
      <g className="trails">
        <rect className="trail trail-major" x="90.42" y="21.06" width="67.81" height="9" rx="5.5" ry="5.5" />
        <rect className="trail trail-minor" x="57.88" y="21.06" width="21.75" height="9" rx="5.5" ry="5.5" />
      </g>
    </g>
  </svg>
</div>

  )
}

export default SpinningTyreLoader