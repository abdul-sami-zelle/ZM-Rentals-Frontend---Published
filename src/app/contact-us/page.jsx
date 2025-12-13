'use client'
import React from 'react'
import './ContactUs.css';
import ServicesHero from '../../components/services-hero/ServicesHero';
import GetInTouch from '../../components/get-in-touch/GetInTouch'

const ContactUs = () => {
  
  return (
    <div className="contact-us-page-main-container">
      <ServicesHero
        heading={'Contact us'}
        paraOne={`We're a different kind of car rental company.`}
        paraTwo={'Find out what makes us tick.'}
        buttonText={'What We Are About'}
        servicesHeroBg={'/assets/main-banners/contact-us.jpg'}
      />
 
      <div className="contact-us-inner-section">
        <div className="contact-us-max-width-container">
          
            <GetInTouch  />

        </div>
      </div>
    </div>
  )
}

export default ContactUs