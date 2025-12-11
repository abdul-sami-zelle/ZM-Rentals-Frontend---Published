'use client';
import React from "react";
import './AboutPage.css';
import ServicesHero from "@/components/services-hero/ServicesHero";
import WhyChooseZM from '../../components/why-choose-zm/WhyChooseZM'
import ServiceDetail from "@/components/service-details/ServiceDetail";


export default function AboutUs() {
  return (
    <div className="about-us-page-main-container">
      <ServicesHero
        heading={'Empowering Your Journey'}
        paraOne={`Providing seamless, sustainable travel experiences with Auckland car rentals `}
        paraTwo={'Find out what makes us tick.'}
        buttonText={'What We Are About'}
        servicesHeroBg={'/assets/main-banners/About-us.jpg'}
      />

      <div className="about-us-inner-section">
        <div className="about-us-max-width-container">
          <WhyChooseZM />

          <h3 className="section-main-heading">Core Principles That Drive Us Forward</h3>

          <ServiceDetail
            serviceImage={`/assets/About-us/sustainable.jpg`}
            serviceHeading={'Sustainable Responsibility'}
            flexDirection={'row'}
            serviceDescription={'We’re committed to reducing our environmental footprint. Our fleet of hybrid and fuel-efficient vehicles ensure that you explore Auckland responsibly. With eco-friendly compact cars and spacious 7-seaters, sustainability is embedded in every journey.'}
          />

          <ServiceDetail
            serviceImage={`/assets/About-us/professional.jpg`}
            serviceHeading={'Professionalism'}
            flexDirection={'row-reverse'}
            serviceDescription={'Professionalism defines our service at every level. Our trained team provides a seamless experience from booking to return. Expect timely, courteous responses to all inquiries, making your car rental experience exceptional every time.'}
          />

          <ServiceDetail
            serviceImage={`/assets/About-us/tech-driven.jpg`}
            serviceHeading={'Tech-Driven Innovation'}
            flexDirection={'row'}
            serviceDescription={'Innovation fuels our service. From easy online bookings to digital check-ins, we embrace technology to enhance your Auckland car rental experience. Our vehicles feature modern infotainment, GPS, Bluetooth, app connectivy and much more.'}
          />

          <ServiceDetail
            serviceImage={`/assets/About-us/reliability.jpg`}
            serviceHeading={'Reliability & Integrity'}
            flexDirection={'row-reverse'}
            serviceDescription={'Trust is at the core of our business. We ensure accurate vehicle inspections, honor cancellation policies, and deliver on promises. We strive to be a reliable Auckland car hire service you can count on every time.'}
          />

          <div className="about-us-driving-standered-main-container">
            <h3 className="section-main-heading">Driving a New Standard in Auckland Car Rentals</h3>
            <div className="about-us-driving-standered-para-sec">
              <p>ZM Rentals is a relatively new name in Auckland’s car rental scene, bringing a fresh, customer-first approach. In a world of hidden fees and confusing contracts, we make car hire easy, transparent, and stress-free. Focused on authenticity over flashy marketing, we prioritize real service and real experiences. Whether you’re visiting for business or leisure, expect a smooth journey from the moment you step into your vehicle. </p>
              <p>Say goodbye to rental hassles and hello to a straightforward, enjoyable, and genuinely better car rental experience with ZM Rentals.</p>
            </div>
          </div>

          <div className="about-us-why-choose-us-main-container">
            <div className="why-choose-un-content-container">
              <p>Choosing ZM Rentals means selecting a company that values customer satisfaction, transparency, safety, and sustainability. We’re dedicated to making your time in Auckland as enjoyable and stress-free as possible, with a car rental experience that’s tailored to your needs. </p>
              <p>Ready to experience the ZM difference?</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
