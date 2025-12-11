'use client'

import { createContext, useContext, useEffect, useState } from "react";;

const SearchVehicleContext = createContext();

export const SearchVehicleProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);

    const [selectedPickupDate, setSelectedPickupDate] = useState(null);
    const [selectedDropDate, setSelectedDropDate] = useState(null);

    const [pickupCity, setPickupCity] = useState('')
    const [pickupTime, setPickupTime] = useState('')
    const [dropupCity, setDropupCity] = useState('')
    const [dropupTime, setDropupTime] = useState('')
    const [driverAge, setDriverAge] = useState('24')
    const [showBookingButton, setShowBookingButton] = useState(false);
    const [isVehicleSearched, setIsVehicleSearched] = useState(false)
    const [searchedVehicles, setSearchedVehicles] = useState([])

    

    const [searchVehiclePayload, setSearchVehiclePayload] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = sessionStorage.getItem("vehicle-payload");
            if (stored) {
                return JSON.parse(stored);
            }
        }
        // default payload if nothing in session
        return {
            pickup_location: null,
            drop_location: null,
            pickup_time: "",
            drop_time: "",
            driver_age: "24",
        };
    });

    // 🔹 Save to session whenever payload changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("pick_and_drop_details", JSON.stringify(searchVehiclePayload));
        }
    }, [searchVehiclePayload]);


    const getCurrentFormattedHourInAuckland = () => {
        const formatter = new Intl.DateTimeFormat('en-NZ', {
            timeZone: 'Pacific/Auckland',
            hour: '2-digit',
            hour12: true,
        });

        // Just to keep the formatter in use if you want future adjustments
        formatter.formatToParts(new Date());

        const hour = "10";
        const dayPeriod = "AM";

        setPickupTime(`${hour}:00 ${dayPeriod}`);
        setDropupTime(`${hour}:00 ${dayPeriod}`);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return


        if (!pickupTime && !dropupTime) {
            getCurrentFormattedHourInAuckland()
        }
    }, [])

    return (
        <SearchVehicleContext.Provider value={{
            getCurrentFormattedHourInAuckland,
            searchVehiclePayload,
            setSearchVehiclePayload,
            searchedVehicles,
            setSearchedVehicles,
            loader,
            setLoader,
            pickupCity,
            setPickupCity,
            pickupTime,
            setPickupTime,
            dropupCity,
            setDropupCity,
            dropupTime,
            setDropupTime,
            selectedPickupDate,
            setSelectedPickupDate,
            selectedDropDate,
            setSelectedDropDate,
            isVehicleSearched,
            setIsVehicleSearched,
            driverAge,
            setDriverAge,
            showBookingButton, 
            setShowBookingButton,
        }}>
            {children}
        </SearchVehicleContext.Provider>
    )
}

export const useSearchVehicle = () => useContext(SearchVehicleContext);