import React, { useEffect, useRef, useState } from "react";
import "./BookingDatesModal.css";
import { IoClose } from "react-icons/io5";
import Calendar from "react-calendar";
import axios from "axios";
import { url } from "../../utils/services";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { useRouter } from "next/navigation";
import MainLoader from "../../loaders/MainLoader/MainLoader";
import { useBookingContext } from "../../context/bookingContext/bookingContext";
import { useOutsideClick } from "../../utils/DetectClickOutside";
import { useDropdownNavigation } from "../../utils/keyPress";
import useCalendarNavigation from "../../utils/calanderKeyPress";

const BookingDatesModal = ({
  showBookingModal,
  setShowBookingModal,
  carId,
  carData,
}) => {
  
  const [searchPayload, setSearchPayload] = useState({
    car_id: carId,
    pickup_location: null,
    drop_location: null,
    pickup_time: "",
    drop_time: "",
    driver_age: "26+",
  });
  const [locations, setLocations] = useState([]);
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

  const [pickupLocationDropdown, setPickupLocationDropdown] = useState(false);
  const [pickupDateDropdown, setPickupDateDropdown] = useState(false);
  const [pickupTimeDropdown, setPickupTimeDropdown] = useState(false);

  const [pickupLocationValue, setPickupLocationValue] = useState(
    "Select Pickup Location"
  );

  const handleSelectLocation = (item) => {
    setPickupLocationValue(item.name);
    setSearchPayload((prev) => ({
      ...prev,
      pickup_location: item.id,
    }));
    setPickupLocationDropdown(false);
  };

  const [pickupDate, setPickupDate] = useState();
  const [selectedPickupDate, setSelectedPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00 AM");

  const handlePickupDateChange = (date) => {
    if (!date) return;
    const d = new Date(date);

    // pickupTime example: "10:00 AM"
    const [time, modifier] = pickupTime.split(" ");
    let [hours, minutes] = time.split(":");

    hours = Number(hours);
    minutes = Number(minutes);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(0);
    d.setMilliseconds(0);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");

    setSearchPayload((prev) => ({
      ...prev,
      pickup_time: `${year}-${month}-${day}T${hh}:${mm}:${ss}.000Z`,
    }));

    setSelectedPickupDate(date);

    setPickupDateDropdown(false); // hide after selection
  };

  const generateTimeList = () => {
    const times = [];
    for (let hour = 6; hour <= 21; hour++) {
      // 6 AM (6) to 9 PM (21)
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const suffix = hour < 12 ? "AM" : "PM";
      const formattedTime = `${displayHour
        .toString()
        .padStart(2, "0")}:00 ${suffix}`;
      times.push({ name: formattedTime });
    }
    return times;
  };

  const handlePickupTimeChange = (pickupTime) => {
    if (!pickupTime) return;
    const d = new Date(selectedPickupDate);

    // pickupTime example: "10:00 AM"
    const [time, modifier] = pickupTime.split(" ");
    let [hours, minutes] = time.split(":");

    hours = Number(hours);
    minutes = Number(minutes);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(0);
    d.setMilliseconds(0);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");

    setSearchPayload((prev) => ({
      ...prev,
      pickup_time: `${year}-${month}-${day}T${hh}:${mm}:${ss}.000Z`,
    }));

    setPickupTime(pickupTime);

    setPickupTimeDropdown(false); // hide after selection
  };

  const [dropLocationDropdown, setDropLocationDropdown] = useState(false);
  const [dropDateDropdown, setDropDateDropdown] = useState(false);
  const [dropTimeDropdown, setDropTimeDropdown] = useState(false);
  const [dropLocationValue, setDropLocationValue] = useState(
    "Select Drop Location"
  );
  const [dropDate, setDropDate] = useState();

  const [selectedDropDate, setSelectedDropDate] = useState("");
  const [dropTime, setDropTime] = useState("10:00 AM");

  const handleSelectDropLocation = (item) => {
    setDropLocationValue(item.name);
    setSearchPayload((prev) => ({
      ...prev,
      drop_location: item.id,
    }));
    setDropLocationDropdown(false);
  };

  const handleDropDateChange = (date) => {
    if (!date) return;
    const d = new Date(date);

    // pickupTime example: "10:00 AM"
    const [time, modifier] = dropTime.split(" ");
    let [hours, minutes] = time.split(":");

    hours = Number(hours);
    minutes = Number(minutes);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(0);
    d.setMilliseconds(0);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");

    setSearchPayload((prev) => ({
      ...prev,
      drop_time: `${year}-${month}-${day}T${hh}:${mm}:${ss}.000Z`,
    }));

    setSelectedDropDate(date);

    setDropDateDropdown(false); // hide after selection
  };

  const handleDropTimeChange = (dropTime) => {
    if (!dropTime) return;
    const d = new Date(selectedDropDate);

    // pickupTime example: "10:00 AM"
    const [time, modifier] = dropTime.split(" ");
    let [hours, minutes] = time.split(":");

    hours = Number(hours);
    minutes = Number(minutes);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(0);
    d.setMilliseconds(0);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");

    setSearchPayload((prev) => ({
      ...prev,
      drop_time: `${year}-${month}-${day}T${hh}:${mm}:${ss}.000Z`,
    }));

    setDropTime(dropTime);

    setDropTimeDropdown(false); // hide after selection
  };

  useEffect(() => {
    if (showBookingModal) {
      setSearchPayload((prev) => ({
        ...prev,
        car_id: carId,
      }));
    }
  }, [carId]);

  useEffect(() => {
    if (showBookingModal && typeof window !== "undefined") {
      const sessionPayload = {
        driver_age: "26+",
        drop_location: searchPayload?.drop_location,
        drop_time: searchPayload?.drop_time,
        pickup_location: searchPayload?.pickup_location,
        pickup_time: searchPayload?.pickup_time,
      };
      sessionStorage.setItem(
        "pick_and_drop_details",
        JSON.stringify(sessionPayload)
      );
    }
  }, [searchPayload]);

  const [loader, setLoader] = useState(false);
  const { setVehicleSesionData } = useBookingContext();
  const { setBookingVehicleData } = useBookingContext();
  const router = useRouter();
  const handleSearchCarAvailabile = async () => {
    const api = `${url}/cars/specific-available-car`;
    const api2 = `${url}/cars/get/${searchPayload?.car_id}`;
    setLoader(true);
    try {
      const response = await axios.post(api, searchPayload);
      console.log("respo", response);
      if (response.status === 200) {
        const carResponse = await axios.get(api2);
        if (carResponse.status === 200) {
          setVehicleSesionData(response.data);
          setBookingVehicleData(carResponse.data);
          sessionStorage.setItem(
            "selected-vehicle-details",
            JSON.stringify(carResponse.data)
          );
          sessionStorage.setItem(
            "vehicle-details",
            JSON.stringify(response.data)
          );
          setLoader(false);
        }
        if(response?.data?.available !== 0) {
          router.push("/book-now");
        }
      }
    } catch (error) {
      console.error("Error", error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const pickupLocationRef = useRef();
  const pickupDateRef = useRef();
  const pickupTimeRef = useRef();

  const DropLocationRef = useRef();
  const dropDateRef = useRef();
  const dropTimeRef = useRef();

  useOutsideClick(pickupLocationRef, () => setPickupLocationDropdown(false));
  useOutsideClick(pickupDateRef, () => setPickupDateDropdown(false));
  useOutsideClick(pickupTimeRef, () => setPickupTimeDropdown(false));
  const pickupLocationOptionIndex = useDropdownNavigation(
    pickupLocationRef,
    pickupLocationDropdown,
    "booking-modal-pickup-single-item"
  );
  const pickupTimeIndex = useDropdownNavigation(
    pickupTimeRef,
    pickupTimeDropdown,
    "booking-modal-time-single-item"
  );
  useCalendarNavigation(pickupDateRef, pickupDateDropdown, (el) => {
    if (pickedDate) handleDropDateChange(pickedDate);
  });

  useOutsideClick(DropLocationRef, () => setDropLocationDropdown(false));
  useOutsideClick(dropDateRef, () => setDropDateDropdown(false));
  useOutsideClick(dropTimeRef, () => setDropTimeDropdown(false));
  const dropLocationOptionIndex = useDropdownNavigation(
    DropLocationRef,
    dropLocationDropdown,
    "booking-modal-pickup-single-item"
  );
  const dropTimeIndex = useDropdownNavigation(
    dropTimeRef,
    dropTimeDropdown,
    "booking-modal-time-single-item"
  );

  const [dropCalendarMonth, setDropCalendarMonth] = useState(null);

  useEffect(() => {
    if (selectedPickupDate) {
      setDropCalendarMonth(
        new Date(
          selectedPickupDate.getFullYear(),
          selectedPickupDate.getMonth(),
          1
        )
      );
    }
  }, [selectedPickupDate]);

  const [isSearchPayloadValid, setIsSearchPayloadValid] = useState(false);
  useEffect(() => {
    const isValid = Object.values(searchPayload).every(
      (value) => value !== null && value !== ""
    );

    setIsSearchPayloadValid(isValid);
  }, [searchPayload]);

  return (
    <div
      className={`booking-date-select-modal-main-container ${
        showBookingModal ? "show-booking-date-modal" : ""
      }`}
      onClick={() => setShowBookingModal(false)}
    >
      {loader && <MainLoader />}
      <div
        className={`booking-date-select-modal-inner-container ${
          showBookingModal ? "show-booking-date-inner-modal" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="booking-modal-head-and-content-main-container">
          <div className="booking-date-modal-head">
            <div className="booking-date-modal-headings">
              <h3>Check Availability For</h3>
              <IoClose
                size={20}
                color="#000"
                style={{ cursor: "pointer" }}
                onClick={() => setShowBookingModal(false)}
              />
            </div>
            <h3 className="booking-modal-vehicle-name">{carData?.name}</h3>
          </div>

          <div className="booking-modal-form-inputs">
            <div className="booking-modal-form-input-single-col-pick-up">
              {/* Pickup Location */}

              <div
                className="booking-modal-pickup-main"
                ref={pickupLocationRef}
              >
                <p>Pick-up Location</p>

                <div
                  className="booking-modal-pickup-dropdown-main"
                  // tabIndex={0}
                  // onFocus={() => {
                  //   if (!pickupLocationDropdown) setPickupLocationDropdown(true);
                  // }}
                  // onBlur={() => setPickupLocationDropdown(false)}
                >
                  <div
                    className="booking-modal-pickup-dropdown-head"
                    onMouseDown={() =>
                      setPickupLocationDropdown(!pickupLocationDropdown)
                    }
                  >
                    <h3>{pickupLocationValue}</h3>
                    <MdOutlineArrowDropDown
                      size={20}
                      color="var-primary-color"
                    />
                  </div>

                  <div
                    className={`booking-modal-pickup-dropdown-body ${
                      pickupLocationDropdown ? "show-pickup-locations" : ""
                    }`}
                  >
                    {locations.map((item, index) => (
                      <p
                        key={index}
                        className={`booking-modal-pickup-single-item ${
                          pickupLocationOptionIndex === index
                            ? "highlighted"
                            : ""
                        }`}
                        onClick={() => handleSelectLocation(item)}
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pickup Date and Time  */}
              <div className="booking-modal-date-and-time-container">
                {/* Pickup Date */}
                <div
                  className="booking-modal-date-container"
                  ref={pickupDateRef}
                >
                  <div
                    className="booking-modal-date-head"
                    onMouseDown={() =>
                      setPickupDateDropdown(!pickupDateDropdown)
                    }
                  >
                    <h3>
                      {selectedPickupDate
                        ? selectedPickupDate.toDateString()
                        : "Date"}
                    </h3>
                    <CiCalendarDate size={25} color="#000" />
                  </div>
                  <div
                    className={`booking-modal-date-body ${
                      pickupDateDropdown ? "show-pickup-date-calender" : ""
                    }`}
                  >
                    <Calendar
                      onChange={handlePickupDateChange}
                      value={pickupDate}
                      defaultView="month"
                      next2Label={null}
                      prev2Label={null}
                      minDate={new Date()}
                      formatShortWeekday={(locale, date) =>
                        date
                          .toLocaleDateString(locale, { weekday: "short" })
                          .slice(0, 3)
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
                </div>

                {/* Pickup Time */}
                <div
                  className="booking-modal-time-container"
                  ref={pickupTimeRef}
                  // tabIndex={0}
                  // onFocus={() => {
                  //   if (!pickupTimeDropdown) setPickupTimeDropdown(true);
                  // }}
                  // onBlur={() => setPickupTimeDropdown(false)}
                >
                  <div
                    className="booking-modal-time-head"
                    onMouseDown={() => setPickupTimeDropdown((prev) => !prev)}
                  >
                    <h3>{pickupTime ? pickupTime : "Select Time"}</h3>
                    <MdOutlineArrowDropDown size={20} color="#000" />
                  </div>

                  <div
                    className={`booking-modal-time-body ${
                      pickupTimeDropdown ? "show-pickup-time-list" : ""
                    }`}
                  >
                    {generateTimeList().map((item, index) => (
                      <p
                        key={index}
                        className={`booking-modal-time-single-item ${
                          pickupTimeIndex === index ? "highlighted" : ""
                        }`}
                        onClick={() => handlePickupTimeChange(item.name)}
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-modal-form-input-single-col-pick-up">
              {/* Drop Location  */}
              <div className="booking-modal-pickup-main" ref={DropLocationRef}>
                <p>Drop-off Location</p>

                <div
                  className="booking-modal-pickup-dropdown-main"
                  // tabIndex={0}
                  // onFocus={() => {
                  //   if (!dropLocationDropdown) setDropLocationDropdown(true);
                  // }}
                  // onBlur={() => setDropLocationDropdown(false)}
                >
                  <div
                    className="booking-modal-pickup-dropdown-head"
                    onMouseDown={() =>
                      setDropLocationDropdown(!dropLocationDropdown)
                    }
                  >
                    <h3>{dropLocationValue}</h3>
                    <MdOutlineArrowDropDown
                      size={20}
                      color="var-primary-color"
                    />
                  </div>

                  <div
                    className={`booking-modal-pickup-dropdown-body ${
                      dropLocationDropdown ? "show-pickup-locations" : ""
                    }`}
                  >
                    {locations.map((item, index) => (
                      <p
                        key={index}
                        className={`booking-modal-pickup-single-item ${
                          dropLocationOptionIndex === index ? "highlighted" : ""
                        }`}
                        onClick={() => handleSelectDropLocation(item)}
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drop Date and Time */}
              <div className="booking-modal-date-and-time-container">
                {/* Drop Date */}
                <div className="booking-modal-date-container" ref={dropDateRef}>
                  <div
                    className="booking-modal-date-head"
                    onClick={() => setDropDateDropdown(!dropDateDropdown)}
                  >
                    <h3>
                      {selectedDropDate
                        ? selectedDropDate.toDateString()
                        : "Date"}
                    </h3>
                    <CiCalendarDate size={25} color="#000" />
                  </div>
                  <div
                    className={`booking-modal-date-body ${
                      dropDateDropdown ? "show-pickup-date-calender" : ""
                    }`}
                  >
                    <Calendar
                      onChange={handleDropDateChange}
                      value={dropDate}
                      defaultView="month"
                      next2Label={null}
                      prev2Label={null}
                      /* 🔑 Open calendar from pickup month */
                      activeStartDate={dropCalendarMonth}
                      onActiveStartDateChange={({ activeStartDate }) =>
                        setDropCalendarMonth(activeStartDate)
                      }
                      minDate={selectedPickupDate || new Date()}
                      /* 🔒 Disable dates before pickup date */
                      // minDate={
                      //   selectedPickupDate
                      //     ? new Date(
                      //         selectedPickupDate.getFullYear(),
                      //         selectedPickupDate.getMonth(),
                      //         selectedPickupDate.getDate()
                      //       )
                      //     : new Date()
                      // }
                      // minDate={new Date()}
                      formatShortWeekday={(locale, date) =>
                        date
                          .toLocaleDateString(locale, { weekday: "short" })
                          .slice(0, 3)
                      }
                      nextLabel={<IoIosArrowForward />}
                      prevLabel={<IoIosArrowBack />}
                      tileDisabled={({ date, view }) => {
                        if (view !== "month") return false;

                        // Disable until pickup date is selected
                        if (!selectedPickupDate) return true;

                        const pickup = new Date(selectedPickupDate);
                        pickup.setHours(0, 0, 0, 0);

                        const checkDate = new Date(date);
                        checkDate.setHours(0, 0, 0, 0);

                        return checkDate < pickup;
                      }}
                    />
                  </div>
                </div>

                {/* Drop Time */}
                <div className="booking-modal-time-container" ref={dropTimeRef}>
                  <div
                    className="booking-modal-time-head"
                    onClick={() => setDropTimeDropdown(!dropTimeDropdown)}
                  >
                    <h3>{dropTime ? dropTime : "Select Time"}</h3>
                    <MdOutlineArrowDropDown size={20} color="#000" />
                  </div>

                  <div
                    className={`booking-modal-time-body ${
                      dropTimeDropdown ? "show-pickup-time-list" : ""
                    }`}
                  >
                    {generateTimeList().map((item, index) => (
                      <p
                        key={index}
                        className="booking-modal-time-single-item"
                        onClick={() => handleDropTimeChange(item.name)}
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-modal-availability-check-button">
          <button 
            className={`booking-modal-check-button ${isSearchPayloadValid ? 'active-check-button' : ''}`} 
            disabled={!isSearchPayloadValid} 
            onClick={handleSearchCarAvailabile} 
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDatesModal;
