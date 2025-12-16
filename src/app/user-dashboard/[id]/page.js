'use client'
import React, { useEffect, useState } from 'react'
import './UserDashoard.css'
import { useDashoard } from '../../../context/dashContext/dashContext'
import DashboardHead from '../../../components/user-dashboard-components/DashboardHead/DashboardHead'
import DashTab from '../../../components/user-dashboard-components/DashTab/DashTab'
import MyBookings from '../../../components/user-dashboard-components/MyBookings/MyBookings'
import DashProfile from '../../../components/user-dashboard-components/DashProfile/DashProfile'
import AddressAndPhone from '../../../components/user-dashboard-components/AddressAndPhone/AddressAndPhone'
import LicenceTab from '../../../components/user-dashboard-components/LisenceTab/LicenceTab'
import { url } from '../../../utils/services'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import MainLoader from '../../../loaders/MainLoader/MainLoader'


const UserDashoard = () => {


  const { selectedTab } = useDashoard()
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({})

  const router = useRouter()

  const handleGetUserData = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `${url}/customer/profile`;

    try {
      const response = await axios.get(api, {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })
      if(response.status === 200) {
        setUserDetails(response.data.data)
      }
    } catch (error) {
      console.error("UnExpected Servr Error", error);
    }
  }

  const verifyUser = async () => {
    setLoading(true)
    const userToken = localStorage.getItem('userToken');

    const verifyTokenApi = `${url}/customer/verify-token`
    if (userToken) {

      try {
        const response = await axios.get(verifyTokenApi, {
          headers: {
            "Authorization": `Bearer ${userToken}`
          }
        })


        if(response.status === 200) {
          handleGetUserData()
        }


        if (response.status !== 200) {
          localStorage.removeItem('userToken');
          localStorage.removeItem('userId');
          router.push(`/sign-up`)
        }
      } catch (error) {
        console.error("UnExpected Server Error", error);
        setLoading(false);
      } finally { setLoading(false) }
    } else {
      setLoading(false)
      router.push('/sign-up')
    }
  }

  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <div className='user-dashoard-main-contianer'>
      {loading && <MainLoader />}
      <div className='user-dashboard-width-controller'>
        <DashboardHead />

        <div className='user-dash-content-main-container'>
          {
            selectedTab === 1 ? (
              <DashTab />
            ) : selectedTab === 2 ? (
              <MyBookings />
            ) : selectedTab === 3 ? (
              <DashProfile />
            ) : selectedTab === 4 ? (
              <AddressAndPhone userDetails={userDetails} />
            ) : (
              <LicenceTab userDetails={userDetails} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UserDashoard