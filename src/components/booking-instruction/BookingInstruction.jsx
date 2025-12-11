import React from 'react'
import './BookingInstruction.css';
import BookingInstructionCard from '../../components/booking-instruction-card/BookingInstructionCard'

const BookingInstruction = () => {
    const instructionData = [
        {
            heading: 'Online Pre-Booking', details: [
                `Choose your car, pickup location, and rental duration from the dropdown menu.`,
                'Enter your contact details and any other required information to proceed.',
                'Submit the form to receive your quote and confirm your online car booking.',
            ],
            link: '/vehicles'

        },
        {
            heading: 'Phone Reservation', details: [
                'Our friendly and professional team will provide prompt assistance and walk you through the booking process.',
                'We’ll help you select the best car for your needs and finalize the reservation right then and there.',
                // 'visit out official website at www.zmrentals.com',
            ] ,
            link: 'tel:+64221708848'
        },
        {
            heading: 'Walk-in Bookings', details: [
                'Our expert staff will be happy to assist you in selecting the ideal rental car based on your requirements.',
                'Once everything is sorted, just sign the necessary paperwork, grab your keys, and get ready to explore Auckland.',
                // 'visit out official website at www.zmrentals.com',
            ] ,
            link: 'https://maps.app.goo.gl/ghhZyB26wJrMctY88'
        },
    ]
  return (
    <div className='booking-instruction-main-container'>
        <h3 className='section-main-heading'>Seamless Procedure</h3>
        <span>
            <p>Whether you’re planning or prefer to make a straightforward walk-in reservation, here’s how you can book a car in Auckland with ease:</p>
            {/* <p>Booking a rental car with Speedy Rentals is quick and straightforward.</p>
            <p>Follow these simple steps to secure your vehicle for a memorable journey:</p> */}
        </span>
        <div className='booking-instruction-cards-container'>
            {instructionData.map((item, index) => (
                <div key={index} className='booking-instruction-single-column'>
                    <h3 className='global-heading-style'>{item.heading}</h3>
                    <BookingInstructionCard 
                        data={item.details}
                        link={item.link}
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default BookingInstruction