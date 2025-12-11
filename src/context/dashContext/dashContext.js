'use client'
import { createContext, useContext, useState } from "react";

const UserDashboardContext = createContext()

export const UserDashboardProvider = ({children}) => {
    const [selectedTab, setSelectedTab] = useState(1);
    const dashTabs = [
        {id: 1, name: 'Dashboard'},
        {id: 2, name: 'My Bookings'},
        {id: 3, name: 'Profile'},
        {id: 4, name: 'Address & Phone'},
        {id: 5, name: 'Driver Licence'},
    ]

    return (
        <UserDashboardContext.Provider value={{
            selectedTab, setSelectedTab,
            dashTabs,
        }}>
            {children}
        </UserDashboardContext.Provider>
    )
}

export const useDashoard = () => useContext(UserDashboardContext);