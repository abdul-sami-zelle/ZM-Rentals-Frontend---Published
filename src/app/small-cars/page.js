import React from 'react'
import './SmallCar.css'

const SmallCars = () => {
  return (
    <div className='small-car-main-contianer'>
      <div className='smal-car-width-controlar'>
          <h1 className='section-main-heading'>Small Cars</h1>
          <p className='global-content-style'>
            Looking to get around Auckland without breaking the bank, or simply want something compact and low-maintenance to cut down the travel stress? ZM’s fleet of small cars offers efficient, affordable mobility for anyone searching for budget-friendly car hire. With a variety of reliable models, you’ll find the perfect match without paying for extras you don’t need.
          </p>

          <h2 className='global-heading-style'>
            City Ready, Wallet Friendly
          </h2>
          <p className='global-content-style'>
            A small car hire is one of the smartest choices for city travel. Budget-friendly yet reliable, these cars make navigating tight streets, sliding into parking spaces, and weaving through busy traffic simple. Lower rental rates and reduced fuel consumption also mean more savings for your trip. Our compact range is designed to make your Auckland car rental experience smooth, affordable, and stress-free, giving you convenience without compromise.
          </p>

          <h2 className='global-heading-style'>Cruise Auckland Stress-Free with Compact Rentals</h2>

          <p className='global-content-style'>Exploring the city in a compact car hire lets you focus on the journey instead of the logistics. Our cars deliver dependable performance. They are easy to drive, park, and maneuver around the city with modern safety features and responsive handling. Whether you’re a solo traveler or on a budget-conscious holiday, small car hire offers reliable transport without unnecessary frills.</p>
      
          <p className='global-content-style'>
            With ZM Rentals, you’ll also enjoy dedicated service and a fleet of modern vehicles maintained to professional standards. Our small car rentals in Auckland allow you to travel at your own pace, efficiently, economically, and comfortably, making every ride more enjoyable.
          </p>

          <div className='small-cars-list-contianer'>
            <h2 className='global-heading-style'>Fits Every Journey, Big or Small</h2>
            <ul className='small-cars-list'>
              <li className='global-content-style'>
                <strong>Solo Explorers:</strong> Experience ultimate freedom and flexibility in every corner of the city with vehicles that are perfect for one.
              </li>
              <li className='global-content-style'>
                <strong>Couples & Friends:</strong> Cozy yet roomy enough for two, share a ride with a pal or partner without stretching the budget.
              </li>
              <li className='global-content-style'>
                <strong>Business Travelers:</strong> Maintain a professional impression while enjoying a practical ride with our range of modern, serviced options. 
              </li>
              <li className='global-content-style'>
                <strong>Weekend Adventures:</strong> Economical and reliable, ready for short trips, quick getaways, or spontaneous city escapes.
              </li>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default SmallCars