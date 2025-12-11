import React, { useEffect, useRef, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import './StickySection.css'
// import DropdownInput from '../dropdown-input/DropdownInput'
// import PrimaryButton from '../primary-button/PrimaryButton';
import { GoArrowRight } from "react-icons/go";
import Calendar from 'react-calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import { useRouter } from 'next/navigation';
// import { useBookingContext } from '@/context/bookingContext/bookingContext';
import axios from 'axios';
import DropdownInput from '../dropdown-input/DropdownInput';
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import PrimaryButton from '../primary-button/PrimaryButton';
import useCalendarNavigation from '../../utils/calanderKeyPress'
import { url } from '@/utils/services';


const StickySection = ({ bgColor, textColor, textShadow, primaryButtonText, boxShadow, handleSearchVehicles, setHeight = false, isPickupSelected, setIsPickupSelected }) => {

    const [pickupCalender, setPickupCalender] = useState(false);
    const [dropCalender, setDropCalender] = useState(false);
    const router = useRouter()

    const {
        searchVehiclePayload,
        setSearchVehiclePayload,
        setSearchedVehicles,
        pickupCity,
        setPickupCity,
        pickupTime,
        setPickupTime,
        dropupCity,
        setDropupCity,
        dropupTime,
        setDropupTime,
        selectedPickupDate,
        setSelectedPickupDate,
        selectedDropDate,
        setSelectedDropDate,
        driverAge,
        setDriverAge,
    } = useSearchVehicle();



    const driverAgeList = [
        { name: '21' }, { name: '22' }, { name: '23' }, { name: '24' }, { name: '25+' }
    ]

    const [locations, setLocations] = useState([])
    const getApi = async () => {
        try {
            const response = await axios.get(`${url}/locations/get`);
            setLocations(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    const generateTimeList = () => {
        const times = [];
        for (let hour = 6; hour <= 21; hour++) {  // 6 AM (6) to 9 PM (21)
            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
            const suffix = hour < 12 ? "AM" : "PM";
            const formattedTime = `${displayHour.toString().padStart(2, "0")}:00 ${suffix}`;
            times.push({ name: formattedTime });
        }
        return times;
    };

    const togglePickupCalendar = () => {
        setPickupCalender(prev => !prev);
    };

    const toggleDropCalendar = () => {
        setDropCalender(prev => !prev);
    };

    const handlePickupDateChange = (date) => {
        setSelectedPickupDate(date);
        formatePickupDateAndTime(date, pickupTime)
        setPickupCalender(false); // hide after selection
    };


    const handleDropDateChange = (date) => {
        setSelectedDropDate(date);
        handleDropofTimeAndDate(date, dropupTime)
        setDropCalender(false); // hide after selection
    };

    const [clickType, setClicktype] = useState('')
    const handleLocationChange = (item) => {

        if (clickType === 'pickup') {
            setSearchVehiclePayload((prevValue) => ({
                ...prevValue,
                pickup_location: item.id,
            }))


        } else {
            setSearchVehiclePayload((prevValue) => ({
                ...prevValue,
                drop_location: item.id
            }))
        }
    }

    const handleSelectPickupTime = (value) => {
        formatePickupDateAndTime(selectedPickupDate, value.name)
        setPickupTime(value.name)
    }

    const handleDropofTime = (value) => {
        setDropupTime(value.name);
        handleDropofTimeAndDate(selectedDropDate, value.name)
    }

    const formatePickupDateAndTime = (date, time) => {
        // Combine selected date and selected time
        const [hourMin, meridiem] = time?.split(" ");
        let [hour, minute] = hourMin.split(":").map(Number);

        if (meridiem === "PM" && hour !== 12) hour += 12;
        if (meridiem === "AM" && hour === 12) hour = 0;

        // Create a new Date object in New Zealand Time (NZT)
        const nzDateTime = new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hour,
            minute
        ));

        // Convert the date to ISO string with Z (treated as UTC)
        const formatted = nzDateTime.toISOString(); // gives: 2025-06-20T11:00:00.000Z
        // Update your payload here:
        setSearchVehiclePayload(prev => ({
            ...prev,
            pickup_time: formatted
        }));

    };

    const handleDropofTimeAndDate = (date, time) => {
        // Combine selected date and selected time
        const [hourMin, meridiem] = time.split(" ");
        let [hour, minute] = hourMin.split(":").map(Number);

        if (meridiem === "PM" && hour !== 12) hour += 12;
        if (meridiem === "AM" && hour === 12) hour = 0;

        // Create a new Date object in New Zealand Time (NZT)
        const nzDateTime = new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hour,
            minute
        ));

        // Convert the date to ISO string with Z (treated as UTC)
        const formatted = nzDateTime.toISOString(); // gives: 2025-06-20T11:00:00.000Z

        // Update your payload here:
        setSearchVehiclePayload(prev => ({
            ...prev,
            drop_time: formatted
        }));
    };

    const handleDriverAge = (age) => {
        setSearchVehiclePayload((prev) => ({
            ...prev,
            driver_age: age.name
        }))
        setDriverAge(age.name)
    }

    const pickupCalanderRef = useRef();
    const dropupCalanderRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (pickupCalanderRef.current && !pickupCalanderRef.current.contains(event.target)) {
                setPickupCalender(false);
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => { document.removeEventListener('mousedown', handleOutsideClick) }
    }, [])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropupCalanderRef.current && !dropupCalanderRef.current.contains(event.target)) {
                setDropCalender(false);
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => { document.removeEventListener('mousedown', handleOutsideClick) }
    }, [])

    // hook handles arrow keys + enter selection
    useCalendarNavigation(pickupCalanderRef, pickupCalender, (el) => {
        if (pickedDate) handlePickupDateChange(pickedDate);
    });

    useCalendarNavigation(dropupCalanderRef, dropCalender, (el) => {
        if (pickedDate) handleDropDateChange(pickedDate);
    });

    return (
        <div className='sticky-booking-form-main-contianer'>

            <div className='sticky-booking-fields-contianer'>

                <div className='sticky-pickup-details'>

                    <DropdownInput
                        width={'100%'}
                        height={'64px'}
                        defaultValue={'Pick-up Location'}
                        placeholder={'Pick-up'}
                        setSelectedCity={handleLocationChange}
                        data={locations}
                        type={'pick'}
                        bgColor={bgColor}
                        setClicktype={setClicktype}
                        selectedValue={pickupCity}
                        setSelectedValue={setPickupCity}
                        setHeight={setHeight}
                    />
                    <div className='sticky-booking-time-container'>

                        <div ref={pickupCalanderRef} className='sticky-select-pickup-date-button'>

                            <button className="select-date-button" onClick={togglePickupCalendar} style={{ backgroundColor: bgColor }}>
                                {selectedPickupDate ? selectedPickupDate.toDateString() : 'Date'}
                            </button>
                            {pickupCalender && (
                                <div className='sticky-booking-pickup-calender-container'>
                                    <Calendar
                                        onChange={handlePickupDateChange}
                                        value={selectedPickupDate}
                                        view="month"
                                        maxDetail="month"
                                        minDetail="month"
                                        next2Label={null}
                                        prev2Label={null}
                                        minDate={new Date()}
                                        formatShortWeekday={(locale, date) =>
                                            date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 3)
                                        }
                                        nextLabel={<IoIosArrowForward />}
                                        prevLabel={<IoIosArrowBack />}
                                        tileDisabled={({ date }) => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0); // strip time

                                            const checkDate = new Date(date);
                                            checkDate.setHours(0, 0, 0, 0); // strip time

                                            return checkDate < today;
                                        }}
                                    />
                                </div>
                            )}

                        </div>

                        <DropdownInput
                            width={'45%'}
                            height={'162px'}
                            defaultValue={'Time'}
                            data={generateTimeList()}
                            setSelectedCity={handleSelectPickupTime}
                            bgColor={bgColor}
                            setClicktype={setClicktype}
                            selectedValue={pickupTime}
                            setSelectedValue={setPickupTime}
                        />
                    </div>

                </div>

                <div className='sticky-drop-off-dtails'>

                    <DropdownInput
                        width={'100%'}
                        height={'64px'}
                        defaultValue={'Drop-off Location'}
                        placeholder={'Drop-off'}
                        data={locations}
                        type={'drop'}
                        setSelectedCity={handleLocationChange}
                        setClicktype={setClicktype}
                        selectedValue={dropupCity}
                        setSelectedValue={setDropupCity}
                        bgColor={bgColor}
                        setHeight={setHeight}
                    />

                    <div ref={dropupCalanderRef} className='sticky-booking-time-container'>

                        <div className='sticky-select-drop-up-date-button'>
                            <button
                                className="select-date-button"
                                onClick={toggleDropCalendar}
                                style={{ backgroundColor: bgColor }}
                            >
                                {selectedDropDate ? selectedDropDate.toDateString() : 'Date'}
                            </button>

                            {dropCalender && (
                                <div className='sticky-booking-drop-calender-container'>
                                    <Calendar
                                        onChange={handleDropDateChange}
                                        value={selectedDropDate}
                                        view="month"            // always show month view
                                        maxDetail="month"       // prevent navigating into days
                                        minDetail="month"       // prevent navigating to years
                                        next2Label={null}       // hides double right arrow (>>)
                                        prev2Label={null}
                                        formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 3)}
                                        minDate={new Date()}
                                        tileDisabled={({ date }) => {
                                            if (!selectedPickupDate) return true; // disable everything if no pickup date selected

                                            const pickupDate = new Date(selectedPickupDate);
                                            pickupDate.setHours(0, 0, 0, 0);

                                            const checkDate = new Date(date);
                                            checkDate.setHours(0, 0, 0, 0);

                                            return checkDate < pickupDate;
                                        }}
                                    />
                                </div>
                            )}

                        </div>
                        <DropdownInput
                            width={'45%'}
                            height={'162px'}
                            defaultValue={'Time'}
                            data={generateTimeList()}
                            setClicktype={setClicktype}
                            setSelectedCity={handleDropofTime}
                            bgColor={bgColor}
                            selectedValue={dropupTime}
                            setSelectedValue={setDropupTime}
                        />
                    </div>

                </div>

                <div className='driver-detail-aligned-with-all-inputs'>
                    <DropdownInput
                        width={'70%'}
                        height={'120px'}
                        defaultValue={'Driver Age'}
                        placeholder={'Driver Age'}
                        setSelectedCity={handleDriverAge}
                        data={driverAgeList}
                        // type={'pick'}
                        bgColor={bgColor}
                        setClicktype={setClicktype}
                        selectedValue={driverAge}
                        setSelectedValue={setDriverAge}
                        setHeight={setHeight}
                    />

                    <button className='sticky-search-vehilce-rounded-btn' onClick={handleSearchVehicles}>
                        <GoArrowRight size={20} color='#fff' className='primary-icon' />
                    </button>
                </div>
            </div>


            <div className='sticky-booking-dates-find-car-button-contianer'>
                <div className='sticky-booking-driver-age-and-button-container'>
                    <div className='sticky-driver-age-contianer'>
                        <DropdownInput
                            width={'100%'}
                            height={'120px'}
                            defaultValue={'Driver Age'}
                            placeholder={'Driver Age'}
                            setSelectedCity={handleDriverAge}
                            data={driverAgeList}
                            // type={'pick'}
                            bgColor={bgColor}
                            setClicktype={setClicktype}
                            selectedValue={driverAge}
                            setSelectedValue={setDriverAge}
                            setHeight={setHeight}
                        />
                    </div>

                    <div className='sticky-vehicle-book-btn'>
                        <PrimaryButton
                            handleCLick={handleSearchVehicles}
                            primaryMainClass={'primary-button-main-class'}
                            primaryText={primaryButtonText}
                            primaryIcon={<GoArrowRight size={30} color='#fff' className='primary-icon' />}
                            width={'220px'}
                            height={'47px'}
                            gap={'20px'}
                            fontSize={'var(--font-body-lg)'}
                            lineHeight={'var(--line-height-body)'}
                            fontWeight={'var(--font-weight-bold)'}
                        />
                    </div>



                </div>
            </div>
        </div>
    )
}

export default StickySection