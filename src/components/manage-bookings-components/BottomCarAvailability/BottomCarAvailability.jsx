import React, { useEffect, useRef, useState } from 'react'
import './BottomCarAvailability.css'
import { IoMdArrowDropdown } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import axios from 'axios';
import Calendar from 'react-calendar';
import { url } from '@/utils/services';
import Spinner from '@/loaders/Spinner/Spinner';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IoWarningOutline } from 'react-icons/io5';
import { useOutsideClick } from '@/utils/DetectClickOutside';
import { CgCloseO } from 'react-icons/cg';

const BottomCarAvailability = ({isEditabel, setIsEditable, editBookingPayload, setEditBookingPayload, locations, setLocations, setBottomModal }) => {

  const [showpickLocations, setShowPickLocations] = useState(false)
  const [dropoffLocationShow, setDropoffLocationShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const [pickupLocationName, setPickupLocationName] = useState('');
  const [dropLocationName, setDropLocationName] = useState('');
  const [pickAndDropPayload, setPickAndDropPayload] = useState({
    pickup_location: null,
    drop_location: null,
    pickup_time: "",
    drop_time: "",
  })

  useEffect(() => {
    setPickAndDropPayload({
      pickup_location: editBookingPayload?.booking?.pickup_location,
      drop_location: editBookingPayload?.booking?.drop_location,
      pickup_time: editBookingPayload?.booking?.pickup_time,
      drop_time: editBookingPayload?.booking?.drop_time
    })
  }, [editBookingPayload])

  useEffect(() => {
    const pickedLocationName = locations.find((item) => item.id === pickAndDropPayload?.pickup_location)
    const dropedLocationName = locations.find((item) => item.id === pickAndDropPayload?.drop_location)
    setPickupLocationName(pickedLocationName?.name);
    setDropLocationName(dropedLocationName?.name);
  }, [pickAndDropPayload])

  // Pick up Location Function
  const handleUpdatePickupLocation = (item) => {
    setPickAndDropPayload((prev) => ({
      ...prev,
      pickup_location: item.id
    }))
    setShowPickLocations(false);
  }

  // pickup date functions and states 
  const pickupupResult = formatISODate(pickAndDropPayload.pickup_time);
  const dropOffResult = formatISODate(pickAndDropPayload?.drop_time);

  const [showPickupCalender, setShowPickupCalender] = useState(false);


  const [selectedPickupDate, setSelectedPickupDate] = useState(null);

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

  // ---- Pickup and Drop Date Handlers ----
  const handlePickupDateChange = (date) => {
    setSelectedPickupDate(date);

    // Always use current selected pickupTime, not a default
    formatePickupDateAndTime(date, pickupupResult.time);

    // Adjust drop date if needed
    if (selectedDropDate && date > selectedDropDate) {
      setSelectedDropDate(date);
      handleDropofTimeAndDate(date, dropOffResult.time);
    }

    setShowPickupCalender(false);
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
    setPickAndDropPayload(prev => ({
      ...prev,
      pickup_time: formatted
    }));
  };

  // Pick up Time set
  const [showPickupTime, setshowPickupTime] = useState(false)
  const [pickupTime, setPickupTime] = useState(pickupupResult.time)
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

  // ---- Time Handlers ----
  const handleSelectPickupTime = (value) => {
    setPickupTime(value.name);
    formatePickupDateAndTime(selectedPickupDate, value.name);
    setshowPickupTime(false);
  };


  // Drop off Location 
  const handleUpdateDropLocation = (item) => {
    setPickAndDropPayload((prev) => ({
      ...prev,
      drop_location: item.id
    }))
    setDropoffLocationShow(false)
  }

  // Drop Date Functions
  const [dropCalenderShow, setDropCalenderShow] = useState(false);

  const [selectedDropDate, setSelectedDropDate] = useState(null);

  const handleDropDateChange = (date) => {
    setSelectedDropDate(date);

    // Always use current selected drop time
    handleDropofTimeAndDate(date, dropOffResult.time);

    setDropCalenderShow(false);
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
    setPickAndDropPayload(prev => ({
      ...prev,
      drop_time: formatted
    }));
  };

  // Drop time function
  const [showDropTime, setShowDroptime] = useState(false);
  const [dropupTime, setDropupTime] = useState(dropOffResult.time);
  const handleDropofTime = (value) => {
    setDropupTime(value.name);
    handleDropofTimeAndDate(selectedDropDate, value.name);
    setShowDroptime(false);
  };

  const pickupLocationRef = useRef()
  const pickupDateRef = useRef()
  const pickupTimeRef = useRef()
  const dropLocationRef = useRef()
  const dropDateRef = useRef()
  const dropTimeRef = useRef()

  useOutsideClick(pickupLocationRef, () => setShowPickLocations(false));
  useOutsideClick(pickupDateRef, () => setShowPickupCalender(false));
  useOutsideClick(pickupTimeRef, () => setshowPickupTime(false));
  useOutsideClick(dropLocationRef, () => setDropoffLocationShow(false));
  useOutsideClick(dropDateRef, () => setDropCalenderShow(false));
  useOutsideClick(dropTimeRef, () => setShowDroptime(false));

  // Availability Check
  const [carAvailablilityCheck, setCarAvailabilityCheck] = useState('');

  useEffect(() => {
    // Reset availability whenever any field changes
    setCarAvailabilityCheck('');
  }, [
    pickAndDropPayload.pickup_location,
    pickAndDropPayload.drop_location,
    pickAndDropPayload.pickup_time,
    pickAndDropPayload.drop_time
  ]);

  const [updatedVehicleData, setUpdatedVehilceData] = useState({})
  const handleCheckAvailability = async () => {
    const api = `${url}/cars/specific-available-car`

    const availabilityObj = {
      pickup_location: pickAndDropPayload.pickup_location,
      drop_location: pickAndDropPayload.drop_location,
      pickup_time: pickAndDropPayload.pickup_time,
      drop_time: pickAndDropPayload.drop_time,
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

  const handleRecheckAvailability = () => {
    setCarAvailabilityCheck('')
  }

  const handleUpdateBookingInfo = () => {
    setEditBookingPayload((prev) => ({
      ...prev,
      booking: {
        ...prev.booking,
        pickup_location: pickAndDropPayload?.pickup_location,
        drop_location: pickAndDropPayload?.drop_location,
        pickup_time: pickAndDropPayload?.pickup_time,
        drop_time: pickAndDropPayload?.drop_time
      }
    }))
    setCarAvailabilityCheck('');
    setBottomModal(false)
  }

  return (
    <div className='mobile-pick-and-drop-main-contianer'>

      <label ref={pickupLocationRef} className='pick-up-location-label' style={{opacity: isEditabel.bookingInfo ? 1 : 0.4}}>
        Pick-up Location
        <div className={`pick-up-location-head ${showpickLocations ? 'remove-bottom-redius' : ''}`} onClick={() => isEditabel.bookingInfo ? setShowPickLocations(!showpickLocations) : null}>
          <h3>{pickupLocationName}</h3>
          <IoMdArrowDropdown size={15} color='#000' />
        </div>
        <div className={`pick-up-location-body ${showpickLocations ? 'show-pick-up-location' : ''}`}>
          {locations?.map((item, index) => (
            <p className={`pick-location-items`} key={index} onClick={() => handleUpdatePickupLocation(item)}>{item.name}</p>
          ))}
        </div>
      </label>

      <div className='pick-up-date-and-time-container'>

        <div ref={pickupDateRef} className='pick-up-calender-contianer-drop-down' style={{opacity: isEditabel.bookingInfo ? 1 : 0.4}}>
          <div className={`pick-up-calender-head ${showPickupCalender ? 'remove-pick-date-radius' : ''}`} onClick={() => isEditabel.bookingInfo ? setShowPickupCalender(!showPickupCalender) : null}>
            <h3>{pickupupResult.date}</h3>
            <CiCalendarDate size={15} color='#000' />
          </div>
          <div className={`pick-up-calender-contianer ${showPickupCalender ? 'show-pick-up-date' : ''}`}>
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
        </div>

        <div ref={pickupTimeRef} className='pick-up-time-container' style={{opacity: isEditabel.bookingInfo ? 1 : 0.4}}>
          <div className={`mobile-pick-up-time-head ${showPickupTime ? 'remove-pick-up-time-bottom-radius' : ''}`} onClick={() => isEditabel.bookingInfo ? setshowPickupTime(!showPickupTime) : null}>
            <h3>{pickupTime}</h3>
            <IoMdArrowDropdown size={15} color='#000' />
          </div>
          <div className={`mobile-pick-up-time-body ${showPickupTime ? 'show-mobile-pick-time' : ''}`}>
            {generateTimeList().map((item, index) => (
              <p className={`mobile-pick-up-time-item`} key={index} onClick={() => handleSelectPickupTime(item)}>{item.name}</p>
            ))}
          </div>

        </div>
      </div>

      <label ref={dropLocationRef} className='drop-location-label' style={{opacity: isEditabel.bookingInfo ? 1 : 0.4}}>
        Drop-off Location
        <div className={`drop-off-location-name-head ${dropoffLocationShow ? 'remove-bottom-redius-on-drop' : ''}`} onClick={() => isEditabel?.bookingInfo ? setDropoffLocationShow(!dropoffLocationShow) : null}>
          <h3>{dropLocationName}</h3>
          <IoMdArrowDropdown size={15} color='#000' />
        </div>
        <div className={`drop-off-location-body ${dropoffLocationShow ? 'drop-location-show' : ''}`}>
          {locations?.map((item, index) => (
            <p className={`drop-location-list-item`} key={index} onClick={() => handleUpdateDropLocation(item)}>{item.name}</p>
          ))}
        </div>
      </label>

      <div className='drop-calender-and-time-contianer'>

        <div ref={dropDateRef} className='drop-calender-contianer' style={{opacity: isEditabel.bookingInfo ? 1 : 0.4}}>
          <div className={`drop-calender-head ${dropCalenderShow ? 'remove-drop-calender-radius' : ''}`} onClick={() => isEditabel.bookingInfo ? setDropCalenderShow(!dropCalenderShow) : null}>
            <h3>{dropOffResult.date}</h3>
            <CiCalendarDate size={15} color='#000' />
          </div>
          <div className={`drop-calender-body ${dropCalenderShow ? 'show-drop-calender-container' : ''}`}>
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
        </div>

        <div ref={dropTimeRef} className='drop-time-contianer' style={{opacity: isEditabel.bookingInfo ? 1 : 0.4}}>
          <div className={`drop-time-head ${showDropTime ? 'remove-drop-time-redius' : ''}`} onClick={() => isEditabel.bookingInfo ? setShowDroptime(!showDropTime) : null}>
            <h3>{dropupTime}</h3>
            <IoMdArrowDropdown size={15} color='#000' />
          </div>
          <div className={`drop-time-list-contianer ${showDropTime ? 'show-drop-time-list' : ''}`}>
            {generateTimeList().map((item, index) => (
              <p className={`mobile-drop-off-time-item`} key={index} onClick={() => handleDropofTime(item)}>{item.name}</p>
            ))}
          </div>
        </div>

      </div>

      <div className='mobille-car-availability-check-contianer'>
        {/* {carAvailablilityCheck !== '' && <button className='mobile-recheck-availability' onClick={handleRecheckAvailability}><CgCloseO size={20} color='#000' /></button>} */}
        {loading && <Spinner />}
        {carAvailablilityCheck === '' ? (
          <div className='mobile-car-availability-check-button-contianer'>
          </div>
        ) : carAvailablilityCheck === 'yes' ? (
          <div className='mobile-available-main-contianer'>
            <div className='mobile-available-icon-color'>
              <FaRegCircleCheck size={50} color='#FFF' />
            </div>
            <span className='mobile-available-message'>
              <h3>Car Available</h3>
              <p>The vehicle is available. Please proceed with your booking</p>
            </span>
          </div>
        ) : (
          <div className='mobile-not-available-main-contianer'>
            <div className='mobile-not-available-icon-color'>
              <IoWarningOutline size={50} color='#FFF' />
            </div>
            <span className='mobile-not-available-message'>
              <h3>Car Not Available</h3>
              <p>The vehicle is not available on the selected date. Please select another date</p>
            </span>
          </div>
        )}
      </div>

      <div className='mobile-car-availability-update'>
        {carAvailablilityCheck === 'yes' ? (
          <button
            className={`update-mobile-booking-info ${!isEditabel.bookingInfo ? 'disable-update' : ''}`}
            onClick={handleUpdateBookingInfo}
            disabled={!isEditabel.bookingInfo}
          >
            Update
          </button>

        ) : (
          <button
            className={`check-mobile-booking-info ${carAvailablilityCheck === 'no' || isEditabel.bookingInfo === false ? 'disable-button' : ''}`}
            onClick={handleCheckAvailability}
            disabled={!isEditabel.bookingInfo}
          >
            Check Availability
          </button>
        )}
      </div>

    </div>
  )
}

export default BottomCarAvailability