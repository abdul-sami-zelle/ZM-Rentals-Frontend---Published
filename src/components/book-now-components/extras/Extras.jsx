'use client'
import React, { useState } from 'react'
import './Extras.css'
import { useBookingContext } from '../../../context/bookingContext/bookingContext'
import { FaPlus, FaMinus } from "react-icons/fa6";
import {checkIsZero} from '../../../utils/checkZero'


const Extras = ({ extras }) => {

  const { setBookingPayload, extraQuantities, setExtraQuantities } = useBookingContext();
  // const [extraQuantities, setExtraQuantities] = useState({});

  const handleQuantityChange = (index, type, item) => {
    setExtraQuantities((prev) => {
      const currentQty = prev[index]?.quantity || 0;
      const minQty = parseInt(item.min_qty) || 1;
      const maxQty = parseInt(item.max_qty) || 99;

      let newQty = currentQty;

      if (type === 'increment') {
        if (currentQty === 0) {
          newQty = minQty;
        } else if (currentQty < maxQty) {
          newQty = currentQty + 1;
        } else {
          return prev; // don't exceed max
        }
      }

      if (type === 'decrement') {
        if (currentQty > minQty) {
          newQty = currentQty - 1;
        } else if (currentQty === minQty) {
          newQty = 0;
        } else {
          return prev; // already 0
        }
      }

      const updated = { ...prev };

      if (newQty === 0) {
        delete updated[index]; // remove from list
      } else {
        updated[index] = {
          main_id: item.extras_option_id,
          extras_option_id: item.id,
          quantity: newQty
        };
      }

      // Update bookingPayload in context
      setBookingPayload((prevPayload) => ({
        ...prevPayload,
        booking: {
          ...prevPayload.booking,
          extras: Object.values(updated)
        }
      }));

      return updated;
    });
  };



  return (
    <div className='extras-main-container'>
      {extras?.length > 0 && extras.map((item, index) => (
        <div key={index} className='single-extra-item'>
          <div className='add-or-remove-quantity-container'>

            <div className='quantity-add-main-container'>
              <button
                className='quantity-minus-button'
                onClick={() => handleQuantityChange(index, 'decrement', item)}
              >
                <FaMinus size={20} />
              </button>
              <input
                type='text'
                name='quantity'
                className='quantity-show-input'
                inputMode='numeric'
                min={item.min_qty}
                max={item.max_qty}
                pattern='[0-9]*'
                readOnly
                value={extraQuantities[index]?.quantity || 0}
              />
              <button
                className='quantity-add-button'
                onClick={() => handleQuantityChange(index, 'increment', item)}
              >
                <FaPlus size={20} />
              </button>
            </div>

          </div>
          <div className='extra-item-and-price-container'>
            <h3>{item.name}</h3>
            <p>NZ$ {checkIsZero(item.rate)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Extras


