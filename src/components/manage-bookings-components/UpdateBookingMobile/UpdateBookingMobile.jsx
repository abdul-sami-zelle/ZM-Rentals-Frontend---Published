import React, { useEffect, useState } from 'react'
import './UpdateBookingMobile.css'
import axios from 'axios'
import { url } from '../../../utils/services';
import { CgCloseO } from "react-icons/cg";

import BottomCarAvailability from '../BottomCarAvailability/BottomCarAvailability'
import BottomHirerInfo from '../BottomHirerInfo/BottomHirerInfo';
import BottomInsurance from '../BottomInsurance/BottomInsurance';
import BottomExtras from '../BottomExtras/BottomExtras';
import BottomDrivers from '../BottomDrivers/BottomDrivers';
import BottomSignature from '../BottomSignature/BottomSignature';
import { GiGearStickPattern } from 'react-icons/gi'
import { FaBluetoothB } from 'react-icons/fa'
import { TbAirConditioning } from 'react-icons/tb'
import { HiUserGroup } from 'react-icons/hi2'
import ConfirmBookingModal from '../../../modals/ConfirmBookingModal/ConfirmBookingModal';
import SummaryModal from '../../../modals/SummaryModal/SummaryModal';
import Spinner from '../../../loaders/Spinner/Spinner';

const UpdateBookingMobile = () => {

    const [loading, setLoading] = useState(false)
    const [vehicleData, setVehicleData] = useState([]);
    const [locations, setLocations] = useState([])
    const [countriesList, setCountriesList] = useState([])
    const [userSignature, setSignature] = useState();

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

    const handleGetVehicleData = async () => {
        const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'))
        const api = `${url}/booking/manage/get/${bookingDetails?.booking_id}`;


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
                getApi();
                handleGetAllCountries();
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
    }, []);

    const carFeatures = [
        { id: 1, icon: GiGearStickPattern, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.transmission}` },
        { id: 2, icon: FaBluetoothB, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.is_bluetooth_capable === true ? 'Yes' : 'No'}` },
        { id: 3, icon: TbAirConditioning, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.air_conditioned === true ? 'Yes' : 'No'}` },
        { id: 4, icon: HiUserGroup, value: `${vehicleData?.Car?.CarDetailAssociations[0]?.passenger_capacity}` },
    ]

    // old states
    const [carData, setCarData] = useState({})

    const stepersData = [
        { id: 1, name: 'Pick & Drop', icon: '/assets/icons/pick-drop.png' },
        { id: 2, name: 'Hirer Info', icon: '/assets/icons/hirer.png' },
        { id: 3, name: 'Insurance', icon: '/assets/icons/insurance.png' },
        { id: 4, name: 'Extras', icon: '/assets/icons/extras.png' },
        { id: 5, name: 'Drivers', icon: '/assets/icons/driver.png' },
        { id: 6, name: 'Signature', icon: '/assets/icons/signature.png' },
    ]

    const handleGetCarWithId = async () => {
        const api = `${url}/cars/get/${editBookingPayload?.booking?.car_id}`;
        // const api = `${url}/cars/get/68`;
        try {
            const response = await axios.get(api);
            if (response.status === 200) {
                setCarData(response.data)
            }
        } catch (error) {
            console.error("UnExpected Server Error", error);
        }
    }

    useEffect(() => { handleGetCarWithId() }, [vehicleData?.car_id])

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

    const [bottomModal, setBottomModal] = useState(false);
    const [bottomStepper, setBottomStepper] = useState(1);
    const [isEditabel, setIsEditable] = useState({
        bookingInfo: false,
        hirerInfo: false,
        insuranceInfo: false,
        extrasInfo: false,
        driverInfo: false,
        signatureInfo: false,
    })

    const allowEditSecion = (type) => {
        if (type === 'booking-form') {
            setIsEditable((prev) => ({
                ...prev,
                bookingInfo: !prev.bookingInfo
            }))
        }
        if (type === 'hirer-info') {
            setIsEditable((prev) => ({
                ...prev,
                hirerInfo: !prev.hirerInfo
            }))
        }
        if (type === 'insurance-info') {
            setIsEditable((prev) => ({
                ...prev,
                insuranceInfo: !prev.insuranceInfo
            }))
        }
        if (type === 'extras-info') {
            setIsEditable((prev) => ({
                ...prev,
                extrasInfo: !prev.extrasInfo
            }))
        }
        if (type === 'driver-info') {
            setIsEditable((prev) => ({
                ...prev,
                driverInfo: !prev.driverInfo
            }))
        }
        if (type === 'signature-info') {
            setIsEditable((prev) => ({
                ...prev,
                signatureInfo: !prev.signatureInfo
            }))
        }
    }

    const bottomModalManage = (item) => {
        setBottomStepper(item.id);
        setBottomModal(true)
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

    const [showConfirnamtionModal, setShowConfirmationModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({
        head: '',
        para: '',
        link: ''
    })
    const handleShowConfirmationModal = () => {
        setShowConfirmationModal(true);
        setModalMessage({
            head: 'Are You Sure',
            para: 'Do you want to update your booking information',
            link: '/'
        })
    }

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false)
        setModalMessage({
            head: '',
            para: '',
            link: ''
        })
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

            if(response.status === 200) {
                handleGetVehicleData()
                setShowConfirmationModal(false)
                // window.location.href = '/manage-booking'
            }

        } catch (error) {
            console.error("UnExpected Servr Error", error);

            setLoading(false)
        } finally {
            setLoading(false);
        }
    }

    const [showSummary, setShowSummary] = useState(false);
    const handleShowSummary = () => {
        setShowSummary(true)
    }

    const handleClose = () => {
        setShowSummary(false)
    }

    return (
        <div className='edit-booking-mobile-main'>
            {loading && <Spinner />}
            <div className='edit-booking-mobile-inner'>
                <div className='mobile-manage-booking-head-contianer'>
                    {!loading && (
                        <div className='mobile-view-vehicle-details'>
                            <div className='mobile-view-vehicle-image-contianer'>
                                <img src={url + carData?.image} />
                            </div>
                            <span className='mobile-view-vehicle-name-and-price'>
                                <h3>{carData?.name}</h3>
                                <p>NZD {carData?.base_rate}/day</p>
                            </span>

                        </div>

                    )}

                    {!loading && (
                        <div className='mobile-manage-booking-main-continainer'>
                            {stepersData?.map((item) => (
                                <div className='mobile-manage-booking-steps' onClick={() => bottomModalManage(item)}>
                                    <img src={item.icon} />
                                    <h3>{item.name}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            
            <div className={`mobile-view-edit-data-bottom-popup ${bottomModal ? 'show-bottom-popup' : ''}`} onClick={() => setBottomModal(false)}>
                <div className={`bottom-popup-inner-contianer ${bottomModal ? 'drag-inner-modal' : ''}`} onClick={(e) => e.stopPropagation()}>

                    <div className='bottom-popup-head'>
                        {bottomStepper === 1 ? (
                            <span className='modal-type-and-edit-button'>
                                <h3>Pick & Drop Details</h3>
                                <button className={`edit-info-button ${isEditabel.bookingInfo ? 'edit-booking' : ''}`} onClick={() => allowEditSecion('booking-form')}>Edit</button>
                            </span>
                        ) : bottomStepper === 2 ? (
                            <span className='modal-type-and-edit-button'>
                                <h3>Hirer Information</h3>
                                <button className={`edit-info-button ${isEditabel.hirerInfo ? 'edit-hirer' : ''}`} onClick={() => allowEditSecion('hirer-info')}>Edit</button>
                            </span>
                        ) : bottomStepper === 3 ? (
                            <span className='modal-type-and-edit-button'>
                                <h3>Insurance </h3>
                                <button className={`edit-info-button ${isEditabel.insuranceInfo ? 'edit-insurance' : ''}`} onClick={() => allowEditSecion('insurance-info')}>Edit</button>
                            </span>
                        ) : bottomStepper === 4 ? (
                            <span className='modal-type-and-edit-button'>
                                <h3>Extras</h3>
                                <button className={`edit-info-button ${isEditabel.extrasInfo ? 'edit-extras' : ''}`} onClick={() => allowEditSecion('extras-info')}>Edit</button>
                            </span>
                        ) : bottomStepper === 5 ? (
                            <span className='modal-type-and-edit-button'>
                                <h3>Driver Information</h3>
                                <button className={`edit-info-button ${isEditabel.driverInfo ? 'edit-drivers' : ''}`} onClick={() => allowEditSecion('driver-info')}>Edit</button>
                            </span>
                        ) : (
                            <span className='modal-type-and-edit-button'>
                                <h3>Signature</h3>
                                <button className={`edit-info-button ${isEditabel.signatureInfo ? 'edit-signature' : ''}`} onClick={() => allowEditSecion('signature-info')}>Edit</button>
                            </span>
                        )}
                        <CgCloseO size={20} color='#000' onClick={() => setBottomModal(false)} />
                    </div>

                    <div className='bottom-pop-up-content-contianer'>
                        {bottomStepper === 1 ? (
                            <BottomCarAvailability
                                isEditabel={isEditabel}
                                setIsEditable={setIsEditable}
                                editBookingPayload={editBookingPayload}
                                setEditBookingPayload={setEditBookingPayload}
                                locations={locations}
                                setLocations={setLocations}
                                carFeatures={carFeatures}
                                setBottomModal={setBottomModal}
                            />
                        ) : bottomStepper === 2 ? (
                            <BottomHirerInfo
                                isEditabel={isEditabel}
                                editBookingPayload={editBookingPayload}
                                setEditBookingPayload={setEditBookingPayload}
                                locations={locations}
                                setLocations={setLocations}
                                countriesList={countriesList}
                                setCountriesList={setCountriesList}
                                setBottomModal={setBottomModal}
                            />
                        ) : bottomStepper === 3 ? (
                            <BottomInsurance
                                isEditabel={isEditabel}
                                editBookingPayload={editBookingPayload}
                                setEditBookingPayload={setEditBookingPayload}
                                carId={vehicleData?.car_id}
                                setBottomModal={setBottomModal}
                            />
                        ) : bottomStepper === 4 ? (
                            <BottomExtras
                                isEditabel={isEditabel}
                                editBookingPayload={editBookingPayload}
                                setEditBookingPayload={setEditBookingPayload}
                                carId={vehicleData?.car_id}
                                setBottomModal={setBottomModal}
                                bottomModal={bottomModal}
                            />
                        ) : bottomStepper === 5 ? (
                            <BottomDrivers
                                isEditabel={isEditabel}
                                editBookingPayload={editBookingPayload}
                                setEditBookingPayload={setEditBookingPayload}
                                setBottomModal={setBottomModal}
                            />
                        ) : (
                            <BottomSignature
                                isEditabel={isEditabel}
                                editBookingPayload={editBookingPayload}
                                setEditBookingPayload={setEditBookingPayload}
                                setCustomerSignature={setSignature}
                                bottomModal={bottomModal}
                                setBottomModal={setBottomModal}
                            />
                        )}
                    </div>
                </div>
            </div>

            <ConfirmBookingModal
                showModal={showConfirnamtionModal}
                handleCloseModal={handleCloseConfirmationModal}
                modalMessages={modalMessage}
                handleConfirm={handleUpdateBooking}
            />

            <SummaryModal
                showModal={showSummary}
                handleClose={handleClose}
                vehicleData={vehicleData}
                editBookingPayload={editBookingPayload}

            />

            {!loading && (
                <div className='mobile-view-bottom-sticky-summary'>
                    

                    <span>
                        <p style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>Grand Total</p>
                        <div className='view-summary-and-grand-total'>
                            <p onClick={handleShowSummary}>View Summary</p>
                            <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>NZD {handleGrandTotal()}</h3>
                        </div>
                    </span>

                    <button className='mobile-update-booking-button' onClick={handleShowConfirmationModal}>Update Booking</button>

                </div>
            )}
        </div>
    )
}

export default UpdateBookingMobile