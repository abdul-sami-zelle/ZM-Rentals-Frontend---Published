import React, { useEffect, useRef, useState } from 'react'
import './VerifyBooking.css'

const VerifyBooking = ({imageChange, manageBookingSteper, setManageBookingSteper }) => {

  const otpNumber = "1234"
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  const [bookingEmial, setBookingEmail] = useState();
  useEffect(() => {
    const details = localStorage.getItem('booking_email_and_number');
    setBookingEmail(details.email)
  }, [])

  function maskEmail(email) {
    if (typeof email !== "string" || !email.includes("@")) {
      return email || ""; // return as is if not valid
    }

    const [localPart, domain] = email.split("@");

    if (!localPart || !domain) return email;

    if (localPart.length <= 2) {
      return "...@" + domain;
    }

    const visible = localPart.slice(-2); // keep last 2 chars
    return `...${visible}@${domain}`;
  }

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input if value entered
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // if all filled, join values
    if (newOtp.every((val) => val !== "")) {
      const otpCode = newOtp.join("");
      // you can call API here
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // move back if deleting empty field
      inputsRef.current[index - 1].focus();
    }
  };

  // ✅ handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pasted)) {
      const digits = pasted.split("");
      setOtp(digits);
      digits.forEach((digit, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i].value = digit;
        }
      });
    }
  };

  // ✅ verify otp button
  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === otpNumber) {
      setManageBookingSteper(manageBookingSteper + 1); // example action
      imageChange()
    } else {
    }
  };



  return (
    <div className='verify-otp-main-contianer'>
      <div className='vehify-otp-heading-contianer'>
        <h3>Verification Code</h3>
        <p>We sent you verification code on <strong>{maskEmail(bookingEmial)}</strong></p>
      </div>

      <div className='verify-otp-inputs-contianer'>
        <div className='verify-otp-inpus'>
          {otp.map((val, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              value={val}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              ref={(el) => (inputsRef.current[i] = el)}
              style={{
                height: "50px",
                textAlign: "center",
                fontSize: "15px",
              }}
            />
          ))}
        </div>
        <div className='verify-otp-timer'>
          <span>resend code in: <strong>01: 00</strong></span>
        </div>
      </div>
      <div className='verify-otp-button'>
        <button onClick={handleVerify}>Verify Code</button>
      </div>
    </div>
  )
}

export default VerifyBooking