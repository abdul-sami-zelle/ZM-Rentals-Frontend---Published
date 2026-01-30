'use client'
import React, { useState } from 'react'
import './Payments.css'
import Image from 'next/image'
import { FaQuestionCircle } from "react-icons/fa";
import Link from 'next/link';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import {checkIsZero, getTenPercent} from '../../../utils/checkZero'
import CardElementStripe from './cardElement';


const Payments = ({ grandTotal, isChecked, setIsChecked, selectPaymentType, setSelectPaymentType, setRefundModal,showRetryCardInModal, setShowRetryCardInModal,cardElement }) => {
  const payTime = [
    {id: 1, title: 'Pay Later', val: 'pay-leter', disc: 'Pay when you check in or pick-up.', total: `NZ$ ${getTenPercent(checkIsZero(grandTotal))}`,subtitle:'10% of total amount' },
    {id: 2, title: 'Pay Now', val: 'pay-now', disc: 'Pay the full amount now, save time later.', total: `NZ$ ${checkIsZero(grandTotal)}`,subtitle:'' },
  ]
  const paymentTypeCards = [
    '/assets/icons/american-express.png',
    '/assets/icons/discover.png',
    '/assets/icons/master.png',
    '/assets/icons/visa.png',
  ]

  return (
    <div className='payment-main-container'>

      <div className='select-payment-type'>
        {payTime.map((item, index) => {
          // const disableOption = item.title === 'Pay Noww';
          return (<div key={index} className={`pay-type-single-sec ${selectPaymentType === item.id ? 'active-select-payment' : ''}`}  onClick={() => {setSelectPaymentType(item.id)}}>
            {/* {index !== 0 && <div className='pay-option-overlay-container'></div>} */}
            <input type='radio' name={item.val} checked={selectPaymentType === item.id} readOnly />
            <div className='selected-pay-type-detail'>
              <h3>{item.title}</h3>
              <p>{item.disc}</p>
              <span style={{display:"flex",alignItems:"flex-end",justifyContent:"center"}} >{item.total}  {item.subtitle !== "" && <p style={{fontSize:"12px" , fontWeight:"500",marginLeft:"5px"}}>({item.subtitle})</p> }</span>
            </div>
          </div>)
        })}
      </div>

      

      {/* Stripe Card Input */}
      {/* {selectPaymentType === 2 && ( */}
       {cardElement && <div className={`payment-input-details`}>
         {cardElement}
        </div>}
      {/* )} */}

      <span className='payment-policy-hightlight'>
        <p>Heads up, all online payments are subject to a non-refundable payment processing fee. </p>
        <FaQuestionCircle size={15} color='var(--primary-color)' className='payment-policy-icon' onClick={() => setRefundModal(true)} />
      </span>

      <span className='agree-to-terms-and-conditions-highlight'>
        <input
          type='checkbox'
          id='terms-checkbox'
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <span className="checkmark"></span>
        <label htmlFor='terms-checkbox'>
          <p>I agree to <Link href={'#'}>ZM rentals Terms an Conditions</Link> and all drivers are at least <strong>21</strong> years old</p>
        </label>
      </span>
    </div>
  )
}

export default Payments