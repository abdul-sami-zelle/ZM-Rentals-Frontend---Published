import React, { useEffect, useRef, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./StickySection.css";
import { GoArrowRight } from "react-icons/go";
import Calendar from "react-calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import DropdownInput from "../dropdown-input/DropdownInput";
import { useSearchVehicle } from "../../context/searchVehicleContext/searchVehicleContext";
import PrimaryButton from "../primary-button/PrimaryButton";
import useCalendarNavigation from "../../utils/calanderKeyPress";
import { url } from "../../utils/services";
import { convertToNZDate, nzStartOfToday } from "../../utils/midlewares";

const StickySection = ({
  bgColor,
  primaryButtonText,
  handleSearchVehicles,
  setHeight = false,
}) => {
  const [pickupCalender, setPickupCalender] = useState(false);
  const [dropCalender, setDropCalender] = useState(false);

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
    { name: "21" },
    { name: "22" },
    { name: "23" },
    { name: "24" },
    { name: "25+" },
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

  const toggleDropCalendar = () => {
    setDropCalender((prev) => !prev);
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

  // const handleDropDateChange = (date) => {
  //   const nzDropDate = convertToNZDate(date);
  //   setSelectedDropDate(nzDropDate);
  //   handleDropofTimeAndDate(nzDropDate, dropupTime);
  //   setDropCalender(false); // hide after selection
  //   setDropDateManuallyChanged(true);
  // };
  const handleDropDateChange = (date) => {
  const nzDropDate = convertToNZDate(date);
  setSelectedDropDate(nzDropDate);

  let finalDropTime = dropupTime;

  // 🔥 If same day → force drop time > pickup time
  if (
    selectedPickupDate &&
    nzDropDate.toDateString() === selectedPickupDate.toDateString()
  ) {
    const parse = (str) => {
      const [time, mer] = str.split(" ");
      let [h, m] = time.split(":").map(Number);
      if (mer === "PM" && h !== 12) h += 12;
      if (mer === "AM" && h === 12) h = 0;
      return h * 60 + m;
    };

    const pickupMin = parse(pickupTime);
    const dropMin = parse(dropupTime);

    if (dropMin <= pickupMin) {
      const times = generateTimeList(nzDropDate);

      const nextValid = times.find((t) => {
        const mins = parse(t.name);
        return mins > pickupMin;
      });

      if (nextValid) {
        finalDropTime = nextValid.name;
        setDropupTime(nextValid.name);
      }
    }
  }

  handleDropofTimeAndDate(nzDropDate, finalDropTime);
  setDropCalender(false);
  setDropDateManuallyChanged(true);
};


  const isSameDay = () => {
    if (!selectedPickupDate || !selectedDropDate) return false;

    return (
      selectedPickupDate.toDateString() ===
      selectedDropDate.toDateString()
    );
  };



  const getDropOffDateAt10AM = (dateString) => {
    setSearchVehiclePayload((prev) => {
      // ✅ Only auto-set if user did not select drop time
      if (prev.drop_time && dropDateManuallyChanged) return prev;

      const date = new Date(dateString);

      // 🇳🇿 Get NZ date components
      const nzParts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Pacific/Auckland",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).formatToParts(date);

      const year = Number(nzParts.find((p) => p.type === "year").value);
      const month = Number(nzParts.find((p) => p.type === "month").value) - 1;
      const day = Number(nzParts.find((p) => p.type === "day").value);

      // Split hour and minute
      const [hourMin, meridiem] = dropupTime.split(" "); // ["10:00", "AM"]
      let [hour, minute] = hourMin.split(":").map(Number); // [10, 0]

      // Convert to 24-hour format if needed
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

  const [clickType, setClicktype] = useState("");
  const handleLocationChange = (item) => {
    if (clickType === "pickup") {
      setSearchVehiclePayload((prevValue) => ({
        ...prevValue,
        pickup_location: item.id,
      }));
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

    // 🔥 AUTO FIX DROP TIME IF SAME DAY
    if (
      selectedPickupDate &&
      selectedDropDate &&
      selectedPickupDate.toDateString() ===
      selectedDropDate.toDateString()
    ) {
      const parse = (str) => {
        const [time, mer] = str.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (mer === "PM" && h !== 12) h += 12;
        if (mer === "AM" && h === 12) h = 0;
        return h * 60 + m;
      };

      const pickupMin = parse(value.name);
      const dropMin = parse(dropupTime);

      // ❌ if drop <= pickup → auto move to next slot
      if (dropMin <= pickupMin) {
        const times = generateTimeList(selectedDropDate);

        const nextValid = times.find((t) => {
          const mins = parse(t.name);
          return mins > pickupMin;
        });

        if (nextValid) {
          setDropupTime(nextValid.name);
          handleDropofTimeAndDate(selectedDropDate, nextValid.name);
        }
      }
    }
  };


  const handleDropofTime = (value) => {
    setDropupTime(value.name);
    handleDropofTimeAndDate(selectedDropDate, value.name);
    setDropDateManuallyChanged(true);
  };

  const formatePickupDateAndTime = (date, time) => {
    // Combine selected date and selected time
    const [hourMin, meridiem] = time?.split(" ");
    let [hour, minute] = hourMin.split(":").map(Number);

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

    const nzDate = new Date(Date.UTC(year, month, day, hour, minute, 0));

    // Convert the date to ISO string with Z (treated as UTC)
    const formatted = nzDate.toISOString(); // gives: 2025-06-20T11:00:00.000Z
    // Update your payload here:
    setSearchVehiclePayload((prev) => ({
      ...prev,
      pickup_time: formatted,
    }));
  };

  const handleDropofTimeAndDate = (date, time) => {
    // Combine selected date and selected time
    const [hourMin, meridiem] = time.split(" ");
    let [hour, minute] = hourMin.split(":").map(Number);

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

    const nzDate = new Date(Date.UTC(year, month, day, hour, minute, 0));

    // Convert the date to ISO string with Z (treated as UTC)
    const formatted = nzDate.toISOString(); // gives: 2025-06-20T11:00:00.000Z

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

  const pickupCalanderRef = useRef();
  const dropupCalanderRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        pickupCalanderRef.current &&
        !pickupCalanderRef.current.contains(event.target)
      ) {
        setPickupCalender(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropupCalanderRef.current &&
        !dropupCalanderRef.current.contains(event.target)
      ) {
        setDropCalender(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // hook handles arrow keys + enter selection
  useCalendarNavigation(pickupCalanderRef, pickupCalender, (el) => {
    if (pickedDate) handlePickupDateChange(pickedDate);
  });

  useCalendarNavigation(dropupCalanderRef, dropCalender, (el) => {
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
    <div className="sticky-booking-form-main-contianer">
      <div className="sticky-booking-fields-contianer">
        <div className="sticky-pickup-details">
          <DropdownInput
            width={"100%"}
            height={"64px"}
            defaultValue={"Pick-up Location"}
            placeholder={"Pick-up"}
            setSelectedCity={handleLocationChange}
            data={locations}
            type={"pick"}
            bgColor={bgColor}
            setClicktype={setClicktype}
            selectedValue={pickupCity}
            setSelectedValue={setPickupCity}
            setHeight={setHeight}
          />
          <div className="sticky-booking-time-container">
            <div
              ref={pickupCalanderRef}
              className="sticky-select-pickup-date-button"
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
                <div className="sticky-booking-pickup-calender-container">
                  <Calendar
                    onChange={handlePickupDateChange}
                    value={selectedPickupDate}
                    view="month"
                    maxDetail="month"
                    minDetail="month"
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
                    tileDisabled={({ date }) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // strip time

                      const checkDate = new Date(date);
                      checkDate.setHours(0, 0, 0, 0); // strip time

                      return checkDate < nzStartOfToday;
                    }}
                  />
                </div>
              )}

            </div>

            <DropdownInput
              width={"45%"}
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

        <div className="sticky-drop-off-dtails">
          <DropdownInput
            width={"100%"}
            height={"64px"}
            defaultValue={"Drop-off Location"}
            placeholder={"Drop-off"}
            data={locations}
            type={"drop"}
            setSelectedCity={handleLocationChange}
            setClicktype={setClicktype}
            selectedValue={dropupCity}
            setSelectedValue={setDropupCity}
            bgColor={bgColor}
            setHeight={setHeight}
          />

          <div
            ref={dropupCalanderRef}
            className="sticky-booking-time-container"
          >
            <div className="sticky-select-drop-up-date-button">
              <button
                className="select-date-button"
                onClick={toggleDropCalendar}
                style={{ backgroundColor: bgColor }}
              >
                {selectedDropDate ? selectedDropDate.toDateString() : "Date"}
              </button>

              {dropCalender && (
                <div className="sticky-booking-drop-calender-container">
                  <Calendar
                    onChange={handleDropDateChange}
                    value={selectedDropDate}
                    view="month" // always show month view
                    maxDetail="month" // prevent navigating into days
                    minDetail="month" // prevent navigating to years
                    next2Label={null} // hides double right arrow (>>)
                    prev2Label={null}
                    formatShortWeekday={(locale, date) =>
                      date
                        .toLocaleDateString(locale, { weekday: "short" })
                        .slice(0, 3)
                    }
                    minDate={nzPickupDate || nzStartOfToday}
                    tileDisabled={({ date, view }) => {
                      if (view !== "month") return false;

                      const tileDate = new Date(date);
                      tileDate.setHours(0, 0, 0, 0);

                      // ❌ If pickup selected → disable same day & past days
                      if (nzPickupDate) {
                        // return tileDate <= nzPickupDate;
                        return tileDate < nzPickupDate;
                      }

                      // 🔒 If pickup not selected yet, disable today & past (NZ)
                      return tileDate < nzStartOfToday;
                    }}
                  />
                </div>
              )}

            </div>

            <DropdownInput
              width={"45%"}
              height={"162px"}
              defaultValue={"Time"}
              data={generateTimeList(selectedDropDate).map((t) => {
                if (!isSameDay() || !pickupTime) return t;

                const parse = (str) => {
                  const [time, mer] = str.split(" ");
                  let [h, m] = time.split(":").map(Number);
                  if (mer === "PM" && h !== 12) h += 12;
                  if (mer === "AM" && h === 12) h = 0;
                  return h * 60 + m;
                };

                const pickupMinutes = parse(pickupTime);
                const dropMinutes = parse(t.name);

                return {
                  ...t,
                  isPassed: dropMinutes <= pickupMinutes, // ❌ block invalid drop times
                };
              })}

              setClicktype={setClicktype}
              setSelectedCity={handleDropofTime}
              bgColor={bgColor}
              selectedValue={dropupTime}
              setSelectedValue={setDropupTime}
            />
          </div>

        </div>

        <div className="driver-detail-aligned-with-all-inputs">
          <DropdownInput
            width={"70%"}
            height={"120px"}
            defaultValue={"Driver Age"}
            placeholder={"Driver Age"}
            setSelectedCity={handleDriverAge}
            data={driverAgeList}
            bgColor={bgColor}
            setClicktype={setClicktype}
            selectedValue={driverAge}
            setSelectedValue={setDriverAge}
            setHeight={setHeight}
          />

          <button
            className="sticky-search-vehilce-rounded-btn"
            onClick={handleSearchVehicles}
          >
            <GoArrowRight size={20} color="#fff" className="primary-icon" />
          </button>
        </div>
      </div>

      <div className="sticky-booking-dates-find-car-button-contianer">

        <div className="sticky-booking-driver-age-and-button-container">

          <div className="sticky-driver-age-contianer">
            <DropdownInput
              width={"100%"}
              height={"120px"}
              defaultValue={"Driver Age"}
              placeholder={"Driver Age"}
              setSelectedCity={handleDriverAge}
              data={driverAgeList}
              bgColor={bgColor}
              setClicktype={setClicktype}
              selectedValue={driverAge}
              setSelectedValue={setDriverAge}
              setHeight={setHeight}
            />
          </div>

          <div className="sticky-vehicle-book-btn">
            <PrimaryButton
              handleCLick={handleSearchVehicles}
              primaryMainClass={"primary-button-main-class"}
              primaryText={primaryButtonText}
              primaryIcon={
                <GoArrowRight size={30} color="#fff" className="primary-icon" />
              }
              width={"220px"}
              height={"47px"}
              gap={"20px"}
              fontSize={"var(--font-body-lg)"}
              lineHeight={"var(--line-height-body)"}
              fontWeight={"var(--font-weight-bold)"}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default StickySection;
