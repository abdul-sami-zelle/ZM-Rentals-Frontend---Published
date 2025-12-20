import React, { useEffect, useState } from 'react'
import './CarDetails.css';
import Link from 'next/link';
import VehicleCard from '../../global-components/vehicle-card/VehicleCard'
import CarDetailsModal from '../../modals/car-details-modal/CarDetailsModal';
import CardShimmer from './CardShimmer'
import { usePathname } from 'next/navigation';
import EmailEnquiryModal from '../../modals/EmailEnquiryModal/EmailEnquiryModal'
import { url } from '../../utils/services';
import BookingDatesModal from '../../modals/BookingDatesModal/BookingDatesModal';



const CarDetails = ({ searchedVehicles, isVehicleSearched, data, openModal, showLength, maxWidth = '100%' }) => {

  const pathname = usePathname()


  const [modalData, setModalData] = useState([])
  const [showDetalModal, setShowDetailModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);

  const [emailModal, setEmailModal] = useState(false);

  const handleOpenDetailsModal = (item) => {
    setShowDetailModal(true);
    setModalData(item)
  }
  const handleCloseModal = () => {
    setShowDetailModal(false)
  }

  const [modalType, setModalType] = useState('')
  const handleOpenEmailEnquiry = (type) => {
    setModalType(type)
    setEmailModal(true);
    setShowDetailModal(false)
  }


  useEffect(() => {
    if (showDetalModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showDetalModal])

  

  const getAgeFromYear = (yearValue) => {
    if (!yearValue) return "Invalid year";

    // Always convert to string
    const str = yearValue.toString();

    // If format is like "2020-2018", get the last year (2018)
    const year = str.includes("-")
      ? parseInt(str.split("-").pop(), 10)
      : parseInt(str, 10);

    const currentYear = new Date().getFullYear();

    if (isNaN(year) || year > currentYear) {
      return "Invalid year";
    }

    return currentYear - year;
  };


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // mobile breakpoint
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [carId, setCarId] = useState(null);
  const [checkCarAvailable, setCheckCarAvailable] = useState(false)
  


  return (
    <div className='car-details-main-container' onClick={openModal} style={{ maxWidth: maxWidth }}>
      <h3 className={pathname === '/' ? 'main-page-section-heading' : 'section-main-heading'}>{data?.heading}</h3>
      <div className='car-details-description-and-all-vehicles-link-container' style={{ display: pathname === '/' ? 'none' : 'flex' }}>
        <Link href={'/'} className='global-heading-style'>{`Our Fleet`}</Link>
      </div>
      <div className='cars-cars-container'>
        {searchedVehicles?.length !== 0 ? (
          searchedVehicles?.slice(0, showLength)?.map((car, carIndex) => (
            <VehicleCard
              key={carIndex}
              vehicleData={car}
              vehicleId={car.car_id}
              vehicleImage={url + car.image}
              vehicleName={car.name}
              vehicleAge={getAgeFromYear(car.details.model)}
              seePrice={'See Price'}
              transmission={car.details.transmission}
              fuelType={car.details.fuel_type}
              handleModalOpen={() => handleOpenDetailsModal(car)}
            />
          ))
        ) : (
          Array.from({ length: isMobile ? 1 : 4 }).map((_, index) => (
            <CardShimmer key={index} />
          ))
        )}

      </div>

      <div className='vehicle-page-cars-details'>
        <p className='global-content-style'>{data?.description}</p>
      </div>

      <CarDetailsModal
        showModal={showDetalModal}
        handleClose={handleCloseModal}
        vehicleDetails={modalData}
        isVehicleSearched={isVehicleSearched}
        emailModal={handleOpenEmailEnquiry}
        setBookingModal={setBookingModal}
        setCarId={setCarId}
        setCheckCarAvailable={setCheckCarAvailable}
      />

      <EmailEnquiryModal
        showEmailEnquiry={emailModal}
        setShowEmailEnquiry={setEmailModal}
        carObj={modalData}
        modalType={modalType}
        
      />

      <BookingDatesModal 
        showBookingModal={checkCarAvailable}
        setShowBookingModal={setCheckCarAvailable}
        carId={carId}
        carData={modalData}
      />
    </div>
  )
}

export default CarDetails