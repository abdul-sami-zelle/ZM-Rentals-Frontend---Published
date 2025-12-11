import React from 'react'
import './QuickFacts.css'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const QuickFacts = () => {

    const quickFacts = [
        {
            heading: 'Minimum Age:', 
            para: (
                <p>
                    If you’re arriving in Auckland and want to reach our conveniently located office as quickly as possible, we’ve got you covered with our dedicated shuttle service. Although our Mangere branch is just minutes from Auckland Airport, we understand that navigating taxis or public transport in a new city can feel overwhelming, especially when you are weary from the long flight.
                    {/* <strong>Minimum Age:</strong> You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!` */}
                </p>
            )
        },
        {
            para: (
                <p>
                    That’s why we offer a quick and reliable airport shuttle to take the hassle out of your arrival. Our shuttle picks you up from the designated area just outside the airport terminals and brings you straight to our office in Mangere, typically within 5 to 10 minutes.
                    {/* <strong>Maximum Age:</strong> You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!` */}
                </p>
            )
        },
        
        {
            para: (
                <p>
                    No need to worry about walking while jet lagged, dragging heavy luggage, or paying steep taxi fares. With our shuttle, you get a smooth, comfortable transition from the airport to the rental, so you can start your Auckland journey the right way. Just look for the ZM Rentals sign, hop on board, and let us take care of the rest.
                    {/* <strong>New Zealand Licence Rule:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge! */}
                </p>
            )
        },
        // {
        //     para: (
        //         <p>
        //             <strong>Foreign Licence Rule:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
        //         </p>
        //     )
        // },
        // {
        //     para: (
        //         <p>
        //             <strong>Credit Card Requirement:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
        //         </p>
        //     )
        // },
        // {
        //     para: (
        //         <p>
        //             <strong>Additional Drivers:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
        //         </p>
        //     )
        // },
        // {
        //     para: (
        //         <p>
        //             <strong>Family needs:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
        //         </p>
        //     )
        // },
        // {
        //     para: (
        //         <p>
        //             <strong>Documents for collection:</strong>You must be 21 years old to cruise in a standard GO Rentals hire car and 25 to experience the Tesla Model 3 and Tesla Model Y hire cars. Good news: we do not apply a young driver surcharge!
        //         </p>
        //     )
        // },

    ]

    

    return (
        <div className='quick-facts-main-container'>
            <div className='quick-facts-inner-container'>
                {/* <h3>ZM Rentals Customer Quick Facts</h3> */}
                <div className='quick-facts-list-and-space-container'>
                    {/* <div className='empty-space-for-location'></div> */}
                    <ul className='quick-facts-list'>
                    <h3 className='quick-facts-heading'>Reach ZM Rentals in Minutes with Our Shuttle</h3>
                    {quickFacts.map((fact, index) => (
                        <li key={index} className='quick-fact-item'>
                            <MdKeyboardDoubleArrowRight className='quick-facts-icon' />
                            {fact.para}
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    )
}

export default QuickFacts