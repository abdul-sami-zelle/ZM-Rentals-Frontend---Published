import React from 'react'
import './CustomerThoughts.css';
import Image from 'next/image';

const CustomerThoughts = () => {
    const customerThoughts = [
        {
            img: '/assets/images/deals/HotDeals_menu_Tablet.jpg', 
            name: 'Arjay',
            comment: `Taking a break while soaking in the beauty around us ☀️ Thanks to this car from #GORentals for taking us to places we could never imagine!`
        },
        {
            img: '/assets/images/deals/HotDeals_menu_Tablet.jpg', 
            name: 'Arjay',
            comment: `Taking a break while soaking in the beauty around us ☀️ Thanks to this car from #GORentals for taking us to places we could never imagine!`
        },
        {
            img: '/assets/images/deals/HotDeals_menu_Tablet.jpg', 
            name: 'Arjay',
            comment: `Taking a break while soaking in the beauty around us ☀️ Thanks to this car from #GORentals for taking us to places we could never imagine!`
        },
        {
            img: '/assets/images/deals/HotDeals_menu_Tablet.jpg', 
            name: 'Arjay',
            comment: `Taking a break while soaking in the beauty around us ☀️ Thanks to this car from #GORentals for taking us to places we could never imagine!`
        },
    ]
  return (
    <div className='customer-thoughts-main-container'>
        <div className='customer-thoughts-inner-container'>
            <h3>Our Customers' Travels Through Their Lens</h3>
            <p className='customer-thoughts-first-para'>We love that our rental cars become part of your travel memories! Submit a happy photo to our snap happy competition and be in with a chance to receive $500 back off your booking!</p>
            <p className='customer-thoughts-second'>New Zealand is best explored in a reliable car. Don't take our word for it, check out the happy customers revv'd up about their experience:</p>
            <div className='customer-comments-cards-container'>
                {customerThoughts.map((item, index) => (
                    <div key={index} className='customer-thought-single-card'>
                        <Image src={item.img} width={318} height={266} alt='img' />
                        <div className='customer-cmment-card-details'>
                            <h3>{item.name}</h3>
                            <p>{item.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CustomerThoughts