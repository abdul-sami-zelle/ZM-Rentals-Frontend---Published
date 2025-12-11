'use client'
import React, { useEffect, useRef, useState } from 'react'
import './InsuranceType.css';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useBookingContext } from '@/context/bookingContext/bookingContext';
import { AiFillQuestionCircle } from "react-icons/ai";
import { checkIsZero } from '../../../utils/checkZero'
import { useOutsideClick } from '@/utils/DetectClickOutside';

const InsuranceType = ({ insurances, insuranceSeleted, setInsuranceSelected, packageSelected, setPackageSelected }) => {

  const shuttleOptions = [
    { id: 1, name: <><strong>Yes,</strong> from <strong>Domestic</strong> arrivals </> },
    { id: 2, name: <><strong>Yes,</strong> from <strong>International</strong> arrivals </> },
    { id: 3, name: <><strong>No,</strong> I'll make my own way to the branch </> },
  ]

  const [pickAndDrop, setPickAndDrop] = useState({})
  useEffect(() => {
    const locationData = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
    setPickAndDrop(locationData)
  }, [])

  const sortInsurances = (array = []) => {
    const zeroPriceInsurance = array.filter(
      (item) => parseInt(item.rate, 10) === 0
    );

    const otherInsurances = array
      .filter((item) => parseInt(item.rate, 10) !== 0)
      .sort((a, b) => parseInt(a.rate, 10) - parseInt(b.rate, 10));

    return [...zeroPriceInsurance, ...otherInsurances];
  };

  const { setBookingPayload, bookingPayload, bookingVehicleData, activeShuttle, setActiveShuttle, arrivlaErrors, setArrivalErrors, } = useBookingContext();
  const handleSelectInsurance = (item) => {
    setInsuranceSelected(item)
    setPackageSelected(item.insurance_option_id);
    setBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        car_id: bookingVehicleData.car_id,
        insurance_id: item.id,
        drop_location: pickAndDrop.drop_location,
        drop_time: pickAndDrop.drop_time,
        pickup_location: pickAndDrop.pickup_location,
        pickup_time: pickAndDrop.pickup_time
      }
    }))

  }

  useEffect(() => {

    const firstInsurance = sortInsurances(insurances)[0];
    if (!Object.keys(insuranceSeleted).length > 0) {
      setInsuranceSelected(firstInsurance)
    }
    if (!packageSelected) {
      setPackageSelected(firstInsurance?.insurance_option_id)
    }

    setBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        insurance_id: prev.booking.insurance_id ?? firstInsurance?.id
      }
    }))

  }, []);

  useEffect(() => {
    setBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        car_id: bookingVehicleData?.car_id,
        drop_location: pickAndDrop?.drop_location,
        drop_time: pickAndDrop?.drop_time,
        pickup_location: pickAndDrop?.pickup_location,
        pickup_time: pickAndDrop?.pickup_time
      }
    }))
  }, [pickAndDrop])

  const handleSelectShuttleOption = (id) => {
    setActiveShuttle(id)
    setBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        shuttle_option: id
      }
    }))
  }

  const [flightReason, setFlightReason] = useState(false);
  const handleOpenFlightReason = () => {
    setFlightReason((prev) => prev === true ? false : true)
  }

  const handleSetFlightInfo = (event) => {
    const { name, value } = event.target;

    setBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        [name]: value
      }
    }))
    // Clear error live when user starts typing
    setArrivalErrors((prev) => ({
      ...prev,
      [name]: value.trim() !== "" ? "" : prev[name], // clear only if not empty
    }));
  }

  const infoRef = useRef();
  useOutsideClick(infoRef, () => setFlightReason(false))

  return (

    <div className='insurance-type-main-container'>

      {insurances?.length !== 0 ? (
        <div className='insurance-type-body'>
          {insurances?.length > 0 && sortInsurances(insurances).map((item, index) => (
            <div
              key={index}
              className={`insurance-single-tab ${packageSelected === index ? 'insurance-single-tab-selected' : ''} `}
              onClick={() => handleSelectInsurance(item)}
            >
              {item.popular && <span className='popular-tag'>{item.popular}</span>}
              <label className='select-insurance-radio-container'>
                <input
                  type='radio'
                  name='insurance'
                  checked={packageSelected === item.insurance_option_id}
                  readOnly
                />
                {item.name}
              </label>

              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <p>Excess</p>
                <p>NZ$ {checkIsZero(item.excess)}</p>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <p>Bond</p>
                <p>NZ$ {checkIsZero(item.bond)}</p>
              </span>


              <p className='insurance-bottom-text'>{parseInt(item.rate) === 0 ? 'Free' : `NZ$ ${parseInt(item.rate)}/day`}</p>

            </div>
          ))}
        </div>
      ) : (
        <div className='insurance-shimmer-main-container'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}


      {insurances?.length !== 0 ? (
        <div className='shuttle-options-main-contianer'>
          <h3 className='shuttle-options-main-heading'>Would you like our shuttle to pick you up?</h3>

          <div className='shuttle-options'>
            {shuttleOptions.map((item) => (
              <label key={item.id} className={`shuttle-single-option ${activeShuttle === item.id ? 'selected-shuttle-option' : ''}`} onClick={() => handleSelectShuttleOption(item.id)}>
                <input type='radio' readOnly checked={item.id === bookingPayload.booking.shuttle_option} />
                <span className='shuttle-radio'></span>
                {item.name}
              </label>
            ))}
          </div>

          {
            activeShuttle !== 3 && (
              <div className='flight-and-arrival-city'>

                <div className='flight-number-input-contianer'>
                  <p className='flight-number-heading'>Flight Number <AiFillQuestionCircle color='var(--primary-color)' size={15} onClick={handleOpenFlightReason} /></p>
                  <input
                    type='text'
                    name='flight_number'
                    placeholder='Flight Number'
                    className='flight-number-input-box'
                    style={{ border: arrivlaErrors.flight_number ? '1px solid red' : '1px solid #f1f1f1' }}
                    value={bookingPayload?.booking?.flight_number}
                    onChange={handleSetFlightInfo}
                  />
                  <div ref={infoRef} className={`flight-number-reason-contianer ${flightReason ? 'show-reason-message' : ''}`}>
                    <p>We'll monitor your flight to make sure we have your car ready on time, even if your flight is early or late </p>
                  </div>
                </div>

                <div className='arrival-city-container'>
                  <p className='flight-number-heading'>Arrival City <AiFillQuestionCircle color='var(--primary-color)' size={15} /></p>
                  <input
                    type='text'
                    name='arrival_city'
                    placeholder='Arrival City'
                    className='flight-number-input-box'
                    value={bookingPayload?.booking?.arrival_city}
                    style={{ border: arrivlaErrors.arrival_city ? '1px solid red' : '1px solid #f1f1f1' }}
                    onChange={handleSetFlightInfo}
                  />
                </div>
              </div>

            )
          }



        </div>
      ) : (
        <div className='insurance-faq-shimmer'></div>
      )}

    </div>
  )
}

export default InsuranceType