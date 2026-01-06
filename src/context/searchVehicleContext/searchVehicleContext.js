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
    const [driverAge, setDriverAge] = useState('26+')
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
            driver_age: "26+",
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
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        const parts = formatter.formatToParts(new Date());

        let hour = parseInt(parts.find(p => p.type === 'hour')?.value, 10);
        let minute = parseInt(parts.find(p => p.type === 'minute')?.value, 10);
        let dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value.toUpperCase();

        if (isNaN(hour) || isNaN(minute) || !dayPeriod) return;

        // Convert to 24-hour
        if (dayPeriod === 'PM' && hour !== 12) hour += 12;
        if (dayPeriod === 'AM' && hour === 12) hour = 0;

        // ⏱ Decide pickup time
        if (hour < 10) {
            // Before 10 AM → default 10:00 AM
            hour = 10;
            minute = 0;
        } else {
            // After 10 AM → round up to next 30-min slot
            if (minute > 0 && minute <= 30) {
                minute = 30;
            } else if (minute > 30) {
                minute = 0;
                hour += 1;
            }

            // Wrap around midnight
            if (hour === 24) hour = 0;
        }

        // Convert back to 12-hour format
        dayPeriod = hour >= 12 ? 'PM' : 'AM';
        let displayHour = hour % 12;
        if (displayHour === 0) displayHour = 12;

        const displayMinute = minute.toString().padStart(2, '0');

        const pickupTimeValue = `${displayHour}:${displayMinute} ${dayPeriod}`;

        setPickupTime(pickupTimeValue);

        // Drop time fixed at 10 AM (future date)
        setDropupTime('10:00 AM');
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