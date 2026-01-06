import React, { useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./BookingForm.css";
import DropdownInput from "../dropdown-input/DropdownInput";
import PrimaryButton from "../primary-button/PrimaryButton";
import { GoArrowRight } from "react-icons/go";
import Calendar from "react-calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchVehicle } from "../../context/searchVehicleContext/searchVehicleContext";
import axios from "axios";
import ScreenResize from "../../utils/screenSize";

import useCalendarNavigation from "../../utils/calanderKeyPress";
import { url } from "../../utils/services";
import {
  convertToNZDate,
  nzStartOfToday,
  nzToday,
} from "../../utils/midlewares";

const BookingForm = ({
  bgColor,
  primaryButtonText,
  boxShadow,
  handleSearchVehicles,
  setHeight = false,
  setIsPickupSelected,
}) => {
  const [pickupCalender, setPickupCalender] = useState(false);
  const [dropCalender, setDropCalender] = useState(false);
  const { isInRange, width } = ScreenResize(768, 1310);
  const { isMobile, mobWidth } = ScreenResize(0, 767);

  const {
    searchVehiclePayload,
    setSearchVehiclePayload,
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
    { name: "21" },
    { name: "22" },
    { name: "23" },
    { name: "24" },
    { name: "25" },
    { name: "26+" },
  ];

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

  useEffect(() => {
    if (
      locations.length > 0 &&
      searchVehiclePayload.pickup_location === null &&
      searchVehiclePayload.drop_location === null
    ) {
      const defaultLocationObject = locations?.find((item) => item.id === 5);
      setPickupCity(defaultLocationObject?.name);
      setDropupCity(defaultLocationObject?.name);
      setSearchVehiclePayload((prev) => ({
        ...prev,
        pickup_location: 5,
        drop_location: 5,
      }));
    }
  }, [locations]);

  const generateTimeList = (selectedDate) => {
    const times = [];

    if (!selectedDate) return times;

    // 🇳🇿 Current NZ datetime
    const nzNow = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Pacific/Auckland" })
    );

    // Normalize selectedDate to NZ 00:00
    const nzSelected = new Date(
      new Date(selectedDate).toLocaleString("en-US", {
        timeZone: "Pacific/Auckland",
      })
    );
    nzSelected.setHours(0, 0, 0, 0);

    // Normalize today to NZ 00:00
    const nzToday = new Date(nzNow);
    nzToday.setHours(0, 0, 0, 0);

    const isToday = nzSelected.getTime() === nzToday.getTime();

    // Current minutes only matter if date is today
    const currentMinutes = isToday
      ? nzNow.getHours() * 60 + nzNow.getMinutes()
      : -1;

    // From 6:00 AM to 9:00 PM
    const startMinutes = 6 * 60; // 360
    const endMinutes = 21 * 60; // 1260

    for (let mins = startMinutes; mins <= endMinutes; mins += 30) {
      let hour = Math.floor(mins / 60);
      let minute = mins % 60;

      const suffix = hour < 12 ? "AM" : "PM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;

      const formattedTime = `${displayHour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${suffix}`;

      times.push({
        name: formattedTime,
        isPassed: isToday ? mins < currentMinutes : false, // ✅ disable past times only for today
      });
    }

    return times;
  };

  const togglePickupCalendar = () => {
    setPickupCalender((prev) => !prev);
  };

  const [dropDateManuallyChanged, setDropDateManuallyChanged] = useState(false);
  const handlePickupDateChange = (date) => {
    const nzPickupDate = convertToNZDate(date);

    setSelectedPickupDate(nzPickupDate);
    if (!dropDateManuallyChanged) {
      const futureDrop = new Date(nzPickupDate);
      futureDrop.setDate(futureDrop.getDate() + 4);
      formatePickupDateAndTime(nzPickupDate, pickupTime);
      getDropOffDateAt10AM(futureDrop);
      setSelectedDropDate(futureDrop);
    }
    setPickupCalender(false); // hide after selection
  };

  const handleDropDateChange = (date) => {
    const nzDropDate = convertToNZDate(date);
    setSelectedDropDate(nzDropDate);
    handleDropofTimeAndDate(nzDropDate, dropupTime);
    setDropCalender(false); // hide after selection
    setDropDateManuallyChanged(true);
  };

  const [clickType, setClicktype] = useState("");
  const handleLocationChange = (item) => {
    if (clickType === "pickup") {
      setSearchVehiclePayload((prevValue) => ({
        ...prevValue,
        pickup_location: item.id,
      }));
      if (searchVehiclePayload.pickup_location !== "") {
        setIsPickupSelected(true);
      }
    } else {
      setSearchVehiclePayload((prevValue) => ({
        ...prevValue,
        drop_location: item.id,
      }));
    }
  };

  const handleSelectPickupTime = (value) => {
    formatePickupDateAndTime(selectedPickupDate, value.name);
    setPickupTime(value.name);
  };

  const handleDropofTime = (value) => {
    setDropupTime(value.name);
    handleDropofTimeAndDate(selectedDropDate, value.name);
    setDropDateManuallyChanged(true);
  };

  const formatePickupDateAndTime = (date, time) => {
    // Combine selected date and selected time
    const [hourMin, meridiem] = time?.split(" ");
    let [hour, minute] = hourMin?.split(":").map(Number);

    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;

    // 2️⃣ Get NZ date parts
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Pacific/Auckland",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(date);

    const year = Number(parts.find((p) => p.type === "year").value);
    const month = Number(parts.find((p) => p.type === "month").value) - 1;
    const day = Number(parts.find((p) => p.type === "day").value);

    // 3️⃣ Build NZ date object
    const nzDate = new Date(Date.UTC(year, month, day, hour, minute, 0));

    // Convert the date to ISO string with Z (treated as UTC)
    const formatted = nzDate?.toISOString(); // gives: 2025-06-20T11:00:00.000Z
    // Update your payload here:
    setSearchVehiclePayload((prev) => ({
      ...prev,
      pickup_time: formatted,
    }));
  };

  const handleDropofTimeAndDate = (date, time) => {
    const [hourMin, meridiem] = time?.split(" ");
    let [hour, minute] = hourMin?.split(":").map(Number);

    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;

    // 2️⃣ Get NZ date parts
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Pacific/Auckland",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(date);

    const year = Number(parts.find((p) => p.type === "year").value);
    const month = Number(parts.find((p) => p.type === "month").value) - 1;
    const day = Number(parts.find((p) => p.type === "day").value);

    // 3️⃣ Build NZ date object
    const nzDate = new Date(Date.UTC(year, month, day, hour, minute, 0));

    // Convert the date to ISO string with Z (treated as UTC)
    const formatted = nzDate?.toISOString(); // gives: 2025-06-20T11:00:00.000Z

    // Update your payload here:
    setSearchVehiclePayload((prev) => ({
      ...prev,
      drop_time: formatted,
    }));
  };

  const handleDriverAge = (age) => {
    setSearchVehiclePayload((prev) => ({
      ...prev,
      driver_age: age.name,
    }));
    setDriverAge(age.name);
  };

  const getCurrentNZTime = () => {
    // Get current NZ time
    const formatter = new Intl.DateTimeFormat("en-NZ", {
      timeZone: "Pacific/Auckland",
      hour: "numeric",
      minute: "numeric",
      // hour12: true,
    });

    const parts = formatter.formatToParts(new Date());

    let hour = Number(parts.find((p) => p.type === "hour")?.value);
    let minute = Number(parts.find((p) => p.type === "minute")?.value);
    const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value;

    // ✅ Handle 12 AM explicitly
    if (hour === 12 && dayPeriod === "am") {
      hour = 0; // midnight
    } else if (dayPeriod === "pm" && hour !== 12) {
      hour += 12; // convert PM to 24-hour
    }

    // --- Default/rounding logic in 24-hour format ---
    if (hour < 10) {
      // 12:00 AM → 9:59 AM → default 10:00
      hour = 10;
      minute = 0;
    } else {
      // After 10 AM → round to next 30-min slot
      if (minute > 0 && minute <= 30) {
        minute = 30;
      } else if (minute > 30) {
        minute = 0;
        hour += 1;
      }

      // Wrap around midnight
      if (hour === 24) hour = 0;
    }

    // --- Convert to 12-hour format for display only ---
    const displayMeridiem = hour >= 12 ? "PM" : "AM";
    let displayHour = hour % 12;
    if (displayHour === 0) displayHour = 12;
    const displayMinute = minute.toString().padStart(2, "0");

    const pickupTimeValue = `${displayHour}:${displayMinute} ${displayMeridiem}`;

    return { hour, minute, pickupTimeValue };
  };

  const parsePickupTime = (pickupTime) => {
    if (!pickupTime) return null;

    const [time, meridiem] = pickupTime.split(" ");
    if (!time || !meridiem) return null;

    let [hour, minute] = time.split(":").map(Number);

    if (meridiem === "PM" && hour !== 12) hour += 12;
    if (meridiem === "AM" && hour === 12) hour = 0;

    return { hour, minute };
  };

  const getPickupDateAt10AM = (dateString) => {
    if (pickupTime) return;

    setSearchVehiclePayload((prev) => {
      // ⛔ Don't override user's selected time
      if (prev.pickup_time) return prev;

      const date = new Date(dateString);

      const year = dateString.getFullYear();
      const month = dateString.getMonth();
      const day = dateString.getDate();

      let time = parsePickupTime(pickupTime);
      if (!time || (time.hour === 0 && time.minute === 0)) {
        time = getCurrentNZTime();
      }

      // Build NZ 10 AM date in UTC
      const nzPickDate = new Date(
        Date.UTC(year, month, day, time.hour, time.minute, 0)
      );
      // const nzPickDate = new Date(Date.UTC(year, month, day, hour !== 0 ? hour : 10, minute ?? 0, 0));

      const formatted = nzPickDate.toISOString();

      return {
        ...prev,
        pickup_time: formatted,
      };
    });
  };

  const getDropOffDateAt10AM = (dateString) => {
    setSearchVehiclePayload((prev) => {
      // ✅ Only auto-set if user did not select drop time
      if (prev.drop_time && dropDateManuallyChanged) return prev;

      const year = dateString.getFullYear();
      const month = dateString.getMonth();
      const day = dateString.getDate();

      // Split hour and minute
      const [hourMin, meridiem] = dropupTime.split(" "); // ["10:00", "AM"]
      let [hour, minute] = hourMin.split(":").map(Number); // [10, 0]

      // // Convert to 24-hour format if needed
      if (meridiem === "PM" && hour !== 12) hour += 12;
      if (meridiem === "AM" && hour === 12) hour = 0;

      // Build NZ 10 AM date in UTC
      const nzDropDate = new Date(Date.UTC(year, month, day, hour, minute, 0));

      const formatted = nzDropDate.toISOString();

      return {
        ...prev,
        drop_time: formatted,
      };
    });
  };

  const selectPickDate = () => {
    const today = nzToday;
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate());
    getPickupDateAt10AM(futureDate);
    setSelectedPickupDate(futureDate); // Update selected date
  };

  const selectDropDate = (daysAhead) => {
    if (!selectedPickupDate) return;

    // const pickup = new Date(selectedPickupDate);
    const pickup = new Date(selectedPickupDate);
    const futureDate = new Date(pickup);
    futureDate.setDate(pickup.getDate() + daysAhead);
    getDropOffDateAt10AM(futureDate);
    setSelectedDropDate(futureDate); // Update selected date
  };

  const selectFutureDate = (date) => {
    if (!date) return;

    // Only auto-set drop date if drop date not manually changed OR matches old default
    const oldDefaultDrop = new Date(date);
    oldDefaultDrop.setDate(oldDefaultDrop.getDate() + 4);

    if (
      !selectedDropDate ||
      selectedDropDate.getTime() === oldDefaultDrop.getTime()
    ) {
      const futureDate = new Date(date);
      futureDate.setDate(futureDate.getDate() + 4);
      getDropOffDateAt10AM(futureDate);
      setSelectedDropDate(futureDate);
    }
  };

  useEffect(() => {
    if (!selectedPickupDate) return;
    selectFutureDate(selectedPickupDate);
  }, [selectedPickupDate]);

  // 🔹 Set default dates only if empty
  useEffect(() => {
    if (!searchVehiclePayload.pickup_time && !searchVehiclePayload.drop_time) {
      selectPickDate();
      selectDropDate(4);
    }
  }, []);

  const pickupCalanderRef = useRef();
  useEffect(() => {
    const handleCalanderClose = (event) => {
      if (
        pickupCalanderRef.current &&
        !pickupCalanderRef.current.contains(event.target)
      ) {
        setPickupCalender(false);
      }
    };

    document.addEventListener("mousedown", handleCalanderClose);

    return () => {
      document.removeEventListener("mousedown", handleCalanderClose);
    };
  }, [pickupCalender]);

  const dropCalandrRef = useRef();
  useEffect(() => {
    const handleCalanderClose = (event) => {
      if (
        dropCalandrRef.current &&
        !dropCalandrRef.current.contains(event.target)
      ) {
        setDropCalender(false);
      }
    };

    document.addEventListener("mousedown", handleCalanderClose);

    return () => {
      document.removeEventListener("mousedown", handleCalanderClose);
    };
  }, [dropCalender]);

  // hook handles arrow keys + enter selection
  useCalendarNavigation(pickupCalanderRef, pickupCalender, (el) => {
    if (pickedDate) handlePickupDateChange(pickedDate);
  });

  useCalendarNavigation(dropCalandrRef, dropCalender, (el) => {
    if (pickedDate) handleDropDateChange(pickedDate);
  });

  // 🇳🇿 Pickup date normalized
  const nzPickupDate = selectedPickupDate
    ? (() => {
        const d = new Date(selectedPickupDate);
        d.setHours(0, 0, 0, 0); // normalize to 00:00
        return d;
      })()
    : null;

  return (
    <div
      className={`booking-form-main-container ${
        searchVehiclePayload.pickup_location !== null
          ? "control-booking-location-contianer"
          : ""
      }`}
      style={{ boxShadow: boxShadow }}
    >
      <div className="booking-form-inputs-container">
        <div className="booking-form-inputs">
          <div className="booking-form-input-single-col-pick-up">
            <DropdownInput
              width={isInRange ? "70%" : "100%"}
              height={"64px"}
              defaultValue={"Pick-up Location"}
              placeholder={"Pick-up"}
              mobilePlaceholder={"Pick-up"}
              setSelectedCity={handleLocationChange}
              data={locations}
              type={"pick"}
              bgColor={bgColor}
              setClicktype={setClicktype}
              selectedValue={pickupCity}
              setSelectedValue={setPickupCity}
              setHeight={setHeight}
            />

            <div className="booking-time-container">
              <div
                ref={pickupCalanderRef}
                className="select-pickup-date-button"
              >
                <button
                  className="select-date-button"
                  onClick={togglePickupCalendar}
                  style={{ backgroundColor: bgColor }}
                >
                  {selectedPickupDate
                    ? selectedPickupDate.toDateString()
                    : "Date"}
                </button>
                {pickupCalender && (
                  <div className="booking-pickup-calender-container">
                    <Calendar
                      onChange={handlePickupDateChange}
                      value={selectedPickupDate}
                      defaultView="month"
                      next2Label={null}
                      prev2Label={null}
                      minDate={nzStartOfToday}
                      formatShortWeekday={(locale, date) =>
                        date
                          .toLocaleDateString(locale, { weekday: "short" })
                          .slice(0, 3)
                      }
                      nextLabel={<IoIosArrowForward />}
                      prevLabel={<IoIosArrowBack />}
                      tileDisabled={({ date, view }) => {
                        if (view !== "month") return false;

                        const tileDate = new Date(date);
                        tileDate.setHours(0, 0, 0, 0);

                        // ✅ Disable past dates based on NZ
                        return tileDate < nzStartOfToday;
                      }}
                    />
                  </div>
                )}
              </div>

              <DropdownInput
                width={isInRange ? "75%" : "65%"}
                height={"162px"}
                defaultValue={"Time"}
                data={generateTimeList(selectedPickupDate)}
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
              width={isInRange ? "70%" : "100%"}
              height={"64px"}
              defaultValue={"Drop-off Location"}
              placeholder={"Drop-off"}
              mobilePlaceholder={"Drop-Off"}
              data={locations}
              type={"drop"}
              setSelectedCity={handleLocationChange}
              setClicktype={setClicktype}
              selectedValue={dropupCity}
              setSelectedValue={setDropupCity}
              bgColor={bgColor}
              setHeight={setHeight}
            />

            <div className="booking-time-container">
              <div ref={dropCalandrRef} className="select-drop-up-date-button">
                <button
                  className="select-date-button"
                  onClick={() => setDropCalender((prev) => !prev)}
                  style={{ backgroundColor: bgColor }}
                >
                  {selectedDropDate ? selectedDropDate.toDateString() : "Date"}
                </button>

                {dropCalender && (
                  <div className="booking-drop-calender-container">
                    <Calendar
                      onChange={handleDropDateChange}
                      value={selectedDropDate}
                      defaultView="month" // always show month view
                      next2Label={null} // hides double right arrow (>>)
                      prev2Label={null}
                      formatShortWeekday={(locale, date) =>
                        date
                          .toLocaleDateString(locale, { weekday: "short" })
                          .slice(0, 3)
                      }
                      // 🔹 minDate = pickup date (allows selecting 1+ day bookings)
                      minDate={nzPickupDate || nzStartOfToday}
                      tileDisabled={({ date, view }) => {
                        if (view !== "month") return false;

                        const tileDate = new Date(date);
                        tileDate.setHours(0, 0, 0, 0);

                        // ❌ If pickup selected → disable same day & past days
                        if (nzPickupDate) {
                          return tileDate <= nzPickupDate;
                        }

                        // 🔒 If pickup not selected yet, disable today & past (NZ)
                        return tileDate < nzStartOfToday;
                      }}
                    />
                  </div>
                )}
              </div>

              <DropdownInput
                width={isInRange ? "75%" : "65%"}
                height={"162px"}
                defaultValue={"Time"}
                data={generateTimeList(selectedDropDate)}
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

      <div className="booking-form-confirm-button-container">
        <PrimaryButton
          handleCLick={handleSearchVehicles}
          primaryMainClass={"primary-button-main-class"}
          primaryText={primaryButtonText}
          primaryIcon={
            <GoArrowRight size={30} color="#fff" className="primary-icon" />
          }
          width={isMobile ? "50%" : "192px"}
          height={"45px"}
          gap={"20px"}
          fontSize={isMobile ? "13px" : "var(--font-body-lg)"}
          lineHeight={"var(--line-height-body)"}
          fontWeight={"var(--font-weight-bold)"}
        />
        <DropdownInput
          width={isMobile ? "40%" : "100%"}
          height={"120px"}
          defaultValue={"Driver Age"}
          placeholder={"Driver Age"}
          mobilePlaceholder={"Driver Age"}
          setSelectedCity={handleDriverAge}
          data={driverAgeList}
          bgColor={bgColor}
          setClicktype={setClicktype}
          selectedValue={driverAge}
          setSelectedValue={setDriverAge}
          setHeight={setHeight}
        />
      </div>
    </div>
  );
};

export default BookingForm;
