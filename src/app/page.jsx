'use client';

import DiscountBanner from '../global-components/discount-banner/DiscountBanner'
import Hero from '../global-components/hero-section/Hero'
import GalleryDetails from '../components/gallery-details/GalleryDetails'
import PackageDetails from '../components/package-details/PackageDetails'
import Benefits from '../components/benefit/Benefits'
import FeedbackGallery from '../components/feedback-gallery/FeedbackGallery'
import HappySnapGallery from '../components/happy-snap-gallery/HappySnapGallery'
import Locations from '../components/locations/Locations'
import FrequentlyAsked from '../components/frequently-asked/FrequentlyAsked'
import RollingContent from '../components/rolling-content/RollingContent'
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import MainLoader from '../loaders/MainLoader/MainLoader'
import CarDetails from '@/components/car-details/CarDetails';
import { useEffect } from 'react';
import axios from 'axios';
import { useBookingContext } from '@/context/bookingContext/bookingContext';
import { url } from '@/utils/services';



export default function Home() {

  const { loader } = useSearchVehicle()
  const { searchedVehicles, isVehicleSearched, setIsVehicleSearched, setSearchedVehicles, getCurrentFormattedHourInAuckland } = useSearchVehicle()

  const packageDescription = [
    `
      As a proud Kiwi-owned and Kiwi-operated business, sustainability is integrated within us. With Auckland’s growing tourism, we recognize the need to 
      reduce our environmental impact while still offering convenient travel options. That’s why a large part of our fleet includes hybrid vehicles, designed 
      to cut fuel consumption and lower carbon emissions. These cars combine petrol engines with electric motors, making them far more efficient and eco-friendly 
      than traditional vehicles. By choosing ZM, you’re not just renting a car, you’re supporting a cleaner, greener Auckland. We’re proud to be part of the movement 
      toward responsible tourism, helping preserve the city's natural beauty while offering reliable and comfortable car rental solutions.
    `,
  ]

  const packageDescriptionTwo = [
    `
      At ZM Rentals, we take pride in offering a carefully selected fleet of vehicles designed to make your Auckland car hire experience seamless. 
      Our experts have handpicked vehicles that are both budget-friendly and built for a smooth, safe ride. Whether you're looking for a car for scenic 
      drives in the suburbs, need a spacious vehicle for a group trip, or want something affordable, we have the perfect choice for you. 
    `,
    `
      Whatever your needs, our car hire fleet in Auckland ensures you'll find the right fit for your journey.
    `,
  ]

  const pickAndDropDetails = [
    `
      Start and end your Auckland adventure as smoothly as possible, whether you book online or in person. At ZM Rentals, we focus on simplicity, 
      making your Auckland car rental experience fast and hassle-free. Reserve your preferred car in advance or make a quick last-minute check-in; 
      either way, the process is straightforward and efficient. Our easy-to-use online booking system saves you time, while our in-person reservation 
      process ensures a swift experience. With ZM Rentals, Auckland car hire takes just minutes, no long queues or complicated steps. Pick up your vehicle 
      from our convenient near-airport depot and drop it off effortlessly when you're ready to say goodbye to New Zealand.
    `,
  ]

  const aboutGoRentals = [
    `
      At ZM Rentals, we’re a proud Kiwi startup on a mission to drive positive change toward a greener, safer environment. We make eco-friendly travel 
      affordable and accessible by offering carbon-conscious Auckland car rentals at budget-friendly rates.
    `,
    `
      Our mission is simple: to empower travelers to explore Auckland sustainably without the heavy cost. By providing eco-conscious, wallet-friendly 
      vehicle options, we help you enjoy Auckland’s stunning landscapes while leaving a lighter footprint. 
    `,
    `
      At ZM Rentals, it’s not just about getting you on the road — it’s about making every journey a step toward a more sustainable future.
    `,
  ]

  const faqData = [
    {
      question: 'Do I need an international driver’s license to rent a car in New Zealand?',
      answer: (<>
        While an international driver’s license is not a requirement, your overseas license must be in English. Otherwise, you’ll need an official translation or an International Driving Permit (IDP).
      </>),
      height: '50px'
    },
    {
      question: 'What is the minimum age to rent a car in New Zealand?',
      answer: (
        <>
          To rent a car in New Zealand, the driver must be at least 21 years old. However, some rental companies may charge a young driver surcharge if you are under 25 years of age.
        </>
      ),
      height: '50px'
    },
  ]


  const carsDetails = [
    {
      heading: 'Wide Collection of Rental Cars in Auckland',
    },
  ]

  const getAllVehicles = async () => {
    const api = `${url}/cars/get`;

    
    try {
      const response = await axios.get(api);
      if (response.status === 200) {
        setSearchedVehicles(response.data);
      } else {
        console.error("Unexpected response from server. Please try again later.")
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }

  useEffect(() => {
      if(searchedVehicles?.length === 0) {
        getAllVehicles();
      }
    
  }, []);



  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'var(--background)' }}>
      {loader && <MainLoader />}
      <Hero marginBottom='20px' bgImage={'/assets/main-banners/home-page.jpg'}/>

      {carsDetails?.map((item, index) => (
          <CarDetails
            key={index}
            data={item}
            searchedVehicles={searchedVehicles}
            isVehicleSearched={false}
            showLength={8}
            maxWidth={'1323px'}
          />
        ))}

      <DiscountBanner
        discountImage={'/assets/images/discount-banners/Go_Rentals_Newsletter.jpg'}
        marginBottom={'25px'}
      />

      

      <GalleryDetails
        flexDirection={'row'}
      />

      <PackageDetails
        packageHeading={'Our Commitment to Sustainability'}
        data={packageDescription}
        navigateUrl={'/car-rental-services'}
        sectionImage={'/assets/home/Home_page_Our_Commitment_to_Sustainability_image.jpg'}
        flexDirection={'row'}
        buttonText={'Find Out More'}
      />

      <PackageDetails
        packageHeading={'Curated Fleet Collection in Auckland'}
        data={packageDescriptionTwo}
        navigateUrl={'/vehicles'}
        sectionImage={'/assets/home/home_page_Curated_Fleet_Collection_image.jpg'}
        flexDirection={'row-reverse'}
        buttonText={'Hire Now'}
      />

      <Benefits />

      <Locations /> 

      <PackageDetails
        packageHeading={'Smooth Pick-Up and Drop-Off with ZM Car Rentals'}
        data={pickAndDropDetails}
        sectionImage={'/assets/home/home_Smooth_Pick-Up_and_Drop-Off_image.jpg'}
        flexDirection={'row'}
        buttonText={'Find Out More'}
        navigateUrl='/booking-info'
      />

      <FeedbackGallery />

      <HappySnapGallery />

      <PackageDetails
        packageHeading={'About ZM Rentals'}
        data={aboutGoRentals}
        sectionImage={'/assets/home/home_About_ZM_Rentals_image_1.png'}
        flexDirection={'row-reverse'}
        // buttonText={'Download App'}
        display={'none'}
      />

      <FrequentlyAsked
        faqData={faqData}
      />

      <RollingContent />

    </div>
  );
}
