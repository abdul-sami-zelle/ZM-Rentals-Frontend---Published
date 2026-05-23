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
import { useSearchVehicle } from '../context/searchVehicleContext/searchVehicleContext'
import MainLoader from '../loaders/MainLoader/MainLoader'
import CarDetails from '../components/car-details/CarDetails'
import { useEffect } from 'react';
import axios from 'axios';
import { url } from '../utils/services';

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

  const nestedFaqData = [
    {
      category: "Airport Transfers & Timing",
      faqs: [
        {
          question: "Do you offer free pickup and drop-off from Auckland Airport? ",
          answer: <>Yes, we provide complimentary transfers during our standard office hours.</>
        },
        {
          question: "How do I request an airport pickup?",
          answer: <>Once you land and collect your luggage, call or WhatsApp us at +64 22 170 8848, and our shuttle will be sent to meet you.</>
        },
        {
          question: "Do you offer after-hours pickup and drop-off?",
          answer: <>Yes. While our standard office hours are 9:00 AM – 5:00 PM, we provide after-hours services.</>
        },
        {
          question: "How do I arrange an after-hours pickup?",
          answer: <>You must contact us in advance via email or WhatsApp to coordinate your flight arrival time with our team.</>
        },
        {
          question: "Is there a fee for after-hours service?",
          answer: <>Any service outside of 9 AM – 5 PM is considered "after hours" and may incur a surcharge. Contact us for a specific quote.</>
        },
        {
          question: "Are you open on Saturdays and Sundays?",
          answer: <>Yes, we work 7 days a week to serve our travellers.</>
        },
        {
          question: "What are your standard office hours? ",
          answer: <>Our office is open from 9:00 AM to 5:00 PM daily.</>
        },
        {
          question: "Where is your office located?",
          answer: <>We are located at 190 Kirkbride Road, Mangere, Auckland.</>
        },
        {
          question: "How far is your office from Auckland Airport? ",
          answer: <>We are just a few minutes away, making our shuttle transfer quick and easy.</>
        },
        {
          question: "Can I walk to your office from the airport?",
          answer: <>It is a short drive, but we recommend using our free shuttle service for convenience with luggage.</>
        },

      ]
    },
    {
      category: "Our Hybrid Fleet",
      faqs: [
        {
          question: "What types of cars do you have available?",
          answer: <>We carry a wide range, from compact hatchbacks, Sedan to family SUVs and people movers.</>
        },
        {
          question: "Are your cars fuel-efficient?",
          answer: <>Yes! Almost all of our cars are hybrids, helping you save money on petrol/gas.</>
        },
        {
          question: "Which hybrid models do you specialize in?",
          answer: <>We specialize in the Toyota Aqua and Toyota Prius, known for their incredible reliability and fuel economy.</>
        },
        {
          question: "Why choose a hybrid for a New Zealand road trip?",
          answer: <>Hybrids are perfect for NZ’s varied terrain, providing great torque and massive savings on fuel costs.</>
        },
        {
          question: "Are all your cars hybrids? ",
          answer: <>While the vast majority are, we do have a few petrol-only options. If you specifically want a hybrid, please select one during booking.</>
        },
        {
          question: "Are the vehicles automatic or manual?",
          answer: <> Almost all our vehicles, especially the hybrids, are automatic.</>
        },
        {
          question: "How often are the cars serviced?",
          answer: <>We maintain a strict service schedule to ensure every car is mechanically sound and safe for the road.</>
        },
        {
          question: "Do the cars have Bluetooth? ",
          answer: <>Most of our modern fleet includes Bluetooth connectivity and smartphone integration.</>
        },
      ]
    },
    {
      category: "Licensing & Driver Rules",
      faqs: [
        {
          question: "Do you accept international driver’s licenses?",
          answer: <>Yes, provided they are valid and in English.</>
        },
        {
          question: "What if my license is not in English?",
          answer: <>You must bring your original license plus a physical International Driving Permit (IDP) or an NZTA-approved translation.</>
        },
        {
          question: "Do you accept a New Zealand Restricted License?",
          answer: <>Usually, we do not. However, ZM Rentals has the discretionary authority to accept them.</>
        },
        {
          question: "How do I get approval for a Restricted License?",
          answer: <>You must contact us directly via WhatsApp, email, or visit us at 190 Kirkbride Road to discuss your case.</>
        },
        {
          question: "Is there an extra cost for Restricted License holders?",
          answer: <>Yes. If approved, there will be a little extra daily insurance cost and bond/excess.</>
        },
        {
          question: "Can I rent a car on a Learner’s License?",
          answer: <>No, we cannot rent to Learner License holders.</>
        },
        {
          question: "What is the minimum age to rent?",
          answer: <>The standard minimum age is 21 years.</>
        },
        {
          question: "Can I add an extra driver to my agreement?",
          answer: <>Yes, additional drivers are allowed for a nominal daily fee.</>
        },
        {
          question: "Does the extra driver need to be present at pickup?",
          answer: <>Yes, we must verify their physical driver’s license before they are added to the insurance.</>
        }
      ]
    },
    {
      category: "Insurance & Protection",
      faqs: [
        {
          question: "What insurance options are available on the website?",
          answer: <>We offer three tiers: Basic Cover, Standard Cover, and Premium Cover.</>
        },
        {
          question: "How much is the insurance bond?",
          answer: <>The bond amount varies depending on the car you choose and the insurance tier you select.</>
        },
        {
          question: "Does insurance cost the same for every car?",
          answer: <>No, the daily insurance rate varies based on the vehicle type.</>
        },
        {
          question: "What is an \"Excess\"?",
          answer: <>This is the maximum amount you pay in the event of damage before the insurance covers the rest.</>
        },
        {
          question: "Can I reduce my excess to zero?",
          answer: <>Yes, by selecting our Premium Cover option.</>
        },
        {
          question: "Does the insurance cover tires and windscreens?",
          answer: <>This depends on your tier. Premium levels usually provide better coverage for glass and tires.</>
        },
        {
          question: "What happens if I have an accident?",
          answer: <>Ensure everyone is safe, and then call police and us immediately. Do not admit liability to other parties.</>
        }
      ]
    },
    {
      category: "Payments & Bonds",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: <>We accept all major cards, including Mastercard, Visa, and American Express (AMEX).</>
        },
        {
          question: "Do you charge extra for AMEX?",
          answer: <>We accept AMEX as a standard payment method for your convenience.</>
        },
        {
          question: "Do I need a credit card for the security bond?",
          answer: <>Yes, a valid credit or debit card is required for the bond authorization. It is discretionary decision of ZM Rentals to accept debit card.</>
        },
        {
          question: "When will my bond be refunded?",
          answer: <>We release the bond immediately upon the car's safe return.</>
        },
        {
          question: "How long does the bond take to show in my bank?",
          answer: <>It usually takes 3–10 business days depending on your bank's policy.</>
        },
        {
          question: "Are there any hidden fees?",
          answer: <>No. All standard costs are shown during your booking.</>
        }
      ]
    },
    {
      category: "Equipment & Special Requests",
      faqs: [
        {
          question: "Do you offer baby or child seats?",
          answer: <>Yes, we have infant, toddler, and booster seats available for a nominal fee.</>
        },
        {
          question: "Are there discounts for long-term rentals?",
          answer: <>Yes! For rentals longer than a week or month, please contact us directly for a long-term discount.</>
        },
        {
          question: "Can I smoke or vape in the car?",
          answer: <>No. All ZM Rentals vehicles are strictly smoke-free and vape-free.</>
        },
        {
          question: "Are pets allowed in the vehicles?",
          answer: <>Generally no, to ensure the cars remain clean and allergy-free for all guests.</>
        }
      ]
    },
    {
      category: "On the Road & Support",
      faqs: [
        {
          question: "Is 24/7 Roadside Assistance included?",
          answer: <>Yes, all our rentals come with mechanical roadside support.</>
        },
        {
          question: "What is your fuel policy?",
          answer: <>Full-to-Full. We give it to you full; please return it full to avoid extra charges.</>
        },
        {
          question: "Can I drive on unsealed roads?",
          answer: <>Our cars are for use on maintained, sealed roads. Off-roading is prohibited.</>
        },
        {
          question: "Can I take the car on the ferry to the South Island?",
          answer: <>Yes, our cars are permitted on the Interislander and Bluebridge ferries.</>
        },
        {
          question: "What happens if I get a speeding or parking ticket?",
          answer: <>You are responsible for the fine plus a small administration fee for us to process the paperwork.</>
        },
        {
          question: "What if I need to extend my rental?",
          answer: <>Contact us as soon as possible. Extensions are subject to vehicle availability and current rates.</>
        }
      ]
    }
  ];

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
    if (searchedVehicles?.length === 0) {
      getAllVehicles();
    }

  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'var(--background)' }}>
      {loader && <MainLoader />}
      <Hero marginBottom='20px' bgImage={'/assets/main-banners/home-page.jpg'} />

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

      <FrequentlyAsked faqData={nestedFaqData} />

      <RollingContent />

    </div>
  );
}
