import React from 'react'
import './AfterJourney.css'

const AfterJourney = () => {
  return (
    <div className='after-journey-main'>
      <div className='after-journey-width'>

        <div className='after-journey-head'>
          <h1 className='section-main-heading'>Your Journey Ends, But Our Care Continues</h1>
          <h2 className='global-heading-style'>Making your car return as smooth as your adventure</h2>
          <p className='global-content-style'>
            Your Auckland journey may be coming to an end, but our commitment to exceptional service doesn't stop here. Whether you've explored winding coastal roads, conquered mountain passes, or discovered hidden city gems, we want your final experience with us to be just as memorable as your first. From hassle-free returns to helpful post-trip support, we're here to ensure your transition back to everyday life is seamless and stress-free.
          </p>
        </div>

        <h1 className='section-main-heading'>Returning Your Vehicle Made Simple</h1>

        <div className='after-journey-list-container'>
          <h2 className='global-heading-style'>Standard Return Process</h2>
          <p className='global-content-style'>
            Returning your rental car should be the easiest part of your entire journey. When you arrive at any of our locations, simply park in the marked rental return area and gather all your personal belongings. Our friendly staff will conduct a quick vehicle inspection, checking fuel levels and noting the vehicle's condition. Don't worry about minor wear and tear from normal use. We understand that real adventures leave their mark, just bring along:
          </p>
          <ul>
            <li className='global-content-style'>Your driver's license</li>
            <li className='global-content-style'>The rental agreement</li>
            <li className='global-content-style'>Any additional driver documentation</li>
            <li className='global-content-style'>Toll receipts or parking tickets (if applicable)</li>
          </ul>
        </div>

        <h2 className='global-heading-style'>After-Hours Returns</h2>
        <p className='global-content-style'>
            Life doesn't always run on a 9-to-5 schedule, and neither do we. If you need to return your vehicle outside our operating hours, we've made it incredibly straightforward. Look for our secure drop-box locations, clearly marked with bright signage. Simply park in the designated after-hours area, lock the vehicle, take a quick photo for your records, and deposit the keys in our secure drop-box.
        </p>
        <p className='global-content-style' style={{fontWeight: '700'}}>
          Important reminder: While we process after-hours returns first thing the next business day, you remain responsible for the vehicle until our staff completes the official check-in process.
        </p>

        <h1 className='section-main-heading'>Understanding Your Final Bill</h1>

        <div className='understanding-bills-contianer'>
          <h2 className='global-heading-style'>Fuel Policy Clarity</h2>
          <p className='global-content-style'>
            We believe in transparent, fair fuel policies. If you selected our "Full-to-Full" option, ensure the fuel gauge reads the same level as when you picked up the vehicle. Gas stations near our location make last-minute fill-ups convenient and straightforward.
          </p>

          <h2 className='global-heading-style'>Grace Periods and Late Returns</h2>
          <p className='global-content-style'>
              We understand that timing isn't always perfect. That's why we offer a generous grace period for all returns. If circumstances delay you beyond this window, don't panic, we'll work with you on reasonable hourly rates rather than charging a full additional day. Communication is key, so please call our customer service team if you anticipate being late.
          </p>
        </div>

        <h1 className='section-main-heading'>Comprehensive Post-Return Support</h1>

        <div className='understanding-bills-contianer'>
            <h2 className='global-heading-style'>Left Something Behind?</h2>
            <p className='global-content-style'>
                It happens to the best of travelers. If you realize you've left personal items in the vehicle, contact our customer service team immediately. We maintain a comprehensive lost and found system, and our staff checks every returned vehicle thoroughly. 
            </p>

            <h2 className='global-heading-style'>Billing Questions and Receipts</h2>
            <p className='global-content-style'>
                Your final rental receipt will be available within 24-48 hours of your return and will be sent directly to your email address. This detailed breakdown includes all charges, helping you track business expenses or personal travel budgets. 
            </p>

            <h2 className='global-heading-style'>Feedback That Matters</h2>
            <p className='global-content-style'>
                Your experience shapes how we serve future customers. Whether you want to praise staff, suggest improvements, or address any concerns, we genuinely value your input. Our team is happy to implement changes based on traveler suggestions.
            </p>
        </div>

        <h2 className='global-heading-style'>Extending Your Adventure</h2>
        <p className='global-content-style'>
            Frequent travelers deserve recognition. Our loyalty program accumulates points with every rental, leading to upgrades, discounted rates, and exclusive member benefits. Ask about enrollment during your next booking, or sign up online to start earning rewards immediately.
        </p>

      </div>
    </div>
  )
}

export default AfterJourney