import React, { useState } from 'react'
import "./DashboardHead.css"
import { useDashoard } from '../../../context/dashContext/dashContext'

const DashboardHead = () => {
    const {dashTabs, selectedTab, setSelectedTab} = useDashoard()
  return (
    <div className='dash-head-main-contianer'>
        <div className='dash-head-inner-container'>
            {dashTabs.map((item) => (
                <h3 
                    key={item.id} 
                    className={`dash-tab-name ${selectedTab === item.id ? 'select-selected-name' : ''}`} 
                    onClick={() => setSelectedTab(item.id)}
                >
                    {item.name}
                </h3>
            ))}
        </div>
    </div>
  )
}

export default DashboardHead