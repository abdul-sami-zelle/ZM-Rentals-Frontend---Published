"use client";
import React, { useEffect, useRef, useState } from "react";
import "./HirerDetails.css";
import { useBookingContext } from "../../../context/bookingContext/bookingContext";
import { useOutsideClick } from "../../../utils/DetectClickOutside";
import useDropdownNavigation from "../../../utils/keyPress";
import Select from "react-select";
import { IoIosArrowDown } from "react-icons/io";
import CountryCodeDropdown from "../SearchCountryPhone/SearchCountryPhone";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

// import { MdOutlineArrowDropDown } from "react-icons/md";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "24px",
    height: "24px",
    borderRadius: 0,
    padding: "0 16px",
    border: "none", // 🚀 removed border from the input
    boxShadow: "none",
    background: "Transparent", // no border radius
    borderColor: state.isFocused ? "#961502" : "#ccc", // red on focus/open
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#961502",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "24px",
    padding: "0",
    border: "none",
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    fontSize: "13px", // 🚀 font size set to 13px
    lineHeight: 1.5, // 🚀 line height set to 1.5
    fontWeight: 400, // 🚀 font weight set to 400
    color: "#000",
    caretColor: "transparent",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "13px", // 🚀 same font rules applied to selected value
    lineHeight: 1.5,
    fontWeight: 400,
    color: "#000",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "24px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#961502"
      : state.isFocused
      ? "#961502" // highlight color when focused via arrow keys
      : "white",
    color: state.isSelected ? "white" : state.isFocused ? "#fff" : "#961502",
    "&:hover": {
      backgroundColor: "#961502",
      color: "white",
    },
    borderRadius: 0,
    cursor: "pointer",
    minHeight: "24px",
    fontSize: "13px",
  }),
  // option: (provided, state) => ({
  //   ...provided,
  //   backgroundColor: state.isSelected ? "#961502" : "white",
  //   color: state.isSelected ? "white" : "black",
  //   ...(state.isFocused &&
  //     !state.isSelected && {
  //       backgroundColor: "white", // remove default focus red
  //       color: "black",
  //     }),
  //   "&:hover": {
  //     backgroundColor: "#961502",
  //     color: "white",
  //   },
  //   borderRadius: 0,
  //   cursor: "pointer",
  //   minHeight: "24px",
  //   fontSize: "13px",
  // }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 0,
    marginTop: 12,
    marginBottom: 0,
    width: "100%",
    border: "1px solid #961502",
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: "200px", // 🚀 cap height to avoid huge dropdown
    overflowY: "auto", // allow scrolling
    "::-webkit-scrollbar": {
      display: "none", // 🚀 hide scrollbar (still scrollable)
    },
  }),
};

const HirerDetails = () => {
  const whereFindUs = [
    "Google",
    "Facebook",
    "Instagram",
    "Tiktok",
    "Friends referral",
    "Other",
  ];

  const {
    bookingPayload,
    setBookingPayload,
    errors,
    setErrors,
    validateForm,
    countryCode,
    setCountryCode,
    selectedCountryDetails,
    setSelectedCountryDetails,
  } = useBookingContext();

  const [parentCountryShow, setParentCountryShow] = useState(false);
  const [driverAgeShow, setDriverAgeShow] = useState(false);
  const [findUs, setFindUs] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [filterLivingCountry, setFilterLivingCountry] = useState([]);

  useEffect(() => {
    const handleGetAllCountries = async () => {
      try {
        const res = await fetch("https://countries.skyhub.pk/countries");
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        const formatted = data
          .map((item) => {
            return {
              country: item.name,
              code: item.phoneCode ? `+${item.phoneCode}` : "", // e.g., +93
              emoji: item.emojiU || "",
              native: item.native || "",
            };
          })
          // Sort alphabetically by country name
          .sort((a, b) => a.country.localeCompare(b.country));

        setCountryList(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    handleGetAllCountries();
  }, []);

  const [showCountryCodeList, setShowCountryCodeList] = useState(false);

  const handleHirerDetailsAdd = (e) => {
    const { name, value } = e.target;

    setBookingPayload((prev) => {
      let newValue = value;

      // 📧 Email validation
      if (name === "email") {
        const trimmed = value.trim();
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };

          if (trimmed === "") {
            newErrors[name] = "Required";
          } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmed)) {
              newErrors[name] = "Invalid email format";
            } else {
              delete newErrors[name];
            }
          }

          return newErrors;
        });

        return {
          ...prev,
          user: {
            ...prev.user,
            [name]: value,
          },
        };
      }

      // 📱 Phone validation (required)
      if (name === "phone") {
        newValue = value.replace(/\D/g, ""); // only numbers
        if (newValue.length > 13) newValue = newValue.slice(0, 13); // max 13 digits

        if (newValue.length < 8 || newValue.length > 13) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: "Phone must be 8–13 digits",
          }));
        } else {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.phone;
            return newErrors;
          });
        }

        return {
          ...prev,
          user: {
            ...prev.user,
            [name]: newValue,
          },
        };
      }

      // ☎️ Local phone validation (optional)
      if (name === "local_phone") {
        newValue = value.replace(/\D/g, ""); // only numbers
        if (newValue.length > 13) newValue = newValue.slice(0, 13); // max 13 digits

        // ❌ no error pushed if empty
        if (newValue && (newValue.length < 8 || newValue.length > 13)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            local_phone: "Local phone must be 8–13 digits",
          }));
        } else {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.local_phone;
            return newErrors;
          });
        }

        return {
          ...prev,
          user: {
            ...prev.user,
            [name]: newValue,
          },
        };
      }

      // Default required check for other fields
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (value.trim() !== "") {
          delete newErrors[name];
        } else {
          newErrors[name] = "Required";
        }
        return newErrors;
      });

      return {
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      };
    });
  };

  const handleSelectLivingCountry = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        country: item.value,
        // phone: item.code
      },
    }));
    // setLivingCountryQuery(item.value)

    // ✅ Clear error for country when a valid value is selected
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.value?.trim() !== "") {
        delete newErrors.country; // remove error
      } else {
        newErrors.country = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setParentCountryShow(false);
    setMenuOpen(false);
  };

  const driverAgeList = ["21", "22", "23", "24", "25", '26+'];

  const handleSellectDriverAge = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        driver_age: item,
      },
    }));

    // ✅ Clear error for country when a valid value is selected
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.trim() !== "") {
        delete newErrors.country; // remove error
      } else {
        newErrors.country = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setDriverAgeShow(false);
  };

  const handleFoundTell = (item) => {
    setBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        how_find_us: item,
      },
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (item && item.trim() !== "") {
        delete newErrors.how_find_us; // remove error
      } else {
        newErrors.how_find_us = "Required"; // keep error if empty
      }
      return newErrors;
    });

    setFindUs(false);
  };

  const [filteredCountries, setFilteredCountries] = useState(countryList);
  // const [query, setQuery] = useState('');

  useEffect(() => {
    const defaultCountry = bookingPayload.user.country; // or however you set it
    const countryObj = countryList?.find(
      (c) => c.country.toLowerCase() === defaultCountry?.toLowerCase()
    );

    if (countryObj) {
      setSelectedCountryDetails(countryObj);
    }
    setFilteredCountries(countryList);
    setFilterLivingCountry(countryList);
  }, [countryList, bookingPayload?.user?.country]);

  const options = filterLivingCountry.map((item) => ({
    value: item.country,
    label: item.country,
  }));

  const [menuOpen, setMenuOpen] = useState(false);

  // track if user actually confirmed selection
  const [isConfirmedSelection, setIsConfirmedSelection] = useState(false);

  const handleChange = (selectedOption, actionMeta) => {
    if (actionMeta.action === "select-option") {
      // only trigger when user clicks or presses Enter/Space
      setIsConfirmedSelection(true);
      handleSelectLivingCountry(selectedOption);
    }
  };

  const handleBlur = () => {
    setMenuOpen(false);
    setIsConfirmedSelection(false);
  };

  const livingCountryRef = useRef();
  const driverAgeRef = useRef();
  const foundUsRef = useRef();
  const countryCodeRef = useRef();

  useOutsideClick(livingCountryRef, () => setParentCountryShow(false));
  useOutsideClick(driverAgeRef, () => setDriverAgeShow(false));
  useOutsideClick(foundUsRef, () => setFindUs(false));
  useOutsideClick(countryCodeRef, () => setShowCountryCodeList(false));

  // const ageIndex = useDropdownNavigation(driverAgeRef, driverAgeShow, 'hirer-age-list-item')
  const foundUsIndex = useDropdownNavigation(
    foundUsRef,
    findUs,
    "living-country-item"
  );

  // Age Select

  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const selectedAge = bookingPayload.user.driver_age || "Please Select";

  // close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle key controls
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      // Tab behavior: open if not open, close and move if open
      if (!open) {
        setOpen(true);
        e.preventDefault(); // stay on element, open dropdown
      } else {
        setOpen(false);
        setHighlightIndex(-1);
      }
    }

    if ((e.key === "Enter" || e.key === " ") && !open) {
      e.preventDefault();
      setOpen(true);
      return;
    }

    if ((e.key === "Enter" || e.key === " ") && open) {
      e.preventDefault();
      if (highlightIndex >= 0) {
        const selected = driverAgeList[highlightIndex];
        handleSellectDriverAge(selected);
      }
      setOpen(false);
      setHighlightIndex(-1);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlightIndex((prev) =>
        prev < driverAgeList.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : driverAgeList.length - 1
      );
    }

    if (e.key === "Escape") {
      setOpen(false);
      setHighlightIndex(-1);
    }
  };

  const handleSelect = (item) => {
    handleSellectDriverAge(item);
    setOpen(false);
    setHighlightIndex(-1);
  };

  return (
    <div className="hirer-details-main-container">
      <p>
        The Hirer's name must match the name of the person collecting the
        vehicle as shown on their driver licence and credit/debit card
      </p>

      <div className="hirer-first-and-last-name">
        <label
          style={{
            color: errors.firstname ? "#961502" : "#000",
            border: errors.firstname
              ? "1px solid #961502"
              : "1px solid transparent",
          }}
        >
          First Name *
          <input
            type="text"
            name="firstname"
            value={bookingPayload.user.firstname}
            onChange={handleHirerDetailsAdd}
          />
        </label>

        <label
          style={{
            color: errors.lastname ? "#961502" : "#000",
            border: errors.lastname
              ? "1px solid #961502"
              : "1px solid transparent",
          }}
        >
          Last Name *
          <input
            type="text"
            name="lastname"
            value={bookingPayload.user.lastname}
            onChange={handleHirerDetailsAdd}
          />
        </label>
      </div>

      <div className="hirer-living-country-and-age-container">
        <div className="hirer-details-select-contianer">
          <p style={{ color: errors.country ? "#961502" : "#000" }}>
            Which country do you live in? *
          </p>
          <Select
            options={options}
            value={options.find(
              (opt) => opt.value === bookingPayload.user.country
            )}
            onChange={handleChange}
            styles={customStyles}
            isClearable={false}
            defaultMenuIsOpen={false}
            autoFocus={false}
            backspaceRemovesValue={false}
            tabSelectsValue={false} // prevent selecting on tab press
            openMenuOnFocus={true}
            blurInputOnSelect={true}
            isSearchable
            className="my-country-input"
            placeholder="Which country do you live in?"
            // menuIsOpen={menuOpen} // force open/close
            onFocus={() => setMenuOpen(true)} // open on focus (Tab)
            onBlur={handleBlur}
            filterOption={(option, inputValue) =>
              option.label.toLowerCase().startsWith(inputValue.toLowerCase())
            }
          />
        </div>

        {/* driver age */}

        <div className="smooth-dropdown" ref={dropdownRef}>
          <label
            htmlFor="driver_age"
            style={{ color: errors.driver_age ? "#961502" : "#000" }}
          >
            Driver Age *
          </label>

          <div
            id="driver_age"
            className="smooth-dropdown-toggle"
            tabIndex={0}
            onClick={() => setOpen((prev) => !prev)}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <p>{selectedAge}</p>
            <span className={`arrow ${open ? "open" : ""}`}>
              <IoIosArrowDown
                size={17}
                color="rgba(204,204,204,1)"
                strokeWidth={5}
              />
            </span>
          </div>

          <div
            ref={listRef}
            className={`smooth-dropdown-list ${open ? "open" : ""}`}
            role="listbox"
          >
            {driverAgeList.map((item, index) => (
              <div
                key={index}
                role="option"
                aria-selected={highlightIndex === index}
                className={`smooth-dropdown-item ${
                  highlightIndex === index ? "highlighted" : ""
                }`}
                onClick={() => handleSelect(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* driver age */}
      </div>

      <div className="hirer-first-and-last-name flex-colum-on-mobile">
        <label
          className="width-full-on-phone"
          style={{
            color: errors.email ? "#961502" : "#000",
            border: errors.email
              ? "1px solid #961502"
              : "1px solid transparent",
          }}
        >
          Email Address *
          <input
            type="text"
            name="email"
            value={bookingPayload.user.email}
            onChange={handleHirerDetailsAdd}
          />
        </label>

        <CountryCodeDropdown
          countryList={countryList}
          selectedCountryDetails={selectedCountryDetails}
          bookingPayload={bookingPayload}
          setSelectedCountryDetails={setSelectedCountryDetails}
          errors={errors}
          handleHirerDetailsAdd={handleHirerDetailsAdd}
        />
      </div>

      <div className="find-us-and-local-phone-number">
        <label className="local-phone-number" style={{ width: "60%" }}>
          Local Phone Number
          <div className="hirer-local-phone-with-country-code">
            <div className="local-phone-country-code-dropdown">
              <p>+64</p>
            </div>
            <input
              type="text"
              name="local_phone"
              value={bookingPayload.user.local_phone}
              onChange={handleHirerDetailsAdd}
            />
          </div>
        </label>

        <div
          className="hirer-parent-country"
          ref={foundUsRef}
          tabIndex={0}
          onMouseDown={(e) => {
            e.preventDefault(); // ⛔ prevents unwanted blur
            setFindUs((prev) => !prev); // ⬅ toggle on click (first click)
          }}
          onFocus={() => setFindUs(true)}
          onBlur={() => setFindUs(false)}
          style={{
            width: "40%",
            color: errors.how_find_us ? "#961502" : "#000",
            border: errors.how_find_us
              ? "1px solid #961502"
              : "1px solid transparent",
          }}
        >
          <p>How did you find us? *</p>
          <span>
            <h3>
              {bookingPayload.user.how_find_us.length > 0
                ? bookingPayload.user.how_find_us
                : "Please Select"}
            </h3>
            <IoIosArrowDown
              size={17}
              color="rgba(204,204,204,1)"
              strokeWidth={5}
            />
          </span>
          <div
            className={`parent-country-list ${
              findUs ? "show-parent-country-list" : ""
            }`}
          >
            {whereFindUs.map((item, index) => (
              <p
                className={`living-country-item ${
                  foundUsIndex === index ? "active-country-item" : ""
                }`}
                key={index}
                onClick={() => handleFoundTell(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFoundTell(item);
                  }
                }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="travel-reason-container">
        <p>Travel Reason *</p>
        <div className="travel-reason-radio-container">
          <label>
            Leisure
            <input
              type="radio"
              name="Leisure"
              value={"Leisure"}
              checked={bookingPayload.user.travel_reason === "Leisure"}
              onChange={(e) =>
                setBookingPayload((prev) => ({
                  ...prev,
                  user: { ...prev.user, travel_reason: e.target.value },
                }))
              }
            />
          </label>

          <label>
            Business
            <input
              type="radio"
              name="Business"
              value={"Business"}
              checked={bookingPayload.user.travel_reason === "Business"}
              onChange={(e) =>
                setBookingPayload((prev) => ({
                  ...prev,
                  user: { ...prev.user, travel_reason: e.target.value },
                }))
              }
            />
          </label>
          <label>
            Other
            <input
              type="radio"
              name="Other"
              value={"Other"}
              checked={bookingPayload.user.travel_reason === "Other"}
              onChange={(e) =>
                setBookingPayload((prev) => ({
                  ...prev,
                  user: { ...prev.user, travel_reason: e.target.value },
                }))
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default HirerDetails;
