import React, { useEffect, useRef, useState } from 'react'
import './AddressAndPhone.css'
import { IoIosLock, IoMdArrowDropdown } from "react-icons/io";
import { url } from '../../../utils/services';
import axios from 'axios';
import { useOutsideClick } from '../../../utils/DetectClickOutside';
import useDropdownNavigationWithSearch from '../../../utils/keyPress';
import MainLoader from '../../../loaders/MainLoader/MainLoader';

const AddressAndPhone = ({ userDetails }) => {
  const [loading, setLoading] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountryItem, setSelectedCountryItem] = useState('')
  const [addressAndPhon, setAddressAndPhone] = useState({
    street_no: "",
    suburb: "",
    city: "",
    post_code: "",
    country: "",
    phone: "",
    alternate_phone: ""
  })

  useEffect(() => {
    setAddressAndPhone({
      street_no: userDetails?.address?.street_no,
      suburb: userDetails?.address?.suburb,
      city: userDetails?.address?.city,
      post_code: userDetails?.address?.post_code,
      country: userDetails?.address?.country,
      phone: userDetails?.address?.phone,
      alternate_phone: userDetails?.address?.alternate_phone,
    })
    setSelectedCountryItem(userDetails?.address?.country)
  }, [userDetails])


  useEffect(() => {
    const handleGetAllCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");
        const data = await res.json();


        const formatted = data
          .map((item) => {
            const root = item.idd?.root || "";
            const suffix = item.idd?.suffixes?.[0] || "";
            return {
              country: item.name.common,
              code: root + suffix, // e.g. +92
            };
          })
          // sort alphabetically by country name
          .sort((a, b) => a.country.localeCompare(b.country));

        setCountriesList(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    handleGetAllCountries();
  }, []);

  const handleSelectCountry = (item) => {
    setSelectedCountryItem(item.country)
    setShowCountries(false);
    setAddressAndPhone((prev) => ({
      ...prev,
      country: item.country
    }))
  }

  const handleSetAddressAndPhoneValue = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === "phone") {
      // ✅ Allow only digits and an optional + at the start
      const phoneRegex = /^\+?\d*$/;

      // If user types something invalid, ignore it
      if (!phoneRegex.test(value)) return;

      // Optional: prevent multiple "+" symbols anywhere else
      formattedValue = value.startsWith("+")
        ? "+" + value.slice(1).replace(/\+/g, "")
        : value.replace(/\+/g, "");
    }

    setAddressAndPhone((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  }

  const handleUpdateAddressAndPhone = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `${url}/customer/address`
  
    setLoading(true)
    try {
      const response = await axios.post(api, addressAndPhon, {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })
      if(response.status == 200) {
        setLoading(false)
      }

    } catch (error) {
      console.error("UnExpected Server Error", error);
      setLoading(false);
    } finally {
      setLoading(false)
    }
  }

  const countryRef = useRef()
  useOutsideClick(countryRef, () => setShowCountries(false));
  const countryIndex = useDropdownNavigationWithSearch(countryRef, showCountries, 'countries-list-item')

  // useEffect(() => {handleGetAddressAndPhone()}, [])


  return (
    <div className='address-and-phone-main-contianer'>
      {loading && <MainLoader />}
      <div className='address-and-phone-width-controller'>

        <div className='address-input-contianer'>
          <h3 className='address-and-phone-heading'>Address</h3>
          <div className='address-details'>

            <div className='two-input-row'>
              <label>
                Street number & name
                <input type='text' name='street_no' value={addressAndPhon.street_no} onChange={handleSetAddressAndPhoneValue} />
              </label>

              <label>
                Suburb
                <input type='text' name='suburb' value={addressAndPhon.suburb} onChange={handleSetAddressAndPhoneValue} />
              </label>
            </div>

            <div className='zip-and-city-contianer'>
              <label>
                City/town
                <input type='text' name='city' value={addressAndPhon.city} onChange={handleSetAddressAndPhoneValue} />
              </label>

              <label>
                Post code
                <input type='text' name='post_code' value={addressAndPhon.post_code} onChange={handleSetAddressAndPhoneValue} />
              </label>
            </div>

            <div ref={countryRef} className='country-dropdown-main-continar'>
              <p className='country-dropdown-main-continar-label'>Country</p>
              <div className='country-dropdown-label' onClick={() => setShowCountries(!showCountries)}>
                <p>{selectedCountryItem !== '' ? selectedCountryItem : 'Select Country'}</p>
                <IoMdArrowDropdown size={20} color='var(--primary-color)' />
              </div>

              <div className={`country-dropdown-list-container ${showCountries ? 'show-countries-list' : ''}`}>
                {countriesList.map((item, index) => (
                  <p
                    key={index}
                    className={`countries-list-item ${countryIndex === index ? 'active-country-list-item' : ''}`}
                    onClick={() => handleSelectCountry(item)}
                  >
                    {item.country}
                  </p>
                ))}
              </div>

            </div>

          </div>
        </div>

        <div className='phone-input-contianer'>
          <h3 className='address-and-phone-heading'>Phone</h3>

          <div className='phone-input'>
            <p>Phone number</p>
            <input type='text' name='phone' value={addressAndPhon.phone} onChange={handleSetAddressAndPhoneValue} />
          </div>
        </div>

        <span className='protected-data-message'>
          <IoIosLock size={20} color='var(--primary-color)' />
          Your personal information is secure and encrypted
        </span>

        <button className='address-and-phone-save-button' onClick={handleUpdateAddressAndPhone}>Save Address & Phone</button>
      </div>
    </div>
  )
}

export default AddressAndPhone