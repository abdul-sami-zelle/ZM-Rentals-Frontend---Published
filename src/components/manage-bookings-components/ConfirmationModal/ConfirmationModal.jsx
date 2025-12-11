import React from 'react'
import './ConfirmationModal.css'
import { FaCalendarCheck } from "react-icons/fa";
import { CgCloseO } from 'react-icons/cg';


// #28a745

const ConfirmationModal = ({showUpdadeSuccess, setShowUpdateSuccess}) => {

    const handleCloseUpdateSuccessModal = () => {
        setShowUpdateSuccess(false);
        window.location.href = '/'
    }
  return (
    <div className={`confirmation-modal-main-contianer ${showUpdadeSuccess ? 'show-confirmation-modal' : ''}`} onClick={handleCloseUpdateSuccessModal}>
        <div className={`confirmation-inner-modal ${showUpdadeSuccess ? 'slide-up-inner-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
            <CgCloseO size={20} color='#000'  className='confirmation-close-modal' onClick={handleCloseUpdateSuccessModal}/>
            <div className='content-contianer'>
                <FaCalendarCheck size={50} color='#28a745' />

                <span className='title-and-slogan-span'>
                    <h3>All Set!</h3>
                    <p>We’ve updated your booking with the latest details.</p>
                </span>

                <button className='explore-more-btn'>Explore More</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal