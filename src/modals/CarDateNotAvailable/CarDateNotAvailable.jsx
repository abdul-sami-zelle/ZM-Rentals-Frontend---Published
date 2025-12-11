import React from 'react'
import './CarDateNotAvailable.css';
import { IoIosClose } from "react-icons/io";
import { FaCar } from "react-icons/fa";

const CarDateNotAvailable = ({ showModal, handleCloseModal, modalMessages }) => {
    
    const handleNavigateToHome = () => {
        handleCloseModal()
        window.location.href = '/';
    }
    return (
        <div className={`date-not-available-modal-main-container ${showModal ? 'show-car-not-available-modal' : ''}`} onClick={handleNavigateToHome}>
            <div className={`date-not-available-modal-inner-container ${showModal ? 'slide-modal-up' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className='date-not-available-close-modal-button' onClick={handleNavigateToHome}>
                    <IoIosClose size={30} />
                </button>
                <div className='date-not-available-modal-body'>
                    <FaCar size={50} color='var(--secondary-color)' />
                    <span className='date-not-available-containt'>
                        <h3>{modalMessages.head}</h3>
                        <p>{modalMessages.para}</p>
                    </span>
                </div>
                <div className='date-not-available-modal-footer'>
                    <h3 onClick={handleNavigateToHome}>{modalMessages.link}</h3>
                </div>
            </div>
        </div>
    )
}

export default CarDateNotAvailable