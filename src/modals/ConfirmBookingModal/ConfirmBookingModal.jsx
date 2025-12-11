import React from 'react'
import './ConfirmBookingModal.css'
import { CgCloseO } from "react-icons/cg";
import { FaCar } from "react-icons/fa";


const ConfirmBookingModal = ({showModal, handleCloseModal, modalMessages, handleConfirm}) => {
  return (
    <div className={`confirmation-modal-main-continar ${showModal ? 'show-confirmation-modal' : ''}`} onClick={handleCloseModal}>
        <div className={`confirmation-modal-inner ${showModal ? 'show-confirmation0inner' : ''}`} onClick={(e) => e.stopPropagation()}>
            <CgCloseO size={25} color='#000' className='confirmation-modal-close' onClick={handleCloseModal} />

            <FaCar size={50} color='var(--secondary-color)' />

            <div className='confirmation-modal-message'>
                <h3>{modalMessages.head}</h3>
                <p>{modalMessages.para}</p>
            </div>
            <button onClick={handleConfirm} className='confirmation-success-button'>Yes, I am Sure</button>
        </div>
    </div>
  )
}

export default ConfirmBookingModal