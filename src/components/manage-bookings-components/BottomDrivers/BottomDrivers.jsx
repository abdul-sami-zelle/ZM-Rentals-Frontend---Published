import React, { useEffect, useRef, useState } from 'react'
import './BottomDrivers.css'
import { IoMdArrowDropdown } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import Calendar from 'react-calendar';
import { CgCloseO } from 'react-icons/cg';
import { url } from '../../../utils/services';
import { useOutsideClick } from '../../../utils/DetectClickOutside';
import { FiPlus } from "react-icons/fi";

const BottomDrivers = ({ editBookingPayload, setEditBookingPayload, setBottomModal, isEditabel }) => {

  const [tempDriver, setTempDriver] = useState([]);
  const [addDriver, setAddDriver] = useState({
    address: "",
    back_license_image: "",
    booking_id: 259,
    city: "",
    country: "",
    driver_dob: "",
    driver_name: "",
    front_license_image: "",
    license_country: "",
    license_expiry: "",
    license_no: "",
    remarks: "",
    state: "",
    zipcode: "",
  })

  const handleAddNewDriverObject = () => {
    setTempDriver((prev) => [...prev, addDriver])
    setDriverEtidIndex(tempDriver.length - 1 + 1)
  }

  useEffect(() => {
    setTempDriver(editBookingPayload?.driverDetails)
  }, [editBookingPayload])

  const handleDriverChange = (index, field, value) => {
    setTempDriver((prev) =>
      prev.map((driver, i) =>
        i === index ? { ...driver, [field]: value } : driver
      )
    );
  };

  const handleDobChange = (index, date) => {
    const localISO = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString();
    handleDriverChange(index, 'driver_dob', localISO);
    setShowDriverDob(false)

  }

  const [driverAge, setDriverAge] = useState('24')
  const handleUpdateDriverAge = (index, item) => {
    handleDriverChange(index, 'driver_age', item);
    setDriverAge(item)
    setShowDriverAgeList(false)

  }

  const handleLicenceCountry = (index, country) => {
    handleDriverChange(index, 'license_country', country);
    setShowCountries(false)
  }

  const handleLicenceExpiry = (index, date) => {
    const localISO = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString();
    handleDriverChange(index, 'license_expiry', localISO);
    setShowExpiry(false)
  }

  // Driver Date of birth
  const [driverEditIndex, setDriverEtidIndex] = useState(null);
  const handleShowDriver = (index) => {
    setDriverEtidIndex((prev) => prev === index ? null : index)
  }

  // Driver DOB
  const [showDriverDob, setShowDriverDob] = useState(false);
  function formatISOToDDMMYYYYStrict(isoString) {
    if (!isoString) return "";

    // Extract only the date part before the "T"
    const [datePart] = isoString.split("T");
    const [year, month, day] = datePart.split("-");

    return `${day}-${month}-${year}`;
  }

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const expiryYears = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  );


  const driverAgeList = ['21', '22', '23', '24', '25+']
  const [showDriverAgeList, setShowDriverAgeList] = useState(false);

  

  const [countryList, setCountryList] = useState([]);
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


        setCountryList(formatted);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    handleGetAllCountries();
  }, []);

  const [showCountries, setShowCountries] = useState(false);

  const [showExpiry, setShowExpiry] = useState(false);

  const [licenceSide, setLicenceSide] = useState('front')
  const handleDivClick = (type, index) => {
    setLicenceSide(type);
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleLicenceUpload = (event, index) => {
    const file = event.target.files[0];
    if (!file) return

    if (licenceSide === 'front') {
      setTempDriver((prev) =>
        prev.map((driver, i) =>
          i === index ? { ...driver, front_license_image: file } : driver
        )
      );
    } else if (licenceSide === 'back') {
      setTempDriver((prev) =>
        prev.map((driver, i) =>
          i === index ? { ...driver, back_license_image: file } : driver
        )
      );
    }
  }

  const handleClearLicenceImages = (index) => {
    setTempDriver((prev) =>
      prev.map((driver, i) =>
        i === index ? { ...driver, front_license_image: '', back_license_image: '' } : driver
      )
    );
  }

  const driverDobRef = useRef();
  const driverAgeRef = useRef();
  const licenceCountryRef = useRef();
  const expiryDateRef = useRef()
  const fileInputRefs = useRef([]);

  useOutsideClick(driverDobRef, () => setShowDriverDob(false));
  useOutsideClick(driverAgeRef, () => setShowDriverAgeList(false));
  useOutsideClick(licenceCountryRef, () => setShowCountries(false));
  useOutsideClick(expiryDateRef, () => setShowExpiry(false));


  const handleUpdateDriversInfo = () => {
    setEditBookingPayload((prev) => ({
      ...prev,
      driverDetails: tempDriver
    }))
    setBottomModal(false)
  }


  return (
    <div className='mobile-driver-edit-main-contianer'>

      <div className='mobile-add-new-driver-contianer' style={{ display: tempDriver.length > 0 ? 'flex' : 'none' }}>
        <button className='mobile-add-new-driver-button'>
          <FiPlus size={20} color='#000' onClick={handleAddNewDriverObject} />
        </button>
      </div>

      <div className='mobile-driver-update-container'>

        {tempDriver?.length > 0 ? (

          tempDriver && tempDriver?.map((item, index) => (

            <div className='mobile-driver-list-item' >

              <div className={`mobile-driver-list-item-head ${driverEditIndex === index ? 'remove-driver-item-radius' : ''}`} onClick={() => handleShowDriver(index)}>
                <h3>{item.driver_name}</h3>
                <IoMdArrowDropdown size={20} color='#000' />
              </div>

              <div className={`mobile-driver-edit-section ${driverEditIndex === index ? 'show-edit-driver-option' : ''}`}>

                <div className='mobile-driver-input-outer' style={{ opacity: isEditabel.driverInfo ? 1 : 0.4 }}>

                  <label>
                    Driver Name
                    <input type='text' readOnly={!isEditabel?.driverInfo} name={`driver_name`} value={item.driver_name} onChange={(e) => handleDriverChange(index, 'driver_name', e.target.value)} />
                  </label>

                  <div ref={driverDobRef} className='mobile-driver-dob'>
                    <p>Date of Birth</p>

                    <div className={`mobile-driver-dob-head ${showDriverDob ? 'remove-item-radius' : ''}`} onClick={() => isEditabel.driverInfo ? setShowDriverDob(!showDriverDob) : null}>
                      <h3>{formatISOToDDMMYYYYStrict(item.driver_dob)}</h3>
                      <CiCalendarDate size={20} color='#000' />
                    </div>

                    <div className={`driver-dob-calender ${showDriverDob ? 'driver-dob-show' : ''}`}>
                      <Calendar
                        onChange={(date) => handleDobChange(index, date)}
                        value={eighteenYearsAgo}
                        view="month"
                        next2Label={null}
                        prev2Label={null}

                        formatShortWeekday={(locale, date) =>
                          date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
                        }
                        minDate={new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())}
                        maxDate={eighteenYearsAgo}
                      />
                    </div>

                  </div>

                </div>

                <div className='mobile-driver-input-outer' style={{ opacity: isEditabel.driverInfo ? 1 : 0.4 }}>

                  <div ref={driverAgeRef} className='mobille-driver-age-contianer'>
                    <p>Driver Age</p>

                    <div className='mobile-driver-age-head' onClick={() => isEditabel.driverInfo ? setShowDriverAgeList(!showDriverAgeList) : null}>
                      <h3>{item.driver_age ?? driverAge}</h3>
                      <IoMdArrowDropdown size={20} color='#000' />
                    </div>

                    <div className={`mobile-driver-age-list-contianer ${showDriverAgeList ? 'show-mobile-driver-age-list' : ''}`}>
                      {driverAgeList.map((item, index) => (
                        <p key={index} className='driver-age-item' onClick={() => handleUpdateDriverAge(index, item)}>{item}</p>
                      ))}
                    </div>

                  </div>

                  <div ref={licenceCountryRef} className='mobile-licence-country'>
                    <p>Licence Issuing Country</p>

                    <div className='mobile-licence-country-head' onClick={() => isEditabel.driverInfo ? setShowCountries(!showCountries) : null}>
                      <h3>{item.license_country}</h3>
                      <IoMdArrowDropdown size={20} color='#000' />
                    </div>

                    <div className={`mobile-licence-country-body ${showCountries ? 'show-licence-country' : ''}`}>
                      {countryList?.map((item, innerIndex) => (
                        <p key={innerIndex} className={`licence-country-item`} onClick={() => handleLicenceCountry(index, item.country)}>{item.country}</p>
                      ))}
                    </div>

                  </div>

                </div>

                <div className='mobile-driver-input-outer' style={{ opacity: isEditabel.driverInfo ? 1 : 0.4 }}>

                  <label>
                    Licence No
                    <input type='text' readOnly={!isEditabel?.driverInfo} name='license_no' value={item.license_no} onChange={(e) => handleDriverChange(index, 'license_no', e.target.value)} />
                  </label>

                  <div ref={expiryDateRef} className='mobile-licence-expiry-date'>
                    <p>Licence Expiry</p>

                    <div className='mobile-licence-expiry-head' onClick={() => isEditabel.driverInfo ? setShowExpiry(!showExpiry) : null}>
                      <h3>{formatISOToDDMMYYYYStrict(item?.license_expiry)}</h3>
                      <IoMdArrowDropdown size={20} color='#000' />
                    </div>

                    <div className={`mobile-expiry-calender-contianer ${showExpiry ? 'show-mobile-licence-contianer' : ''}`}>
                      <Calendar
                        onChange={(date) => handleLicenceExpiry(index, date)}
                        value={expiryYears}
                        view="month"
                        next2Label={null}
                        prev2Label={null}
                        formatShortWeekday={(locale, date) =>
                          date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
                        }
                        minDate={expiryYears}
                      />
                    </div>

                  </div>

                </div>

                <div className='mobile-driver-input-outer' style={{ opacity: isEditabel.driverInfo ? 1 : 0.4 }}>
                  <label style={{ width: '70%' }} >
                    Address
                    <input type='text' readOnly={!isEditabel?.driverInfo} name='address' value={item.address} onChange={(e) => handleDriverChange(index, 'address', e.target.value)} />
                  </label>

                  <label style={{ width: '30%' }} >
                    Zip Code
                    <input type='text' readOnly={!isEditabel?.driverInfo} name='zipcode' value={item.zipcode} onChange={(e) => handleDriverChange(index, 'zipcode', e.target.value)} />
                  </label>
                </div>

                <div className='mobile-driver-input-outer' style={{ opacity: isEditabel.driverInfo ? 1 : 0.4 }}>
                  <label style={{ width: '100%' }} >
                    City
                    <input type='text' readOnly={!isEditabel?.driverInfo} name='city' value={item.city} onChange={(e) => handleDriverChange(index, 'city', e.target.value)} />
                  </label>

                  <label style={{ width: '100%' }}>
                    State
                    <input type='text' readOnly={!isEditabel?.driverInfo} name='state' value={item.state} onChange={(e) => handleDriverChange(index, 'state', e.target.value)} />
                  </label>

                  <label style={{ width: '100%' }}>
                    Country
                    <input type='text' readOnly={!isEditabel?.driverInfo} name='country' value={item.country} onChange={(e) => handleDriverChange(index, 'country', e.target.value)} />
                  </label>
                </div>


                <div className='mobile-driver-input-outer' style={{ opacity: isEditabel.driverInfo ? 1 : 0.4 }}>

                  <label>
                    Remarks
                    <textarea name='remarks' readOnly={!isEditabel?.driverInfo} value={item.remarks} onChange={(e) => handleDriverChange(index, 'remarks', e.target.value)} />
                  </label>

                  <div className='licence-upload-contianer'>
                    {item?.front_license_image === '' || item?.back_license_image === '' ? (
                      // <div className='licence-upload-message'>
                      item?.front_license_image === '' ? (
                        <div className='licence-upload-message' onClick={(e) => isEditabel?.driverInfo ? handleDivClick('front', index) : null} >
                          <p>Upload Licence Front</p>
                        </div>
                      ) : (
                        <div className='licence-upload-message' onClick={(e) => isEditabel.driverInfo ? handleDivClick('back', index) : null}>
                          <p>Upload Licence Back</p>
                        </div>
                      )

                      // </div>
                    ) : (
                      <div className='licence-update-show-front-contianer'>
                        <button className='licence-remove-icon' >
                          <CgCloseO size={20} color='#000' style={{ cursor: 'pointer' }} onClick={() => isEditabel.driverInfo ? handleClearLicenceImages(index) : null} />
                        </button>
                        <img
                          src={
                            item.front_license_image instanceof File
                              ? URL.createObjectURL(item.front_license_image) // 🧠 for new upload
                              : url + item.front_license_image // 🌐 for existing image
                          }
                          alt="Front License"
                        />
                        {/* <img src={url + updatedDriver?.front_license_image} /> */}
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      style={{ display: "none" }}
                      onChange={(event) => handleLicenceUpload(event, index)}
                    />

                  </div>

                </div>

              </div>

            </div>
          ))
        ) : (
          <div className='expty-drivers-add-new-contianer'>
            <button onClick={handleAddNewDriverObject}>
              <FiPlus size={20} color='#FFF' />
              Add New Driver
            </button>
          </div>
        )}

      </div>

      <div className='mobile-update-driver-contianer'>
        <button className={`mobile-update-driver-button`} style={{ opacity: isEditabel.driverInfo ? 1 : 0.4, cursor: isEditabel.driverInfo ? 'pointer' : 'not-allowed' }} disabled={!isEditabel.driverInfo} onClick={handleUpdateDriversInfo}>Update</button>
      </div>

    </div>
  )
}

export default BottomDrivers