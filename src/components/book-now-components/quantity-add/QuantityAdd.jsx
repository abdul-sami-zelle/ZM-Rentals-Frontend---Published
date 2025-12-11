import React from 'react'
import './QuantityAdd.css'
import { FaPlus, FaMinus } from "react-icons/fa6";

const QuantityAdd = ({quantity, onChange, min, max}) => {
  const handleDecrement = () => {
    if (quantity > 0) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onChange(quantity + 1);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      onChange(Number(value));
    }
  };
  return (
    <div className='quantity-add-main-container'>
      <button className='quantity-minus-button' onClick={handleDecrement}>
        <FaMinus size={20} />
      </button>
      <input 
        type='text'
        name='quantity'
        value={quantity}
        min={min}
        max={max}
        onChange={handleInputChange}
        className='quantity-show-input'
        inputMode='numeric'
        pattern='[0-9]*' 
      />
      <button className='quantity-add-button' onClick={handleIncrement}>
        <FaPlus size={20} />
      </button> 
    </div>
  )
}

export default QuantityAdd