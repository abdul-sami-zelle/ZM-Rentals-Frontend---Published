import React, { useEffect, useRef, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import './BookingForm.css';
import DropdownInput from '../dropdown-input/DropdownInput'
import PrimaryButton from '../primary-button/PrimaryButton';
import { GoArrowRight } from "react-icons/go";
import Calendar from 'react-calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSearchVehicle } from '../../context/searchVehicleContext/searchVehicleContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ScreenResize from '../../utils/screenSize'

import useCalendarNavigation from '../../utils/calanderKeyPress'
import { url } from '../../utils/services';

const BookingForm = (
    {
        bgColor,
        textColor,
        textShadow,
        primaryButtonText,
        boxShadow,
        handleSearchVehicles,
        setHeight = false,
        isPickupSelected,
        setIsPickupSelected
    }) => {

    const [pickupCalender, setPickupCalender] = useState(false);
    const [dropCalender, setDropCalender] = useState(false);
    const router = useRouter()
    const { isInRange, width } = ScreenResize(768, 1310)
    const { isMobile, mobWidth } = ScreenResize(0, 767)

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

    useEffect(() => {
        if(locations.length > 0 && searchVehiclePayload.pickup_location === null && searchVehiclePayload.drop_location === null) {
            const defaultLocationObject = locations?.find((item) => item.id === 5);
            setPickupCity(defaultLocationObject?.name)
            setDropupCity(defaultLocationObject?.name)
            setSearchVehiclePayload((prev) => ({
                ...prev,
                pickup_location: 5,
                drop_location: 5
            }))
        }
    }, [locations])


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
            if (searchVehiclePayload.pickup_location !== '') {
                setIsPickupSelected(true)
            }

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
        let [hour, minute] = hourMin?.split(":").map(Number);

        if (meridiem === "PM" && hour !== 12) hour += 12;
        if (meridiem === "AM" && hour === 12) hour = 0;

        // Create a new Date object in New Zealand Time (NZT)
        const nzDateTime = new Date(Date.UTC(
            date?.getFullYear(),
            date?.getMonth(),
            date?.getDate(),
            hour,
            minute
        ));

        // Convert the date to ISO string with Z (treated as UTC)
        const formatted = nzDateTime?.toISOString(); // gives: 2025-06-20T11:00:00.000Z
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

    // Reusable formatter (keeps calendar date, ignores timezone)
    const formatDateAt10AM = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        // Always fix to 10 AM
        return `${year}-${month}-${day}T10:00:00.000Z`;
    };

    const getPickupDateAt10AM = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = formatDateAt10AM(date);

        setSearchVehiclePayload((prev) => ({
            ...prev,
            pickup_time: formattedDate,
        }));
    };

    const getDropOffDateAt10AM = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = formatDateAt10AM(date);

        setSearchVehiclePayload((prev) => ({
            ...prev,
            drop_time: formattedDate,
        }));
    };

    const selectPickDate = (daysAhead) => {
        const today = new Date();
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + daysAhead);
        getPickupDateAt10AM(futureDate)
        setSelectedPickupDate(futureDate); // Update selected date

    };

    const selectDropDate = (daysAhead) => {
        if(!selectedPickupDate) return;

        // const pickup = new Date(selectedPickupDate);
        const pickup = new Date(selectedPickupDate);
        const futureDate = new Date(pickup);
        futureDate.setDate(pickup.getDate() + daysAhead);
        getDropOffDateAt10AM(futureDate)
        setSelectedDropDate(futureDate); // Update selected date

    };

    const selectFutureDate = (date) => { 
        const current = new Date(date);
        const futureDate = new Date(current);
        futureDate.setDate(current.getDate() + 4)
        getDropOffDateAt10AM(futureDate)
        setSelectedDropDate(futureDate)
    }

    useEffect(() => {
        if(!selectedPickupDate) return
            selectFutureDate(selectedPickupDate)
    }, [selectedPickupDate])

    // 🔹 Set default dates only if empty
    useEffect(() => {
        if (!searchVehiclePayload.pickup_time && !searchVehiclePayload.drop_time) {
            selectPickDate(4);
            selectDropDate(8);
        }
    }, []);

    const pickupCalanderRef = useRef();
    useEffect(() => {
        const handleCalanderClose = (event) => {
            if (pickupCalanderRef.current && !pickupCalanderRef.current.contains(event.target)) {
                setPickupCalender(false)
            }
        }

        document.addEventListener('mousedown', handleCalanderClose);

        return () => { document.removeEventListener('mousedown', handleCalanderClose) }
    }, [pickupCalender])

    const dropCalandrRef = useRef();
    useEffect(() => {
        const handleCalanderClose = (event) => {
            if (dropCalandrRef.current && !dropCalandrRef.current.contains(event.target)) {
                setDropCalender(false)
            }
        }

        document.addEventListener('mousedown', handleCalanderClose);

        return () => { document.removeEventListener('mousedown', handleCalanderClose) }
    }, [dropCalender])

    // hook handles arrow keys + enter selection
    useCalendarNavigation(pickupCalanderRef, pickupCalender, (el) => {
        if (pickedDate) handlePickupDateChange(pickedDate);
    });
    
    useCalendarNavigation(dropCalandrRef, dropCalender, (el) => {
         if (pickedDate) handleDropDateChange(pickedDate);
    });

    return (
        <div className={`booking-form-main-container ${searchVehiclePayload.pickup_location !== null ? 'control-booking-location-contianer' : ''}`} style={{ boxShadow: boxShadow }}>


            <div className='booking-form-inputs-container'>
                <div className='booking-form-inputs'>

                    <div className='booking-form-input-single-col-pick-up'>
                        <DropdownInput
                            width={isInRange ? '70%' : '100%'}
                            height={'64px'}
                            defaultValue={'Pick-up Location'}
                            placeholder={'Pick-up'}
                            mobilePlaceholder={"Pick-up"}
                            setSelectedCity={handleLocationChange}
                            data={locations}
                            type={'pick'}
                            bgColor={bgColor}
                            setClicktype={setClicktype}
                            selectedValue={pickupCity}
                            setSelectedValue={setPickupCity}
                            setHeight={setHeight}
                        />
                        <div className='booking-time-container'>

                            <div ref={pickupCalanderRef} className='select-pickup-date-button'>

                                <button className="select-date-button" onClick={togglePickupCalendar} style={{ backgroundColor: bgColor }}>
                                    {selectedPickupDate ? selectedPickupDate.toDateString() : 'Date'}
                                </button>
                                {pickupCalender && (
                                    <div className='booking-pickup-calender-container'>
                                        <Calendar
                                            onChange={handlePickupDateChange}
                                            value={selectedPickupDate}
                                            defaultView="month"
                                            next2Label={null}
                                            prev2Label={null}
                                            minDate={new Date()}
                                            formatShortWeekday={(locale, date) =>
                                                date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 3)
                                            }
                                            nextLabel={<IoIosArrowForward />}
                                            prevLabel={<IoIosArrowBack />}
                                            tileDisabled={({ date, view }) => {
                                                if (view !== "month") return false;

                                                const today = new Date();
                                                today.setHours(0, 0, 0, 0);

                                                const checkDate = new Date(date);
                                                checkDate.setHours(0, 0, 0, 0);

                                                return checkDate < today;
                                            }}
                                        />
                                    </div>
                                )}

                            </div>

                            <DropdownInput
                                width={isInRange ? '75%' : '65%'}
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

                    <div className={`booking-form-input-single-col-drop-off`}>
                        <DropdownInput
                            width={isInRange ? '70%' : '100%'}
                            height={'64px'}
                            defaultValue={'Drop-off Location'}
                            placeholder={'Drop-off'}
                            mobilePlaceholder={"Drop-Off"}
                            data={locations}
                            type={'drop'}
                            setSelectedCity={handleLocationChange}
                            setClicktype={setClicktype}
                            selectedValue={dropupCity}
                            setSelectedValue={setDropupCity}
                            bgColor={bgColor}
                            setHeight={setHeight}
                        />

                        <div className='booking-time-container'>

                            <div ref={dropCalandrRef} className='select-drop-up-date-button'>
                                <button
                                    className="select-date-button"
                                    onClick={() => setDropCalender(prev => !prev)}
                                    style={{ backgroundColor: bgColor }}
                                >
                                    {selectedDropDate ? selectedDropDate.toDateString() : 'Date'}
                                </button>

                                {dropCalender && (
                                    <div  className='booking-drop-calender-container'>
                                        <Calendar
                                            onChange={handleDropDateChange}
                                            value={selectedDropDate}
                                            defaultView="month"            // always show month view
                                            next2Label={null}       // hides double right arrow (>>)
                                            prev2Label={null}
                                            formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 3)}
                                            // 🔹 minDate = pickup date (allows selecting 1+ day bookings)
                                            minDate={selectedPickupDate || new Date()}

                                            tileDisabled={({ date, view }) => {
                                                if (view !== "month") return false; // only disable days

                                                if (!selectedPickupDate) return true;

                                                const pickupDate = new Date(selectedPickupDate);
                                                pickupDate.setHours(0, 0, 0, 0);

                                                const checkDate = new Date(date);
                                                checkDate.setHours(0, 0, 0, 0);

                                                return checkDate < pickupDate; // disable days before pickup
                                            }}
                                        />
                                    </div>
                                )}

                            </div>
                            <DropdownInput
                                width={isInRange ? '75%' : '65%'}
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

                </div>
            </div>


            <div className='booking-form-confirm-button-container'>
                <PrimaryButton
                    handleCLick={handleSearchVehicles}
                    primaryMainClass={'primary-button-main-class'}
                    primaryText={primaryButtonText}
                    primaryIcon={<GoArrowRight size={30} color='#fff' className='primary-icon' />}
                    width={isMobile ? '50%' : '192px'}
                    height={'45px'}
                    gap={'20px'}

                    fontSize={isMobile ? '13px' : 'var(--font-body-lg)'}
                    lineHeight={'var(--line-height-body)'}
                    fontWeight={'var(--font-weight-bold)'}
                />
                <DropdownInput
                    width={isMobile ? '40%' : '100%'}
                    height={'120px'}
                    defaultValue={'Driver Age'}
                    placeholder={'Driver Age'}
                    mobilePlaceholder={'Driver Age'}
                    setSelectedCity={handleDriverAge}
                    data={driverAgeList}
                    // type={'pick'}
                    bgColor={bgColor}
                    setClicktype={setClicktype}
                    selectedValue={driverAge}
                    setSelectedValue={setDriverAge}
                    setHeight={setHeight}
                />
                {/* <p className='add-promo-option' style={{ color: textColor, fontWeight: 700, }}> Add a promo code</p> */}
            </div>
        </div>
    )
}

export default BookingForm
