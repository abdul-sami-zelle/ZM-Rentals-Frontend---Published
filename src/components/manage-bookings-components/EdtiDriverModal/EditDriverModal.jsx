import React, { useEffect, useRef, useState } from 'react'
import './EditDriverModal.css'
import { CgCloseO } from 'react-icons/cg';
import { IoIosArrowDown } from "react-icons/io";
import Calendar from 'react-calendar';
import { url } from '@/utils/services';
import { useOutsideClick } from '@/utils/DetectClickOutside';
import useDropdownNavigationWithSearch from '@/utils/keyPress';
import useCalendarNavigation from '@/utils/calanderKeyPress';
import { CiCalendarDate, CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";

const EditDriverModal = (
    { 
        isEdit, 
        setIsEdit, 
        isViewOnly, 
        setIsViewOnly, 
        payload, 
        setPayload, 
        data, 
        setData, 
    }) => {


    const dobRef = useRef();
    const driverAgeRef = useRef();
    const licenceCountryRef = useRef();
    const expiryCalenderRef = useRef();

    // const [isViewOnly, setIsViewOnly] = useState(true)




    const [showDobCalender, setShowDobCalender] = useState(false);
    const [countryList, setCountryList] = useState([]);

    const [updatedDriver, setUpdatedDriver] = useState({
        driver_name: '',
        driver_dob: '',
        driver_age: '',
        license_country: '',
        license_no: '',
        license_expiry: '',
        address: '',
        zipcode: '',
        city: '',
        state: '',
        country: '',
        remarks: '',
        back_license_image: '',
        front_license_image: '',
    })

    useEffect(() => {
        setUpdatedDriver({
            driver_name: data?.driver_name || '',
            driver_dob: data?.driver_dob || '',
            driver_age: data?.driver_age || '',
            license_country: data?.license_country || '',
            license_no: data?.license_no || '',
            license_expiry: data?.license_expiry || '',
            address: data?.address || '',
            zipcode: data?.zipcode || '',
            city: data?.city || '',
            state: data?.state || '',
            country: data?.country || '',
            remarks: data?.remarks || '',
            back_license_image: data?.back_license_image || '',
            front_license_image: data?.front_license_image || '',
        })
    }, [data])

    const handleShowDobCalender = () => {
        setShowDobCalender(!showDobCalender)
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

    const handleSelectDriverAge = (age) => {
        setUpdatedDriver((prev) => ({
            ...prev,
            driver_age: age
        }))
        setShowDriverAgeList(false)
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


                setCountryList(formatted);
            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        };

        handleGetAllCountries();
    }, []);

    const [showCountries, setShowCountries] = useState(false);

    const [showExpiry, setShowExpiry] = useState(false);



    const handleSetDriverDetails = (event) => {
        const { name, value } = event.target;

        setUpdatedDriver((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Convert Time
    function formatISOToDDMMYYYYStrict(isoString) {
        if (!isoString) return "";

        // Extract only the date part before the "T"
        const [datePart] = isoString.split("T");
        const [year, month, day] = datePart.split("-");

        return `${day}-${month}-${year}`;
    }


    // No time zone iso selected date
    function toISOStringWithoutTimezone(date) {
        if (!date) return "";

        // Get date parts manually to avoid timezone conversion
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        // Build ISO manually (no timezone applied)
        return `${year}-${month}-${day}T00:00:00.000Z`;
    }

    const handleDobChange = (date) => {
        // Convert the selected date to an ISO string with NO timezone shift
        const isoString = toISOStringWithoutTimezone(date);


        setUpdatedDriver((prev) => ({
            ...prev,
            driver_dob: isoString
        }))
        setShowDobCalender(false)
    };

    const handleLicenceExpiryDate = (date) => {
        // Convert the selected date to an ISO string with NO timezone shift
        const isoString = toISOStringWithoutTimezone(date);


        setUpdatedDriver((prev) => ({
            ...prev,
            license_expiry: isoString
        }))
        setShowExpiry(false)
    };

    const handleUpdateLicenceCountry = (item) => {
        setUpdatedDriver((prev) => ({
            ...prev,
            license_country: item.country
        }))
        setShowCountries(false)
    }

    const fileInputRef = useRef()
    const [licenceSide, setLicenceSide] = useState('front')
    // ✅ Trigger file input when div clicked
    const handleDivClick = (type) => {
        setLicenceSide(type)
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleLicenceUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return

        if (licenceSide === 'front') {
            setUpdatedDriver((prev) => ({
                ...prev,
                front_license_image: file
            }))
        } else if (licenceSide === 'back') {
            setUpdatedDriver((prev) => ({
                ...prev,
                back_license_image: file
            }))
        }
    }

    const handleRemoveLicence = () => {
        setUpdatedDriver((prev) => ({
            ...prev,
            back_license_image: '',
            front_license_image: ''
        }))
    }

    const handleUpdateDriverDetails = () => {

        setPayload((prev) => {
            const existingDrivr = prev?.driverDetails?.some((item) => item.id === data?.id);
            let updatedDrivers;
            if (existingDrivr) {
                updatedDrivers = prev.driverDetails.map((item) => item.id === data?.id ? { ...item, ...updatedDriver, id: data?.id } : item)
            } else {
                updatedDrivers = [...prev.driverDetails, { ...updatedDriver }];
            }
            return {
                ...prev,
                driverDetails: updatedDrivers
            }
        })

        setIsEdit(false)
    }

    const handleCloseDriverModal = () => {
        setIsEdit(false);
        setIsViewOnly(false)
    }


    // Dropdown key controls
    useOutsideClick(dobRef, () => setShowDobCalender(false));
    useOutsideClick(driverAgeRef, () => setShowDriverAgeList(false));
    useOutsideClick(licenceCountryRef, () => setShowCountries(false));
    useOutsideClick(expiryCalenderRef, () => setShowExpiry(false));


    const driverAgeIndex = useDropdownNavigationWithSearch(driverAgeRef, showDriverAgeList, 'driver-age-list-item')
    const licenceCountryIndex = useDropdownNavigationWithSearch(licenceCountryRef, showCountries, 'licence-country-list-item')


    useCalendarNavigation(dobRef, eighteenYearsAgo, (el) => {
        if (eighteenYearsAgo) handleDobChange(eighteenYearsAgo);
    });
    useCalendarNavigation(expiryCalenderRef, expiryYears, (el) => {
        if (expiryYears) handleLicenceExpiryDate(expiryYears);
    });





    return (
        <div className={`edit-driver-modal-main ${isEdit ? 'show-is-edit-driver' : ''}`} onClick={handleCloseDriverModal}>
            <div className={`edit-driver-modal-inner ${isEdit ? 'show-edit-driver-inner' : ''}`} onClick={(e) => e.stopPropagation()}>

                <div className='edit-driver-modal-head'>
                    <h3>Driver Information</h3>
                    <div className='edit-and-close-modal-contianer'>
                        <CiEdit color='#000' size={20} style={{ cursor: 'pointer' }} onClick={() => setIsViewOnly(!isViewOnly)} />
                        <CgCloseO color='#000' size={20} style={{ cursor: 'pointer' }} onClick={handleCloseDriverModal} />
                    </div>
                </div>

                <div className='edit-driver-inputs'>

                    <div className='driver-two-equal-columns'>
                        <label style={{ opacity: isViewOnly ? 0.6 : 1 }}>
                            Driver Name
                            <input type='text' readOnly={isViewOnly} name='driver_name' value={updatedDriver.driver_name} onChange={handleSetDriverDetails} />
                        </label>

                        <div ref={dobRef} className='driver-bod-contianer' style={{ opacity: isViewOnly ? 0.6 : 1 }}>
                            <p>Date of Birth</p>
                            <div className='edit-driver-dob-head' onClick={() => isViewOnly ? null : handleShowDobCalender()}>
                                <h3>{formatISOToDDMMYYYYStrict(updatedDriver?.driver_dob)}</h3>
                                <CiCalendarDate color='#000' size={15} />
                            </div>
                            <div className={`edit-driver-dob-calender ${showDobCalender ? 'show-driver-dob-calender' : ''}`}>
                                <Calendar
                                    onChange={handleDobChange}
                                    value={eighteenYearsAgo}
                                    view="month"
                                    next2Label={null}
                                    prev2Label={null}
                                    // defaultView="month" // ✅ Start at month view but allow switching
                                    // minDetail="decade" // ✅ Allow navigation up to decades
                                    // maxDetail="month" // ✅ Allow down to days

                                    formatShortWeekday={(locale, date) =>
                                        date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2)
                                    }
                                    // formatMonthYear={(locale, date) =>
                                    //     date.toLocaleDateString(locale, { month: 'long' }) // 👈 Only month
                                    // }
                                    minDate={new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())}
                                    maxDate={eighteenYearsAgo}
                                />
                            </div>

                        </div>

                    </div>

                    <div className='driver-two-equal-columns'>

                        <div ref={driverAgeRef} className='edit-driver-age-dropdown' style={{ opacity: isViewOnly ? 0.6 : 1 }}>
                            <p>Driver Age</p>
                            <div className='driver-age-head' onClick={() => isViewOnly ? null : setShowDriverAgeList(!showDriverAgeList)}>
                                <h3>{updatedDriver?.driver_age}</h3>
                                <IoIosArrowDown size={15} color='#000' />
                            </div>
                            <div className={`driver-age-list ${showDriverAgeList ? 'show-age-list' : ''}`}>
                                {driverAgeList.map((item, index) => (
                                    <p key={index} className={`driver-age-list-item ${driverAgeIndex === index ? 'active-driver-age-list-item' : ''}`} onClick={() => handleSelectDriverAge(item)}>{item}</p>
                                ))}
                            </div>
                        </div>

                        <div ref={licenceCountryRef} className='licence-country-dropdown' style={{ opacity: isViewOnly ? 0.6 : 1 }}>
                            <p>Licence Issuing Country</p>
                            <div className='licence-country-head' onClick={() => isViewOnly ? null : setShowCountries(!showCountries)}>
                                <h3>{updatedDriver?.license_country}</h3>
                                <IoIosArrowDown size={15} color='#000' />
                            </div>
                            <div className={`licence-country-list ${showCountries ? 'show-licence-countries' : ''}`}>
                                {countryList.map((item, index) => (
                                    <p key={index} className={`licence-country-list-item ${licenceCountryIndex === index ? 'active-licence-country-item' : ''}`} onClick={() => handleUpdateLicenceCountry(item)}>{item.country}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='driver-two-equal-columns'>
                        <label style={{ opacity: isViewOnly ? 0.6 : 1 }}>
                            Licence No
                            <input type='text' readOnly={isViewOnly} name='license_no' value={updatedDriver.license_no} onChange={handleSetDriverDetails} />
                        </label>

                        <div ref={expiryCalenderRef} className='licence-expiry-dropdown' style={{ opacity: isViewOnly ? 0.6 : 1 }}>
                            <p>Expiry Date</p>
                            <div className='licence-expiry-head' onClick={() => isViewOnly ? null : setShowExpiry(!showExpiry)}>
                                <h3>{formatISOToDDMMYYYYStrict(updatedDriver?.license_expiry)}</h3>
                                <CiCalendarDate size={15} color='#000' />
                            </div>
                            <div className={`licence-expiry-calender ${showExpiry ? 'show-licence-expiry' : ''}`}>
                                <Calendar
                                    onChange={handleLicenceExpiryDate}
                                    value={expiryYears}
                                    view="month"
                                    next2Label={null}
                                    prev2Label={null}
                                    formatShortWeekday={(locale, date) =>
                                        date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 3)
                                    }
                                    // formatMonthYear={(locale, date) =>
                                    //     date.toLocaleDateString(locale, { year: 'long' }) // 👈 Only month
                                    // }
                                    minDate={expiryYears}
                                />
                            </div>
                        </div>

                    </div>

                    <div className='driver-two-equal-columns'>
                        <label style={{ width: '70%', opacity: isViewOnly ? 0.6 : 1 }} >
                            Address
                            <input type='text' readOnly={isViewOnly} name='address' value={updatedDriver.address} onChange={handleSetDriverDetails} />
                        </label>

                        <label style={{ width: '30%', opacity: isViewOnly ? 0.6 : 1 }} >
                            Zip Code
                            <input type='text' readOnly={isViewOnly} name='zipcode' value={updatedDriver.zipcode} onChange={handleSetDriverDetails} />
                        </label>
                    </div>

                    <div className='driver-two-equal-columns'>

                        <label style={{ width: '100%', opacity: isViewOnly ? 0.6 : 1 }} >
                            City
                            <input type='text' readOnly={isViewOnly} name='city' value={updatedDriver.city} onChange={handleSetDriverDetails} />
                        </label>

                        <label style={{ width: '100%', opacity: isViewOnly ? 0.6 : 1 }}>
                            State
                            <input type='text' readOnly={isViewOnly} name='state' value={updatedDriver.state} onChange={handleSetDriverDetails} />
                        </label>

                        <label style={{ width: '100%', opacity: isViewOnly ? 0.6 : 1 }}>
                            Country
                            <input type='text' readOnly={isViewOnly} name='country' value={updatedDriver.country} onChange={handleSetDriverDetails} />
                        </label>

                    </div>

                    <div className='driver-two-equal-columns'>
                        <label style={{ opacity: isViewOnly ? 0.6 : 1 }}>
                            Remarks
                            <textarea name='remarks' readOnly={isViewOnly} value={updatedDriver.remarks} onChange={handleSetDriverDetails} />
                        </label>

                        <div className='licence-upload-contianer' style={{ opacity: isViewOnly ? 0.6 : 1 }}>
                            {updatedDriver?.front_license_image === '' || updatedDriver?.back_license_image === '' ? (
                                // <div className='licence-upload-message'>
                                updatedDriver?.front_license_image === '' ? (
                                    <div className='licence-upload-message' onClick={(e) => isViewOnly ? null : handleDivClick('front')}>
                                        <p>Upload Licence Front</p>
                                    </div>
                                ) : (
                                    <div className='licence-upload-message' onClick={(e) => isViewOnly ? null : handleDivClick('back')}>
                                        <p>Upload Licence Back</p>
                                    </div>
                                )

                                // </div>
                            ) : (
                                <div className='licence-update-show-front-contianer'>
                                    <button className='licence-remove-icon' onClick={() => isViewOnly ? null : handleRemoveLicence()}>
                                        <CgCloseO size={20} color='#000' style={{ cursor: 'pointer' }} />
                                    </button>
                                    <img
                                        src={
                                            updatedDriver.front_license_image instanceof File
                                                ? URL.createObjectURL(updatedDriver.front_license_image) // 🧠 for new upload
                                                : url + updatedDriver.front_license_image // 🌐 for existing image
                                        }
                                        alt="Front License"
                                    />
                                    {/* <img src={url + updatedDriver?.front_license_image} /> */}
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleLicenceUpload}
                            />

                        </div>
                    </div>

                </div>

                <div className='edit-driver-update-button' style={{ opacity: isViewOnly ? 0.6 : 1, cursor: isViewOnly ? 'not-allowed' : 'pointer' }}>
                    <button onClick={isViewOnly ? null : handleUpdateDriverDetails}>Update</button>
                </div>



            </div>
        </div>
    )
}

export default EditDriverModal