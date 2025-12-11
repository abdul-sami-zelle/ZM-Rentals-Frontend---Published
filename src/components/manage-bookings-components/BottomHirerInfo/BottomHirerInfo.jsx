import React, { use, useEffect, useRef, useState } from 'react'
import './BottomHirerInfo.css'
import { IoMdArrowDropdown } from "react-icons/io";

const BottomHirerInfo = ({ editBookingPayload, setEditBookingPayload, locations, setLocations, countriesList, setCountriesList, setBottomModal, isEditabel }) => {

  // hireri payload
  const [hirerPayload, setHirerPayload] = useState({
    firstname: '',
    lastname: '',
    country: '',
    email: '',
    phone: '',
    local_phone: '',
    how_find_us: '',
    travel_reason: '',
    driver_age: '',
  })

  useEffect(() => {
    setHirerPayload({
      firstname: editBookingPayload?.user?.firstname,
      lastname: editBookingPayload?.user?.lastname,
      country: editBookingPayload?.user?.country,
      email: editBookingPayload?.user?.email,
      phone: editBookingPayload?.user?.phone,
      local_phone: editBookingPayload?.user?.local_phone,
      how_find_us: editBookingPayload?.user?.how_find_us,
      travel_reason: editBookingPayload?.user?.travel_reason,
      driver_age: editBookingPayload?.user?.driver_age || '24',
    })
  }, [editBookingPayload])

  // Gernal Inputs 
  const handleUpdateInputs = (event) => {
    const { name, value } = event.target;

    let newValue = value
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

    setHirerPayload((prev) => ({
      ...prev,
      [name]: newValue
    }))
  }

  // Living Country dropdown
  const livingCountryRef = useRef();
  const [showLivingCountryList, setShowLivingCountryList] = useState(false);
  const handleSelectLivingCountry = (item) => {
    setHirerPayload((prev) => ({
      ...prev,
      country: item.country
    }))
    setShowLivingCountryList(false);
  }


  // find us
  const [showFindUs, setShowFindus] = useState(false);
  const whereFindUs = [
    'Google',
    'Facebook',
    'Instagram',
    'Tiktok',
    'Friends referral',
    'Other',
  ]

  const handleUpdateFindus = (item) => {
    setHirerPayload((prev) => ({
      ...prev,
      how_find_us: item
    }))
    setShowFindus(false)
  }

  // Purposes 
  const purposes = ['Leisure', 'Business', 'Other']
  const [showPurposes, setShowPurposes] = useState(false);
  const handleUpdatePurpose = (item) => {
    setHirerPayload((prev) => ({
      ...prev,
      travel_reason: item
    }))
    setShowPurposes(false)
  }

  // Update hirer info
  const handleUpdateHirerInfo = () => {
    setEditBookingPayload((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        firstname: hirerPayload?.firstname,
        lastname: hirerPayload?.lastname,
        driver_age: hirerPayload?.driver_age,
        email: hirerPayload?.email,
        country: hirerPayload?.country,
        phone: hirerPayload?.phone,
        local_phone: hirerPayload?.local_phone,
        how_find_us: hirerPayload?.how_find_us,
        travel_reason: hirerPayload?.travel_reason
      }
    }))
    setBottomModal(false)
  }


  return (
    <div className='hirer-main-contianer'>

      <div className='hirer-inputs-contianer'>
        <div className='labels-outer-contianer'>

          <label style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}}>
            First Name
            <input type='text' readOnly={!isEditabel.hirerInfo} name='firstname' value={hirerPayload?.firstname} onChange={handleUpdateInputs} />
          </label>

          <label style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}}>
            Last Name
            <input type='text' readOnly={!isEditabel.hirerInfo} name='lastname' value={hirerPayload?.lastname} onChange={handleUpdateInputs} />
          </label>

        </div>

        <div className='labels-outer-contianer'>

          <div ref={livingCountryRef} className='mobile-living-country-main-contianr' style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}}>
            <p>Which country do you live</p>
            <div className='mobile-living-country-head' onClick={() => isEditabel.hirerInfo ? setShowLivingCountryList(!showLivingCountryList) : null}>
              <h3>{hirerPayload?.country}</h3>
              <IoMdArrowDropdown size={20} color='#000' />
            </div>
            <div className={`living-country-list ${showLivingCountryList ? 'show-living-country-list' : ''}`}>
              {countriesList?.map((item, index) => (
                <p key={index} className={`living-country-item`} onClick={() => handleSelectLivingCountry(item)}>{item.country}</p>
              ))}
            </div>
          </div>

          <label style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}}>
            Email
            <input type='text' readOnly value={hirerPayload?.email} onChange={handleUpdateInputs} />
          </label>
        </div>

        <div className='labels-outer-contianer'>
          <label style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}}>
            Phone
            <input type='text' readOnly={!isEditabel.hirerInfo} name='phone' value={hirerPayload?.phone} onChange={handleUpdateInputs} />
          </label>
          <label style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}}>
            Local Phone
            <input type='text' readOnly={!isEditabel.hirerInfo} name='local_phone' value={hirerPayload?.local_phone} onChange={handleUpdateInputs} />
          </label>

        </div>

        <div className='labels-outer-contianer'>

          <div className='how-find-us-main-contianer' style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}}>
            <p>How did you find us?</p>
            <div className='how-find-us-head' onClick={() => isEditabel.hirerInfo ? setShowFindus(!showFindUs) : null}>
              <h3>{hirerPayload?.how_find_us}</h3>
              <IoMdArrowDropdown size={20} color='#000' />
            </div>
            <div className={`how-find-us-body ${showFindUs ? 'show-how-find-us' : ''}`}>
              {whereFindUs?.map((item, index) => (
                <p key={index} className={`how-find-us-item`} onClick={() => handleUpdateFindus(item)}>{item}</p>
              ))}
            </div>
          </div>

          <div className='purpose-of-visit-main' style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}}>
            <p>Purpose of visit</p>
            <div className='purpose-of-visit-head' onClick={() => isEditabel.hirerInfo ? setShowPurposes(!showPurposes) : null}>
              <h3>{hirerPayload?.travel_reason}</h3>
              <IoMdArrowDropdown size={20} color='#000' />
            </div>
            <div className={`purpose-of-visit-body ${showPurposes ? 'show-purposes-list' : ''}`}>
              {purposes?.map((item, index) => (
                <p key={index} className={`purposes-list-item`} onClick={() => handleUpdatePurpose(item)}>{item}</p>
              ))}
            </div>
          </div>

        </div>
      </div>


      <div className='hirer-info-update-button-contianer'>
        <button className='update-hirer-button-container' disabled={!isEditabel.hirerInfo} style={{opacity: isEditabel.hirerInfo ? 1 : 0.4}} onClick={handleUpdateHirerInfo}>Update</button>
      </div>

    </div>
  )
}

export default BottomHirerInfo