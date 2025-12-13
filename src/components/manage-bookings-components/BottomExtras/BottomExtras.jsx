import React, { useEffect, useState } from 'react'
// import '../../manage-bookings-components/ExtrasUpdateModal/ExtrasUpdateModal.css'
import './BottomExtras.css'
import { url } from '../../../utils/services';
import axios from 'axios';
import { FiMinus, FiPlus } from 'react-icons/fi';

const BottomExtras = ({isEditabel, editBookingPayload, setEditBookingPayload, carId, bottomModal, setBottomModal }) => {
  const [tempExtras, setTempExtras] = useState([])
  const [vehicleData, setVehicleData] = useState({});
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
          if (
              editBookingPayload?.booking?.extras?.length > 0 &&
              vehicleData?.extras?.length > 0
          ) {
              const mappedExtras = editBookingPayload.booking.extras.map((extraItem) => {
  
                  const foundItem = vehicleData.extras.find((v) => v.id === extraItem.extras_pricing_id);
  
                  return {
                      extras_option_id: foundItem ? foundItem.id : 0,
                      main_id: foundItem ? foundItem.extras_option_id : 0,
                      quantity: extraItem.quantity || 0, // 👈 taking quantity from booking payload
                      rate: extraItem.rate,
                      name: extraItem.name
                  };
              });
  
              setTempExtras(mappedExtras);
          }
      }, [vehicleData]);


  const handleInputChange = (item, value) => {
        const min = Number(item.min_qty) || 0;
        const max = Number(item.max_qty) || Infinity;

        // Convert to number safely
        let quantity = Number(value);
        if (isNaN(quantity)) quantity = 0;

        // Get current quantity if already exists
        const existingExtra = tempExtras.find(e => e.extras_option_id === item.id);
        const currentQty = existingExtra ? Number(existingExtra.quantity) : 0;

        // 🔹 If increasing or decreasing manually, always step by 1
        if (quantity > currentQty) quantity = currentQty + 1;
        if (quantity < currentQty) quantity = currentQty - 1;

        // 🔹 Clamp within min/max
        if (quantity < 0) quantity = 0;
        if (quantity > max) quantity = max;

        // 🔹 Remove if quantity = 0
        if (quantity === 0) {
            setTempExtras(prev =>
                prev.filter(extra => extra.extras_option_id !== item.id)
            );
            return;
        }

        // 🔹 Update or add new
        setTempExtras(prev => {
            const existingIndex = prev.findIndex(
                extra => extra.extras_option_id === item.id
            );

            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity,
                };
                return updated;
            }

            // Add new item on first click
            return [
                ...prev,
                {
                    extras_option_id: item.id,
                    main_id: item.extras_option_id,
                    quantity,
                    rate: item.rate,
                    name: item.name
                },
            ];
        });
    };


  const handleUpdateExtras = () => {
    setEditBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        extras: tempExtras
      }
    }))
    setBottomModal(false)
  }






  return (
    <div className='bottom-extras-main-contianer'>
      <div className='bottom-extras-items-list-contianer'>

        {vehicleData?.extras?.map((item, index) => {

          return (
            <div key={item.id} className='bottom-single-extras-item'>

              <span className='bottom-extras-single-item-name-and-price'>
                <h3>{item.name}</h3>
                <p>NZD {item.rate}</p>
              </span>

              <div className='bottom-single-extras-increase-decrease'>

                <div className='bottom-single-extra-increas-decrease-buttons-and-input-container' style={{opacity: isEditabel.extrasInfo ? 1 : 0.4}}>

                  <button
                    className='bottom-single-extra-decrease-button'
                    disabled={!isEditabel.extrasInfo}
                    onClick={() => { 
                      const currentQty = tempExtras.find(q => q.extras_option_id === item.id)?.quantity || 0;
                      if (!isEditabel.extrasInfo || currentQty === 0) return
                      handleInputChange(item, currentQty - 1);
                    }}
                  >
                    <FiMinus size={20} color='#FFF' />
                  </button>

                  <input
                    type="number"
                    className="bottom-single-extra-input-value"
                    readOnly
                    value={
                      tempExtras.find((qty) => qty.extras_option_id === item.id)?.quantity ?? 0
                    }
                    onChange={(e) => handleInputChange(item, e.target.value)}
                  />


                  <button
                    className='bottom-single-extra-increase-button'
                    disabled={!isEditabel.extrasInfo}
                    onClick={() => {
                      if (!isEditabel.extrasInfo) return
                      const currentQty = tempExtras.find(q => q.extras_option_id === item.id)?.quantity || 0;
                      handleInputChange(item, currentQty + 1);
                    }}
                  >
                    <FiPlus size={20} color='#FFF' />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      </div>
      <div className='bottom-extras-update-button-contianer' style={{opacity: isEditabel.extrasInfo ? 1 : 0.4}}>
        <button disabled={!isEditabel.extrasInfo} onClick={handleUpdateExtras}>Update Extras</button>
      </div>
    </div>
  )
}

export default BottomExtras