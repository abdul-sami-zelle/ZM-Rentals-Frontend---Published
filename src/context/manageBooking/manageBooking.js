'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { GiGearStickPattern } from "react-icons/gi";
import { FaBluetoothB } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";
import { url } from "../../utils/services";
import axios from "axios";

const ManageBookingContext = createContext();

export const ManageBookingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [vehicleData, setVehicleData] = useState([]);
    const [locations, setLocations] = useState([])
    const [countriesList, setCountriesList] = useState([])

    const [hirerInfo, setHirerInfo] = useState({})

    const [pickupDetails, setPickupDetails] = useState({})
    const [dropupDetails, setDropUpDetails] = useState({})


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

        // if (!bookingDetails) {
        //     setManageBookingSteper(0);
        //     return
        // }

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
                        insurance_id: response.data.data?.insurances[0]?.CarInsurancePricing?.insurance_option_id,
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
                    drivers: response.data.data.drivers,
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

    const perposes = ['Leisure', 'Business', 'Other']

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

    const whereFindUs = [
        'Google',
        'Facebook',
        'Instagram',
        'Tiktok',
        'Friends referral',
        'Other',
    ]

    function formatISODate(isoString) {
        if (!isoString) return { date: "", time: "" };

        // Parse ISO manually to avoid timezone conversion
        const [datePart, timePart] = isoString.split("T");
        const [year, month, day] = datePart.split("-");
        const [hourStr, minuteStr] = timePart.slice(0, 5).split(":");

        let hours = Number(hourStr);
        const minutes = minuteStr;
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        return { date: formattedDate, time: formattedTime };
    }

    const generateTimeList = () => {
        const times = [];
        for (let hour = 6; hour <= 21; hour++) {
            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
            const suffix = hour < 12 ? "AM" : "PM";
            const formattedTime = `${displayHour.toString().padStart(2, "0")}:00 ${suffix}`;
            times.push({ name: formattedTime });
        }
        return times;
    };

    return (
        <ManageBookingContext.Provider value={{
            loading, setLoading,
            vehicleData, setVehicleData,
            locations, setLocations,
            countriesList, setCountriesList,
            hirerInfo, setHirerInfo,
            editBookingPayload, setEditBookingPayload,
            handleGetVehicleData,
            getApi,
            handleGetAllCountries,
            carFeatures,
            perposes,
            formatDate,
            formatISODate,
            generateTimeList,
        }}>
            {children}
        </ManageBookingContext.Provider>
    )
}

export const useManageBooking = () => useContext(ManageBookingContext)