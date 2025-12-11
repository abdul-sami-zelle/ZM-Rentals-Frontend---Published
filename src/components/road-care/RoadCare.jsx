import React from 'react'
import './RoadCare.css'
import SecondaryButton from '../../global-components/secondary-button/SecondaryButton'
import { SiVlcmediaplayer } from "react-icons/si";
import { TbCurrencyDollarOff } from "react-icons/tb";
import { LuCircleDollarSign } from "react-icons/lu";
import { useRouter } from 'next/navigation';

const RoadCare = () => {
    const roadCAreData = [
        {
            icon: SiVlcmediaplayer,
            title: 'Easy Pick-Up Process',
            para: `
                If you’ve pre-booked your rental car online, you’re in for an ultra-smooth ride. Just check in at our reception, review and sign your rental 
                agreement, and inspect the vehicle before hitting the road. It’s quick, efficient, and designed to get you behind the wheel in no time.
                For walk-in bookings, the process is just as straightforward, but might take a bit longer during busy periods like weekends and holidays. 
                Upon arrival at our Mangere car rental depot, simply approach our friendly staff at the front desk. We’ll verify your documents, help you choose a 
                vehicle from our available options, and guide you through the agreement before handing over the keys.
            `
        },
        {
            icon: LuCircleDollarSign,
            title: 'Swift Drop-Off Procedure',
            para: `Returning your rental is just as easy. Whether you booked online or in person, we keep the drop-off process fast and stress-free. A quick and courteous vehicle inspection is conducted to check for fuel level and condition. Once that’s done, just hand over the keys, either at the counter or directly to a staff member, and you’ll receive your deposit back without delay.`
        },
        // {
        //     icon: TbCurrencyDollarOff,
        //     title: 'Toll Road Freedom',
        //     para: `Enjoy free passage on all toll roads, we cover all costs including admin fees.`
        // },

    ]

    const router = useRouter();
    const handleNavigate = () => {
        router.push('/terms-and-conditions')
    }

  return (
    <div className='road-care-main-container'>
        <div className='road-care-inner-container'>
            <h3>Hassle-Free Pick-Up & Drop-Off</h3>
            {/* <p>A comprehensive $3 per day fee ensures your journey is simple and stress-free, <br /> we include the following services:</p> */}
            <p>At ZM Rentals, we go the extra mile to ensure that your car rental experience in Auckland is smooth from start to finish. Our goal is to make the pick-up and drop-off process as effortless as possible, so you can focus on enjoying your journey, not dealing with delays or paperwork.</p>
            <div className='road-care-cards-container'>
                {roadCAreData.map((item, index) => {
                    let Icon = item.icon
                    return (
                        <div className='road-care-single-item' key={index}>
                            <Icon size={30} color='var(--primary-color)' />
                            <h3 className='global-heading-style'>{item.title}</h3>
                            <p className='global-content-style'>{item.para}</p>
                        </div>
                    )
                })}
            </div>
            <p className='road-care-litle-details'>With Total Road Care, we handle all the essentials so you can focus on the adventure ahead.</p>
            <SecondaryButton
                    handleSecondaryButtonClick={handleNavigate}
                  secondaryButtonClass={'secondary-prop-class'}
                  width={'220px'}
                  height={'44px'}
                  secondaryBgColor={'#fff'}
                  secondaryBorder={'2px solid var(--primary-color)'}
                  textColor={'var(--primary-color)'}
                  fontSize={'var(--font-body-lg)'}
                  lineHeight={'var(--line-height-body)'}
                  fontWeight={'var(--font-weight-bold)'}
                  secondaryText={'Terms And Conditions'}
                  display={'flex'}
              />
        </div>
    </div>
  )
}

export default RoadCare