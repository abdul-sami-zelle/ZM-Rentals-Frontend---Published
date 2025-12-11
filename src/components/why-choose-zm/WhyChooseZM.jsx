import React from 'react'
import './WhyChooseZM.css'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const WhyChooseZM = () => {
    const whyWe = [
        {que: 'Customer-First Approach', ans: `We take a customer-first approach seriously to meet your needs and exceed your expectations. By focusing on you, we not only fulfill your rental requirements but also build long-lasting relationships.`},
        {que: 'Full Transparency, No Surprises', ans: `With ZM Rentals, what you see is what you get. We maintain complete transparency throughout the rental experience, from the first contact to being dropped off at the airport.`},
        {que: 'Affordable & Flexible Option', ans: `You shouldn’t have to break the bank for a flexible rental experience. Unlike other services, we offer an unbeatable combination of flexibility and affordability to fit your itinerary and budget. `},
        {que: 'Seamless Digital Booking', ans: `Our easy-to-navigate website streamlines the Auckland car rental process, so you can get on the road without the wait. With ZM, you rent a car in Auckland without unnecessary complications.`},
        {que: 'High-Quality Economy Fleet', ans: `At ZM Rentals, you can rest assured that even our most affordable cars are maintained to the highest standards, so you can enjoy your journey with peace of mind.`},
        {que: 'Unmatched Safety Standards', ans: `Your safety is non-negotiable for us. Our fleet isn’t just clean and well-maintained, but each vehicle is equipped with top-notch safety features, including multiple airbags, ABS, EBD, and more.`},
        {que: 'Eco-Friendly, Climate-Conscious Vehicles', ans: `As a responsible NZ car rental service, we’re committed to reducing our environmental footprint. Our fleet primarily consists of hybrid vehicles, designed to minimize CO2 emissions and protect Auckland’s stunning beauty.`},
        {que: 'Effortless Pick-Up & Drop-Off', ans: `From reading the fine print before you pick up the keys to a smooth vehicle inspection at the time of drop-off, getting your rental car and returning it has never been easier.`},
    ]
  return (
    <div className='why-choose-us-main-contianer'>
        <div className='why-choose-us-inner-container'>
            <span className='why-choose-top-heading'>
                <p>Our Purpose and Promise</p>
                <h3 className='section-main-heading'>Making Every Ride Meaningful & Sustainable </h3>
            </span>
            <p>At ZM Rentals, we’re a proud Kiwi startup on a mission to drive positive change toward a greener, safer environment. We make eco-friendly travel affordable and accessible by offering carbon-conscious Auckland car rentals at budget-friendly rates. </p>
            
            <p>Our mission is simple: to empower travelers to explore Auckland sustainably without the heavy cost. By providing eco-conscious, wallet-friendly vehicle options, we help you enjoy Auckland’s stunning landscapes while leaving a lighter footprint. </p>

            <p>At ZM Rentals, it’s not just about getting you on the road — it’s about making every journey a step toward a more sustainable future.</p>

            <div className='why-we-defrent-main-container'>
                <h3>What Sets Us Apart?</h3>
                <div className='why-we-faq-container'>
                    {whyWe.map((item, index) => (
                        <div key={index} className='why-we-single-faq'>
                            <MdKeyboardDoubleArrowRight className='why-we-faq-arrow' />
                            <span>
                                <h3 className='global-heading-style'>{item.que}</h3>
                                <p className='global-content-style'>{item.ans}</p>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhyChooseZM