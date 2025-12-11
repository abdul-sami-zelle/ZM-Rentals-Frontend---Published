import React from 'react'
import './NavCard.css'
import Image from 'next/image'
import Link from 'next/link'

const NavCard = ({ width, height, navLink, image, name}) => {
    
  return (
    <Link 
        href={navLink} 
        className="nav-card" 
        style={{width: width, height: 'auto'}}
    >
        <div className='nav-card-image-container' style={{height: height}}>
            <Image src={image} alt="Item Image" width={144} height={72} className="nav-card-image" />
        </div>
        <div className='nav-card-text-container'>
            <h3>{name}</h3>
        </div>
    </Link>
  )
}

export default NavCard