import React, { useEffect, useState } from 'react'
import './CarDetailsModal.css'
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
import { TbAirConditioning } from "react-icons/tb";
import { FaBluetoothB } from "react-icons/fa6";
import { FaCar } from 'react-icons/fa';
import { FaGasPump } from 'react-icons/fa';

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { PiEngine } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdLuggage } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";
import { useSearchVehicle } from '../../context/searchVehicleContext/searchVehicleContext.js';
// import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import { handleScrolllTop } from '../../utils/midlewares'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useBookingContext } from '../../context/bookingContext/bookingContext.js';

import { formatPrice } from '../../utils/fotmateValues.js'
import { url } from '../../utils/services.js';


const CarDetailsModal = ({ showModal, handleClose, vehicleDetails, isVehicleSearched, emailModal, setBookingModal, setCarId, setCheckCarAvailable }) => {

    const { searchVehiclePayload, setSearchVehiclePayload, searchedVehicles } = useSearchVehicle()
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    const { setVehicleSesionData } = useBookingContext()

    const { pickup_location, drop_location, pickup_time, drop_time } = searchVehiclePayload;
    const [showBookingButton, setShowBookingButton] = useState(false);
    useEffect(() => {
        if (pickup_location && drop_location && pickup_time && drop_time) {
            setShowBookingButton(true);
        } else {
            setShowBookingButton(false);
        }
    }, [searchVehiclePayload])

    const isNullOrNA = (val) =>
        val === null ||
        val === undefined ||
        (typeof val === 'string' && val.trim().toLowerCase() === 'n/a');

    const spacificationData = [
        {
            title: vehicleDetails?.details?.air_conditioned === true ? 'Yes' : 'No',
            icon: TbAirConditioning,
            is_null: false
        },
        {
            title: `${vehicleDetails?.details?.car_sample_cc} CC`,
            icon: PiEngine,
            is_null: isNullOrNA(vehicleDetails?.details?.car_sample_cc)
        },
        {
            title: vehicleDetails?.details?.engine,
            icon: PiEngine,
            is_null: isNullOrNA(vehicleDetails?.details?.engine)
        },
        {
            title: vehicleDetails?.details?.fuel_type,
            icon: BsFillFuelPumpFill,
            is_null: isNullOrNA(vehicleDetails?.details?.fuel_type)
        },
        {
            title: vehicleDetails?.details?.is_bluetooth_capable === true ? 'Yes' : 'No',
            icon: FaBluetoothB,
            is_null: false
        },
        {
            title: `${vehicleDetails?.details?.litre_per_100_km}L / 100km`,
            icon: IoSpeedometerOutline,
            is_null: isNullOrNA(vehicleDetails?.details?.litre_per_100_km)
        },
        {
            title: vehicleDetails?.details?.model,
            icon: FaCar,
            is_null: isNullOrNA(vehicleDetails?.details?.model)
        },
        {
            title: `${vehicleDetails?.details?.passenger_capacity} Seats`,
            icon: FaUser,
            is_null: isNullOrNA(vehicleDetails?.details?.passenger_capacity)
        },
        {
            title: `${vehicleDetails?.details?.tank_capacity} Liters`,
            icon: FaGasPump,
            is_null: isNullOrNA(vehicleDetails?.details?.tank_capacity)
        },
        {
            title: `${vehicleDetails?.details?.trunk_capacity} Begs`,
            icon: MdLuggage,
            is_null: isNullOrNA(vehicleDetails?.details?.trunk_capacity)
        },
        {
            title: vehicleDetails?.details?.transmission,
            icon: BsFillGearFill,
            is_null: isNullOrNA(vehicleDetails?.details?.transmission)
        },
    ]


    const router = useRouter()
    const { setBookingVehicleData } = useBookingContext()
    const handleBookNow = async (e) => {
        e.stopPropagation();
        const api = `${url}/cars/get/${vehicleDetails?.car_id}`;

        try {

            const response = await axios.get(api);
            if (response.status === 200) {
                // setShowBookingButton(validateSearchPayload(searchVehiclePayload))
                setBookingVehicleData(response.data);
                setVehicleSesionData(vehicleDetails)
                // sessionStorage.setItem('vehicle-details', JSON.stringify(response.data));
                sessionStorage.setItem('selected-vehicle-details', JSON.stringify(response.data));
                sessionStorage.setItem('vehicle-details', JSON.stringify(vehicleDetails));
                router.push('/book-now');
                handleClose()
            }
        } catch (error) {
            console.error("Validation or Server Error:", error.message);
            return;
        }
    }


    const [bookingDays, setBookingDays] = useState({})

    useEffect(() => {
        const bookingDetails = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
        setBookingDays(bookingDetails)
    }, [])

    function countDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Convert both to UTC midnight (ignore local timezone)
        const utcStart = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
        const utcEnd = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

        // Difference in days
        const diffDays = Math.floor((utcEnd - utcStart) / (1000 * 60 * 60 * 24));

        // Always include the start day
        return diffDays + 1;
    }

    const handleScrollContainer = () => {
        document.getElementById("imagesScrollContainer").scrollLeft += 0
    }

    const calculateBaseRate = (rates = []) => {
    const total_rates = rates.reduce((sum, item) => sum + item.rate, 0)
    const base_rate = rates?.length ? total_rates / rates?.length : 0;
    return base_rate
  }

    useEffect(() => {
        handleScrollContainer()
    }, [showModal])

    const handleShoeBookingModal = () => {
        handleClose();
        setBookingModal(true)
        setCarId(vehicleDetails?.car_id)
        setCheckCarAvailable(true)

    }




    return (
        <div className={`car-detail-modal-main-container ${showModal ? 'show-details-modal' : ''} `} onClick={handleClose}>
            <div className={`car-details-modal-inner-content-container ${showModal ? 'show-inner-modal-on-mobile-view' : ''}`}>
                <div className='car-detail-heading-and-close-section' onClick={() => e.stopPropagation()}>
                    <h3>{vehicleDetails?.name}</h3>
                    <button onClick={(e) => { e.stopPropagation(); handleClose() }}>
                        <IoClose size={30} color='#595959' />
                    </button>
                </div>
                <div id='imagesScrollContainer' className='car-details--image-slide'>
                    {vehicleDetails?.images?.length > 0 && vehicleDetails.images.map((item, index) => (
                        <Image key={index} src={url + item.image_url} width={250} height={250} alt='car' />
                    ))}
                </div>
                <div className='single-car-every-details-container'>
                    <div className='car-spacifications'>
                        {spacificationData.map((item, index) => (
                            <div className={`car-single-spacification ${item.is_null === true ? 'hide-details-item' : ''}`} key={index}>
                                <item.icon size={20} color='var(--primary-color)' />
                                <h3>{item.title}</h3>
                            </div>
                        ))}


                    </div>
                    <div className='car-features'>
                        {vehicleDetails?.features?.length > 0 && vehicleDetails.features.map((item, index) => (
                            <span key={index}>
                                <MdKeyboardDoubleArrowRight size={20} color='var(--primary-color)' />
                                {item.name}
                            </span>
                        ))}

                    </div>
                </div>
                {!isVehicleSearched ? (
                    <div className='car-detail-modal-enquiry-section'>
                        <span onClick={(() => emailModal('email-qoute'))}>
                            <FaRegEnvelope size={20} color='var(--primary-color)' />
                            Email Enquiry
                        </span>

                        <span onClick={handleShoeBookingModal}>
                            {showBookingButton ? 'Book Now' : 'Enter your itinerary to show price'}
                            <BsArrowRight size={20} color='var(--primary-color)' />
                        </span>
                    </div>
                ) : (
                    <div className='car-detail-modal-footer-after-vehicle-searched'>
                        <div className='car-detail-modal-footer-after-vehicle-searched-details'>
                            <span onClick={() => emailModal('email-qoute')}>
                                <FaRegEnvelope size={20} color='var(--primary-color)' />
                                Email Enquiry
                            </span>

                            {vehicleDetails.available !== 0 && (
                                <div className='car-detail-modal-footer-after-vehicle-searched-total-and-per-day'>
                                    <span>
                                        {/* <h3>NZ$ {vehicleDetails?.base_rate}</h3><p>/day</p> */}
                                        <h3>NZ$ {calculateBaseRate(vehicleDetails?.daily_rates)}</h3><p>/day</p>
                                    </span>

                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'max-content', gap: '5px' }}>
                                        {/* <h3>${vehicleDetails?.base_rate * countDays(bookingDays.pickup_time, bookingDays.drop_time)}</h3> */}
                                        {
                                            vehicleDetails.duration_discount === 0 ? (
                                                <h3>NZ$ {formatPrice(vehicleDetails.sub_total)}</h3>
                                            ) : (
                                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'max-content', gap: '10px',}}>
                                                    <del >NZ$ {formatPrice(vehicleDetails.was_price)}</del>
                                                    <h3>NZ$ {formatPrice(vehicleDetails.sub_total)}</h3>
                                                </span>
                                            )
                                        }
                                        <p>Total</p>
                                    </span>
                                </div>
                            )}


                            {/* {vehicleDetails?.available !== 0 && (
                                <span onClick={() => emailModal('qoute')}>
                                    <CgFileDocument size={20} />
                                    Save Qoute
                                </span>
                            )} */}

                        </div>

                        <div className='mob-view-car-details-modal-price-and-qoute'>
                            {
                                vehicleDetails.available !== 0 && (
                                    <div className='mob-view-car-price'>
                                        <span>
                                            <h3>NZ$ {vehicleDetails?.base_rate}</h3>
                                            <p>/day</p>
                                        </span>

                                        {
                                            vehicleDetails.duration_discount === 0 ? (
                                                <span>
                                                    <h3 style={{marginRight: '5px'}}>NZ$ {formatPrice(vehicleDetails.sub_total)}</h3>
                                                    <p>Total</p>
                                                </span>
                                            ) : (
                                                <span>
                                                    <del style={{marginRight: '5px'}}>NZ$ {formatPrice(vehicleDetails.was_price)}</del>
                                                    <h3 style={{marginRight: '5px'}}>NZ$ {formatPrice(vehicleDetails.sub_total)}</h3>
                                                    <p>Total</p>
                                                </span>
                                            )
                                        }
                                    </div>
                                )
                            }

                            <div className='mob-view-email-and-qoute'>

                                <span onClick={() => emailModal('email-qoute')}>
                                    <FaRegEnvelope size={20} color='var(--primary-color)' />
                                    Email Enquiry
                                </span>

                                {/* {vehicleDetails.available !== 0 && (
                                    <span onClick={() => emailModal('qoute')}>
                                        <CgFileDocument size={20} />
                                        Save Qoute
                                    </span>
                                )} */}

                            </div>
                        </div>
                        {vehicleDetails.available !== 0 ? (
                            <button className='car-details-modal-book-now-button' onClick={handleBookNow}>Book Now</button>
                        ) : (
                            <button className='car-details-modal-book-sold'>Sold</button>
                        )}

                    </div>
                )}

            </div>
        </div>
    )
}

export default CarDetailsModal