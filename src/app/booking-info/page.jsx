'use client'
import React, { useState } from 'react'
import './BookingInfo.css';
import ServicesHero from '@/components/services-hero/ServicesHero';
import RentalServiceHeader from '@/components/rental-services-head/RentalServiceHeader';
import BookingInstruction from '../../components/booking-instruction/BookingInstruction'
import RentalPolicy from '../../components/rental-policy/RentalPolicy'
import DiscountBanner from '@/global-components/discount-banner/DiscountBanner';
import discountBannerImage from '../../assets/images/discount-banners/GO_Rentals_Newsletter.jpg'
import ServiceDetail from '@/components/service-details/ServiceDetail';
import insuranceImage from '../../assets/images/mix/Insurance-Coverage12-600x436.jpg'
import CancelationPolicyDetails from '../../components/cancelaton-policy-details/CancelationPolicyDetails'
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import BookingForm from '@/global-components/booking-form/BookingForm';
import Hero from '@/global-components/hero-section/Hero';
import { url } from '../../utils/services';

const BookingInfo = () => {

    const insurancePoints = [
      {title: (<> <strong className='global-heading-style'>Basic Insurance:</strong> Our most affordable option, covering collision damage, theft, and third-party liability, though some out-of-pocket costs may apply.  </>)},
      {title: (<> <strong className='global-heading-style'>Excess Reduction Package:</strong>  Our most popular choice, offering Collision Damage Waiver (CDW) and Loss Damage Waiver (LDW) to reduce financial strain.  </>)},
      {title: (<> <strong className='global-heading-style'>Full Protection Coverage:</strong> Comprehensive protection, covering accidents, theft, windscreen damage, tires, and more for total peace of mind.  </>)},
    ]

    const payTypes = [
      {title: (<> <strong className='global-heading-style'>Credit/Debit Cards:</strong>  All major cards accepted for secure, PCI-compliant transactions. </>)},
      {title: (<> <strong className='global-heading-style'>Online Payment Platforms:</strong> Verified for added convenience and security.  </>)},
      {title: (<> <strong className='global-heading-style'>Flexible Payment Options:</strong> Pre-pay online or pay on-site with ease. </>)},
    ]

  const cancelationPoints = [
    {title:  `Notify us 48 hours in advance for cancellations to avoid charges.`},
    {title: `Prepaid bookings may incur cancellation fees depending on the timing.`},
    {title:  `Late cancellations or no-shows may result in no refund.`},
    {title: `Post pick-up cancellations may lead to a fee or deposit loss based on rental duration.`},
    {title: `Booking changes (like time or date adjustments) can affect rental rates.`},
    {title: `Refunds (if eligible) are processed within 3 to 10 business days using the original payment method.`},
  ]

  const { searchVehiclePayload, setSearchVehiclePayload, searchedVehicles, setSearchedVehicles } = useSearchVehicle()
    const [toustShow, setTOustShow] = useState(false)
    const [toustMessage, setToustMessage] = useState('')

  const handleSearchVehicles = async () => {
    const api = `${url}/cars/available-cars`;
    const { pickup_location, drop_location, pickup_time, drop_time } = searchVehiclePayload;

    try {
      if (pickup_location && drop_location && pickup_time && drop_time) {
        setSearchedVehicles([])
        const response = await axios.post(api, searchVehiclePayload);

        if (response.status === 200) {

          setSearchedVehicles(response.data);

          sessionStorage.setItem('pick_and_drop_details', JSON.stringify(searchVehiclePayload));
        } else {
          console.warn(`[WARN] Unexpected status code: ${response.status}`);
          alert("Unexpected response from server. Please try again later.");
        }
      } else {
        setTOustShow(true)
        setToustMessage("Please Fill All The Fields To Search Vehicle")
      }


    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          alert("Invalid search request. Please check your input and try again.");
        } else if (status >= 500) {
          alert("Server error occurred. Please try again later.");
        } else {
          alert("Something went wrong. Please try again.");
        }

        console.error(`[ERROR] ${status}:`, error.response.data);

      } else if (error.request) {
        alert("No response from server. Please check your internet connection.");
        console.error("[NO RESPONSE] Request was made but no response received.");
      } else {
        alert("Unexpected error occurred. Please try again.");
        console.error("[CLIENT ERROR] Something went wrong:", error.message);
      }
    }
  };

  return (
    <div className='booking-info-main-container'>

      <Hero bgImage={'/assets/main-banners/booking-info.jpg'}/>

      {/* <div className='page-main-heading-container'>
          <div className='page-main-booking-form-container'>
            <h3 className='vehicles-main-heading'>Vehicles for Rent in Auckland</h3>
            <BookingForm bgColor={'#f7f7f7'} boxShadow={`none`} handleSearchVehicles={handleSearchVehicles} textColor={'var(--primary-color)'} primaryButtonText={'Find my car'} />

          </div>
        </div> */}
      
      {/* <ServicesHero
        heading={'Cruise Auckland in Style'}
        paraOne={`Book your best car rental today and craft a journey to remember `}
        // paraTwo={'Find out what makes us tick.'}
        buttonText={'Book Now'}
      /> */}
      <div className='bookinng-info-content-container' style={{marginBottom: '57px'}}> 

        <div className='booking-info-max-width-container'>
          <RentalServiceHeader
            heading={'Booking Car Rental in Auckland'}
            description={`Booking a car hire in Auckland doesn’t need to be complicated, especially when you choose ZM Rentals. We’ve designed the car rental booking process to be simple and hassle-free, both on the website and in person. `}
          />
        </div>

        <DiscountBanner
          discountImage={'/assets/images/mix/Insurance-Coverage12-600x436.jpg'}
          marginBottom={'0px'}
        />


        <div className='booking-info-max-width-container'>
          
          <BookingInstruction />

          <RentalPolicy />

          <CancelationPolicyDetails
            flexDirection={'row-reverse'}
            serviceImage={'/assets/booking-info/Insurance-Coverage12-600x436.jpg'}
            serviceHeading={'Insurance Plans to Choose From'}
            desc={`At ZM Rentals, your safety during your Auckland adventure is our priority. While insurance isn’t mandatory with our car rentals, we highly recommend it for extra peace of mind. The right coverage protects you from unexpected costs, ensuring a worry-free experience.
              We offer flexible insurance options to suit different needs and budgets:`}
            points={insurancePoints}
          />

          <CancelationPolicyDetails
            flexDirection={'row'}
            serviceImage={'/assets/booking-info/Secure-Payment-Methodes.png'}
            serviceHeading={'Secure & Feasible Payment Methods'}
            desc={`At ZM Rentals, we believe in offering more than just high-quality vehicles. We prioritize customer satisfaction by providing flexible and secure payment options for booking a car rental in Auckland. We accept all major credit and debit cards, ensuring secure, PCI-compliant transactions. Additionally, we support online payment platforms to make your booking even easier and safer.`}
            points={payTypes}
          />

          <CancelationPolicyDetails
            flexDirection={'row-reverse'}
            serviceImage={'/assets/booking-info/Booking-Cancellation-and-refund.png'}
            serviceHeading={'Booking Cancellation and Refund'}
            desc={`At ZM Rentals, we know travel plans can change, and we aim to make cancellations or modifications as easy and flexible as possible:`}
            points={cancelationPoints}
          />

        </div>
        
      </div>
    </div>
  )
}

export default BookingInfo