import React from 'react'
import './InsuranceCoverage.css';

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from 'next/link';

const InsuranceCoverage = () => {
    const insuranceDetails = [
        {heading: 'ZM Basic Insurance', details: [
            {title: 'Cost per day', para: `$0 extra cost. Included as standard in our rental fees which varies depending on the rental vehicle.`},
            {title: 'Excess', para: `Excess liability paid by the hirer in the event of an accident or damage covered under the rental terms. The excess amount for this package is dependent on the vehicle selected.`},
            {title: 'Bond', para: `A pre-authorised amount to be paid at pick-up and returned to hirer if no damage is caused. The bond amount differs depending on the vehicle and hire period selected.`},
            {title: 'Credit or Debit', para: `A credit card with the main hirer’s name is required for this insurance option.`},
            {title: 'Cover', para: `Full comprehensive cover including third-party liability, windscreen and tyre damage. The hirer is liable for the excess amount only if conditions under the agreement are met.`},
        ]},
        {heading: 'ZM Assured', details: [
            {title: 'Cost per day', para: `$0 extra cost. Included as standard in our rental fees which varies depending on the rental vehicle.`},
            {title: 'Excess', para: `Excess liability paid by the hirer in the event of an accident or damage covered under the rental terms. The excess amount for this package is dependent on the vehicle selected.`},
            {title: 'Bond', para: `A pre-authorised amount to be paid at pick-up and returned to hirer if no damage is caused. The bond amount differs depending on the vehicle and hire period selected.`},
            {title: 'Credit or Debit', para: `A credit card with the main hirer’s name is required for this insurance option.`},
            {title: 'Cover', para: `Full comprehensive cover including third-party liability, windscreen and tyre damage. The hirer is liable for the excess amount only if conditions under the agreement are met.`},
        ]},
        {heading: 'ZM Peace of Mind', details: [
            {title: 'Cost per day', para: `$0 extra cost. Included as standard in our rental fees which varies depending on the rental vehicle.`},
            {title: 'Excess', para: `Excess liability paid by the hirer in the event of an accident or damage covered under the rental terms. The excess amount for this package is dependent on the vehicle selected.`},
            {title: 'Bond', para: `A pre-authorised amount to be paid at pick-up and returned to hirer if no damage is caused. The bond amount differs depending on the vehicle and hire period selected.`},
            {title: 'Credit or Debit', para: `A credit card with the main hirer’s name is required for this insurance option.`},
            {title: 'Cover', para: `Full comprehensive cover including third-party liability, windscreen and tyre damage. The hirer is liable for the excess amount only if conditions under the agreement are met.`},
        ]},
    ]
  return (
    <div className='insurance-coverage-main-container'>
        <div className='insurance-coverage-inner-container'>
            <h3>Rental Car Insurance Coverage</h3>
            <p>Your car rental rate and Total Road Care package with GO Rentals include 24-hour AA roadside assistance and complimentary callout service for ALL types of breakdowns.</p>
            <span>Your stress-free car rental experience is a priority and our <Link href={'#'}> insurance coverage </Link> has peace of mind built right in.</span>
            <div className='insurance-coverage-colums-container'>
                {insuranceDetails.map((item, index) => (
                    <div key={index} className='insurance-covrage-single-col'>
                        <h3>{item.heading}</h3>
                        {item.details.map((detailItem, detailIndex) => (
                            <div key={detailIndex} className='insurance-single-col-details'>
                            <h3>{detailItem.title}</h3>
                            <p>{detailItem.para}</p>
                        </div>
                        ))}
                        
                    </div>
                ))}
            </div>

            <div className='electric-car-insurance-container'>
                <h3>Electric Car Rental Insurance</h3>
                <p>Have peace of mind when you GO green! All of our coverage options cover our electric car fleet with the following amendments:</p>
                <span>
                    <MdKeyboardDoubleArrowRight size={25} color='var(--primary-color)' />
                    The Tesla dedicated roadside assistance must be utilised before our AA roadside assistance.
                </span>
                <span>
                    <MdKeyboardDoubleArrowRight size={25} color='var(--primary-color)' />
                    A security bond on GO Basic and GO Assured insurance options will be required for a Tesla booking and therefore needs a credit card upon pick-up.
                </span>
                <p>For full details on the electric car insurance, please read our terms.</p>
            </div>
        </div>
    </div>
  )
}

export default InsuranceCoverage