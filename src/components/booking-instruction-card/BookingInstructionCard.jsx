import React from 'react'
import './BookingInstructionCard.css';
import { SlArrowRight } from "react-icons/sl";
import Link from 'next/link';

const BookingInstructionCard = ({ data, link }) => {
    return (
        <div className='booking-instruction-card-main-container'>
            {data.map((item, index) => (
                <Link href={link} target={/^https?:\/\//.test(link) ? '_blank' : '_self'} key={index} className='booking-instruction-single-item'>
                    <p>{item}</p>
                    <SlArrowRight size={20} className='booking-instruction-card-arrow' />
                </Link>
            ))}

        </div>
    )
}

export default BookingInstructionCard