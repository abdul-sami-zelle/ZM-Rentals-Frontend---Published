'use client'
import React, { useState } from 'react'
import './CarRentalServices.css'
import ServicesHero from '../../components/services-hero/ServicesHero'
import DiscountBanner from '@/global-components/discount-banner/DiscountBanner'
import discountBannerImage from '../../assets/images/discount-banners/GO_Rentals_Newsletter.jpg'
import RentalServiceHeader from '../../components/rental-services-head/RentalServiceHeader'
import ServiceDetail from '../../components/service-details/ServiceDetail'
import serviceImage from '../../assets/images/mix/speedy-rentasl-4.jpg';
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext'
import BookingForm from '@/global-components/booking-form/BookingForm'
import Hero from '@/global-components/hero-section/Hero'
import { url } from '../../utils/services'

const CarRentalServices = () => {

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
    <div className='rental-services-details-main-container'> 

      {/* <div className='page-main-heading-container'>
          <div className='page-main-booking-form-container'>
            <h3 className='vehicles-main-heading'>Vehicles for Rent in Auckland</h3>
            <BookingForm bgColor={'#f7f7f7'} boxShadow={`none`} handleSearchVehicles={handleSearchVehicles} textColor={'var(--primary-color)'} primaryButtonText={'Find my car'} />

          </div>
        </div> */}

        <Hero bgImage={'/assets/main-banners/car-rental.jpg'} />


      {/* <ServicesHero 
        heading={'Drive Auckland Your Way'}
        paraOne={`Discover reliable car rental services & explore Auckland with ease`}
        // paraTwo={'Find out what makes us tick.'}
        buttonText={'What we are about'}
      />  */}
      <div className='rental-services-content-container'>

          


        <div className='rental-services-max-width-container'>
          <RentalServiceHeader 
            heading={'Car Rental Services in Auckland'}
            description={`Our car rental services in Auckland offer a wide range of vehicles to suit every need, whether you're here for business or leisure. Enjoy the flexibility and comfort of traveling at your own pace, with reliable options that ensure a smooth journey.`}
          />

          <ServiceDetail
            serviceImage={'/assets/Car-Rental-Services/Budget-Car-Hire.jpg'}
            serviceHeading={'Budget Car Hire'}
            flexDirection={'row'}
            serviceDescription={'Discover Auckland affordably with ZM Car Rentals’ economy car hire services. We offer fuel-efficient, budget-friendly car rentals perfect for solo travelers, couples, or small groups. Our reliable, low-cost vehicles are regularly serviced for smooth rides and excellent mileage. At ZM, we combine comfort, quality, and some of the most competitive rates in Auckland. Whether exploring the city or taking scenic day trips, our affordable car hire gives you the freedom to travel at your own pace. Book your budget car rental with ZM in advance and enjoy a stress-free, economical Auckland adventure. '}
          />

          <ServiceDetail
            serviceImage={'/assets/Car-Rental-Services/Business-Car-Rentals.jpg'}
            serviceHeading={'Business Car Rental'}
            flexDirection={'row-reverse'}
            serviceDescription={'ZM Car Rentals in Auckland offers the ideal solution for business travelers seeking stress-free commutes. Avoid public transport delays and unreliable rideshares with our corporate car hire services. Our well-maintained, professional vehicles enhance your image while ensuring smooth, punctual rides to meetings, events, and hotels across Auckland City and nearby suburbs. With a self-drive rental, enjoy the freedom to attend dinner meetings outside the CBD or relax with a scenic drive after work. Book the best business car rental in Auckland with ZM and make your trip seamless, efficient, and hassle-free.'}
          />

          <ServiceDetail
            serviceImage={'/assets/Car-Rental-Services/Family-Group-Car-Hire.jpg'}
            serviceHeading={'Family/Group Car Hire'}
            flexDirection={'row'}
            serviceDescription={`Planning a trip to Auckland with family, friends, or a tourist group? Renting a car is essential for a smooth, stress-free journey. Skip crowded buses and complicated rideshare plans with our family and group car rental options. Ideal for traveling with kids, our spacious minivans, MPVs, and 7-seater rentals offer generous legroom, ample storage, and superior comfort. Whether it's a short outing or a long adventure, our family-friendly car rentals keep everyone together and relaxed. Choose ZM Car Rentals in Auckland for the perfect vehicle and make your group travel more memorable and enjoyable.`}
          />

          <ServiceDetail
            serviceImage={'/assets/Car-Rental-Services/Short-Term-Car-Rentals.jpg'}
            serviceHeading={'Short-Term Car Rental'}
            flexDirection={'row-reverse'}
            serviceDescription={`Need a car in Auckland for a few days or a weekend? ZM Rentals makes short-term car rental simple, flexible, and affordable. Whether you're running errands, attending events, or planning spontaneous day trips, our short-term car hire fits your schedule without long-term commitments. Choose from spacious vehicles for family road trips, compact cars for easy commutes, or sleek options for business travel. Enjoy the freedom to extend your rental if plans change. With ZM Rentals, experience Auckland with a reliable, ready-to-go vehicle perfect for coastal drives, weekend escapes, and everything in between.`}
          />

          <ServiceDetail
            serviceImage={'/assets/Car-Rental-Services/Long-Term-Car-Rental.jpg'}
            serviceHeading={'Long-Term Car Rental'}
            flexDirection={'row'}
            serviceDescription={`Planning an extended stay in Auckland? ZM Rentals offers flexible long-term car rental options, perfect for locals, travelers, expats, and temporary residents. Skip the stress of public transport and expensive daily taxis with our cost-effective solution. Enjoy the freedom to explore Auckland’s natural beauty, landmarks, and Māori culture at your own pace. Our well-maintained vehicles are ideal for daily commutes, weekend trips, or long drives without the burden of leasing or ownership. With ZM Rentals, experience the convenience, reliability, and affordability of long-term car hire in Auckland — your dependable ride for as long as you need it.`}
          />

          <ServiceDetail
            serviceImage={'/assets/Car-Rental-Services/Self-Drive-Car-Rental-Services-in-Auckland.jpg'}
            serviceHeading={'Self-Drive Car Rental Services in Auckland'}
            flexDirection={'row-reverse'}
            serviceDescription={`Experience the freedom of exploring Auckland on your own terms with our self-drive car rental services. Forget public transport schedules, rigid itineraries, or crowded metros and travel at your own pace in total comfort. Whether you're planning a scenic day trip or visiting top attractions, our self-drive car hire offers ultimate flexibility and convenience. Grab your keys and discover Auckland’s vibrant city center or its serene suburbs. Book your comfortable self-drive rental with ZM today and experience Auckland the way it was meant to be – your way.`}
          />

          


          

        </div>

        <DiscountBanner
          discountImage={discountBannerImage}
          marginBottom={'50px'}
        />


        <div className='rental-services-max-width-container'>
            <ServiceDetail
            serviceImage={'/assets/Car-Rental-Services/(optional)-Car-Rental-Insurance.jpg'}
            serviceHeading={'Car Rental Insurance'}
            flexDirection={'row'}
            serviceDescription={`At ZM Rentals, your safety and peace of mind matter as much as your comfort. While car rental insurance isn’t mandatory, we highly recommend it for added security on Auckland’s roads. We offer flexible, budget-friendly insurance options to suit your needs. Our Basic Insurance covers essentials like collision damage, theft, and third-party liability. For reduced financial risk, our Excess Reduction Package includes Collision Damage Waiver (CDW) and Loss Damage Waiver (LDW). For full protection, choose our Full Protection Coverage, which covers accidents, theft, windscreen, tires, and more. Drive confidently with ZM Rentals — we've got you covered.`}
          />
          </div>
        
      </div>
    </div>
  )
}

export default CarRentalServices