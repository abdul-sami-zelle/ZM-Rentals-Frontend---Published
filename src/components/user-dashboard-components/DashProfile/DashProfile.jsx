import React, { useEffect, useState } from 'react'
import './DashProfile.css'
import { IoIosLock } from "react-icons/io";
import { url } from '@/utils/services';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import MainLoader from '@/loaders/MainLoader/MainLoader';

const DashProfile = () => {


  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })


  const handleGetProfileData = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `${url}/customer/profile`
    try {
      const response = await axios.get(api, {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })

      if(response.status === 200) {
        setProfileData({
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          email: response.data.data.email
        })
      }

      if(response.status === 403) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        router.push('/sign-up')
      }

    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
    
  }

  useEffect(() => {handleGetProfileData()}, [])

  const handleProfileData = (event) => {
    const {name, value} = event.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleUpdateDetails = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `${url}/customer/update-profile`;
    setLoading(true);
    try {
      const response = await axios.put(api, {first_name: profileData.first_name, last_name: profileData.last_name}, {
        headers: {
          "Authorization": `Bearer ${userToken}`
        }
      })

    } catch (error) {
      setLoading(false)
      console.error("UnExpected Server error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='user-profile-main-contianer'>
      {loading && <MainLoader />}
      <div className='user-profile-inner-contianer'>
        <h3 className='dash-profille-tab-main-heading'>Profile</h3>
        <div className='dash-profile-inputs-contianer'>
          <div className='first-and-last-name'>
            <label>
              First Name 
              <input type='text' name='first_name' value={profileData.first_name} onChange={handleProfileData} />
            </label>
            <label>
              Last Name 
              <input type='text' name='last_name' value={profileData.last_name} onChange={handleProfileData} />
            </label>
          </div>
          <div className='profile-email-change'>
            <span>
              <p>Email Address</p>
              <p>Contact us to change email</p>
            </span>
              <input type='text' name='email' value={profileData.email} readOnly />
          </div>
          <div className='profile-email-change'>
            <span>
              <p>Password</p>
              <p>Contact us to change Password</p>
            </span>
              <input type='text' value={'********'} readOnly />
          </div>
        </div>
        <span className='protected-data-message'>
          <IoIosLock size={20} color='var(--primary-color)' />
          Your personal information is secure and encrypted
        </span>
        <button onClick={handleUpdateDetails} className='update-profile-button'>Save Profile</button>
      </div>
    </div>
  )
}

export default DashProfile