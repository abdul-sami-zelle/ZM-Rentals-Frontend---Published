import React, { useEffect, useState } from 'react'
import './BottomInsurance.css'
import { url } from '../../../utils/services'
import axios from 'axios';

const BottomInsurance = ({ editBookingPayload, setEditBookingPayload, carId, isEditabel, setBottomModal }) => {

  const [vehicleData, setVehicleData] = useState({});
  const [selectedPackage, setSelectedPackage] = useState()
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null)

  const handleGetCarWithId = async () => {
    const api = `${url}/cars/get/${editBookingPayload?.booking?.car_id}`;
    try {
      const response = await axios.get(api);
      if (response.status === 200) {
        setVehicleData(response.data)
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }
  useEffect(() => { handleGetCarWithId() }, [carId])
  useEffect(() => {
    const selectedOption = vehicleData?.insurance?.find((item) => item.id === editBookingPayload?.booking?.insurance_id);
    setSelectedPackage(selectedOption?.insurance_option_id)
  }, [vehicleData])

  const handleInsuranceSelect = (item) => {
    setSelectedPackage(item.insurance_option_id)
    setSelectedInsuranceId(item.id)
    
  }

  const handleUpdateInsuranceId = () => {
    setEditBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        insurance_id: selectedInsuranceId
      }
    }))
    setBottomModal(false)
  }

  return (
    <div className='mobile-insurance-main-contianer'>
      <div className='insurace-update-options'>
        {vehicleData && vehicleData?.insurance?.map((item, index) => (
          <div className='insurance-update-single-option' style={{opacity: isEditabel.insuranceInfo ? 1 : 0.4}} onClick={() => isEditabel.insuranceInfo ? handleInsuranceSelect(item) : null}>
            <div className='insurance-update-head'>
              <input
                type='radio'
                key={item.id}
                checked={item.insurance_option_id === selectedPackage}
                readOnly
              />
              <h3>{item.name}</h3>
            </div>

            <div className='insuranceupdate-bond-and-excees'>
              <span>
                <p>Bond</p>
                <p>NZD {item.bond}</p>
              </span>
              <span>
                <p>Excess</p>
                <p>NZD {item.excess}</p>
              </span>
            </div>

            <div className='insurance-update-price'>
              {parseInt(item.rate) === 0 ? (
                <h3>Free</h3>
              ) : (
                <h3>NZD {item.rate}</h3>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='insurace-update-button-container'>
        <button onClick={handleUpdateInsuranceId}>Update Insurance</button>
      </div>

    </div>
  )
}

export default BottomInsurance