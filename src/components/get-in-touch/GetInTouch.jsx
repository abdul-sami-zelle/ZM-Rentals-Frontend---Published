import React, { useEffect, useState } from 'react'
import './GetinTouch.css'
import Link from 'next/link'
import { IoArrowDown } from "react-icons/io5";

import { FaLocationArrow, FaPhone, FaClock, FaEnvelope, FaMapLocation, FaMinus } from "react-icons/fa6";
import Image from 'next/image';
import SecondaryButton from '@/global-components/secondary-button/SecondaryButton';
import { url } from '@/utils/services';
import axios from 'axios';
import MainLoader from '@/loaders/MainLoader/MainLoader';


const GetInTouch = () => {

    const [loading, setLoading] = useState(false);
    const [showAddrss, setShowAddress] = useState(false);
    const [isFormSubmited, setIsFormSubmited] = useState(false);
    const addresses = [
        {
            city: 'Auckland City',
            address: `Aero Auckland Airport Hotel 190 Kirkbride Road, Māngere, Auckland 2022`,
            phone: `+64221708848`,
            openingHours: `Operating Hours: 9am - 5pm`,
            googleLocation: 'Google Location'
        }
    ]

    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        contact: '',
        message: ''
    })

    const [errors, setErrors] = useState({})

    const handleContactData = (e) => {
        const { name, value } = e.target;

        let formatedNumber = value.replace(/[^0-9+]/g, '')
        // let formatedEmail = value.replace(/[^a-zA-Z0-9@._-]/g, '')

        setContactData((prevData) => ({
            ...prevData,
            [name]: name === 'contact' ? formatedNumber : value
        }))

        setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    const handleSubmitContact = async () => {
        let newErrors = {};

        if (!contactData.name) newErrors.name = "Name is required";
        if (!contactData.email) {
            newErrors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactData.email)) {
                newErrors.email = "Invalid Email";
            }
        }
        if (!contactData.contact) newErrors.contact = "Phone is required";
        if (!contactData.message) newErrors.message = "Message is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // stop here if errors exist
        }

        const api = `${url}/contact/add-contact`;
        setLoading(true);
        try {
            const response = await axios.post(api, contactData);
            if (response.status === 201) {
                setIsFormSubmited(true)
                setLoading(false);
                setContactData({ name: "", email: "", contact: "", message: "" }); // clear form
                setErrors({}); // clear errors
            }
        } catch (error) {
            setLoading(false);
            console.error("Unexpected Server Error", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='get-in-touch-main-container'>
            {loading && <MainLoader />}
            <h3>Get in Touch with ZM Rentals</h3>
            <p>Thank you for choosing ZM Rentals as your car hire service in Auckland.</p>
            <p>We are here to assist you with any inquiries or support you may need.</p>
            {/* <p>Below are the different ways you can get in touch with us</p> */}

            <div className='get-in-touch-types-container'>
                <div className='contact-form-container'>

                    <div className='contact-card'>
                        <Image
                            src={'/assets/images/mix/auckland_city.jpg'}
                            fill
                            alt="Profile"
                            className="profile-image"
                        />

                        <div className='cotact-info-section'>

                            <div className='contact-info-heading-section'>
                                <h3>Contact Information</h3>
                                <p>Thank you for choosing ZM Rentals as your car hire service in Auckland.</p>
                            </div>
                            <span className='contact-type-section'>
                                <FaPhone size={20} color='var(--color-white)' />
                                <a href="tel:+64221708848">+64221708848</a>
                            </span>
                            <span className='contact-type-section'>
                                <FaEnvelope size={20} color='var(--color-white)' />
                                <a href="mailto:info@zmrentals.co.nz">info@zmrentals.co.nz</a>
                            </span>
                            <span className='contact-type-section'>
                                <FaLocationArrow size={20} color='var(--color-white)' />
                                Aero Auckland Airport Hotel 190 Kirkbride Road, Māngere, Auckland 2022
                            </span>
                        </div>

                    </div>

                    {
                        isFormSubmited ? (
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '815px', height: '100%', maxHeight: '440px', padding: '60px 36px', gap: '15px'}}>
                                <Image src={'/assets/icons/Done.gif'} width={220} height={220} alt='gif' />
                                <h3 style={{fontSize: '22px', lineHeight: '25px', fontWeight: '500', color: 'var(--primary-color)'}}>Request Submitted Successfully</h3>
                                <p style={{fontSize: '15px', lineHeight: '18px', fontWeight: '400', color: '#000'}}>Thank you for contacting us. We’ve received your message and will get back to you shortly.</p>
                            </div>
                        ) : (
                            <div className='contact-form-inputs-container'>
                        <div className='contact-input-name-and-last-name'>
                            <label className={`contact-input-label ${contactData.name || errors.name ? 'filled' : ''}`} style={{ borderBottom: errors.name ? '2px solid rgba(150, 21, 2, 0.7)' : '2px solid rgba(150, 21, 2, 0.2)' }}>
                                <p>Your Name</p>
                                <input
                                    type='text'
                                    className='contact-form-input'
                                    name='name'
                                    placeholder={errors.name ? errors.name : ''}
                                    value={contactData.name}
                                    onChange={(e) => handleContactData(e)}
                                />
                            </label>

                            <label className={`contact-input-label ${contactData.contact || errors.contact ? 'filled' : ''}`} style={{ borderBottom: errors.contact ? '2px solid rgba(150, 21, 2, 0.7)' : '2px solid rgba(150, 21, 2, 0.2)' }}>
                                <p>Your Phone</p>
                                <input type='text' className='contact-form-input' placeholder={errors.contact ? errors.contact : ''} name='contact' value={contactData.contact} onChange={(e) => handleContactData(e)} />
                            </label>
                        </div>

                        <label className={`contact-input-label ${contactData.email || errors.email ? 'filled' : ''}`} style={{ borderBottom: errors.email ? '2px solid rgba(150, 21, 2, 0.7)' : '2px solid rgba(150, 21, 2, 0.2)' }}>
                            <p>Your Email</p>
                            <input type='text' className='contact-form-input' name='email' placeholder={errors.email ? errors.email : ''} value={contactData.email} onChange={(e) => handleContactData(e)} />
                        </label>

                        <label className={`contact-input-label ${contactData.message || errors.message ? 'filled' : ''}`} style={{ borderBottom: errors.message ? '2px solid rgba(150, 21, 2, 0.7)' : '2px solid rgba(150, 21, 2, 0.2)' }}>
                            <p>Message</p>
                            {/* message */}
                            <textarea rows={3} className='contact-form-input' name='message' placeholder={errors.message ? errors.message : ''} value={contactData.message} onChange={(e) => handleContactData(e)} />
                        </label>
                        <div className='contact-form-inputs-submit-button-container' onClick={handleSubmitContact}>
                            <button>Submit</button>

                        </div>
                    </div>
                        )
                    }
                    

                    <div className='mobile-view-contact-details'>
                        <span>
                            <h3>Phone</h3>
                            <a href="tel:+64221708848">+64221708848</a>
                        </span>
                        <span>
                            <h3>Email</h3>
                            <a href="mailto:info@zmrentals.co.nz">info@zmrentals.co.nz</a>
                        </span>
                        <span>
                            <h3>Address</h3>
                            Aero Auckland Airport Hotel 190 Kirkbride Road, Māngere, Auckland 2022
                        </span>
                    </div>



                </div>

            </div>
        </div>
    )
}

export default GetInTouch