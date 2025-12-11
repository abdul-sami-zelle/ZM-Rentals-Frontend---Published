import React, { useEffect, useRef, useState } from 'react'
import './LicenceTab.css'
import { IoIosLock, IoMdArrowDropdown } from "react-icons/io";
import { url } from '@/utils/services';
import axios from 'axios';
import MainLoader from '@/loaders/MainLoader/MainLoader';
import { useOutsideClick } from '@/utils/DetectClickOutside';
import useDropdownNavigationWithSearch from '@/utils/keyPress';

const LisenceTab = ({ userDetails }) => {

  const [showCountries, setShowCountries] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountryItem, setSelectedCountryItem] = useState('')
  const [loading, setLoading] = useState(false);
  const [licenceDetails, setLicenceDetails] = useState({
    name_on_license: '',
    dob: '',
    license_no: '',
    license_expiry: '',
    issue_country: ''
  })

  useEffect(() => {
    setLicenceDetails({
      name_on_license: userDetails?.license?.name_on_license,
      dob: userDetails?.license?.dob,
      license_no: userDetails?.license?.license_no,
      license_expiry: userDetails?.license?.license_expiry,
      issue_country: userDetails?.license?.issue_country
    })
  }, [userDetails])

  const handleSetLicenceValues = (event) => {
    const { name, value } = event.target;

    let formattedValue = value;

    // Restrict only date fields
    if (name === "dob" || name === "license_expiry") {
      // Remove non-digit characters first
      formattedValue = value.replace(/[^\d]/g, "");

      // Auto-add dashes: YYYY-MM-DD
      if (formattedValue.length > 4 && formattedValue.length <= 6) {
        formattedValue = formattedValue.slice(0, 4) + "-" + formattedValue.slice(4);
      } else if (formattedValue.length > 6) {
        formattedValue =
          formattedValue.slice(0, 4) +
          "-" +
          formattedValue.slice(4, 6) +
          "-" +
          formattedValue.slice(6, 8);
      }

      // Trim to max length of YYYY-MM-DD
      if (formattedValue.length > 10) formattedValue = formattedValue.slice(0, 10);
    }

    setLicenceDetails((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  }

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
    setLicenceDetails((prev) => ({
      ...prev,
      issue_country: item.country
    }))
  }

  const handleUpdateLicenceDetails = async () => {
    const userToken = localStorage.getItem('userToken');

    const api = `${url}/customer/license`;
    setLoading(true)
    try {
      const response = await axios.post(api, licenceDetails, {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })

    } catch (error) {
      setLoading(false)
      console.error("UnExpected Server Error", error);
    } finally {
      setLoading(false)
    }
  }

  const countryRef = useRef()
  useOutsideClick(countryRef, () => setShowCountries(false));
  const countryIndex = useDropdownNavigationWithSearch(countryRef, showCountries, 'countries-list-item')

  return (
    <div className='driver-licence-main-contianer'>
      {loading && <MainLoader />}
      <div className='driver-licence-width-controller'>
        <h3 className="driver-licence-main-heading">Driver Licence</h3>

        <div className='driver-licence-inputs-container'>
          <div className='driver-licence-dual-inputs'>
            <label>
              Name on licence
              <input type='text' name='name_on_license' value={licenceDetails.name_on_license} onChange={handleSetLicenceValues} />
            </label>
            <label>
              Date of birth
              <input type='text' placeholder='YY-MM-DD' name='dob' value={licenceDetails.dob} onChange={handleSetLicenceValues} />
            </label>
          </div>
          <div className='licence-number-and-expiry-container'>
            <label>
              Licence number
              <input type='text' name='license_no' value={licenceDetails.license_no} onChange={handleSetLicenceValues} />
            </label>
            <label>
              Licence expiry date
              <input type='text' placeholder='YY-MM-DD' name='license_expiry' value={licenceDetails.license_expiry} onChange={handleSetLicenceValues} />
            </label>
          </div>

          <div ref={countryRef} className='country-dropdown-main-continar'>
            <p className='country-dropdown-main-continar-label'>Country</p>
            <div className='country-dropdown-label' onClick={() => setShowCountries(!showCountries)}>
              <p>{licenceDetails?.issue_country !== '' ? licenceDetails?.issue_country : 'Select Country'}</p>
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

        <span className='protected-data-message'>
          <IoIosLock size={20} color='var(--primary-color)' />
          Your personal information is secure and encrypted
        </span>

        <button className='address-and-phone-save-button' onClick={handleUpdateLicenceDetails}>Save driver licence</button>
      </div>
    </div>
  )
}

export default LisenceTab