import React from 'react'
import './RefundPolicyModal.css'
import { CgClose } from 'react-icons/cg'

const RefundPolicyModal = ({showRefundModal = true, setShowRefundModal, }) => {
  return (
    <div className={`refund-policy-modal-main-container ${showRefundModal ? 'show-refund-modal' : ''}`} onClick={() => setShowRefundModal(false)}>
        <div className={`refund-modal-inner-container ${showRefundModal ? 'show-refund-modal-inner' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className='refund-modal-head'>
                <h3>ZM Rentals - Terms and Conditions</h3>

                <CgClose size={20} color='#000' style={{cursor:'pointer'}} onClick={() => setShowRefundModal(false)} />
            </div>

            <div className='refund-policy-content-container'>

                <p className='para-font'>
                    This vehicle rental contract establishes the complete agreement between the rental provider and customer, incorporating both the specific rental details (sections 1-7) and the comprehensive terms outlined below.
                </p>
                <p className='para-font'>
                    This Contract is established between ZM Rentals (referred to as "the Company"), the primary renter specified in section 1 (referred to as "the Customer"), and, when applicable, the credit card holder mentioned in section 1 (referred to as "the Cardholder"). This agreement defines the conditions under which the Company provides rental services for the designated vehicle(s) listed in section 3, including any substitute or replacement vehicles provided during the rental period.
                </p>
                <p className='para-font'>
                    Both the Customer and Cardholder bear complete joint responsibility for all actions taken and obligations fulfilled under this rental contract, regardless of who actually performs these duties.
                </p>

                <h3 className='heading-one'>
                    Rental Agreement Foundation
                </h3>

                <span className='content-section'>
                    <h3 className='heading-two'>Core Commitment</h3>
                    <p className='para-font'>
                        The Company commits to providing the designated vehicle for rental purposes, while the Customer accepts responsibility for the vehicle under the specific terms detailed throughout this contract.
                    </p>
                </span>

                <span className='content-section'>
                    <h3 className='heading-two'>Rental Duration Parameters</h3>
                    <p className='para-font'>
                        The vehicle rental period commences and concludes according to the timeframes specified in section 3, subject to approved extensions or early returns as outlined in sections 21 and 22. When vehicles are returned outside standard business hours or to designated airport facilities, the Customer maintains full responsibility for the vehicle, including applicable after-hours charges and any damage that occurs until a Company representative completes the return inspection process.
                    </p>
                </span>
                
                <span className='content-section'>
                    <h3 className='heading-two'>Vehicle Specification Flexibility</h3>
                    <p className='para-font'>
                        The Customer grants the Company authority to modify section 3 details at pickup time, including updating vehicle registration numbers and, when reasonably necessary, adjusting the vehicle make or model to provide equivalent or superior transportation options.
                    </p>
                </span>

                <h3 className='heading-one'>Financial Responsibilities and Charges</h3>

                <span className='content-section'>
                    <h3 className='heading-two'>Primary Payment Structure</h3>
                    <p className='para-font'>
                        Customers must complete payment of the amount specified in section 5 either at pickup or in advance of vehicle collection. Rental fees are calculated using daily increments of consecutive 24-hour periods. When scheduled returns occur less than 4 hours into the final day's billing cycle, customers pay only 25% of the standard daily rate for each hour or portion thereof during that period. Returns scheduled 4 hours or later into the final billing period incur the complete daily rental fee.
                    </p>
                </span>

                <span className='content-section'>
                    <h3 className='heading-two'>Fuel and Energy Requirements</h3>
                    <p className='para-font'>
                        Customers bear responsibility for all fuel or electricity consumed throughout the rental duration. The Company may offer prepaid fuel options with the following conditions:
                    </p>
                    <p className='para-font'>
                        Customers selecting prepaid fuel services receive no refund for unused fuel upon vehicle return
                    </p>
                    <p className='para-font'>
                        Customers declining prepaid fuel must return vehicles with completely filled fuel tanks. Incomplete fuel returns result in charges equal to current fuel prices plus a $35 refueling service fee. Alternative provisions for electric vehicles are detailed in Section 26.
                    </p>
                </span>




            </div>
        </div>
    </div>
  )
}

export default RefundPolicyModal