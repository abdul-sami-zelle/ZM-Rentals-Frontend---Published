import React, { useEffect, useRef, useState } from 'react';
import './CarAvailabilityModal.css';
import { CgCloseO } from "react-icons/cg";
import { url } from '../../../utils/services';
import { IoMdArrowDropdown } from "react-icons/io";
import axios from 'axios';
import { useOutsideClick } from '../../../utils/DetectClickOutside';
import Calendar from 'react-calendar';
import { useDropdownNavigation } from '../../../utils/keyPress';
import useCalendarNavigation from '../../../utils/calanderKeyPress';
import { IoWarningOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import Spinner from '../../../loaders/Spinner/Spinner'
import { CiCalendarDate } from "react-icons/ci";

const CarAvailabilityModal = ({
    showModal,
    setShowModal,
    vehicleData,
    setVehicleData,
    editBookingPayload,
    setEditBookingPayload,
}) => {

    const pickupResult = formatISODate(editBookingPayload?.booking?.pickup_time);
    const dropoffResult = formatISODate(editBookingPayload?.booking?.drop_time);

    const [showPickupList, setShowPickupList] = useState(false);
    const [showDropList, setShowDropList] = useState(false);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [pickupCalender, setPickupCalender] = useState(false);
    const [dropDateCalander, setDropDateCalender] = useState(false);
    const [selectedPickupDate, setSelectedPickupDate] = useState(null);
    const [selectedDropDate, setSelectedDropDate] = useState(null);
    const [pickupTime, setPickupTime] = useState(pickupResult.time);
    const [dropupTime, setDropupTime] = useState(dropoffResult.time);
    const [timeLlistShow, setTimeListShow] = useState(false);
    const [dropTimeListShow, setDropTimeList] = useState(false);
    const [carAvailableLoad, setCarAvailableLoad] = useState(false);
    const [carAvailablilityCheck, setCarAvailabilityCheck] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCarAvailabilityCheck('');
    }, [editBookingPayload?.booking?.pickup_location, editBookingPayload?.booking?.drop_location, editBookingPayload?.booking?.pickup_time, editBookingPayload?.booking?.drop_time])


    const pickupLocationRef = useRef();
    const dropoffLocationRef = useRef();
    const pickupTimeRef = useRef();
    const dropoffTimeRef = useRef();
    const pickupDateRef = useRef();
    const dropoffDateRef = useRef();

    useOutsideClick(pickupLocationRef, () => setShowPickupList(false));
    useOutsideClick(dropoffLocationRef, () => setShowDropList(false));
    useOutsideClick(pickupTimeRef, () => setTimeListShow(false));
    useOutsideClick(dropoffTimeRef, () => setDropTimeList(false));
    useOutsideClick(pickupDateRef, () => setPickupCalender(false));
    useOutsideClick(dropoffDateRef, () => setDropDateCalender(false));

    const pickLocationIndex = useDropdownNavigation(pickupLocationRef, showPickupList, 'pick-up-location-item')
    const dropLocationIndex = useDropdownNavigation(dropoffLocationRef, showDropList, 'drop-location-item')
    const pickuptimeIndex = useDropdownNavigation(pickupTimeRef, timeLlistShow, 'pick-up-time-item')
    const dropoffTimeIndex = useDropdownNavigation(dropoffTimeRef, dropTimeListShow, 'drop-off-time-item')

    useCalendarNavigation(pickupDateRef, pickupCalender, (el) => {
        if (pickupCalender) handlePickupDateChange(pickupCalender);
    });
    useCalendarNavigation(dropoffDateRef, dropDateCalander, (el) => {
        if (dropDateCalander) handleDropDateChange(dropDateCalander);
    });

    const getApi = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${url}/locations/get`);
            setLocations(response.data.data);
        } catch (error) {
            console.error(error);
            setLoading(false)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    useEffect(() => {
        if (locations?.length && editBookingPayload?.booking?.pickup_location) {
            const pickupObject = locations.find(
                (item) => item.id === editBookingPayload.booking.pickup_location
            );
            const dropObject = locations.find(
                (item) => item.id === editBookingPayload.booking.drop_location
            );

            setPickupLocation(pickupObject);
            setDropoffLocation(dropObject);
        }
    }, [locations, editBookingPayload]);

    function formatISODate(isoString) {
        if (!isoString) return { date: "", time: "" };

        // Parse ISO manually to avoid timezone conversion
        const [datePart, timePart] = isoString.split("T");
        const [year, month, day] = datePart.split("-");
        const [hourStr, minuteStr] = timePart.slice(0, 5).split(":");

        let hours = Number(hourStr);
        const minutes = minuteStr;
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        return { date: formattedDate, time: formattedTime };
    }

    // --- Initialize pickup/drop date and time from payload ---
    useEffect(() => {
        if (editBookingPayload?.booking) {
            const pickupISO = editBookingPayload.booking.pickup_time;
            const dropISO = editBookingPayload.booking.drop_time;
            if (pickupISO) {
                setSelectedPickupDate(new Date(pickupISO));
                setPickupTime(formatISODate(pickupISO).time);
            }
            if (dropISO) {
                setSelectedDropDate(new Date(dropISO));
                setDropupTime(formatISODate(dropISO).time);
            }
        }
    }, [editBookingPayload]);

    const handlePickupListShow = () => setShowPickupList(!showPickupList);
    const handleDropListShow = () => setShowDropList(!showDropList);

    const handleUpdatePickupLocation = (item) => {
        setEditBookingPayload((prev) => ({
            ...prev,
            booking: { ...prev.booking, pickup_location: item.id }
        }));
        setShowPickupList(false);
    };

    const handleUpdateDropLocation = (item) => {
        setEditBookingPayload((prev) => ({
            ...prev,
            booking: { ...prev.booking, drop_location: item.id }
        }));
        setShowDropList(false);
    };

    const handlePickupDateCalender = () => setPickupCalender(!pickupCalender);
    const handleDropDateCalender = () => setDropDateCalender(!dropDateCalander);

    const generateTimeList = () => {
        const times = [];
        for (let hour = 6; hour <= 21; hour++) {
            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
            const suffix = hour < 12 ? "AM" : "PM";
            const formattedTime = `${displayHour.toString().padStart(2, "0")}:00 ${suffix}`;
            times.push({ name: formattedTime });
        }
        return times;
    };

    // ---- Pickup and Drop Date Handlers ----
    const handlePickupDateChange = (date) => {
        setSelectedPickupDate(date);

        // Always use current selected pickupTime, not a default
        formatePickupDateAndTime(date, pickupResult.time);

        // Adjust drop date if needed
        if (selectedDropDate && date > selectedDropDate) {
            setSelectedDropDate(date);
            handleDropofTimeAndDate(date, dropoffResult.time);
        }

        setPickupCalender(false);
    };

    const handleDropDateChange = (date) => {
        setSelectedDropDate(date);

        // Always use current selected drop time
        handleDropofTimeAndDate(date, dropoffResult.time);

        setDropDateCalender(false);
    };

    // ---- Time Handlers ----
    const handleSelectPickupTime = (value) => {
        setPickupTime(value.name);
        formatePickupDateAndTime(selectedPickupDate, value.name);
        setTimeListShow(false);
    };

    const handleDropofTime = (value) => {
        setDropupTime(value.name);
        handleDropofTimeAndDate(selectedDropDate, value.name);
        setDropTimeList(false);
    };

    // ---- Format Date + Time to ISO and Save to Payload ----
    const formatePickupDateAndTime = (date, time) => {
        if (!date || !time) return;
        const [hourMin, meridiem] = time.split(" ");
        let [hour, minute] = hourMin.split(":").map(Number);
        if (meridiem === "PM" && hour !== 12) hour += 12;
        if (meridiem === "AM" && hour === 12) hour = 0;
        const nzDateTime = new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hour,
            minute
        ));
        const formatted = nzDateTime.toISOString();
        setEditBookingPayload(prev => ({
            ...prev,
            booking: { ...prev.booking, pickup_time: formatted }
        }));
    };

    const handleDropofTimeAndDate = (date, time) => {
        if (!date || !time) return;
        const [hourMin, meridiem] = time.split(" ");
        let [hour, minute] = hourMin.split(":").map(Number);
        if (meridiem === "PM" && hour !== 12) hour += 12;
        if (meridiem === "AM" && hour === 12) hour = 0;
        const nzDateTime = new Date(Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            hour,
            minute
        ));
        const formatted = nzDateTime.toISOString();
        setEditBookingPayload(prev => ({
            ...prev,
            booking: { ...prev.booking, drop_time: formatted }
        }));
    };

    const [updatedVehicleData, setUpdatedVehilceData] = useState({})
    const handleCheckAvailability = async () => {
        const api = `${url}/cars/specific-available-car`

        const availabilityObj = {
            pickup_location: editBookingPayload?.booking?.pickup_location,
            drop_location: editBookingPayload?.booking?.drop_location,
            pickup_time: editBookingPayload?.booking?.pickup_time,
            drop_time: editBookingPayload?.booking?.drop_time,
            driver_age: "24",
            car_id: editBookingPayload?.booking?.car_id
        }

        setLoading(true)
        try {
            const response = await axios.post(api, availabilityObj)
            if (response.status === 200) {
                if (response.data.available === 1) {
                    setUpdatedVehilceData(response.data)
                    setCarAvailabilityCheck('yes');
                } else {
                    setCarAvailabilityCheck('no');
                }
            }
        } catch (error) {
            console.error("UnExpected server error", error);
            setLoading(false)
        } finally {
            setLoading(false)
        }


    }
    const handleCloseModal = () => setShowModal(false);

    const handleRecheckAvailability = () => {
        setCarAvailabilityCheck('')
    }

    const handleUpdateBookingTiming = () => {
        setVehicleData((prev) => ({
            ...prev,
            rates: updatedVehicleData?.daily_rates,
            car_rates: updatedVehicleData?.sub_total,
            discount_amount: updatedVehicleData?.discounts?.value,
            discount_percent: updatedVehicleData?.discounts?.percent,
            off_hour_charges: updatedVehicleData?.off_hour_charges
        }))
        setShowModal(false)
    }

    return (
        <div className={`car-available-modal-main-contianer ${showModal ? 'show-car-available-modal' : ''}`} onClick={handleCloseModal}>

            <div className={`car-available-modal-inner ${showModal ? 'show-car-available-inner-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className='car-available-modal-head'>
                    <h3>Booking Information</h3>
                    <CgCloseO color='#000' size={20} style={{ cursor: 'pointer' }} onClick={handleCloseModal} />
                </div>

                <div className='car-available-selected-modal-info'>
                    <div className='current-car-img-contianer'>
                        <img src={url + vehicleData?.Car?.image} alt='car-img' />
                    </div>
                    <div className='current-car-details-section'>
                        <h3>{vehicleData?.Car?.name}</h3>
                        <p>{vehicleData?.Car?.CarTypeAssociations[0]?.name}</p>
                        <span>NZD {vehicleData?.Car?.base_rate}/Day</span>
                    </div>
                </div>

                <div className='car-available-edit-pickup-and-drop'>
                    {/* PICKUP SECTION */}
                    <div className='car-available-edit-pickup'>
                        <h3>Pick up Location</h3>
                        <div className='car-available-pick-up-inputs-main'>

                            <div ref={pickupLocationRef} className='pick-up-location-dropdown'>
                                <div className='pickup-dropdown-head' onClick={handlePickupListShow}>
                                    <h3>{pickupLocation?.name}</h3>
                                    <IoMdArrowDropdown size={20} color='#000' />
                                </div>
                                <div className={`pickup-dropdown-body ${showPickupList ? 'show-pick-up-locations-list' : ''}`}>
                                    {locations?.map((item, index) => (
                                        <p className={`pick-up-location-item ${pickLocationIndex === index ? 'active-pick-up-location-index' : ''}`} key={index} onClick={() => handleUpdatePickupLocation(item)}>{item.name}</p>
                                    ))}
                                </div>
                            </div>

                            <div className='pick-up-location-time-and-date'>

                                <div ref={pickupDateRef} className='pick-up-location-date'>
                                    <p>Date</p>
                                    <span onClick={handlePickupDateCalender}>
                                        <h3 >{pickupResult.date}</h3>
                                        <CiCalendarDate size={20} color='#000' />
                                    </span>
                                    {pickupCalender && (
                                        <div className='pickup-date-calander-contianer'>
                                            <Calendar
                                                onChange={handlePickupDateChange}
                                                value={selectedPickupDate}
                                                view="month"
                                                next2Label={null}
                                                prev2Label={null}
                                                formatShortWeekday={(locale, date) =>
                                                    date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
                                                }
                                                formatMonthYear={(locale, date) =>
                                                    date.toLocaleDateString(locale, { month: 'long' }) // 👈 Only month
                                                }
                                                minDate={new Date()}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div ref={pickupTimeRef} className='pick-up-location-time'>
                                    <p>Time</p>
                                    <div className='pick-up-time-head' onClick={() => setTimeListShow(!timeLlistShow)}>
                                        <h3>{pickupTime}</h3>
                                        <IoMdArrowDropdown size={20} color='#000' />
                                    </div>
                                    <div className={`pick-up-time-body ${timeLlistShow ? 'show-pick-up-time-body' : ''}`}>
                                        {generateTimeList().map((item, index) => (
                                            <p className={`pick-up-time-item ${pickuptimeIndex === index ? 'active-pickup-time-item' : ''}`} key={index} onClick={() => handleSelectPickupTime(item)}>{item.name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DROP SECTION */}
                    <div className='car-available-edit-drop'>
                        <h3>Drop off Location</h3>
                        <div className='car-available-pick-up-inputs-main'>
                            <div ref={dropoffLocationRef} className='pick-up-location-dropdown'>
                                <div className='pickup-dropdown-head' onClick={handleDropListShow}>
                                    <h3>{dropoffLocation?.name}</h3>
                                    <IoMdArrowDropdown size={20} color='#000' />
                                </div>
                                <div className={`drop-dropdown-body ${showDropList ? 'show-drop-off-locations-list' : ''}`}>
                                    {locations?.map((item, index) => (
                                        <p className={`drop-location-item ${dropLocationIndex === index ? 'active-drop-location-off' : ''}`} key={index} onClick={() => handleUpdateDropLocation(item)}>{item.name}</p>
                                    ))}
                                </div>
                            </div>

                            <div className='pick-up-location-time-and-date'>
                                <div ref={dropoffDateRef} className='pick-up-location-date'>
                                    <p>Date</p>
                                    <span onClick={handleDropDateCalender}>
                                        <h3 >{dropoffResult.date}</h3>
                                        <CiCalendarDate size={20} color='#000' />
                                    </span>
                                    
                                    {dropDateCalander && (
                                        <div className='drop-date-calander-contianer'>
                                            <Calendar
                                                onChange={handleDropDateChange}
                                                value={selectedDropDate}
                                                view="month"
                                                next2Label={null}
                                                prev2Label={null}
                                                formatShortWeekday={(locale, date) =>
                                                    date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
                                                }
                                                formatMonthYear={(locale, date) =>
                                                    date.toLocaleDateString(locale, { month: 'long' }) // 👈 Only month
                                                }
                                                minDate={selectedPickupDate || new Date()}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div ref={dropoffTimeRef} className='pick-up-location-time'>
                                    <p>Time</p>
                                    <div className='pick-up-time-head' onClick={() => setDropTimeList(!dropTimeListShow)}>
                                        <h3>{dropupTime}</h3>
                                        <IoMdArrowDropdown size={20} color='#000' />
                                    </div>
                                    <div className={`drop-off-time-body ${dropTimeListShow ? 'show-drop-off-time-body' : ''}`}>
                                        {generateTimeList().map((item, index) => (
                                            <p className={`drop-off-time-item ${dropoffTimeIndex === index ? 'active-drop-time-item' : ''}`} key={index} onClick={() => handleDropofTime(item)}>{item.name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Availability Check */}
                <div className='available-or-not-contianer'>
                    {carAvailablilityCheck !== '' && <button className='recheck-availability' onClick={handleRecheckAvailability}><CgCloseO size={20} color='#000' /></button>}
                    {loading && <Spinner />}
                    {carAvailablilityCheck === '' ? (
                        <div className='car-availability-check-button-contianer'>
                            <h3 onClick={handleCheckAvailability}>Check Availability</h3>
                        </div>
                    ) : carAvailablilityCheck === 'yes' ? (
                        // <img src={'/assets/manage-bookings/car-available.png'} alt='img' />
                        <div className='available-main-contianer'>
                            <div className='available-icon-color'>
                                <FaRegCircleCheck size={50} color='#FFF' />
                            </div>
                            <span className='available-message'>
                                <h3>Car Available</h3>
                                <p>The vehicle is available. Please proceed with your booking</p>
                            </span>
                        </div>
                    ) : (
                        // <img src={'/assets/manage-bookings/car-not-available.png'} alt='img' />
                        <div className='not-available-main-contianer'>
                            <div className='not-available-icon-color'>
                                <IoWarningOutline size={50} color='#FFF' />
                            </div>
                            <span className='not-available-message'>
                                <h3>Car Not Available</h3>
                                <p>The vehicle is not available on the selected date. Please select another date</p>
                            </span>
                        </div>
                    )}
                </div>

                <button onClick={handleUpdateBookingTiming} className={`check-availability-button ${carAvailablilityCheck === 'yes' ? 'active-availability' : ''}`}>Save</button>
            </div>
        </div>
    );
};

export default CarAvailabilityModal;
