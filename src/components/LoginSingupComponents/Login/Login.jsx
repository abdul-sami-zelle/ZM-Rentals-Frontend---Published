import React, { useState } from 'react'
import './Login.css'
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import {url} from '../../../utils/services' 
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = ({ showInput, loading, setLoading }) => {

    const router = useRouter();

    const [showPass, setShowPass] = useState()
    
    const [wrongPass, setWrongPass] = useState(false);
    const [userDetail, setUserDetails] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleUserInput = (e) => {
        const {name, value} = e.target;

        setUserDetails((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => ({
            ...prev,
            [name] : ''
        }))

    }

    const handleLogin = async (e) => {
        e.preventDefault()
        let newError = {}

        if(!userDetail.email) newError.email = 'Email Is Required';
        if(!userDetail.password) newError.password = 'Password Is Required';

        if(Object.keys(newError).length > 0) {
            setErrors(newError);
            return
        }

        setLoading(true)
        const api = `${url}/customer/login`;
        try {
            const response = await axios.post(api, userDetail)
            if(response.status === 200) {
                localStorage.setItem('userToken', response.data.data.token)
                localStorage.setItem('userId', response.data.data.customer.customer_id)
                router.push(`/user-dashboard/${response.data.data.customer.customer_id}`);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            return { success: false, message: error.response?.data?.message || "Login failed" };
        } finally {
            setLoading(false)
        }

        // alert("User Loged in Successfully");
    }
    return (

        <div className='login-form-main-contianer'>
            <h3>Login</h3>
            <div className='login-form-inputs'>
                <label style={{border: errors.email ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
                    Email
                    <input type='text' name='email' placeholder={errors.email ? errors.email : ''} value={userDetail.email} onChange={handleUserInput} />
                </label>
                <label style={{border: errors.password ? '1px solid var(--primary-color)' : '1px solid transparent'}}>
                    Password
                    <div className='login-user-pass-container'>
                        <input type={showPass ? 'text' : 'password'} placeholder={errors.password ? errors.password : ''} name='password' value={userDetail.password} onChange={handleUserInput} />
                        {showPass ? <IoMdEyeOff size={20} color='#535353' onClick={() => setShowPass(false)} /> : <IoIosEye size={20} color='#535353' onClick={() => setShowPass(true)} />}
                    </div>
                </label>
                    <span className='forgot-password'>
                        <p>Forgot Password</p>
                    </span>
            </div>
            <button className='login-submit-button' onClick={handleLogin}>Login</button>

            {wrongPass && <p style={{fontSize: '15px', fontWeight: '400', color: 'var(--primary-color)'}}>Incorrect Password</p> }
        </div>

    )
}

export default Login