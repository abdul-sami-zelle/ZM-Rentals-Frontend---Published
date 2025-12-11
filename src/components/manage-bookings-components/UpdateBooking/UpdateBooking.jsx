import React, { useEffect, useRef, useState } from 'react'
import './UpdateBooking.css'
import axios from 'axios';
import { url } from '@/utils/services';
import { GiGearStickPattern } from "react-icons/gi";
import { FaBluetoothB } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import CarAvailabilityModal from '../CarAvailabilityModal/CarAvailabilityModal'
import { useOutsideClick } from '@/utils/DetectClickOutside';
import useDropdownNavigationWithSearch, { useDropdownNavigation } from '@/utils/keyPress';
import InsuranceUpdateModal from '../InsuranceUpdateModal/InsuranceUpdateModal';
import ExtrasUpdateModal from '../ExtrasUpdateModal/ExtrasUpdateModal'
import { GoPlus } from "react-icons/go";
import EditDriverModal from '../EdtiDriverModal/EditDriverModal'
import MainLoader from '@/loaders/MainLoader/MainLoader';
import { CgCloseO } from "react-icons/cg";
import SignatureModal from '../../../global-components/SignatureModal/SignatureModal'
import CarDateNotAvailable from '../../../modals/CarDateNotAvailable/CarDateNotAvailable'

const UpdateBooking = ({ setManageBookingSteper }) => {

    

    // Gernel States
    
    
    const [loading, setLoading] = useState(false)
    const [vehicleData, setVehicleData] = useState([]);
    const [locations, setLocations] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const [showSignature, setShowSignature] = useState(false)
    const [userSignature, setSignature] = useState();
    const [confirmModal, setConfirmModal] = useState(false)
    const [editBookingPayload, setEditBookingPayload] = useState({
        booking: {
            car_id: null,
            pickup_location: "",
            drop_location: "",
            pickup_time: "",
            drop_time: "",
            extras: [],
            insurance_id: null,
            shuttle_option: 3,
            flight_number: '',
            arrival_city: ''
        },
        user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            local_phone: "",
            country: "New Zealand",
            driver_age: '24',
            how_find_us: "",
            travel_reason: "Leisure"
        },
        driverDetails: [],
        signature: {
            signature_image: ''
        }
    });

    const [confirmData, setConfirmData] = useState({
        head: '',
        para: '',
        link: ''
    })

    // Gernal Functions 
    const handleGetVehicleData = async () => {
        const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'))
        const api = `${url}/booking/manage/get/${bookingDetails?.booking_id}`;

        if (!bookingDetails) {
            setManageBookingSteper(0);
            return
        }

        setLoading(true)
        try {
            const response = await axios.get(api, {
                headers: {
                    Authorization: `Bearer ${bookingDetails?.token}`
                }
            });
            if (response.status === 200) {
                setVehicleData(response.data.data)
                setEditBookingPayload({
                    booking: {
                        car_id: response.data.data.car_id,
                        pickup_location: response.data.data.pickupLocation.id,
                        drop_location: response.data.data.dropLocation.id,
                        pickup_time: response.data.data.pickup_time,
                        drop_time: response.data.data.drop_time,
                        extras: response.data.data.extras,
                        insurance_id: response.data.data?.insurances[0]?.CarInsurancePricing?.id,
                        shuttle_option: response.data.data.shuttle_option || '',
                        flight_number: response.data.data.flight_number || '',
                        arrival_city: response.data.data.arrival_city || ''
                    },
                    user: {
                        firstname: response.data.data.user.firstname,
                        lastname: response.data.data.user.lastname,
                        email: response.data.data.user.email,
                        phone: response.data.data.user.phone,
                        local_phone: response.data.data.user.local_phone ?? '',
                        country: response.data.data.user.country,
                        driver_age: response.data.data.user.driver_age || '24',
                        how_find_us: response.data.data.user.how_find_us,
                        travel_reason: response.data.data.user.travel_reason
                    },
                    driverDetails: response.data.data.drivers,
                    signature: response.data.data.signatures[0] || []
                })

            } else {
                setManageBookingSteper(0);
            }
        } catch (error) {
            console.error("UnExpected Server Error", error);
            setLoading(false);
        } finally {
            setLoading(false)
        }
    }

    const getApi = async () => {
        try {
            const response = await axios.get(`${url}/locations/get`);
            setLocations(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

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

    useEffect(() => {
        handleGetVehicleData()
        getApi();
        handleGetAllCountries();
    }, []);

    // Location View And Update States

    const [pickupDetails, setPickupDetails] = useState({})
    const [dropupDetails, setDropUpDetails] = useState({})
    const [showAvailabilitycheckModal, setShowAvailabilitycheckModal] = useState(false);
    const carFeatures = [
        { id: 1, icon: GiGearStickPattern, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.transmission}` },
        { id: 2, icon: FaBluetoothB, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.is_bluetooth_capable === true ? 'Yes' : 'No'}` },
        { id: 3, icon: TbAirConditioning, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.air_conditioned === true ? 'Yes' : 'No'}` },
        { id: 4, icon: HiUserGroup, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.passenger_capacity}` },
    ]

    // Location View Update Functions

    const handleShowAvailabilityCheckModal = () => {
        setShowAvailabilitycheckModal(!showAvailabilitycheckModal);
    }

    // Hirer Info View And Update States
    const [showLivingCountry, setShowLivingCountry] = useState(false)
    const [howFind, setHowFind] = useState(false);
    const [showVisitPerpose, setShowVisitPerpose] = useState(false)
    const [isHirerEditable, setIsHirerEditable] = useState(false);
    const perposes = ['Leisure', 'Business', 'Other']
    const [hirerInfo, setHirerInfo] = useState({})
    const livingCountryRef = useRef();
    const howFindusRef = useRef();
    const visitPerposeRef = useRef();

    // Hirer Info And Update Functions 
    useOutsideClick(livingCountryRef, () => setShowLivingCountry(false));
    useOutsideClick(howFindusRef, () => setHowFind(false));
    useOutsideClick(visitPerposeRef, () => setShowVisitPerpose(false));

    const livingCountryIndex = useDropdownNavigationWithSearch(livingCountryRef, showLivingCountry, 'living-country-list-item')
    const HowFindIndex = useDropdownNavigationWithSearch(howFindusRef, howFind, 'edit-where-found-item')
    const visitPerposeIndex = useDropdownNavigationWithSearch(visitPerposeRef, showVisitPerpose, 'visit-perpose-item')

    function formatDate(dateString) {
        const date = new Date(dateString);

        // Get day with suffix
        const day = date.getUTCDate();
        const suffix =
            day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                    ? "nd"
                    : day % 10 === 3 && day !== 13
                        ? "rd"
                        : "th";

        // Get month name
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getUTCMonth()];

        // Get time
        const hours = date.getUTCHours().toString().padStart(2, "0");
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        const seconds = date.getUTCSeconds().toString().padStart(2, "0");
        const time = `${hours}:${minutes}:${seconds}`;

        return { day, suffix, month, time };
    }

    const handleHirerAdit = () => {
        setIsHirerEditable(!isHirerEditable)
    }

    const handleHirerDetialsChange = (event) => {
        const { name, value } = event.target;

        let newValue = value;

        if (name === 'phone' || name === 'local_phone') {
            newValue = newValue.replace(/[^\d+]/g, '');

            if (newValue.includes('+')) {
                newValue = '+' + newValue.replace(/\+/g, '');
            }

            if (newValue.length > 1 && newValue[0] === '+') {
                newValue = '+' + newValue.slice(1).replace(/\+/g, '');
            } else {
                newValue = newValue.replace(/\+/g, '');
            }

            newValue = newValue.slice(0, 13);
        }

        setHirerInfo((prev) => ({
            ...prev,
            [name]: newValue
        }))


    }

    useEffect(() => {
        setHirerInfo({
            firstname: editBookingPayload?.user?.firstname,
            lastname: editBookingPayload?.user?.lastname,
            email: editBookingPayload?.user?.email,
            phone: editBookingPayload?.user?.phone,
            local_phone: editBookingPayload?.user?.local_phone,
            country: editBookingPayload?.user?.country,
            driver_age: editBookingPayload?.user?.driver_age || 24,
            how_find_us: editBookingPayload?.user?.how_find_us,
            travel_reason: editBookingPayload?.user?.travel_reason || "Leisure"
        })
    }, [editBookingPayload])

    useEffect(() => {
        const { day, suffix, month, time } = formatDate(editBookingPayload.booking.pickup_time)
        setPickupDetails({
            pickDate: day,
            pickSuffix: suffix,
            pickMonth: month,
            pickTime: time
        })

    }, [editBookingPayload])

    useEffect(() => {
        const { day, suffix, month, time } = formatDate(editBookingPayload.booking.drop_time);
        setDropUpDetails({
            dropDate: day,
            dropSuffix: suffix,
            dropMonth: month,
            dropTime: time
        })
    }, [editBookingPayload])

    const handleLivingRoom = (item) => {

        setHirerInfo((prev) => ({
            ...prev,
            country: item.country
        }))


        setShowLivingCountry(false)
    }

    const whereFindUs = [
        'Google',
        'Facebook',
        'Instagram',
        'Tiktok',
        'Friends referral',
        'Other',
    ]

    const handleHowFindUsItem = (item) => {

        setHirerInfo((prev) => ({
            ...prev,
            how_find_us: item
        }))

        setHowFind(false)
    }

    const handleSetVisitPerpose = (item) => {
        setHirerInfo((prev) => ({
            ...prev,
            travel_reason: item
        }))

        setShowVisitPerpose(false);
    }

    const handleUpdateHirerInfo = () => {
        setEditBookingPayload((prev) => ({
            ...prev,
            user: hirerInfo
        }))
    }

    // Driver Info Veiw And Update States
    const [driverEdit, setDriverEdit] = useState(null)
    const [selectedDriver, setSelectedDriver] = useState({})
    const [showDriverEdit, setShowDriverEdit] = useState(false)
    const [viewDriver, setViewDriver] = useState(false);

    // Driver Info View And Update Functions
    const handleDriverIndex = (index) => {
        setDriverEdit((prev) => prev !== index ? index : null)
    }

    const handleDriverEditModal = (item) => {
        setShowDriverEdit(true)
        setSelectedDriver(item)
    }

    const handleDetails = (item) => {
        setViewDriver(true)
        setSelectedDriver(item)
        setShowDriverEdit(true)
    }

    // Insurance View And Update
    const [insuranceModal, setInsuranceModal] = useState(false);
    const handleUpdateInsurance = () => {
        setInsuranceModal(true)
    }

    // Extras View And Update States
    const [showExtras, setShowExtras] = useState(false);

    // Summary Functions
    const handleExtrasTotal = () => {
        const extrasPrices = [];

        let extrasTotal = 0

        editBookingPayload?.booking?.extras.map((item, index) => {
            extrasPrices.push((parseFloat(item.rate) * vehicleData?.rates?.length) * item.quantity)
        })

        extrasPrices.map((item) => {
            extrasTotal += parseFloat(item)
        })

        return extrasTotal
    }
    const handleGrandTotal = () => {

        const extraArray = []
        let extraValues = 0
        editBookingPayload?.booking?.extras?.map((item, index) => {
            extraArray.push((parseFloat(item.rate) * vehicleData?.rates?.length) * item.quantity)
        })
        extraArray.map((item) => {
            extraValues += parseFloat(item)
        })

        const carRates = vehicleData?.car_rates;
        const discount = vehicleData?.discount_amount;
        const subTotal = parseFloat(carRates) - parseFloat(discount);
        const offHourCharges = vehicleData?.off_hour_charges;
        const insuranceTotal = vehicleData?.insurances ? parseFloat(vehicleData?.insurances[0]?.CarInsurancePricing?.rate) * vehicleData?.rates?.length : 0

        const grandTotal = parseFloat(subTotal) + parseFloat(offHourCharges) + parseFloat(insuranceTotal) + parseFloat(extraValues)

        return grandTotal
    }

    const handleValidateAddDriver = () => {
        const extraDrivers = editBookingPayload?.booking?.extras?.find((item) => item.name === "Extra Driver");
        if (editBookingPayload?.driverDetails?.length < parseInt(extraDrivers?.quantity)) {
            handleDriverEditModal()
        }
    }



    useEffect(() => {
        setEditBookingPayload((prev) => ({
            ...prev,
            signature: {
                ...prev.signature,
                signature_image: userSignature
            }
        }))
    }, [userSignature])

    const handleReUploadSignature = () => {
        setEditBookingPayload((prev) => ({
            ...prev,
            signature: {
                ...prev.signature,
                signature_image: ''
            }
        }))
    }

    const uploadFileAndGetUrl = async (file, apiEndpoint) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            // Call your API (replace /api/upload with your endpoint)
            const response = await fetch(`${url}${apiEndpoint}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("File upload failed");
            }

            const data = await response.json();
            return data.fileUrl;
        } catch (error) {
            console.error("Error uploading file:", error.message);
            return null;
        }
    };


    const handleUpdateBooking = async () => {
        const bookingData = JSON.parse(sessionStorage.getItem('bookingDetails'));
        const api = `${url}/booking/edit/${bookingData?.booking_id}`;
        setLoading(true);
        if (!bookingData) {
            setManageBookingSteper(0);
            return
        }

        const updatedDrivers = await Promise.all(
            editBookingPayload.driverDetails.map(async (drv) => {
                let frontUrl = drv.front_license_image;
                let backUrl = drv.back_license_image;

                // Upload front license image if it's a File object
                if (drv.front_license_image instanceof File) {
                    frontUrl = await uploadFileAndGetUrl(drv.front_license_image, '/uploader/upload/liscences');
                }

                // Upload back license image if it's a File object
                if (drv.back_license_image instanceof File) {
                    backUrl = await uploadFileAndGetUrl(drv.back_license_image, '/uploader/upload/liscences');
                }

                return {
                    ...drv,
                    front_license_image: frontUrl,
                    back_license_image: backUrl,
                };
            })
        );

        // 3️⃣ Update bookingPayload with drivers + signature URL
        setEditBookingPayload((prev) => ({
            ...prev,
            driverDetails: updatedDrivers,
        }));

        // 2️⃣ Upload customer signature (if File exists)
        let signatureUrl = editBookingPayload.signature.signature_image;
        if (userSignature instanceof File) {
            signatureUrl = await uploadFileAndGetUrl(
                userSignature,
                "/uploader/upload/signatures"
            );
        }

        // 3️⃣ Build final payload
        const finalPayload = {
            ...editBookingPayload,
            driverDetails: updatedDrivers,
            signature: {
                signature_image: signatureUrl,
            },
        };


        try {

            const response = await axios.put(api, finalPayload, {
                headers: {
                    Authorization: `Bearer ${bookingData?.token}`
                }
            })

            if (response.status === 200) {
                setConfirmModal(true)
                setConfirmData({
                    head: 'All Set!',
                    para: 'We’ve updated your booking with the latest details.',
                    link: 'Explore More'
                })

            }

        } catch (error) {
            console.error("UnExpected Servr Error", error);
            setConfirmData({
                head: 'Update Failed',
                para: 'Something went wrong while updating your booking. Please try again',
                link: 'Please Try Again'
            })
            setLoading(false)
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        setConfirmModal(false)
    }




    return (
        <div className='booking-edit-main-continair'>
            {loading && <MainLoader />}
            <div className='edit-booking-left-sec'>

                <div className='edit-booking-vehicle-image-and-name'>
                    <img src={url + vehicleData?.Car?.image} />
                    <div className='edit-booking-vehicle-name'>
                        <h3>{vehicleData?.Car?.name}</h3>
                    </div>
                </div>

                <div className='edit-booking-car-features'>
                    {carFeatures?.map((item) => (
                        <span>
                            <item.icon size={20} color='#000' />
                            {item.value}
                        </span>
                    ))}
                </div>

                <div className='edit-booking-pick-and-drop-time'>

                    <div className='pick-drop-details-box'>
                        <div className='pick-drop-detial-head'>
                            <h3>Pick-up Location</h3>
                            <button onClick={handleShowAvailabilityCheckModal}>
                                <CiEdit size={20} color='#961502' />
                            </button>
                        </div>
                        <h3 className='pick-drop-location'>{locations?.find((item) => item.id === editBookingPayload?.booking?.pickup_location)?.name}</h3>
                        <div className='pick-drop-time-and-date'>
                            <span className='pick-drop-date-and-month'>
                                <h3>{pickupDetails?.pickDate}</h3>
                                <p>{pickupDetails?.pickSuffix}</p>
                                <h3>{pickupDetails?.pickMonth}</h3>
                            </span>
                            <div className='pick-drop-time-date-saprator'></div>
                            <h3>{pickupDetails?.pickTime}</h3>
                        </div>
                    </div>

                    <div className='pick-drop-details-box'>
                        <div className='pick-drop-detial-head'>
                            <h3>Drop-off Location</h3>
                            <button onClick={handleShowAvailabilityCheckModal}>
                                <CiEdit size={20} color='#961502' />
                            </button>
                        </div>
                        <h3 className='pick-drop-location'>{locations?.find((item) => item.id === editBookingPayload?.booking?.drop_location)?.name}</h3>
                        <div className='pick-drop-time-and-date'>
                            <span className='pick-drop-date-and-month'>
                                <h3>{dropupDetails?.dropDate}</h3>
                                <p>{dropupDetails?.dropSuffix}</p>
                                <h3>{dropupDetails?.dropMonth}</h3>
                            </span>
                            <div className='pick-drop-time-date-saprator'></div>
                            <h3>{dropupDetails?.dropTime}</h3>
                        </div>
                    </div>

                </div>

            </div>

            <div className='edit-booking-left-right'>

                <div className='edit-hirer-details-main-container'>

                    <div className='hirer-info-head'>
                        <h3>Hirer Information</h3>
                        <div className='hirer-info-edit-update-contianer'>
                            <button onClick={handleUpdateHirerInfo} className={`update-hirer-info-button ${isHirerEditable ? 'show-update-hirer' : ''}`} style={{ cursor: isHirerEditable ? 'pointer' : 'not-allowed', opacity: isHirerEditable ? 1 : 0.4 }}>Update</button>
                            <button className='hirer-info-edit-button' onClick={handleHirerAdit}>
                                <CiEdit size={20} color='#961502' />
                            </button>
                        </div>
                    </div>

                    <div className='hirer-info-inputs'>
                        <div className={`hirer-info-two-columns `}>

                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                First Name
                                <input
                                    type='text'
                                    name='firstname'
                                    value={hirerInfo?.firstname}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>

                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                Last Name
                                <input
                                    type='text'
                                    name='lastname'
                                    value={hirerInfo?.lastname}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                        </div>

                        <div className='hirer-info-two-columns'>
                            {isHirerEditable ? (
                                <div ref={livingCountryRef} className='edit-booking-living-country'>
                                    <p>Which country do you live</p>
                                    <div className='edit-booking-living-country-head' onClick={() => setShowLivingCountry(!showLivingCountry)}>
                                        <h3>{hirerInfo?.country}</h3>
                                        <IoIosArrowDown size={20} color='#000' />
                                    </div>
                                    <div className={`edit-booking-living-country-dropdown ${showLivingCountry ? 'show-living-country-list' : ''}`}>
                                        {countriesList.map((item, index) => (
                                            <p key={index} className={`living-country-list-item ${livingCountryIndex === index ? 'active-country-list-item' : ''} `} onClick={() => handleLivingRoom(item)}>{item.country}</p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className='living-country' style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                    <p>Which country do you live</p>
                                    <h3>{editBookingPayload?.user?.country}</h3>
                                </div>
                            )}

                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                Email
                                <input type='text' readOnly name='email' value={hirerInfo?.email} />
                            </label>
                        </div>

                        <div className='hirer-info-two-columns'>
                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                Phone Number
                                <input
                                    type='text'
                                    name='phone'
                                    value={hirerInfo?.phone}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                            <label style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                Local Phone
                                <input
                                    type='text'
                                    name='local_phone'
                                    value={hirerInfo?.local_phone}
                                    onChange={handleHirerDetialsChange}
                                    readOnly={!isHirerEditable}
                                />
                            </label>
                        </div>

                        <div className='hirer-info-two-columns'>
                            {isHirerEditable ? (
                                <div ref={howFindusRef} className='edit-how-you-find-us'>
                                    <p>How did you find us?</p>
                                    <div className='edit-how-you-find-head' onClick={() => setHowFind(!howFind)}>
                                        <h3>{hirerInfo?.how_find_us}</h3>
                                        <IoIosArrowDown size={20} color='#000' />
                                    </div>
                                    <div className={`edit-how-you-find-list ${howFind ? 'show-how-find-us' : ''}`}>
                                        {whereFindUs.map((item, index) => (
                                            <p key={index} className={`edit-where-found-item ${HowFindIndex === index ? 'active-find-us-item' : ''}`} onClick={() => handleHowFindUsItem(item)} >{item}</p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className='living-country' style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                    <p>How did you find us?</p>
                                    <h3>{hirerInfo?.how_find_us}</h3>
                                </div>
                            )}

                            {isHirerEditable ? (
                                <div ref={visitPerposeRef} className='visit-perpose-dropdown-main'>
                                    <p>Purpose of visit</p>
                                    <div className='visit-perpose-head' onClick={() => setShowVisitPerpose(!showVisitPerpose)}>
                                        <h3>{hirerInfo?.travel_reason}</h3>
                                        <IoIosArrowDown size={20} color='#000' />
                                    </div>
                                    <div className={`visit-perpose-list ${showVisitPerpose ? 'show-visit-perpose' : ''}`}>
                                        {perposes.map((item, index) => (
                                            <p
                                                key={index}
                                                className={`visit-perpose-item ${visitPerposeIndex === index ? 'active-visit-perpose' : ''}`}
                                                onClick={() => handleSetVisitPerpose(item)}
                                            >
                                                {item}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className='living-country' style={{ opacity: isHirerEditable ? 1 : 0.4 }}>
                                    <p>Purpose of visit</p>
                                    <h3>{hirerInfo?.travel_reason}</h3>
                                </div>
                            )}


                        </div>
                    </div>

                </div>

                <div className='edit-driver-info'>

                    <div className='edit-driver-info-head'>
                        <h3>Driver Info</h3>
                        <button
                            onClick={handleValidateAddDriver}
                        // onClick={handleDriverEditModal}
                        >
                            <GoPlus size={25} color='#961502' />
                        </button>
                    </div>

                    <div className='edit-drivers-list-contianer'>
                        {editBookingPayload?.driverDetails && editBookingPayload?.driverDetails?.map((item, index) => (
                            <div className='driver-list-single-item'>
                                <div className='driver-list-single-item-head' onClick={() => handleDriverIndex(index)}>
                                    <h3>{item?.driver_name}</h3>
                                    <span className='driver-view-or-adit-contianer' onClick={() => handleDetails(item)}>
                                        View
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='insurance-main-contianer'>

                    <div className='car-insurance-head'>
                        <h3>Insurance</h3>
                        {vehicleData?.insurances && (
                            <span>
                                <h3>{vehicleData?.insurances[0]?.CarInsurancePricing?.name}</h3> /
                                <p>NZD {vehicleData?.insurances[0]?.CarInsurancePricing?.rate}</p>
                            </span>
                        )}
                        {vehicleData?.insurances && (
                            <span>
                                <h3>Total: </h3>
                                <p>NZD {parseFloat(vehicleData?.insurances[0]?.CarInsurancePricing?.rate) * vehicleData?.rates?.length}</p>
                            </span>
                        )}

                    </div>

                    <div className='insurance-content-sec' onClick={handleUpdateInsurance}>
                        <button>
                            <CiEdit size={20} color='#961502' />
                        </button>
                    </div>

                </div>

                <div className='summary-main-contianer'>
                    <div className='summary-extras-and-signature'>

                        <div className='extras-count-container'>
                            <div className='extras-count-head'>
                                <h3>Extras</h3>
                                <button onClick={() => setShowExtras(!showExtras)} style={{ cursor: 'pointer' }}>
                                    <CiEdit size={20} color='#961502' />
                                </button>
                            </div>
                            <div className='extras-count-option-contianer'>
                                {editBookingPayload?.booking?.extras?.map((item, index) => {

                                    return <span key={index}>
                                        <h3>{item.name}</h3>
                                        <p>NZD {(parseFloat(item?.rate) * vehicleData?.rates?.length) * parseInt(item.quantity)}</p>
                                    </span>
                                })}
                            </div>
                        </div>

                        <div className='summary-signature-option'>
                            {editBookingPayload?.signature?.signature_image !== '' ? (
                                <div className='summary-signature-image-contianer'>
                                    <button className='summary-image-reupload-option' onClick={handleReUploadSignature}>
                                        <CgCloseO size={20} color='#000' />
                                    </button>

                                    <img
                                        // src={url+editBookingPayload?.signature?.signature_image} 
                                        src={
                                            editBookingPayload?.signature?.signature_image instanceof File
                                                ? URL.createObjectURL(editBookingPayload?.signature?.signature_image) // 🧠 for new upload
                                                : url + editBookingPayload?.signature?.signature_image // 🌐 for existing image
                                        }
                                        alt='signature img'
                                    />
                                </div>
                            ) : (
                                <div className='summary-upload-image-container' onClick={() => setShowSignature(true)}>
                                    <p>Add Signature</p>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className='summary-total-section'>
                        <h3>Summary</h3>
                        <div className='summary-values-and-totals'>

                            <span>
                                <p>Car Rate</p>
                                <h3>NZD {parseFloat(vehicleData?.car_rates)}</h3>
                            </span>

                            <span>
                                <p>Discount {parseInt(vehicleData?.discount_percent)}%</p>
                                <h3>NZD {vehicleData?.discount_amount}</h3>
                            </span>

                            <span>
                                <p>Duration</p>
                                <h3>{vehicleData?.rates?.length} {vehicleData?.rates?.length > 1 ? 'days' : 'day'}</h3>
                            </span>

                            <span>
                                <p>Sub Total</p>
                                <h3>NZD {parseFloat(vehicleData?.car_rates) - parseFloat(vehicleData?.discount_amount)}</h3>
                            </span>

                            <span>
                                <p>Off hour charges</p>
                                <h3>NZD {vehicleData?.off_hour_charges}</h3>
                            </span>

                            <span>
                                <p>Transaction Fees</p>
                                <h3>NZD 0</h3>
                            </span>
                            <span>
                                <p>Insurance</p>
                                <h3>NZD {vehicleData?.insurances ? parseFloat(vehicleData?.insurances[0]?.CarInsurancePricing?.rate) * vehicleData?.rates?.length : 0}</h3>
                            </span>


                            <span>
                                <p>Extras</p>
                                <h3>NZD {handleExtrasTotal()}</h3>
                            </span>
                            <span style={{ borderTop: '1px solid #afafaf', paddingTop: '10px' }}>
                                <p style={{ fontSize: '15px', fontWeight: 400, color: '#000' }}>Grand Total</p>
                                <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>NZD {handleGrandTotal()}</h3>
                            </span>
                        </div>
                    </div>
                </div>

                <div className='update-booking-button-container'>
                    <button onClick={handleUpdateBooking}>Update Booking</button>
                </div>

            </div>

            <CarAvailabilityModal
                showModal={showAvailabilitycheckModal}
                setShowModal={setShowAvailabilitycheckModal}
                vehicleData={vehicleData}
                setVehicleData={setVehicleData}
                editBookingPayload={editBookingPayload}
                setEditBookingPayload={setEditBookingPayload}
            />

            <InsuranceUpdateModal
                insuranceModal={insuranceModal}
                setInsuranceModal={setInsuranceModal}
                carId={vehicleData?.car_id}
                payload={editBookingPayload}
                setPayload={setEditBookingPayload}
            />

            <ExtrasUpdateModal
                showExtrasModal={showExtras}
                setShowExtrasModal={setShowExtras}
                payload={editBookingPayload}
                setPayload={setEditBookingPayload}
                carId={vehicleData?.car_id}
            />

            <EditDriverModal
                isEdit={showDriverEdit}
                setIsEdit={setShowDriverEdit}
                isViewOnly={viewDriver}
                setIsViewOnly={setViewDriver}
                payload={editBookingPayload}
                setPayload={setEditBookingPayload}
                data={selectedDriver}
                setData={setSelectedDriver}
            />

            <SignatureModal
                showSignature={showSignature}
                setShowSignature={setShowSignature}
                setCustomerSignature={setSignature}
            />

            {/* <ConfirmationModal
                showUpdadeSuccess={confirmModal}
                setShowUpdateSuccess={setConfirmModal} 
            /> */}
            <CarDateNotAvailable
                showModal={confirmModal}
                handleCloseModal={handleClose}
                modalMessages={confirmData}
            />

        </div>
    )
}

export default UpdateBooking