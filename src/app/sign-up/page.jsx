'use client'

import React, { useEffect, useState } from 'react'
import './Signup.css'
import Login from '../../components/LoginSingupComponents/Login/Login'
import Signup from '../../components/LoginSingupComponents/Signup/Signup'
import Link from 'next/link'
import MainLoader from '@/loaders/MainLoader/MainLoader'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { url } from '@/utils/services'

const SignUp = () => {
    const router = useRouter();
    const [showLogin, setShowLogin] = useState(true);
    const [inputShow, setInputShow] = useState()
    const [loading, setLoading] = useState(false);

    const verifyUser = async () => {
        const userToken = localStorage.getItem('userToken');
        const verifyTokenApi = `${url}/customer/verify-token`
        
        if (userToken) {
            
            try {
                // setLoading(true);
                const response = await axios.get(verifyTokenApi, {
                    headers: {
                        "Authorization": `Bearer ${userToken}`
                    }
                })

                if (response.status === 200) {
                    router.push(`/user-dashboard/${response.data.customer.customer_id}`)
                    
                } else {
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('userId');
                    
                }
            } catch (error) {
                console.error("UnExpected Server Error", error);
                setLoading(false);
            } finally {setLoading(false)}

        }
    }

    useEffect(() => {
        verifyUser()
    } , [])

    return (
        <div className='login-signup-main-contianer'>
            {loading && <MainLoader />}
            <div className={`signup-login-max-width`}>
                <div className={`login-sec-contianer ${showLogin ? 'swipe-to-input' : ''}`}>
                    {showLogin ? (
                        <Login showInput={showLogin} loading={loading} setLoading={setLoading} />
                    ) : (
                        <div className='login-sec-content-contianer'>
                            <img src='/assets/icons/car-icon.svg' alt='logo' />
                            <h3>Create Your Free Account Today</h3>
                            <p>start your journey with rewards, <br />convenience, and unbeatable offers</p>
                            <button onClick={() => setShowLogin(!showLogin)} className='login-and-signup-button'>Login</button>
                        </div>
                    )}
                </div>
                <div className={`signup-sec-contianer ${showLogin ? 'swipe-to-content' : ''}`}>
                    {!showLogin ? (
                        <Signup />

                    ) : (
                        <div className='login-sec-content-contianer'>
                            <img src='/assets/icons/car-icon.svg' alt='logo' />
                            <h3>Welcome Back!</h3>
                            <span>
                                <p> <strong> Secure & Fast </strong> – Your information is safe with us.</p>
                                <p> <strong> Manage Bookings </strong> – View, modify, or cancel anytime</p>
                                <p> <strong> Member Benefits </strong> – Don’t miss out on your personalized offers.</p>
                            </span>
                            <button onClick={() => setShowLogin(!showLogin)} className='login-and-signup-button'>Sign up</button>
                        </div>
                    )}
                </div>

            </div>

            <div className={`mobile-view-login-signup`}>
                <div className='mob-view-login-signup-toggler'>
                    <h3>{showLogin ? "Don't you have an account" : 'Already have an account'}</h3>
                    <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign up' : 'Login'}</button>
                </div>

                {showLogin ? (
                    <Login loading={loading} setLoading={setLoading} />
                ) : (
                    <Signup loading={loading} setLoading={setLoading} />
                )}
            </div>

        </div>
    )
}

export default SignUp