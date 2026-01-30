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
import { nzStartOfToday } from "../../utils/midlewares";

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

  // const handlePickupDateChange = (date) => {
  //   if (!date) return;
  //   const d = new Date(date);

  //   // pickupTime example: "10:00 AM"
  //   const [time, modifier] = pickupTime.split(" ");
  //   let [hours, minutes] = time.split(":");

  //   hours = Number(hours);
  //   minutes = Number(minutes);

  //   // Convert to 24-hour format
  //   if (modifier === "PM" && hours !== 12) {
  //     hours += 12;
  //   }
  //   if (modifier === "AM" && hours === 12) {
  //     hours = 0;
  //   }

  //   d.setHours(hours);
  //   d.setMinutes(minutes);
  //   d.setSeconds(0);
  //   d.setMilliseconds(0);

  //   const year = d.getFullYear();
  //   const month = String(d.getMonth() + 1).padStart(2, "0");
  //   const day = String(d.getDate()).padStart(2, "0");
  //   const hh = String(d.getHours()).padStart(2, "0");
  //   const mm = String(d.getMinutes()).padStart(2, "0");
  //   const ss = String(d.getSeconds()).padStart(2, "0");

  //   setSearchPayload((prev) => ({
  //     ...prev,
  //     pickup_time: `${year}-${month}-${day}T${hh}:${mm}:${ss}.000Z`,
  //   }));

  //   setSelectedPickupDate(date);

  //   setPickupDateDropdown(false); // hide after selection
  // };

  const handlePickupDateChange = (date) => {
    if (!date || !pickupTime) return;

    // pickupTime example: "10:00 AM"
    const [time, modifier] = pickupTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    // 🇳🇿 Extract NZ date parts (NO browser timezone influence)
    const nzParts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Pacific/Auckland",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(date);

    const year = Number(nzParts.find((p) => p.type === "year").value);
    const month = Number(nzParts.find((p) => p.type === "month").value) - 1;
    const day = Number(nzParts.find((p) => p.type === "day").value);

    // ✅ Build UTC date assuming input was NZ local
    const nzPickupUTC = new Date(
      Date.UTC(year, month, day, hours, minutes, 0, 0)
    );

    const iso = nzPickupUTC.toISOString();

    setSearchPayload((prev) => ({
      ...prev,
      pickup_time: iso,
    }));

    // Keep calendar date as NZ-local date
    setSelectedPickupDate(new Date(year, month, day));

    setPickupDateDropdown(false);
  };

  const isSameDay = () => {
    if (!selectedPickupDate || !selectedDropDate) return false;

    return (
      selectedPickupDate.toDateString() ===
      selectedDropDate.toDateString()
    );
  };

  const parseMinutes = (str) => {
    const [time, mer] = str.split(" ");
    let [h, m] = time.split(":").map(Number);
    if (mer === "PM" && h !== 12) h += 12;
    if (mer === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };



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

  const generateDropTimeList = (selectedDropDate, selectedPickupDate, pickupTime) => {
    const times = generateTimeList(selectedDropDate);

    // Only adjust if pickup & drop are same day and pickupTime exists
    if (
      selectedPickupDate &&
      selectedDropDate &&
      selectedPickupDate.toDateString() === selectedDropDate.toDateString() &&
      pickupTime
    ) {
      // Convert pickupTime to total minutes
      const [pTime, pModifier] = pickupTime.split(" ");
      let [pHour, pMinute] = pTime.split(":").map(Number);
      if (pModifier === "PM" && pHour !== 12) pHour += 12;
      if (pModifier === "AM" && pHour === 12) pHour = 0;

      const pickupTotalMinutes = pHour * 60 + pMinute;

      // Disable drop times <= pickup time
      return times.map((t) => {
        const [time, modifier] = t.name.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (modifier === "PM" && h !== 12) h += 12;
        if (modifier === "AM" && h === 12) h = 0;

        const totalMinutes = h * 60 + m;
        return {
          ...t,
          isPassed: t.isPassed || totalMinutes <= pickupTotalMinutes,
        };
      });
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
    "Select Drop off Location"
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

  let finalDropTime = dropTime; // current dropTime

  if (selectedPickupDate && date < selectedPickupDate) {
    date = selectedPickupDate;
  }

  if (
    selectedPickupDate &&
    date.toDateString() === selectedPickupDate.toDateString()
  ) {
    const pickupMin = parseMinutes(pickupTime);
    const dropMin = parseMinutes(finalDropTime);
    if (dropMin <= pickupMin) {
      const times = generateTimeList(date);
      const nextValid = times.find((t) => parseMinutes(t.name) > pickupMin);
      if (nextValid) finalDropTime = nextValid.name;
    }
  }

  // 🇳🇿 Convert finalDropTime + date to NZ-local ISO (like pickup)
  const [time, modifier] = finalDropTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const nzParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Pacific/Auckland",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const year = Number(nzParts.find((p) => p.type === "year").value);
  const month = Number(nzParts.find((p) => p.type === "month").value) - 1;
  const day = Number(nzParts.find((p) => p.type === "day").value);

  const nzDropUTC = new Date(Date.UTC(year, month, day, hours, minutes, 0, 0));

  setSearchPayload((prev) => ({
    ...prev,
    drop_time: nzDropUTC.toISOString(),
  }));

  setDropTime(finalDropTime);
  setSelectedDropDate(date);
  setDropDateDropdown(false);
};




const handleDropTimeChange = (dropTimeValue) => {
  if (!dropTimeValue) return;

  // 🔥 Prevent drop time before pickup time on same day

  console.log(dropTimeValue,"here drop time")
  if (
    selectedPickupDate &&
    selectedDropDate &&
    selectedDropDate.toDateString() === selectedPickupDate.toDateString()
  ) {
    const pickupMin = parseMinutes(pickupTime);
    const dropMin = parseMinutes(dropTimeValue);
    if (dropMin <= pickupMin) {
      alert("Drop time cannot be earlier than pickup time!");
      return;
    }
  }

  const d = new Date(selectedDropDate);

  // Convert time to 24-hour format
  const [time, modifier] = dropTimeValue.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

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

  setDropTime(dropTimeValue);
  setDropTimeDropdown(false);
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
  const [isAvailable, setIsAvailable] = useState(true);
  const router = useRouter();
  const handleSearchCarAvailabile = async () => {
    const api = `${url}/cars/specific-available-car`;
    const api2 = `${url}/cars/get/${searchPayload?.car_id}`;
    setLoader(true);
    try {
      const response = await axios.post(api, searchPayload);
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
        if (response?.data?.available !== 0) {
          router.push("/book-now");
        } else {
          setIsAvailable(false);
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
    console.log("workingggg", searchPayload)
  }, [searchPayload]);


  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSearchPayload({
      car_id: null,
      pickup_location: null,
      drop_location: null,
      pickup_time: "",
      drop_time: "",
      driver_age: "26+",
    });

    setPickupLocationValue("Select Pickup Location");
    setDropLocationValue("Select Drop off Location");
    setSelectedPickupDate("");
    setSelectedDropDate("");
  };

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
      className={`booking-date-select-modal-main-container ${showBookingModal ? "show-booking-date-modal" : ""
        }`}
      onClick={handleCloseBookingModal}
    >
      {loader && <MainLoader />}
      <div
        className={`booking-date-select-modal-inner-container ${showBookingModal ? "show-booking-date-inner-modal" : ""
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
                onClick={handleCloseBookingModal}
              />
            </div>
            <h3 className="booking-modal-vehicle-name">{carData?.name}</h3>
          </div>

          {isAvailable ? (
            <div className="booking-modal-form-inputs">
              <div className="booking-modal-form-input-single-col-pick-up">
                {/* Pickup Location */}

                <div
                  className="booking-modal-pickup-main"
                  ref={pickupLocationRef}
                >
                  <p>Pick-up Location</p>

                  <div className="booking-modal-pickup-dropdown-main">
                    <div
                      className="booking-modal-pickup-dropdown-head"
                      onMouseDown={() =>
                        setPickupLocationDropdown(!pickupLocationDropdown)
                      }
                    >
                      <h3>{pickupLocationValue}</h3>
                      <MdOutlineArrowDropDown
                        size={20}
                        color="var(--primary-color)"
                      />
                    </div>

                    <div
                      className={`booking-modal-pickup-dropdown-body ${pickupLocationDropdown ? "show-pickup-locations" : ""
                        }`}
                    >
                      {locations.map((item, index) => (
                        <p
                          key={index}
                          className={`booking-modal-pickup-single-item ${pickupLocationOptionIndex === index
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
                      className={`booking-modal-date-body ${pickupDateDropdown ? "show-pickup-date-calender" : ""
                        }`}
                    >
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

                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          const checkDate = new Date(date);
                          checkDate.setHours(0, 0, 0, 0);

                          return checkDate < nzStartOfToday;
                        }}
                      />
                    </div>
                  </div>

                  {/* Pickup Time */}
                  <div
                    className="booking-modal-time-container"
                    ref={pickupTimeRef}
                  >
                    <div
                      className="booking-modal-time-head"
                      onMouseDown={() => setPickupTimeDropdown((prev) => !prev)}
                    >
                      <h3>{pickupTime ? pickupTime : "Select Time"}</h3>
                      <MdOutlineArrowDropDown size={20} color="#000" />
                    </div>

                    <div
                      className={`booking-modal-time-body ${pickupTimeDropdown ? "show-pickup-time-list" : ""
                        }`}
                    >
                      {generateTimeList(selectedPickupDate).map(
                        (item, index) => (
                          <p
                            key={index}
                            className={`booking-modal-time-single-item ${pickupTimeIndex === index ? "highlighted" : ""
                              }
                            ${item.isPassed === true ? "disable-time" : ""}
                            `}
                            onClick={() => handlePickupTimeChange(item.name)}
                          >
                            {item.name}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="booking-modal-form-input-single-col-pick-up">
                {/* Drop Location  */}
                <div
                  className="booking-modal-pickup-main"
                  ref={DropLocationRef}
                >
                  <p>Drop-off Location</p>

                  <div className="booking-modal-pickup-dropdown-main">
                    <div
                      className="booking-modal-pickup-dropdown-head"
                      onMouseDown={() =>
                        setDropLocationDropdown(!dropLocationDropdown)
                      }
                    >
                      <h3>{dropLocationValue}</h3>
                      <MdOutlineArrowDropDown
                        size={20}
                        color="var(--primary-color)"
                      />
                    </div>

                    <div
                      className={`booking-modal-pickup-dropdown-body ${dropLocationDropdown ? "show-pickup-locations" : ""
                        }`}
                    >
                      {locations.map((item, index) => (
                        <p
                          key={index}
                          className={`booking-modal-pickup-single-item ${dropLocationOptionIndex === index
                            ? "highlighted"
                            : ""
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
                  <div
                    className="booking-modal-date-container"
                    ref={dropDateRef}
                  >
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
                      className={`booking-modal-date-body ${dropDateDropdown ? "show-pickup-date-calender" : ""
                        }`}
                    >
                      <Calendar
                        onChange={handleDropDateChange}
                        value={selectedDropDate}
                        defaultView="month"
                        next2Label={null}
                        prev2Label={null}
                        /* 🔑 Open calendar from pickup month */
                        activeStartDate={dropCalendarMonth}
                        onActiveStartDateChange={({ activeStartDate }) =>
                          setDropCalendarMonth(activeStartDate)
                        }
                        minDate={nzPickupDate || nzStartOfToday}
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
                  </div>

                  {/* Drop Time */}
                  <div
                    className="booking-modal-time-container"
                    ref={dropTimeRef}
                  >
                    <div
                      className="booking-modal-time-head"
                      onClick={() => setDropTimeDropdown(!dropTimeDropdown)}
                    >
                      <h3>{dropTime ? dropTime : "Select Time"}</h3>
                      <MdOutlineArrowDropDown size={20} color="#000" />
                    </div>

                    <div
                      className={`booking-modal-time-body ${dropTimeDropdown ? "show-pickup-time-list" : ""}`}
                    >
                      {generateDropTimeList(selectedDropDate, selectedPickupDate, pickupTime).map((item, index) => (
                        <p
                          key={index}
                          className={`booking-modal-time-single-item ${item.isPassed ? "disable-time" : ""}`}
                          onClick={() => !item.isPassed && handleDropTimeChange(item.name)}
                        >
                          {item.name}
                        </p>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="booking-modal-vehicle-not-available-main-container">
              <h3>Car Not Available for Selected Dates</h3>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <p>This car is already booked for the dates you selected.</p>
                <p>
                  Please try different dates or choose another available car.
                </p>
              </span>
              <button onClick={() => setIsAvailable(true)}>
                Try another dates
              </button>
            </div>
          )}
        </div>

        <div className="booking-modal-availability-check-button">
          <button
            className={`booking-modal-check-button ${isSearchPayloadValid ? "active-check-button" : ""
              }`}
            disabled={!isSearchPayloadValid}
            onClick={handleSearchCarAvailabile}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDatesModal;
