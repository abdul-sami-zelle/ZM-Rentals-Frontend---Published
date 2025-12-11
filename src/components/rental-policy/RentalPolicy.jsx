import React from 'react'
import './RentalPolicy.css'
import RentalPolicyCard from '../../components/rental-policy-card/RentalPolicyCard'

const RentalPolicy = () => {
    const policiesData = [
        {heading : 'Driver Policies', detail: [
            `To drive a rental vehicle, the driver must be 21 years or older.`,
            `A young driver surcharge applies for drivers under 25 years old.`,
            `A valid driver’s license in English, or one with an English translation, is required.`,
            `There’s a small fee for adding an extra driver to your rental agreement.`,
            `The same age and license requirements apply to any additional drivers.`,
        ]},
        {heading : 'Fuel Rules', detail: [
            `All our vehicles are provided with a full tank of fuel at the time of pick-up.`,
            `Alternatively, you can pay a fuel fee upfront and return the vehicle with an empty tank.`,
            `No refunds are issued for any remaining fuel.`,
            `If the car is returned with insufficient fuel, a charge will be applied per litre of missing fuel.`,
            `The car must be returned with a full tank as well.`,
        ]},
        {heading : 'Usage Restrictions', detail: [
            `Our rental cars are for personal use only, whether you're traveling or commuting.`,
            `Commercial use or unauthorized activities with the rental vehicle are strictly prohibited.`,
            `The driver is responsible for any parking tolls and fines incurred during the rental period.`,
            `Terrain routes are off-limits unless specified in the contract.`,
            `Driving outside the Auckland boundaries is not allowed`,
        ]},
    ]
  return (
    <div className='rental-poliecies-main-container'>
        <div className='rental-policies-heading-container'> 
            <h3 className='section-main-heading'>Rental Regulation</h3>
            {/* <div className='rental-policy-under-line-container'>
                <div className='rental-policy-single-line-right-container'>
                    <div className='rental-policy-right-line'></div>
                </div>
                <div className='rental-policy-left-line-container'>
                    <div className='rental-policy-left-line'></div>
                </div>
            </div> */}
        </div>
        <div className='rental-policies-slogan-container'>
            <p style={{textAlign: 'center'}}>At ZM Rentals, we operate with complete transparency and prioritize clear, upfront communication. We believe a smooth rental experience begins with understanding our rental policies.</p>
            {/* <p>At Speedy Rentals, we uphold a commitment to transparency and customer satisfaction.</p>
            <p>Our rental policies ensure a seamless rental experience for all our valued customers:</p> */}
        </div>
        <div className='rental-policies-container'>
            {policiesData.map((item,index) => (
                <div key={index} className='rental-policy-single-item'>
                    <h3>{item.heading}</h3>
                    {item.detail.map((item, index) => (
                        <RentalPolicyCard
                            key={index}
                            data={item}
                        />
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default RentalPolicy