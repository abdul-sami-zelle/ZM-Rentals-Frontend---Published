'use client'

import React from 'react'
import './WhatsappButton.css';
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { usePathname } from 'next/navigation';


const WhatsappButton = () => {
  const pathname = usePathname()
  const excludedNotChat = ['/manage-booking'];
  const hideChat = excludedNotChat.includes(pathname)
  const phoneNumber = "+64221708848"; // ✅ Your WhatsApp number without + or leading zeros
  const message = "Hello, I need assistance!"; // optional default message

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank"); // opens WhatsApp in new tab (web/desktop/mobile)
  };
  return (
    <button className='whatsapp-button-sticky' style={{display: hideChat ? 'none' : 'flex'}} onClick={handleWhatsAppClick}>
        <TbBrandWhatsappFilled size={40} color='#FFF' />
    </button>
  )
}

export default WhatsappButton