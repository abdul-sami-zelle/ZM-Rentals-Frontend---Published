'use client'
import React, { useState } from 'react'
import './PromotionalHeader.css'
import { FaTag } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

const PromotionalHeader = () => {
  const [showPromotionalHeader, setShowPromotionalHeader] = useState(false);
  // const [hasMounted, setHasMounted] = useState(false);
  const handleClosePromotionBanner = () => {
    setShowPromotionalHeader(true);
  }

  // if (!hasMounted) return null;
  
  return (
    <div className={`promotional-header-main-container ${showPromotionalHeader ? 'hide-promotional-header-main-container' : ''}`}>
      <FaTag size={20} className='promotional-header-icon' />
      <span>
        <p>Celebrating 25 Years of GO: </p>
        <h3>Win Your Share of $25,000! * T&Cs Apply</h3>
      </span>

      <button className='promotional-header-close-icon'>
        <IoCloseOutline size={20}  onClick={handleClosePromotionBanner} />
      </button>
    </div>
  )
}

export default PromotionalHeader