import React, { useEffect, useState } from 'react'
import './SubscriptionModal.css'
import { IoIosClose, IoMdArrowDropdown } from 'react-icons/io'
import { url } from '@/utils/services';
import axios from 'axios';
import MainLoader from '@/loaders/MainLoader/MainLoader';
import Link from 'next/link';
import Image from 'next/image';

const SubscriptionModal = ({ showSubscription, setShowSubscription, imgUrl }) => {

    const [showCountry, setShowCountry] = useState(false);
    const [isSubscriptionSubmit, setIsSubscriptionSubmit] = useState(false);
    const [loading, setLoading] = useState(false);

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
                const data = await res.json();

                // Extract only country names
                const countryNames = data.map((country) => country.name.common).sort();

                setCountries(countryNames);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    const [subscribePayload, setSubscribePayload] = useState({
        first_name: '',
        last_name: '',
        email: '',
        country: '',
    })

    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSubscribePayload((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }))
    }

    const handleCountrySelect = (item) => {
        setSubscribePayload((prev) => ({
            ...prev,
            country: item
        }))

        setErrors((prev) => ({
            ...prev,
            country: ''
        }))
        setShowCountry(false)
    }

    const handleSubmitSubscription = async (e) => {
        e.preventDefault();

        let newError = {};
        Object.keys(subscribePayload).forEach((key) => {
            if (!subscribePayload[key]) {
                newError[key] = "Field Required"
            }
        })

        setErrors(newError);
        const api = `${url}/subscriptions/add-subscription`
        if (Object.keys(newError).length === 0) {
            setLoading(true)
            try {
                const response = await axios.post(api, subscribePayload)
                if (response.status === 201) {
                    setLoading(false);
                    setIsSubscriptionSubmit(true)
                    setSubscribePayload({
                        first_name: '',
                        last_name: '',
                        email: '',
                        country: ''
                    })
                }
            } catch (error) {
                setLoading(false)
                console.error("UnExpected Server Error", error)
            } finally {
                setLoading(false);
            }
        }
    }


    return (
        <div className={`subscription-main-container ${showSubscription ? 'show-subscription' : ''}`} onClick={() => { setShowSubscription(false); setIsSubscriptionSubmit(false) }}>
            <div className={`subscription-inner-modal ${showSubscription ? 'show-subscription-inner' : ''}`} onClick={(e) => e.stopPropagation()}>
                {loading && <MainLoader />}
                <div className='subscription-head-container'>
                    <div className='subscription-close-and-heading-contianer'>
                        <h3>Join our ZM Newsletter</h3>
                        <IoIosClose size={20} color='#595959' onClick={() => { setShowSubscription(false); setIsSubscriptionSubmit(false) }} style={{ cursor: 'pointer' }} />
                    </div>
                    <h3 className='subscription-main-heading'>Save 10% off your next adventure</h3>
                </div>

                <div className='subscribe-modal-banner'>
                    <img src={imgUrl} alt='img' />
                </div>

                <div className='subscription-terms-and-inputs'>
                    {!isSubscriptionSubmit && (
                        <p className='subscribe-modal-promotional-text'>Receive exclusive deals, exciting updates, travel tips, and inspiration!</p>
                    )}

                    {
                        isSubscriptionSubmit ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%',  height: '100%', padding: '0px', gap: '10px' }}>
                                <Image src={'/assets/icons/Done.gif'} width={80} height={80} alt='gif' style={{width: '80px', height: '80px'}} />
                                <h3 style={{ fontSize: '18px', lineHeight: '22px', fontWeight: '500', textAlign: 'center', color: 'var(--primary-color)' }}>Request Submitted Successfully</h3>
                                <p style={{ fontSize: '13px', lineHeight: '16px', fontWeight: '400', textAlign: 'center', color: '#000' }}>Thank you for subscribing to our Newsletter. We’ll send the latest car rental deals straight to Your Email</p>
                                <p style={{ fontSize: '13px', lineHeight: '16px', fontWeight: '400', textAlign: 'center', color: '#000' }}>Meanwhile, check out our current offers</p>
                            </div>
                        ) : (
                            <div className='subscrive-modal-inputs'>
                                <div className='subscribe-modal-first-and-last-name'>
                                    <label style={{ border: errors.first_name ? '1px solid var(--primary-color)' : '1px solid transparent' }}>
                                        First Name
                                        <input type='text' name='first_name' value={subscribePayload.first_name} onChange={handleInputChange} />
                                    </label>
                                    <label style={{ border: errors.last_name ? '1px solid var(--primary-color)' : '1px solid transparent' }}>
                                        Last Name
                                        <input type='text' name='last_name' value={subscribePayload.last_name} onChange={handleInputChange} />
                                    </label>
                                </div>
                                <div className='subscribe-modal-email-and-country'>
                                    <label style={{ border: errors.email ? '1px solid var(--primary-color)' : '1px solid transparent' }}>
                                        Email
                                        <input type='text' name='email' value={subscribePayload.email} onChange={handleInputChange} />
                                    </label>

                                    <div className='subscribe-modal-country-select-main-contianer' style={{ border: errors.country ? '1px solid var(--primary-color)' : '1px solid transparent' }}>
                                        <p>Which country do you live?</p>
                                        <div className='subscribe-modal-country-select-head' onClick={() => setShowCountry(!showCountry)}>
                                            <h3>{subscribePayload.country !== '' ? subscribePayload.country : 'Select Your Country'}</h3>
                                            <IoMdArrowDropdown size={15} color='#000' />
                                        </div>
                                        <div className={`subscribe-modal-country-select-list ${showCountry ? 'show-countries-list' : ''}`}>
                                            {countries.map((item, index) => (
                                                <p key={index} onClick={() => handleCountrySelect(item)}>{item}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {
                        !isSubscriptionSubmit && (
                            <Link href={'/terms-and-conditions'} className='subscribe-modal-terms-and-conditions'>Read Terms & Conditions</Link>
                        )
                    }
                </div>
                {
                    isSubscriptionSubmit ? (
                        <button className='submit-subscribe-modal-button' onClick={() => { setShowSubscription(false); setIsSubscriptionSubmit(false) }}>Explore More</button>
                    ) : (
                        <button className='submit-subscribe-modal-button' onClick={handleSubmitSubscription}>Subscribe</button>
                    )
                }

            </div>
        </div>
    )
}

export default SubscriptionModal