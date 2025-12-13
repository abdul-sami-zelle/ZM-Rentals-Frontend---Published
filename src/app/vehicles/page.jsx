'use client'

import React, { useEffect, useRef, useState } from 'react'
import './Vehicles.css'
import BookingForm from '../../global-components/booking-form/BookingForm'
import CarDetails from '../../components/car-details/CarDetails'
import PackageDetails from '../../components/package-details/PackageDetails'
import { useSearchVehicle } from '../../context/searchVehicleContext/searchVehicleContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Toust from '../../modals/Toust/Toust'
import StickySection from '../../global-components/sticky-section/StickySection'
import { url } from '../../utils/services'


const Vehicles = () => {

  const { searchVehiclePayload, setSearchVehiclePayload, searchedVehicles, setSearchedVehicles, isVehicleSearched, setIsVehicleSearched } = useSearchVehicle()
  const [toustShow, setTOustShow] = useState(false)
  const [toustMessage, setToustMessage] = useState('')

  const [isPickupSelected, setIsPickupSelected] = useState(false)
  useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [searchedVehicles]);

  const getAllVehicles = async () => {
    const api = `${url}/cars/get`;

    try {
      const response = await axios.get(api);
      if (response.status === 200) {
        setSearchedVehicles(response.data);
      } else {
        console.warn("Unexpected response from server. Please try again later.")
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }

  useEffect(() => {
    if (!searchedVehicles || searchedVehicles.length === 0) {
      getAllVehicles();
    }
  }, []);

  const carsDetails = [
    {
      heading: 'Curated Collection of Rental Cars in Auckland',
      description: (<> At ZM Rentals, we take pride in offering a carefully selected fleet of vehicles designed to make your Auckland car hire experience seamless. Our experts have handpicked
        vehicles that are both budget-friendly and built for a smooth, safe ride. Whether you're looking for a car for scenic drives in the suburbs, need a spacious vehicle
        for a group trip, or want something affordable, we have the perfect choice for you. <br /> <br />
        Whatever your needs, our car hire fleet in Auckland ensures you'll find the right fit for your journey.
      </>
      ),
      viewAll: 'small cars'
    },
  ]

  const fleetDetails = [
    {
      heading: 'Compact Economy Fleet',
      details: [
        `Our compact car rentals are a popular choice among both tourists and locals. These small, efficient vehicles are perfect for solo travelers or small groups, offering the ideal size for navigating Auckland. Whether you’re here for city driving or local sightseeing, our compact cars are easy to drive, energy-efficient, and low-maintenance.`,
        `Our economy car rental fleet is also a great budget-friendly option, with lower rental rates and excellent fuel economy. This makes them perfect for long trips or extended stays where you need to manage the expenditure carefully. Despite their affordability, our compact cars come equipped with all the essentials, including air conditioning, comfortable seating, GPS navigation, USB ports, airbags, and anti-lock braking systems (ABS).`,
        `If you're looking for a reliable, cost-effective choice for your Auckland journey, our compact economy fleet has you covered.`,
      ],
      direction: 'row-reverse',
      img: '/assets/vehicles/vehicle_Compact_Economy_Fleet.jpg'
    },
    {
      heading: 'Sedan Rental Car',
      details: [
        `If you’re looking for more space and comfort without breaking the bank, our mid-size sedan, the 2018 Toyota Camry, is the perfect choice for your Auckland adventure. It’s roomier than a compact car, yet more affordable than full-size sedans or SUVs. With seating for up to five adults and a spacious trunk for up to three large suitcases, it offers the perfect balance of comfort and practicality.`,
        `The Camry is not only comfortable but also fuel-efficient, achieving 28-39 MPG, making it great for both city drives and long highway trips. It’s equipped with a touchscreen infotainment system, Bluetooth connectivity, USB ports, and a backup camera, enhancing your driving experience.`,
        `Safety is also a priority with this rental vehicle, with features like lane departure alert, adaptive cruise control, and a pre-collision system with pedestrian detection. Whether you're exploring the city or heading on a scenic drive, this Auckland car rental option ensures a safe, smooth, and affordable ride.`
      ],
      direction: 'row',
      img: '/assets/vehicles/vehicle_Sedan_Rental_Car.jpg'
    },
    {
      heading: 'Minivan/MPV Fleet ',
      details: [
        `Traveling to Auckland with your family or a tourist group? Our car hire fleet offers fantastic 7-seater options, perfect for adventurous group expeditions or family holiday trips. Whether you're looking for a budget-friendly option or a premium experience, we’ve got you covered.`,
        `Choose from our range of station wagons and minivans. Our Toyota Prius Alpha 2017 is a practical, fuel-efficient, and eco-friendly hybrid rental vehicle, ideal for 5 to 7 people. If you're after a more luxurious ride, we also have a Nissan Elgrand 2013, which offers a smooth, powerful drive with a spacious, high-end interior.`,
        `Another 7-seater car rental option that we have is the Prius Alpha, a lighter, more fuel-efficient, and cost-effective choice for eco-conscious travelers. Each car rental option in our minivan/MPV fleet offers ample cargo space and legroom, perfect for family or group trips around Auckland.`,
        `No matter your choice, our 7-seater vehicles ensure a comfortable and enjoyable journey.`
      ],
      direction: 'row-reverse',
      img: '/assets/vehicles/vehicle_Minivan.jpg'
    },
    {
      heading: 'Hybrid Car Fleet',
      details: [
        `Planning an extended trip to Auckland and looking for an efficient, eco-friendly ride? Hybrid car rentals are the perfect choice for both city and highway drives, offering smooth performance and reduced fuel consumption. They’re not just great for your wallet, but also for the planet.`,
        `Our hybrid rental vehicle fleet features popular models like the Toyota Prius 2017, Toyota Prius 2015, and Aqua 2015. Hybrid vehicles are designed for a quieter, more peaceful driving experience, making them ideal for driving around Auckland. These vehicles significantly reduce fuel consumption and lower carbon emissions, making them the go-to choice for eco-conscious travelers.`,
        `Whether you're traveling solo or with a group, our hybrid car rental options offer a cost-effective way to explore Auckland without affecting its natural environment. With both compact economy hybrids and spacious 7-seater hybrids available, you can enjoy an affordable, eco-friendly journey in the stunning Auckland.`,
      ],
      direction: 'row',
      img: '/assets/vehicles/vehicle_Hybrid_Car_Fleet.jpg'
    },
  ]

  const fleetFeatures = [
    {
      heading: 'Fleet Features',
      desc: `At ZM Rentals, we ensure that every rental car in our fleet offers an exceptional driving experience, combining safety, comfort, and convenience. Each vehicle is carefully chosen and equipped with modern features to enhance your journey.`,
      points: [
        {
          point: 'Ultimate Comfort',
          para: `Our self-drive car rentals are all about comfort and ease. We want you to enjoy the drive, not just endure it. Each vehicle in our fleet is equipped with air conditioning, climate control, power windows, and power steering, ensuring a smooth and relaxing ride. Enjoy adjustable upholstered seats and digital displays for navigation, entertainment, and vehicle settings, all designed for your convenience.`,
        },
        {
          point: 'Tech & Infotainment',
          para: `We go beyond the basics to make your ride enjoyable. Our Auckland car rental fleet is equipped with high-tech features like FM/AM radio, CD players, USB and AUX inputs, and Bluetooth connectivity. Many of our cars also feature touchscreen displays, multi-information displays (MID), built-in navigation systems, reverse cameras, parking sensors, and cruise control, providing a seamless and fun driving experience.`,
        },
        {
          point: 'Unmatched Safety',
          para: `Your safety is our priority. Our fleet is equipped with the latest safety features, including Anti-lock Braking Systems (ABS), Electronic Brakeforce Distribution (EBD), Brake Assist, and multiple airbags. We also include theft deterrents like immobilizers and security alarms to give you peace of mind on every journey.`,
        },
      ]
    },
    {
      heading: 'Vehicle Availability',
      desc: `At ZM Rentals, we make car hire in Auckland simple and hassle-free, offering flexibility and convenience to meet your travel needs.`,
      points: [
        {
          point: 'Pre-Booking:',
          para: `Planning ahead? Our easy online booking system and dedicated reservation helpline ensure you can secure the perfect vehicle before you arrive, so you can start your Auckland adventure stress-free.`,
        },
        {
          point: 'Walk-in Rentals:',
          para: `Arriving in Auckland and need a ride? Our friendly team is ready to assist you at our convenient Mangere car rental location, offering immediate car availability right after you land.`,
        },
        {
          point: 'Short & Long-Term:',
          para: `Whether you're in town for a quick trip or planning a longer stay, you can rent a car according to your schedule. Choose from short-term or long-term rentals and enjoy the freedom of having a reliable rental vehicle.`,
        },
      ]
    },
  ]


  const router = useRouter()

  const isValidDropDate = (pickup, drop) => {
    if (!pickup || !drop) return false; // both must exist
    return new Date(drop) >= new Date(pickup);
  };

  const handleSearchVehicles = async () => {
    const api = `${url}/cars/available-cars`;
    const { pickup_location, drop_location, pickup_time, drop_time } = searchVehiclePayload;

    if (isValidDropDate(searchVehiclePayload.pickup_time, searchVehiclePayload.drop_time)) {
      try {
        if (pickup_location && drop_location && pickup_time && drop_time) {
          setSearchedVehicles([])
          const response = await axios.post(api, searchVehiclePayload);

          if (response.status === 200) {
            setIsVehicleSearched(true)
            setSearchedVehicles(response.data);

            sessionStorage.setItem('pick_and_drop_details', JSON.stringify(searchVehiclePayload));
          } else {
            console.warn(`[WARN] Unexpected status code: ${response.status}`);
            alert("Unexpected response from server. Please try again later.");
            setIsVehicleSearched(false)
          }
        } else {
          setTOustShow(true)
          setToustMessage("Please Fill All The Fields To Search Vehicle")
        }


      } catch (error) {
        setIsVehicleSearched(false)
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
    } else {
      setTOustShow(true)
      setToustMessage("Please Fill All The Fields To Search Vehicle")
    }


  };

  const [isSticky, setIsSticky] = useState(false);
  const bookingFormRef = useRef(null)
  useEffect(() => {
    if (!bookingFormRef.current) return

    const handleScroll = () => {
      const rect = bookingFormRef?.current?.getBoundingClientRect();
      if (rect.bottom <= 93) {
        setIsSticky(true);
        
      } else {
        setIsSticky(false);
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, []);


  return (
    <div className='page-main-container '>
      {/* Max wiwdth Container Start */}
      <div className='page-max-width-container'>

        <div ref={bookingFormRef} className='page-main-heading-container'>
          <div className='page-main-booking-form-container'>
            <h3 className='vehicles-main-heading'>Vehicles for Rent in Auckland</h3>
            <BookingForm bgColor={'#f7f7f7'} boxShadow={`none`} isPickupSelected={isPickupSelected} setIsPickupSelected={setIsPickupSelected} handleSearchVehicles={handleSearchVehicles} textColor={'var(--primary-color)'} primaryButtonText={'Search Car'} />

          </div>
        </div>

        {carsDetails.map((item, index) => (
          <CarDetails
            key={index}
            data={item}
            searchedVehicles={searchedVehicles}
            isVehicleSearched={isVehicleSearched}
          />
        ))}

        {fleetDetails.map((item, index) => (
          <PackageDetails
            key={index}
            packageHeading={item.heading}
            data={item.details}
            sectionImage={item.img}
            flexDirection={item.direction}
            // buttonText={'Download App'}
            display={'none'}
          />
        ))}

        {fleetFeatures.map((item, index) => (
          <div key={index} className='fleet-details-derc-main-container'>
            <div className='fleet-detail-desc-heading-and-para'>
              <h3 className='section-main-heading'>{item.heading}</h3>
              <p className='fleet-detail-desc-para'>{item.desc}</p>
            </div>
            <div className='fleet-detail-desc-items-container'>
              {item.points.map((pointItem, pointIndex) => (
                <div key={pointIndex} className='delet-detail-desc-single-item'>
                  <h3>{pointItem.point}</h3>
                  <p>{pointItem.para}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className='perfect-ride-zm-main-container'>
          <h3 className='section-main-heading'>Find Your Perfect Ride with ZM Rentals</h3>
          <p>At ZM Rentals, we offer a carefully curated car rental fleet in Auckland with fuel-efficient and eco-friendly vehicles tailored to fit every type of traveler. Whether you’re after a compact, budget-friendly car, a stylish sedan for business, or a spacious MPV for group adventure,  we’ve got just the right wheels for you.</p>
          <p>Choosing ZM Rentals for your Auckland car hire means you’re set for a smooth, self-drive journey. Cruise through Auckland’s vibrant neighborhoods with the freedom to go where you want, when you want — all in comfort. Backed by our well-maintained vehicles and helpful team, finding the ideal rental car for your plans and budget is easy.</p>
          <p>Start planning your Auckland getaway and book your ride today with ZM Rentals!</p>
        </div>

      </div>
      {/* Max width Container End */}

      <Toust
        showToust={toustShow}
        setShowToust={setTOustShow}
        message={toustMessage}
      />

      <div className={`vehicle-booking-sticky-form ${isSticky ? 'vehicle-show-sticky-booking-form' : ''}`}>
        <StickySection bgColor={'var(--color-white)'} isPickupSelected={true} setIsPickupSelected={setIsPickupSelected} setHeight={true} handleSearchVehicles={handleSearchVehicles} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} textColor={'var(--color-white)'} textShadow={'1px 1px 2px #961502;'} primaryButtonText={'Search Cars'} />
      </div>


    </div>
  )
}

export default Vehicles