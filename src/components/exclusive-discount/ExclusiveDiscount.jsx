import React from 'react'
import './ExclusiveDiscount.css'
import { FaArrowRightLong } from "react-icons/fa6";

const ExclusiveDiscount = () => {
    const exclusovDiscountsDetails = [
        {
            off: (
                <p>from <strong>10%</strong> off</p>
            ),
            title: 'Hot Deals',
            para: `Secure the best deals for your car rental in New Zeeland. From discounted bookinga acrossour most popular carsto relocationdeals for one-way trips. Discover how you can save with ZM`,
            buttonText: 'See all deals'
        },
        {
            off: (
                <p> <strong>10%</strong> off</p>
            ),
            title: 'Join Our Newsletter',
            para: `Secure the best deals for your car rental in New Zeeland. From discounted bookinga acrossour most popular carsto relocationdeals for one-way trips. Discover how you can save with ZM`,
            buttonText: 'Subscribe'
        },
        {
            off: (
                <p><strong>15%</strong> off</p>
            ),
            title: 'AA Member Discount',
            para: `Secure the best deals for your car rental in New Zeeland. From discounted bookinga acrossour most popular carsto relocationdeals for one-way trips. Discover how you can save with ZM`,
            buttonText: 'Get the discount'
        },
        {
            off: (
                <p>win up to <strong>$500</strong> </p>
            ),
            title: 'Happy Scap',
            para: `Secure the best deals for your car rental in New Zeeland. From discounted bookinga acrossour most popular carsto relocationdeals for one-way trips. Discover how you can save with ZM`,
            buttonText: 'Go snap happy'
        },
    ]
  return (
    <div className='exclusive-discounts-main-container'>
        <div className='exclusive-discounts-inner-container'>
            <h3>Car Rental Deals and Exclusive Discounts</h3>
            <p>Cruise the best <strong> deals </strong> and <strong> relocations </strong> for an affordable car rental. Make the most of your New Zealand adventure for less with GO.</p>
            <div className='exclusive-discounts-cards-container'>
                {exclusovDiscountsDetails.map((item, index) => {
                    
                    return (
                        <div className='exclusive-discount-card' key={index}>
                            <div className='exclusive-discount-off'>
                                {item.off}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.para}</p>

                            <button>
                                {item.buttonText}
                                <FaArrowRightLong size={20} color='var(--primary-color)' />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ExclusiveDiscount