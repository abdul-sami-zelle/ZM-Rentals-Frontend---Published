import React, { useState, useEffect } from 'react'
import './CarDateNotAvailable.css';
import { IoIosClose } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import CardElementStripe from '../../components/book-now-components/payments/cardElement';

const CarDateNotAvailable = ({ showModal, handleCloseModal, modalMessages, cardElement,handleRetryPayment,useAnotherCard,handleUseAnotherCard }) => {

    const handleNavigateToHome = () => {
        handleCloseModal()
        window.location.href = '/';
    }

    // const [useAnotherCard, setUseAnotherCard] = useState(false);

    // const handleUseAnotherCard = () => {
    //     setUseAnotherCard(true)
    // }

    const handleRetryPay = () =>{
        console.log("workkkk")
        handleRetryPayment();
    }

    return (
        <div className={`date-not-available-modal-main-container ${showModal ? 'show-car-not-available-modal' : ''}`} >
            <div className={`date-not-available-modal-inner-container ${showModal ? 'slide-modal-up' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className='date-not-available-close-modal-button' onClick={handleNavigateToHome}>
                    <IoIosClose size={30} />
                </button>
                {!useAnotherCard ? <div className='date-not-available-modal-body'>
                    <FaCar size={50} color='var(--secondary-color)' />
                    <span className='date-not-available-containt'>
                        <h3>{modalMessages.head}</h3>
                        <p>{modalMessages.para}</p>
                    </span>
                </div> : <div className='date-not-available-modal-body'>
                    <p>Please enter card details</p>
                    {cardElement}
                </div>}
                <div className='date-not-available-modal-footer'>
                    {useAnotherCard ?
                        <h3 onClick={handleRetryPay}>Confirm</h3> :
                        <h3 onClick={modalMessages?.tryAnother ? handleUseAnotherCard : handleNavigateToHome}>{modalMessages.link}</h3>
                    }
                </div>
            </div>
        </div>
    )
}

export default CarDateNotAvailable