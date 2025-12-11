import React from 'react'
import './SummaryModal.css'
import { CgCloseO } from "react-icons/cg";


const SummaryModal = ({ showModal, handleClose, vehicleData, editBookingPayload }) => {



    const handleExtrasTotal = () => {
        const extrasPrices = [];

        let extrasTotal = 0

        editBookingPayload?.booking?.extras.map((item, index) => {
            extrasPrices.push((parseFloat(item.rate) * vehicleData?.rates?.length) * item.quantity)
        })

        extrasPrices.map((item) => {
            extrasTotal += parseFloat(item)
        })

        return extrasTotal
    }
    const handleGrandTotal = () => {

        const extraArray = []
        let extraValues = 0
        editBookingPayload?.booking?.extras?.map((item, index) => {
            extraArray.push((parseFloat(item.rate) * vehicleData?.rates?.length) * item.quantity)
        })
        extraArray.map((item) => {
            extraValues += parseFloat(item)
        })

        const carRates = vehicleData?.car_rates;
        const discount = vehicleData?.discount_amount;
        const subTotal = parseFloat(carRates) - parseFloat(discount);
        const offHourCharges = vehicleData?.off_hour_charges;
        const insuranceTotal = vehicleData?.insurances ? parseFloat(vehicleData?.insurances[0]?.CarInsurancePricing?.rate) * vehicleData?.rates?.length : 0

        const grandTotal = parseFloat(subTotal) + parseFloat(offHourCharges) + parseFloat(insuranceTotal) + parseFloat(extraValues)


        return grandTotal
    }
    return (
        <div className={`summary-modal-main-contianer ${showModal ? 'show-summary-main' : ''}`} onClick={handleClose}>
            <div className={`summary-modal-inner ${showModal ? 'show-summary-inner' : ''}`} onClick={(e) => e.stopPropagation}>
                <div className='summary-modal-head'>
                    <h3>Summary</h3>
                    <CgCloseO size={20} color='#000' onClick={handleClose} />
                </div>

                <div className='summary-values-contianer'>
                    <span>
                        <p>Sub Total</p>
                        <h3>NZD {parseFloat(vehicleData?.car_rates)}</h3>
                    </span>
                    {parseInt(vehicleData?.off_hour_charges) > 0 && (
                        <span>
                            <p>Off hour charges</p>
                            <h3>NZD {vehicleData?.off_hour_charges}</h3>
                        </span>
                    )}

                    <span>
                        <p>Insurance</p>
                        <h3>NZD {vehicleData?.insurances ? parseFloat(vehicleData?.insurances[0]?.CarInsurancePricing?.rate) * vehicleData?.rates?.length : 0}</h3>
                    </span>

                    <span>
                        <p>Extras</p>
                        <h3>NZD {handleExtrasTotal()}</h3>
                    </span>

                    <span style={{borderTop: '1px solid #afafaf' , paddingTop: '15px'}}>
                        <p style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>Grand Total</p>
                        <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>NZD {handleGrandTotal()}</h3>

                    </span>
                </div>
            </div>
        </div>
    )
}

export default SummaryModal