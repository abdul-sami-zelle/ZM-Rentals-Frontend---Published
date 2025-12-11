import React from 'react'
import './Locations.css';
import { TfiLocationPin } from "react-icons/tfi";
import Link from 'next/link';

const Locations = () => {
  const locationsData = [
    { branchName: 'Auckland City', link: '#' },
  ]
  return (
    <>
      <div className='location-outer-main-container'>
        <div className='locations-main-container'>
          <div className='nz-map-locations'>
            <span>
              <TfiLocationPin size={40} color='#000' />
              Auckland City
            </span>
          </div>
          <div className='locations-details-container'>
            <h3 className='section-main-heading'>Prime Auckland Location</h3>
            <p>
              At ZM Rentals, we prioritize your convenience, which is why we’ve chosen the perfect location for both travelers and locals. Our South Auckland Car Rental Depot, 
              located in Mangere, is just minutes from the Auckland Airport terminal, making it easy for tourists to pick up their pre-booked car or make a walk-in reservation 
              upon arrival. For locals, our depot is the ideal spot for renting a car, whether it's for occasional use or a long-term car rental in Auckland. With our strategic 
              location, we ensure a smooth, hassle-free experience, whether you’re a visitor or live here and need to rent a car in Auckland.
            </p>
            <div className='locations-list-main-container'>
              {locationsData.map((item, index) => (
                <Link key={index} href={item.link}>
                  <TfiLocationPin size={30} color='#000' />
                  {item.branchName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='mobile-location-main-container'>
            <h3 className='section-main-heading'>Prime Auckland Location</h3>
            <p className='mobile-location-para'>
            At ZM Rentals, we prioritize your convenience, which is why we’ve chosen the perfect location for both travelers and locals. Our South Auckland Car Rental Depot, 
              located in Mangere, is just minutes from the Auckland Airport terminal, making it easy for tourists to pick up their pre-booked car or make a walk-in reservation 
              upon arrival. For locals, our depot is the ideal spot for renting a car, whether it's for occasional use or a long-term car rental in Auckland. With our strategic 
              location, we ensure a smooth, hassle-free experience, whether you’re a visitor or live here and need to rent a car in Auckland.
            </p>
            <div className='mobile-locations-list-main-container'>
              {locationsData.map((item, index) => (
                <Link key={index} href={item.link}>
                  <TfiLocationPin size={20} color='#000' />
                  {item.branchName}
                </Link>
              ))}
            </div>
      </div>
    </>

  )
}

export default Locations