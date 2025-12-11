import React, { useEffect, useState } from 'react'
import './EmailEnquiryModal.css'
import { IoIosClose, IoMdArrowDropdown } from 'react-icons/io'
import { url } from '../../utils/services'
import axios from 'axios'
import Spinner from '../../loaders/Spinner/Spinner'

const EmailEnquiryModal = ({ showEmailEnquiry, setShowEmailEnquiry, carObj, modalType, bookingPayload = {} }) => {


    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const foundUs = [
        'Google',
        'Facebook',
        'Instagram',
        'Tiktok',
        'Friends Referral',
        'Other',
    ]

    const [showCountry, setShowCountry] = useState(false);
    const handleOpenCountryList = () => {
        setShowCountry(!showCountry)
    }

    const handleSelectCountry = (item) => {
        setQoutePayload((prev) => ({
            ...prev,
            country: item,
            car_id: carObj?.car_id
        }))
        setShowCountry(false)

    }

    const [showOptionList, setShowOptionList] = useState(false)

    const handleShowFoundusList = () => {
        setShowOptionList(!showOptionList)
    }

    const handleSelectOption = (item) => {
        setQoutePayload((prev) => ({
            ...prev,
            how_did_you_find_us: item
        }))
        setShowOptionList(false)
    }

    const [qoutePayload, setQoutePayload] = useState({
        // vehicle_name: carObj?.name,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        how_did_you_find_us: '',
        message: '',
        extras: [],
        country: '',
        insurance_id: null,
        unlock_subscription: false,
        car_id: carObj?.car_id,
        pickup_time: '',
        drop_time: '',
        pickup_location: '',
        drop_location: '',
        mailtype: 0,
    })

    useEffect(() => {
        if(Object.keys(bookingPayload).length > 0) {
            setQoutePayload((prev) => ({
                ...prev,
                insurance_id: bookingPayload?.booking?.insurance_id,
                extras: bookingPayload?.booking?.extras
            }))
        }
    }, [bookingPayload])


    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setQoutePayload((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Check if every field has a non-empty value
        const allFilled = Object.values(qoutePayload).every(
            (value) => value !== "" && value !== null && value !== undefined
        );

        setIsFormValid(allFilled);
    }, [qoutePayload]);

    const [bookingDays, setBookingDays] = useState({})

    useEffect(() => {
        const bookingDetails = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
        setBookingDays(bookingDetails)
    }, [])


    function countDays(startDate, endDate) {
        // Convert to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calculate difference in milliseconds
        const diffTime = Math.abs(end - start);

        // Convert to days
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Always include the start day
        return diffDays + 1;
    }


    const [isChecked, setIsChecked] = useState(false);
    const handleSubscription = (e) => {
        setIsChecked(e.target.checked)
        setQoutePayload((prev) => ({
            ...prev,
            unlock_subscription: e.target.checked
        }))
    }


    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Object.entries(qoutePayload).forEach(([key, value]) => {
        //     if (!value || value.trim() === "") {
        //         newErrors[key] = "Required"; // mark field as missing
        //     }
        // });

        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const api = `${url}/mail-enquiry/add`;
            const pickAndDropLocation = JSON.parse(sessionStorage.getItem('pick_and_drop_details'))
            const newPayload = {
                ...qoutePayload,
                pickup_time: pickAndDropLocation?.pickup_time,
                drop_time: pickAndDropLocation?.drop_time,
                pickup_location: pickAndDropLocation?.pickup_location,
                drop_location: pickAndDropLocation?.drop_location,
            }
            setLoading(true)
            try {
                const response = await axios.post(api, newPayload);
                if(response.status === 201) {
                    setLoading(false)
                    setShowEmailEnquiry(false)
                }
            } catch (error) {
                setLoading(false)
                console.error("UnExpected Server Error", error)
            } finally {
                setLoading(false)
            }
        } else {
            // ❌ Some fields missing
            console.error("Please fill all required fields");
        }
    };



    return (
        <div
            className={`email-enquiry-modal-main-container ${showEmailEnquiry ? 'show-email-enquiry' : ''}`}
            onClick={() => setShowEmailEnquiry(false)}
        >
            <div
                className={`emaill-enquiry-inner ${showEmailEnquiry ? 'show-email-enquiry-inner' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >   
                {loading && <Spinner />}
                <div className='email-enquiry-modal-head'>
                    <div className='email-moda-head-close-and-heading'>
                        <p>{modalType !== 'email-qoute' ? 'Quote' : 'Email Enquiry'}</p>
                        <IoIosClose size={25} color='#595959' onClick={() => setShowEmailEnquiry(false)} style={{ cursor: 'pointer' }} />
                    </div>
                    {modalType !== 'email-qoute' ? (
                        <div className='email-qoute-vehicle-details'>
                            <span className='email-qoute-left'>
                                <h3 className='email-enquiry-modal-car-name'>{carObj?.name}</h3>
                                <span className='email-pick-and-drop-dates'>
                                    <p>
                                        {bookingDays?.pickup_time
                                            ? new Date(bookingDays.pickup_time).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : ""}
                                    </p>

                                    -

                                    <p>
                                        {bookingDays?.drop_time

                                            ? new Date(bookingDays.drop_time).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : ""}
                                    </p>
                                </span>

                                {carObj && Object.keys(carObj)?.length > 0 && (
                                    <span className='email-qoute-price-total'>
                                        
                                        <h3>NZ$ {carObj?.base_rate * countDays(bookingDays?.pickup_time, bookingDays?.drop_time)}</h3>
                                        <p>Total</p>
                                    </span>
                                ) }
                            </span>

                            {carObj && (<div className='email-qoute-ask-for-qoute-right'>
                                <img src={url + carObj.image} alt='img' />
                            </div>)}
                        </div>
                    ) : (
                        <h3 className='email-enquiry-modal-car-name'>{carObj?.name}</h3>
                    )}

                </div>


                <div className='email-enquiry-inputs-container'>

                    {modalType !== 'email-qoute' ? (<p className='email-ask-for-qoute'>Your quoted price will be locked in for 3 days or while supplies last. </p>) : (<></>)}

                    <div className='email-enquiry-first-and-last-name'>
                        <div
                            className='email-enquiry-input-box'
                            style={{
                                border: errors.first_name ? "1px solid red" : "transparant"
                            }}
                        >
                            <p>First Name</p>
                            <input
                                type='text'
                                name="first_name"
                                value={qoutePayload.first_name}
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className='email-enquiry-input-box'>
                            <p>Last Name</p>
                            <input type='text' name="last_name" value={qoutePayload.last_name} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className='email-enquiry-country-select'>
                        <p>Which country do you live in?</p>
                        <div className='email-enquiry-country-select-head' onClick={handleOpenCountryList}>
                            <h3>{qoutePayload?.country !== '' ? qoutePayload?.country : 'Select Country'}</h3>
                            <IoMdArrowDropdown size={15} color='rgba(rgba(102, 102, 102, 0.5))' />
                        </div>

                        <div className={`email-enquiry-country-select-body ${showCountry ? 'email-enquiry-country-list-show' : ''}`}>
                            {countries.map((item, index) => (
                                <p key={index} onClick={() => handleSelectCountry(item)}>{item}</p>
                            ))}
                        </div>
                    </div>

                    <div className='email-enquiry-input-box-email'>
                        <p>Email</p>
                        <input type='text' name="email" value={qoutePayload.email} onChange={handleInputChange} />
                    </div>

                    <div className='email-enquiry-input-box-email'>
                        <p>Phone Number</p>
                        <input type='text' name="phone" value={qoutePayload.phone} onChange={handleInputChange} />
                    </div>

                    <div className='email-enquiry-country-select'>
                        <p>How did you found us?</p>
                        <div className='email-enquiry-country-select-head' onClick={handleShowFoundusList}>
                            <h3>Select Option</h3>
                            <IoMdArrowDropdown size={15} color='rgba(rgba(102, 102, 102, 0.5))' />
                        </div>

                        <div className={`email-enquiry-country-select-body ${showOptionList ? 'email-enquiry-country-list-show' : ''}`}>
                            {foundUs.map((item, index) => (
                                <p key={index} onClick={() => handleSelectOption(item)}>{item}</p>
                            ))}
                        </div>
                    </div>

                    <div className='email-enquiry-text-field'>
                        <p>message</p>
                        <textarea name="message" value={qoutePayload.message} onChange={handleInputChange} />
                    </div>

                </div>


                <div className='email-enquiry-footer-section'>
                    <span>
                        <input type='checkbox' checked={isChecked} onChange={(e) => handleSubscription(e)} style={{ accentColor: "var(--primary-color)" }} />
                        Unlock the best of New Zealand with ZM: Join our newsletter for exclusive deals, travel tips and inspiration!
                    </span>
                    <button onClick={handleSubmit}  style={{ cursor: 'pointer' }} className={`send-email-enquiry-button ${isChecked ? 'active-booking-button' : ''}`}>{modalType !== 'email-qoute' ? 'Send Quote' : 'Send Enquiry'}</button>
                </div>
            </div>
        </div>
    )
}

export default EmailEnquiryModal