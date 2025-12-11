'use client'
import React from 'react'
import './LocationsPage.css'
import BookingForm from '@/global-components/booking-form/BookingForm'
import DiscountBanner from '@/global-components/discount-banner/DiscountBanner'
import discountBannerImage from '../../assets/images/discount-banners/GO_Rentals_Newsletter.jpg'
import { TfiLocationPin } from "react-icons/tfi";
import PackageDetails from '@/components/package-details/PackageDetails'
import QuickFackts from '../../components/quick-facts/QuickFacts';
import WhyWithUs from '../../components/why-with-us/WhyWithUs';
import RoadCare from '../../components/road-care/RoadCare'
import ExclusiveDiscount from '../../components/exclusive-discount/ExclusiveDiscount'
import InsuranceCoverage from '../../components/insurance-coverage/InsuranceCoverage'
import PopularCars from '../../components/popular-cars/PopularCars'
import CustomerThoughts from '../../components/customer-thoughts/CustomerThoughts'
import LocationDetails from '../../components/location-details/LocationDetails'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import FrequentlyAsked from '@/components/frequently-asked/FrequentlyAsked'
import Hero from '@/global-components/hero-section/Hero'

const Locations = () => {

  const navigateEasy = [
    {
      heading: 'Auckland Airport',
      para: `Pick up your rental car moments after landing at Auckland Airport and return it just as easily before your departure. Our Mangere branch is located just minutes away, offering seamless convenience for travelers.`
    },
    {
      heading: 'Manukau Harbour',
      para: `Begin your journey with a scenic drive along the coastline. From Mangere, you can reach Manukau Harbour within minutes, ideal for a refreshing break, some sightseeing, or a picturesque photo stop.`
    },
    {
      heading: 'Auckland CBD',
      para: `Reach the heart of Auckland’s vibrant city life with ease. A direct route via State Highways 20 and 1 gets you into the CBD quickly, perfect for exploring urban attractions, attending business meetings, or enjoying local cuisine.`
    },
  ]

  const faqData = [
    {
      question: 'How long does it take to get to our Mangere location from the Auckland Airport?',
      answer: (<>
        Getting to our Mangere depot from Auckland Airport is quick and easy, depending on your mode of transport. By car or taxi, it typically takes just 5 to 6 
        minutes under normal traffic.
        <br /> <br />
        Public transport, like the Line 28 bus, takes longer, around 17 to 21 minutes for the ride, plus potential wait time and a walk or rideshare from the bus 
        stop to our office. Altogether, this option could take anywhere between 30 to 50 minutes. 
      </>),
      height: '115px'
    },
    {
      question: 'What is the easiest way to reach our Mangere location from the Auckland Airport?',
      answer: (
        <>
          The easiest and most cost-effective way to reach our Mangere location from Auckland Airport is by using our free-of-cost shuttle service. It’s quick, convenient, and saves you the hassle of carrying luggage or waiting for a bus. Plus, it’s free, which beats the cost of taxis or buses, especially for tourists.
          <br /><br />
          However, if you’re in a hurry or prefer not to wait, a taxi or rideshare is another option. Our location is just a few minutes away from the airport, so it’s a quick ride. Taxis typically charge between NZD $27 and $35 due to the high demand for immediate service. If you’re willing to pay a bit extra for speed and comfort, this is your best option.
        </>
      ),
      height: '115px'
    },
    {
      question: 'How can I get a shuttle at the Auckland Airport?',
      answer: (
        <>
          To get our ZM shuttle service from Auckland Airport, follow these easy steps. After clearing customs (for international travelers), call or text us using the number provided in your booking confirmation email. Once we receive your message, we’ll dispatch a shuttle to pick you up. Even if you pre-booked your shuttle online, you still need to notify us upon arrival so we can arrange your pick-up promptly.
          <br /><br />
          When your pick-up is confirmed, head to the appropriate terminal. If you’re an international traveler, go outside Door 11 and look for the “Rental Car Shuttle” signs. For domestic travelers, wait outside Door 4 or 7, depending on your airline. The shuttle will be there shortly, so you can relax while we take care of the rest.
        </>
      ),
      height: '140px'
    },
    {
      question: 'How long will it take to drive from Mangere to Auckland’s central city?',
      answer: (
        <>
          Driving from our Mangere car rental depot to Auckland’s central city is quick and easy. The distance is about 18-20 km (11-12 miles) via State Highway 20 and State Highway 1, typically taking 20 to 30 minutes. However, traffic conditions can vary depending on the time of day.
          <br /><br />
          During peak hours, morning (7:00 AM - 9:30 AM) and evening (4:00 PM - 6:30 PM), traffic can slow you down, and the drive may take 35-45 minutes or more. For a smoother journey, take Kirkbride Road or George Bolt Memorial Drive to State Highway 20, then merge onto State Highway 1 towards the city center. Avoid peak hours if possible for a quicker trip.
        </>
      ),
      height: '140px'
    },
    {
      question: 'Can I get a shuttle to Auckland Airport on my return?',
      answer: (
        <>
          Yes, you can easily get a shuttle to Auckland Airport after returning your car with ZM Rentals. We offer a comprehensive shuttle service for both arrivals and departures, ensuring a smooth and convenient journey. Our depot’s close proximity to the airport allows for quick shuttle turnaround times, so you won’t need to worry about hiring a taxi, booking a rideshare, or catching a bus after dropping off your rental vehicle.
          <br /><br />
          Once you’ve returned the car, completed the vehicle inspection, and received your deposit refund, you can request a shuttle directly from our reception desk. If you have an early or late flight, simply inform our staff in advance, and we’ll prioritize your shuttle service. Our shuttles will drop you off at the designated terminal based on your flight, whether domestic or international.
        </>
      ),
      height: '140px'
    },
  ]

  return (
    <div className='locations-main-outer-contaienr'>

      <Hero 
        bgImage={'/assets/vehicles/car-04.jpg'}
        dualHeading={false}
        minHeight='473px'
        locationHeading={'Car Rental Auckland'}
        locationPara={'ZM the distance with an affordable car rental'}
      />

      <div className='location-page-location-section-container'>
        <div className='location-page-location-section-width-controller'>
        <LocationDetails />
        </div>
      </div>
      
        <div className='location-max-width-control-container'>



          {/* Navigate Easy Section */}
          <div className='navigate-easy-main-container'>
            <div className='navigate-easy-inner-container'>
              <h3 className='section-main-heading'>What Makes Our Mangere Location Prime?</h3>

              <p className='global-content-style'>
                Our car rental depot, centrally located in the heart of Mangere, is one of the most convenient spots to rent a car in Auckland. Its strategic placement makes it a top choice for both tourists and residents alike. With easy access to key attractions and major routes, it’s the perfect launchpad for your Auckland adventures.
              </p>

              <div className='navigate-easy-options-container'>
                {navigateEasy.map((item, index) => (
                  <div key={index} className='navigate-easy-single-container'>
                    <MdKeyboardDoubleArrowRight  className='navigate-arrow' color='var(--primary-color)' />
                    <div className='prime-location-details-container'>
                      <h3 className='global-heading-style'>{item.heading}</h3>
                      <p className='global-content-style'>{item.para}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* <QuickFackts /> */}

          <WhyWithUs />

          <RoadCare />

          <FrequentlyAsked
            faqData={faqData}
          />


          {/* <CustomerThoughts /> */}

        </div>

    </div>
  )
}

export default Locations