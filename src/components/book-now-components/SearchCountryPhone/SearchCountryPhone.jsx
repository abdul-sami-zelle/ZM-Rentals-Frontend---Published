import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useOutsideClick } from "@/utils/DetectClickOutside";

const CountryCodeDropdown = ({
  countryList,
  selectedCountryDetails,
  setSelectedCountryDetails,
  errors,
  bookingPayload,
  handleHirerDetailsAdd,
}) => {
  const [showCountryCodeList, setShowCountryCodeList] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countryList);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false); // Track keyboard navigation

  const countryCodeRef = useRef(null);
  const searchRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Close dropdown when clicked outside
  useOutsideClick(countryCodeRef, () => setShowCountryCodeList(false));

  // Filter countries
  useEffect(() => {
    const lower = query.toLowerCase();
    const filtered = countryList.filter(
      (c) =>
        c.country.toLowerCase().includes(lower) ||
        c.code.toLowerCase().includes(lower)
    ).sort((a, b) => {
      const aName = a.country.toLowerCase();
      const bName = b.country.toLowerCase();

      const aStart = aName.startsWith(lower);
      const bStart = bName.startsWith(lower);

      if(aStart && !bStart) return -1;
      if(!aStart && bStart) return 1;

      return 0
    })
    setFilteredCountries(filtered);
    setActiveIndex(filtered.length ? 0 : -1);
  }, [query, countryList]);

  // Open dropdown on input focus (only if not already open)
  const openDropdown = () => {
    if (!showCountryCodeList) setShowCountryCodeList(true);
  };

  // Select country
  const handleSelectCountry = (item) => {
    setSelectedCountryDetails(item);
    setShowCountryCodeList(false);
    setQuery("");
    phoneInputRef.current?.focus();
    setKeyboardNavigation(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showCountryCodeList) return;

    setKeyboardNavigation(true); // keyboard navigation started

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredCountries.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCountries.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0)
        handleSelectCountry(filteredCountries[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setShowCountryCodeList(false);
      setKeyboardNavigation(false);
    }
  };

  // Scroll active item into view (only for keyboard navigation)
  useEffect(() => {
    if (showCountryCodeList && keyboardNavigation) {
      const container = document.querySelector(
        ".country-code-inner-list-contianer"
      );
      const activeEl = document.querySelector(
        ".country-code-inner-item.active-code"
      );
      if (container && activeEl) {
        container.scrollTop =
          activeEl.offsetTop -
          container.offsetTop -
          container.clientHeight / 2 +
          activeEl.clientHeight / 2;
      }
    }
  }, [activeIndex, showCountryCodeList, keyboardNavigation]);


  const handleBlur = (e) => {
  // Check if the newly focused element is outside the country code ref
  if (
    countryCodeRef.current &&
    !countryCodeRef.current.contains(e.relatedTarget)
  ) {
    setShowCountryCodeList(false);
    setKeyboardNavigation(false);
  }
};

  return (
    <label
      className="width-full-on-phone"
      ref={countryCodeRef}
      onBlur={handleBlur}
      style={{
        color: errors.phone ? "#961502" : "#000",
        border: errors?.phone ? "1px solid red" : "1px solid transparent",
      }}
    >
      Phone Number *
      <div className="hirer-phone-with-country-code">
        {/* Dropdown toggle arrow */}
        <div
          tabIndex={0}
          className="country-code-dropdown"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent bubbling
            setShowCountryCodeList((prev) => !prev);
            phoneInputRef.current?.focus();
          }}
          onKeyDown={handleKeyDown}
        >
          <p>
            {selectedCountryDetails?.code}{" "}
            <IoIosArrowDown
              size={17}
              color="rgba(204,204,204,1)"
              strokeWidth={5}
            />
          </p>
        </div>

        {/* Phone input */}
        <input
          ref={phoneInputRef}
          type="text"
          name="phone"
          value={bookingPayload?.user?.phone}
          onChange={handleHirerDetailsAdd}
          placeholder="Enter phone"
          tabIndex={0}
          style={{ flex: 1 }}
          onFocus={openDropdown}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Dropdown list */}
      {showCountryCodeList && (
        <div className="country-code-list show-country-code-list">
          <div className="country-code-drop-down-head">
            <h3>Selected</h3>
            <div className="country-code-selected-and-search">
              <span>
                <h3>{selectedCountryDetails?.country || "New Zealand"}</h3>
                <p>{selectedCountryDetails?.code || "+64"}</p>
              </span>
              <IoIosArrowDown
                size={17}
                color="rgba(204,204,204,1)"
                strokeWidth={5}
              />
            </div>

            {/* Search */}
            <div className="country-code-search">
              <button type="button">
                <CiSearch size={25} color="#000" />
              </button>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search Country"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Country items */}
          <div className="country-code-inner-list-contianer">
            {filteredCountries.map((item, index) => (
              <span
                key={index}
                tabIndex={-1}
                className={`country-code-inner-item ${
                  index === activeIndex ? "active-code" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent toggle
                  handleSelectCountry(item);
                  setActiveIndex(index);
                }}
                onMouseEnter={() => setActiveIndex(index) && setKeyboardNavigation(false)} // disable scroll on hover
              >
                <p>{item.country}</p>
                <p className="country-code-list-item">
                  {item.code ? `(${item.code})` : ""}
                </p>
              </span>
            ))}
          </div>
        </div>
      )}
    </label>
  );
};

export default CountryCodeDropdown;
