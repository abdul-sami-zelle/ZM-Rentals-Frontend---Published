import React, { useEffect } from 'react'
import './Toust.css';
import { IoIosClose } from "react-icons/io";

const Toust = ({showToust, setShowToust, message}) => {
    useEffect(() => {
        setTimeout(() => {
            setShowToust(false);
        }, 3000);
    }, [showToust])
    const handleCloseToust = () => {
        setShowToust(false)
    }
  return (
    <div className={`toust-main-container ${showToust ? 'show-toust-message' : ''}`}>
        <div className='toust-message-container'>
            <h3>{message}</h3>
        </div>
        <button className='toust-close-button' onClick={handleCloseToust}>
            <IoIosClose size={30} color='#FFFFFF' />
        </button>
    </div>
  )
}

export default Toust