import React, { useEffect, useState } from 'react'
import './SelectBooking.css'
import { url } from '@/utils/services';
import axios from 'axios';
import MainLoader from '@/loaders/MainLoader/MainLoader';

const SelectBooking = ({ manageBookingSteper, setManageBookingSteper, imageChaneg }) => {
    const [loading, setLoading] = useState(false);
    const [bookingPayload, setBookingPayload] = useState({
        booking_id: '',
        email: ''
    })

    const [errors, setErrors] = useState({});
    const validate = (name, value) => {
        let newErrors = { ...errors };

        // check for empty field
        if (!value.trim()) {
            newErrors[name] = `${name} is required`;
        } else {
            delete newErrors[name]; // remove error if not empty
        }

        // check email format
        if (name === "email" && value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                newErrors[name] = "Invalid email format";
            } else {
                delete newErrors[name];
            }
        }

        setErrors(newErrors);
    };

    const handleBookingSelect = (event) => {
        const { name, value } = event.target;

        let newValue = value
        if (name === 'booking_id') {
            newValue = newValue.replace(/[^\d+]/g, '');
        }

        setBookingPayload((prev) => ({
            ...prev,
            [name]: newValue
        }))

        validate(name, value);
    }

    const handleSubmit = async () => {
        // run validation for all fields first
        let newErrors = {};

        Object.entries(bookingPayload).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = `${key} is required`;
            }
            if (key === "email" && value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    newErrors[key] = "Invalid email format";
                }
            }
        });

        setErrors(newErrors);

        // if there are errors, stop here
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const api = `${url}/booking/verify-booking`
        setLoading(true)
        try {
            const response = await axios.post(api, bookingPayload);
            if (response.status === 200) {
                const bookingDetails = {
                    booking_id: bookingPayload?.booking_id,
                    token: response.data.token
                }
                if(response.status === 200) {
                    setLoading(false)
                }
                sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails))
                setManageBookingSteper(manageBookingSteper + 1)
                
            }
        } catch (error) {
            setLoading(false)
            console.error("UnExpected Server Error", error);
        } finally {
            setLoading(false)
        }

        imageChaneg()
    };



    useEffect(() => {

        const globalyEnterPress = (event) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        }

        document.addEventListener('keydown', globalyEnterPress);

        return () => {
            document.removeEventListener('keydown', globalyEnterPress)
        }
    }, [bookingPayload])

    return (
        <div className='select-booking-main-contianer'>
            {loading && <MainLoader />}
            <div className='select-booking-heaing-contianer'>
                <h3>Manage Booking</h3>
                <p>Manage Your Booking</p>
            </div>

            <div className='select-booking-inputs-continaer'>
                <label>
                    Booking Number
                    <input 
                        type='text' 
                        name='booking_id' 
                        value={bookingPayload.booking_id} 
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        onChange={handleBookingSelect} style={{ border: errors.booking_id ? '1px solid red' : '1px solid #000' }} 
                    />
                </label>
                <label>
                    Email
                    <input 
                        type='text' 
                        name='email' 
                        value={bookingPayload.email} 
                        onChange={handleBookingSelect} 
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{ border: errors.email ? '1px solid red' : '1px solid #000' }} 
                    />
                </label>
            </div>

            <div className='manage-booking-steper-button-contianer'>
                <button id={'proceedClick'} onClick={handleSubmit}>Proceed To Manage</button>
            </div>
        </div>
    )
}

export default SelectBooking