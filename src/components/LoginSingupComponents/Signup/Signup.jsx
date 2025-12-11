import React, { useState } from 'react'
import './Signup.css'
import Link from 'next/link'
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import {url} from '../../../utils/services'
import axios from 'axios';

const Signup = ({loading, setLoading}) => {

  const [showPassword, setShowPassword] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [confirmPass, setConfirmPass] = useState('')
  const [signupData, setSignupData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})

  const handleValueChange = (e) => {

    const {name, value} = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }))
  }

  const handleRegisterUser = async (e) => {
    e.preventDefault()

    const newError = {}
    if(!signupData.first_name) newError.first_name = "First Name Required";
    if(!signupData.last_name) newError.last_name = "Last Name Required";
    if(!signupData.email) newError.email = "Email Required";
    if(!signupData.password) newError.password = "Password Required";
    if(signupData.password !== confirmPass) {
      newError.confirmPass = "Password do not match"
      setShowError(true)
    }

    if(Object.keys(newError).length > 0 ) {
      setErrors(newError);
      return
    }

    setShowError(false)

    const api = `${url}/customer/create`;

    try {
      const response = await axios.post(api, signupData);
      if(response.data.success) {
        const {token, user} = response.data;

        // Cookies.set('authToken', token, {expires: 1, secure: true})
        sessionStorage.setItem('user', JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email

        }))

        return {success: true, user};
      } else {
        return {success: false, message: response.data.message}
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Sign up failed" };
    }


  }



  return (
    <div className='register-user-main-container'>
      <h3>Register</h3>
      <div className='register-user-inputs-contianer'>
        <div className='sign-up-two-inputs-contianer'>
          <label style={{border: errors.first_name ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
            First Name
            <input type='text' name='first_name' placeholder={errors.first_name ? errors.first_name : ''}  value={signupData.first_name} onChange={handleValueChange}  />
          </label>
          <label style={{border: errors.last_name ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
            Last Name
            <input type='text' name='last_name' placeholder={errors.last_name ? errors.last_name : ''}  value={signupData.last_name} onChange={handleValueChange} />
          </label>
        </div>
        <label className='signup-email-contianer' style={{border: errors.email ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
          Email
          <input type='text' name='email' placeholder={errors.email ? errors.email : ''}  value={signupData.email} onChange={handleValueChange} />
        </label>

        <div className='sign-up-two-inputs-contianer'>
          <label style={{border: errors.password ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
            Password
            <div className='pass-input-container'>
              <input type={showPassword ? `text` : 'password'} name='password' placeholder={errors.password ? errors.password : ''}  value={signupData.password} onChange={handleValueChange} />
              {showPassword ? <IoMdEyeOff size={15} color='#535353' onClick={() => setShowPassword(false)} /> : <IoIosEye size={15} color='#535353' onClick={() => setShowPassword(true)} />}
            </div>
          </label>
          <label style={{border: errors.confirmPass ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
            Confirm Password
            <div className='pass-input-container'>
              <input type={showConfirmPass ? `text` : 'password'} name='confirmPass'  placeholder={errors.confirmPass ? errors.confirmPass : ''}  value={confirmPass} onChange={(e) => {
                setConfirmPass(e.target.value);
                setErrors((prev) => ({...prev, confirmPass: ''}))
              }} />
              {showConfirmPass ? <IoMdEyeOff size={20} color='#535353' onClick={() => setShowConfirmPass(false)} /> : <IoIosEye size={20} color='#535353' onClick={() => setShowConfirmPass(true)} />}
            </div>

          </label>
        </div>

      </div>
      <div className='register-user-terms-and-button'>
        <span>
          <input type='checkbox' style={{ accentColor: 'var(--primary-color)', cursor: 'pointer' }} />
          I agree to the <Link href={'#'}>Privacy policy</Link>
        </span>
        <span>
          <input type='checkbox' style={{ accentColor: 'var(--primary-color)', cursor: 'pointer' }} />
          I agree to the <Link href={'#'}>Terms & Conditions</Link>
        </span>
        <button className='signup-sec-register-button' onClick={handleRegisterUser}>Register</button>
        {showError && <p style={{fontSize: '15px', fontWeight: '400', color: 'var(--primary-color)'}}>Incorrect Password</p> }
      </div>
    </div>
  )
}

export default Signup