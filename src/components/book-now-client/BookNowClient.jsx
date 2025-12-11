'use client'
import React, { useEffect, useState } from 'react';
import './BookNowClient.css';
import InsuranceType from '../../components/book-now-components/InsuranceType/InsuranceType'
import Extras from '../../components/book-now-components/extras/Extras'
import HirerDetails from '../../components/book-now-components/hirer-details/HirerDetails'
import Payments from '../../components/book-now-components/payments/Payments'
import Image from 'next/image';
import { FaQuestionCircle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { useRouter, useSearchParams } from 'next/navigation';
import { useBookingContext } from '@/context/bookingContext/bookingContext';
import CarDateNotAvailable from '../../modals/CarDateNotAvailable/CarDateNotAvailable'
import axios from 'axios';
import Toust from '@/modals/Toust/Toust';
import Link from 'next/link';
import EmailEnquiryModal from '@/modals/EmailEnquiryModal/EmailEnquiryModal';
import MainLoader from '@/loaders/MainLoader/MainLoader';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSearchVehicle } from '@/context/searchVehicleContext/searchVehicleContext';
import { disconnect } from 'process';
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { checkIsZero } from '../../utils/checkZero'
import RefundPolicyModal from '../../modals/RefundPolicyModal/RefundPolicyModal'
import { url } from '../../utils/services';




const BookNowClient = () => {

  const router = useRouter()
  useEffect(() => {
    const seasionData = sessionStorage.getItem('vehicle-details');
    if (seasionData === null) {
      router.push('/')
    }
  }, [])



  countries.registerLocale(en);
  const stripe = useStripe();
  const elements = useElements();
  const {
    bookingVehicleData,
    bookingPayload,
    setBookingPayload,
    activeShuttle,
    setActiveShuttle,
    validateForm,
    vehicleSesionData,
    setVehicleSesionData,
    errors,
    setErrors,
    userType,
    setUserType,
    userData,
    setUserData,
    countryCode,
    setCountryCode,
    selectedCountryDetails,
    setSelectedCountryDetails,
    setExtraQuantities,
    arrivlaErrors,
    setArrivalErrors,
  } = useBookingContext()

  const {
    setSearchVehiclePayload,
    setIsVehicleSearched,
    setSearchedVehicles,
    setPickupCity,
    setDropupCity,
    setPickupTime,
    setDropupTime,
    setShowBookingButton
  } = useSearchVehicle()
  const searchParam = useSearchParams();

  const step = parseInt(searchParam.get('step')) || 1;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [insuranceSeleted, setInsuranceSelected] = useState({})
  const [packageSelected, setPackageSelected] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [toustShow, setTOustShow] = useState(false)
  const [toustMessage, setToustMessage] = useState('')
  const [selectPaymentType, setSelectPaymentType] = useState(2)
  const [userDiscount, setUserDiscount] = useState('');
  const [isLoading, setISloading] = useState(false)
  const [paymentError, setPaymentError] = useState("");

  const getUserDiscount = async () => {
    const guesApi = `${url}/discounts/get/1`
    const userApi = `${url}/discounts/get/1`

    if (userType === 'guest') {
      try {
        const response = await axios.get(guesApi);
        if (response.status === 200) {
          const discountValue = parseFloat(response.data.data.off_percent)
          setUserDiscount(discountValue)
        }
      } catch (error) {
        console.error("UnExpected Server Error", error);
      }
    } else {
      try {
        const response = await axios.get(userApi);
        if (response.status === 200) {
          const discountValue = parseFloat(response.data.data.off_percent)
          setUserDiscount(discountValue)
        }
      } catch (error) {
        console.error("UnExpected Server Error", error);
      }
    }
  }

  useEffect(() => {
    getUserDiscount()
  }, [])


  useEffect(() => {
    if (!step) {
      router.replace(`/book-now?step=1`)
    } else {
      setSelectedTabIndex(step - 1);
    }
  }, [step, searchParam, router]);

  const isUserInfoFilled = () => {
    const user = bookingPayload?.user || {};
    const newErrors = {};

    Object.entries(user).forEach(([key, value]) => {
      if (key === "local_phone") return;
      if(key === 'customer_id') return
      if (!value || value.trim() === "") {
        newErrors[key] = "Required";
      }
    });

    setErrors(newErrors); // overwrite — not merge


    const allFilled = Object.keys(newErrors).length === 0;
    return allFilled;
  };


  const isArrivalDetailsAdded = () => {
    const flightNumber = bookingPayload?.booking?.flight_number || "";
    const arrivalCity = bookingPayload?.booking?.arrival_city || "";
    const newErrors = {};

    if (!flightNumber.trim()) newErrors.flight_number = "Flight number is required";
    if (!arrivalCity.trim()) newErrors.arrival_city = "Arrival city is required";

    setArrivalErrors(newErrors);


    // Return true only if both are filled
    return Object.keys(newErrors).length === 0;
  };

  const goToNewStep = (newIndex) => {
    setSelectedTabIndex(newIndex)
    const param = new URLSearchParams(searchParam.toString());
    param.set('step', (newIndex + 1).toString());
    router.push(`/book-now?${param.toString()}`)
  }

  const [submitBookingMessage, setSubmitBookingMessage] = useState({
    head: '',
    para: '',
    link: ''
  })

  const handleCompleteBooking = async () => {
    const api = `${url}/booking/add-booking`;

    const userId = localStorage.getItem('userId');

    const payloadWithPhoneCode = {
      ...bookingPayload,
      user: {
        ...bookingPayload.user,
        phone: `${selectedCountryDetails?.code}${bookingPayload.user.phone}`,
        local_phone: bookingPayload?.user?.local_phone ? `+64${bookingPayload.user.local_phone}` : '',
        customer_id: userId || null
      }
    };

    try {
      setISloading(true)
      const response = await axios.post(api, payloadWithPhoneCode);
      if (response.status === 201) {
        setISloading(false);
        setShowAvailableModal(true)
        setShowBookingButton(false);
        setSearchedVehicles([])
        setSearchedVehicles([])
        setCloseType('success');
        setSubmitBookingMessage({
          head: 'Thank You For Booking',
          para: `We'll monitor your arrival to make sure we have your car ready on time`,
          link: 'Explore More Options'
        })

        setBookingPayload({
          booking: {
            car_id: null,
            pickup_location: "",
            drop_location: "",
            pickup_time: "",
            drop_time: "",
            extras: [],
            insurance_id: null,
            shuttle_option: 3,
            flight_number: '',
            arrival_city: ''
          },
          user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            local_phone: "",
            country: "New Zealand",
            driver_age: '24',
            how_find_us: "Google",
            travel_reason: "Leisure"
          }
        })

        setSearchVehiclePayload({
          "pickup_location": null,
          "drop_location": null,
          "pickup_time": "",
          "drop_time": "",
          "driver_age": '24'
        })
        setIsVehicleSearched(false)
        setPickupCity('')
        setDropupCity('')
        setPickupTime('')
        setDropupTime('')

        sessionStorage.removeItem('pick_and_drop_details');
        sessionStorage.removeItem('selected-vehicle-details');
        sessionStorage.removeItem('vehicle-details');

      } else {
        setISloading(false);
        setShowAvailableModal(true)
        setShowBookingButton(false)
        setSearchedVehicles([])
        setSearchedVehicles([])
        setCloseType('reject');
        setSubmitBookingMessage({
          head: 'Something went wrong',
          para: `Please try again later`,
          link: 'Try Again',
        })
      }

    } catch (error) {
      setISloading(false);
      console.error("UnExpected Error", error);
      setShowAvailableModal(true)
      setShowBookingButton(false)
      setSearchedVehicles([])
      setSearchedVehicles([])
      setCloseType('reject');
      setSubmitBookingMessage({
        head: 'Something went wrong',
        para: `Please try again later`,
        link: 'Try Again',
      })
    } finally {
      setISloading(false)
      setBookingPayload({
        booking: {
          car_id: null,
          pickup_location: "",
          drop_location: "",
          pickup_time: "",
          drop_time: "",
          extras: [],
          insurance_id: null,
          shuttle_option: 3,
          flight_number: '',
          arrival_city: ''
        },
        user: {
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          local_phone: "",
          country: "New Zealand",
          driver_age: '24',
          how_find_us: "Google",
          travel_reason: "Leisure"
        }
      })
      setExtraQuantities({})
      setSelectedCountryDetails()
      setActiveShuttle(3)
    }
  }

  // Handle Pay Now
  const handlePayNowAndBook = async () => {
    const payloadWithPhoneCode = {
      ...bookingPayload,
      user: {
        ...bookingPayload.user,
        phone: `${selectedCountryDetails?.code}${bookingPayload.user.phone}`,
        local_phone: bookingPayload?.user?.local_phone ? `+64${bookingPayload.user.local_phone}` : ''
      }
    };

    try {
      setISloading(true);
      setPaymentError('');

      // 1️⃣ Create booking first
      const bookingResponse = await axios.post(
        `${url}/booking/add-booking`,
        payloadWithPhoneCode
      );

      if (bookingResponse.status !== 201) {
        setShowAvailableModal(true);
        setCloseType('reject');
        setSubmitBookingMessage({
          head: 'Something went wrong',
          para: `Please try again later`,
          link: 'Try Again',
        });
        return;
      }


      // 2️⃣ Proceed with Stripe Payment
      if (!stripe || !elements) throw new Error("Stripe not initialized");

      const { data } = await axios.post(
        `${url}/create-payment-intent`,
        {
          amount: getGrandTotal() * 100, // convert to cents
          currency: 'NZD',
          booking_id: bookingResponse.data.booking_id, // send booking id
        }
      );

      const clientSecret = data.clientSecret;

      // 3️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${bookingPayload.user.firstname || 'Guest'} ${bookingPayload.user.lastname || ''}`.trim(),
            // country: bookingPayload?.user?.country
            address: {
              country: countries.getAlpha2Code(bookingPayload?.user?.country, "en"), // ✅ CORRECT
            },
          },
        },

      });

      // 4️⃣ Handle payment result
      if (result.error) {
        setPaymentError(result.error.message);
        console.error("Payment error:", result.error.message);
        setShowAvailableModal(true);
        setCloseType('reject');
        setSubmitBookingMessage({
          head: 'Payment Failed',
          para: result.error.message,
          link: 'Try Again',
        });

      } else {
        const status = result.paymentIntent.status;

        if (status === 'succeeded') {
          // ✅ Payment successful
          setShowAvailableModal(true);
          setShowBookingButton(false)
          setSearchedVehicles([])
          setCloseType('success');
          setSubmitBookingMessage({
            head: 'Paid Successfully!',
            para: `Your Booking has been Confirmed. We'll monitor your arrival to make sure we have your car ready on time`,
            link: 'Explore More Options',
          });

          // Reset booking form
          setBookingPayload({
            booking: {
              car_id: null,
              pickup_location: "",
              drop_location: "",
              pickup_time: "",
              drop_time: "",
              extras: [],
              insurance_id: null,
              shuttle_option: 3,
              flight_number: '',
              arrival_city: ''
            },
            user: {
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              local_phone: "",
              country: "New Zealand",
              driver_age: '24',
              how_find_us: "Google",
              travel_reason: "Leisure"
            }
          });

          setSearchVehiclePayload({
            "pickup_location": null,
            "drop_location": null,
            "pickup_time": "",
            "drop_time": "",
            "driver_age": '24'
          })
          setIsVehicleSearched(false)
          setPickupCity('')
          setDropupCity('')
          setPickupTime('')
          setDropupTime('')

          sessionStorage.removeItem('pick_and_drop_details');
          sessionStorage.removeItem('selected-vehicle-details');
          sessionStorage.removeItem('vehicle-details');

        } else if (status === 'requires_action' || status === 'requires_source_action') {
          // Handle 3D Secure
          const confirmResult = await stripe.confirmCardPayment(clientSecret);
          if (confirmResult.error) {
            setPaymentError(confirmResult.error.message);
            setShowAvailableModal(true);
            setCloseType('reject');
            setSubmitBookingMessage({
              head: 'Payment Failed',
              para: confirmResult.error.message,
              link: 'Try Again',
            });
          } else if (confirmResult.paymentIntent.status === 'succeeded') {
            setCloseType('success');
            setSubmitBookingMessage({
              head: 'Paid Successfully!',
              para: `Your Booking has been Confirmed. We'll monitor your arrival to make sure we have your car ready on time`,
              link: 'Explore More Options',
            });

            setShowBookingButton(false)
            setSearchedVehicles([])
            // Reset booking form
            setBookingPayload({
              booking: {
                car_id: null,
                pickup_location: "",
                drop_location: "",
                pickup_time: "",
                drop_time: "",
                extras: [],
                insurance_id: null,
                shuttle_option: 3,
                flight_number: '',
                arrival_city: ''
              },
              user: {
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                local_phone: "",
                country: "New Zealand",
                driver_age: '24',
                how_find_us: "Google",
                travel_reason: "Leisure"
              }
            });

            setSearchVehiclePayload({
              "pickup_location": null,
              "drop_location": null,
              "pickup_time": "",
              "drop_time": "",
              "driver_age": '24'
            })
            setIsVehicleSearched(false)
            setPickupCity('')
            setDropupCity('')
            setPickupTime('')
            setDropupTime('')

            sessionStorage.removeItem('pick_and_drop_details');
          }
        } else {
          // Other failure
          setPaymentError('Payment could not be completed.');
          setShowAvailableModal(true);
          setCloseType('reject');
          setSubmitBookingMessage({
            head: 'Payment Failed',
            para: 'Your payment could not be completed. Please try again.',
            link: 'Try Again',
          });
        }
      }

    } catch (error) {
      console.error("Error in booking/payment:", error);
      setPaymentError(error.message);

      setShowAvailableModal(true);
      setCloseType('reject');
      setSubmitBookingMessage({
        head: 'Something went wrong',
        para: `Please try again later`,
        link: 'Try Again',
      });


    } finally {
      setISloading(false);
      setBookingPayload({
        booking: {
          car_id: null,
          pickup_location: "",
          drop_location: "",
          pickup_time: "",
          drop_time: "",
          extras: [],
          insurance_id: null,
          shuttle_option: 3,
          flight_number: '',
          arrival_city: ''
        },
        user: {
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          local_phone: "",
          country: "New Zealand",
          driver_age: '24',
          how_find_us: "Google",
          travel_reason: "Leisure"
        }
      });
      setExtraQuantities({})
      setSelectedCountryDetails()
      setActiveShuttle(3)
    }
  };

  const [pickDropLocation, setPickDropLocation] = useState({});
  const [totalDays, setTotalDays] = useState(0);
  useEffect(() => {

    const pickDrop = JSON.parse(sessionStorage.getItem('pick_and_drop_details'));
    setTotalDays(vehicleSesionData?.daily_rates?.length)
    setPickDropLocation(pickDrop)
    if (pickDrop.pickup_location === null && pickDrop.drop_location === null) {
      sessionStorage.removeItem('pick_and_drop_details');
      sessionStorage.removeItem('selected-vehicle-details');
      sessionStorage.removeItem('vehicle-details');
      router.push('/vehicles')
    }
  }, [])

  const [locations, setLocations] = useState([])
  useEffect(() => {

    const getApi = async () => {
      try {
        const response = await axios.get(`${url}/locations/get`);
        setLocations(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getApi()
  }, [pickDropLocation])

  const formatDateFromISO = (isoString) => {
    try {
      const [year, month, day] = isoString.split("T")[0].split("-");
      const date = new Date(`${year}-${month}-${day}T00:00:00`); // force local parsing

      return new Intl.DateTimeFormat("en-NZ", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }).format(date);
    } catch (err) {
      return "Invalid Date";
    }
  };

  const formatTimeFromISO = (isoString) => {
    try {
      // Extract HH:MM:SS from the ISO string
      const timePart = isoString.split("T")[1].substring(0, 5); // "07:00"

      let [hours, minutes] = timePart.split(":").map(Number);

      // Convert to 12-hour format
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
    } catch (err) {
      return "Invalid Time";
    }
  };


  const handleBookNow = () => {
    if (selectedTabIndex < 3) {

      if (activeShuttle !== 3 && selectedTabIndex === 0 && !isArrivalDetailsAdded()) {
        setTOustShow(true)
        setToustMessage("Please Fill Flight Number and Arrival City");
        return
      } else if (selectedTabIndex === 2 && !isUserInfoFilled()) {
        setTOustShow(true)
        setToustMessage("Please Fill All The Information")
      } else if (activeShuttle === 3 && selectedTabIndex === 0) {
        setBookingPayload((prev) => ({
          ...prev,
          booking: {
            ...prev.booking,
            flight_number: '',
            arrival_city: ''
          }
        }))
        goToNewStep(selectedTabIndex + 1);
      } else {
        goToNewStep(selectedTabIndex + 1);
      }
    } else {
      if (selectPaymentType === 1) {
        handleCompleteBooking()
      } else if (selectPaymentType === 2) {
        handlePayNowAndBook()
      } else {

      }

    }
  }

  const [showCarAvailableModal, setShowAvailableModal] = useState(false);
  const [closeType, setCloseType] = useState('')
  const handleCloseCarNotAvailableModal = () => {
    if (closeType === 'success') {
      setShowAvailableModal(false)
      router.push('/')
    } else {
      setShowAvailableModal(false)
    }
  }

  const getInsurancesTotal = () => {
    let total = 0;
    const safeDays = totalDays > 0 ? totalDays : 1;
    // Insurance
    if (insuranceSeleted && Object.keys(insuranceSeleted).length > 0) {
      const insuranceRate = parseFloat(insuranceSeleted?.rate || 0);
      total += insuranceRate * safeDays;
    }
    return total.toFixed(0)
  }

  const getSubTotal = () => {
    let total = 0;

    // Get Total Days
    const subTotal = parseFloat(vehicleSesionData.sub_total || 0);
    total += subTotal - parseFloat(vehicleSesionData?.discounts?.value);
    return total.toFixed(0)
  }

  const getGrandTotal = () => {
    let total = 0;

    // Get Total Days
    const safeDays = totalDays > 0 ? totalDays : 1;


    const subTotal = parseFloat(vehicleSesionData.sub_total || 0);
    total += subTotal - parseFloat(vehicleSesionData?.discounts?.value);

    // Insurance
    if (insuranceSeleted && Object.keys(insuranceSeleted).length > 0) {
      const insuranceRate = parseFloat(insuranceSeleted?.rate || 0);
      total += insuranceRate * safeDays;
    }

    // Extras
    if (bookingPayload?.booking?.extras && bookingVehicleData?.extras) {
      bookingPayload.booking.extras.forEach((item) => {
        const matchedExtra = bookingVehicleData.extras.find(extra => extra.id === item.extras_option_id);
        if (matchedExtra) {
          const rate = parseFloat(matchedExtra.rate || 0);
          if (matchedExtra.is_daily_rate === true) {
            total += rate * item.quantity * safeDays;
          } else {
            total += rate * item.quantity
          }
        }
      });
    }

    if (vehicleSesionData?.off_hour_charges !== 0) {
      const offHourCharges = vehicleSesionData?.off_hour_charges;
      total += offHourCharges
    }

    return total.toFixed(0); // format to 2 decimal places if needed
  };

  const [emailModal, setEmailModal] = useState(false);
  const [modalType, setModalType] = useState('')
  const handleOpenEmailEnquiry = (type) => {
    setModalType(type)
    setEmailModal(true);
  }

  const getDiscountAmount = (price, discountPercent) => {
    const numPrice = parseFloat(price);
    const discount = parseFloat(discountPercent);

    if (isNaN(numPrice) || isNaN(discount)) return 0;
    return (numPrice * (discount / 100)).toFixed(2); // discount amount
  };

  const [refundModal, setRefundModal] = useState(false);



  return (
    <div className="book-now-page-main-container">
      {isLoading && <MainLoader />}
      <div className="book-now-inner-section">
        <div className="book-now-max-width-container">

          <div className='book-now-main-container'>

            <div className='booking-steps-main-container'>

              <div className='booking-steper-and-tab'>
                <div className='insurance-type-head'>
                  <span>
                    {
                      selectedTabIndex === 0 ? `${selectedTabIndex + 1}. Choose Insurance`
                        : selectedTabIndex === 1 ? `${selectedTabIndex + 1}. Extras`
                          : selectedTabIndex === 2 ? `${selectedTabIndex + 1}. Hirer Details`
                            : `${selectedTabIndex + 1}. Payments`
                    }
                  </span>
                  <div className='insurance-tab-number'>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <p
                        key={index}
                        className={`booking-tabs-numbers ${selectedTabIndex === index ? 'booking-selected-tab' : ''}`}
                        onClick={() => {
                          if (index < selectedTabIndex) {
                            setSelectedTabIndex(index);
                            goToNewStep(index)
                          }
                        }}
                      >
                        {index + 1}
                      </p>
                    ))}
                  </div>
                </div>

                {selectedTabIndex === 0 ? <InsuranceType
                  insurances={bookingVehicleData?.insurance}
                  selectedTabIndex={selectedTabIndex}
                  insuranceSeleted={insuranceSeleted}
                  setInsuranceSelected={setInsuranceSelected}
                  packageSelected={packageSelected}
                  setPackageSelected={setPackageSelected}
                />
                  : selectedTabIndex === 1 ? <Extras
                    extras={bookingVehicleData.extras}
                  />
                    : selectedTabIndex === 2 ? <HirerDetails />
                      : <Payments
                        grandTotal={getGrandTotal()}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        selectPaymentType={selectPaymentType}
                        setSelectPaymentType={setSelectPaymentType}
                        setRefundModal={setRefundModal}
                      />
                }
              </div>


              <button disabled={selectedTabIndex > 2 && !isChecked} className={`payment-continue-button ${selectedTabIndex > 2 && !isChecked ? 'disable-continue-booking' : ''}`} onClick={() => handleBookNow()}>{selectedTabIndex > 2 ? 'Complete Booking' : 'Continue'}</button>

            </div>

            {/*Booking Summary*/}
            {bookingVehicleData ? (
              <div className={`booking-summary-main-container`}>
                <h3>Booking Summary</h3>
                <div className='booking-summary-details-container'>
                  <div className='pick-drop-detail-section'>
                    <div className='pick-up-section'>
                      <h3>Pick-up</h3>
                      <h3>{locations.find((item) => item.id === pickDropLocation.pickup_location)?.name}</h3>
                      <p>{formatDateFromISO(pickDropLocation.pickup_time)}</p>
                      <p className='pick-drop-time'>{formatTimeFromISO(pickDropLocation?.pickup_time)}</p>
                      <Link href={'/vehicles'} className='edit-enquiry'>Edit Itinerary</Link>
                    </div>
                    <div className='drop-off-section'>
                      <h3>Drop-off</h3>
                      <h3>{locations.find((item) => item.id === pickDropLocation.drop_location)?.name}</h3>
                      <p>{formatDateFromISO(pickDropLocation?.drop_time)}</p>
                      <p>{formatTimeFromISO(pickDropLocation?.drop_time)}</p>
                    </div>
                  </div>
                  <div className='vehicle-details-section'>
                    <div className='vehicle-details'>
                      <h3>{bookingVehicleData.name}</h3>
                      
                      {vehicleSesionData?.duration_discount !== 0 ? (
                        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: 'auto', flexDirection: 'column' }}>
                          <del>NZ$ {checkIsZero(vehicleSesionData?.was_price)}</del>

                          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', width: 'max-content' }}>
                            NZ$ {checkIsZero(vehicleSesionData?.sub_total)}
                            <p style={{ fontSize: '10px', lineHeight: '12px', fontWeight: 400 }}>({vehicleSesionData?.duration_discount} days discount)</p>
                          </span>
                        </div>
                      ) : (
                        <span>NZ$ {checkIsZero(vehicleSesionData?.sub_total)}</span>
                      )}

                      <Link href={'/vehicles'}>Change Vehicle</Link>
                    </div>
                    <div className='vehicle-image-container'>
                      <Image src={url + bookingVehicleData?.image} alt='vehicle image' width={192} height={96} className='vehicle-image' />
                    </div>
                  </div>


                  <div className='booking-prices-details-section'>
                    <span style={{ display: vehicleSesionData?.discounts?.percent === 0 ? 'none' : 'flex' }}>
                      <p>{vehicleSesionData?.discounts?.name}</p>
                      <h3>NZ$ {checkIsZero(getDiscountAmount(vehicleSesionData?.sub_total, vehicleSesionData?.discounts?.percent))}</h3>
                    </span>

                    <span>
                      <p>Sub Total</p>
                      <h3>NZ$ {checkIsZero(getSubTotal())}</h3>
                    </span>

                    {vehicleSesionData?.daily_rates?.length > 0 && (
                      <span>
                        <p>Duration</p>
                        <h3>{vehicleSesionData?.daily_rates?.length} {vehicleSesionData?.daily_rates?.length > 1 ? 'days' : 'day'}</h3>
                      </span>
                    )}



                    {Object.keys(insuranceSeleted).length > 0 && (
                      <span>
                        <p>{insuranceSeleted?.name}</p>
                        {
                          parseFloat(insuranceSeleted?.rate) === 0 ? (
                            <h3>Free</h3>
                          ) : (
                            <h3>NZ$ {checkIsZero(getInsurancesTotal())}</h3>
                          )
                        }

                      </span>
                    )}


                    {bookingPayload?.booking?.extras && bookingPayload?.booking?.extras.map((item, index) => {
                      const extra = bookingVehicleData?.extras?.find(extra => extra.id === item?.extras_option_id);
                      const rate = extra?.rate * item.quantity * totalDays;

                      return (
                        <span key={index}>
                          <p>
                            {extra?.name}
                          </p>
                          <h3>
                            NZ$ {rate ? checkIsZero(rate) : ""}
                          </h3>
                        </span>
                      );
                    })}

                    {
                      vehicleSesionData?.off_hour_charges !== 0 && (
                        <span>
                          <p>Off Hour Charges</p>
                          <h3>NZ$ {checkIsZero(vehicleSesionData?.off_hour_charges)}</h3>
                        </span>
                      )
                    }


                  </div>
                  <div className='grand-total-section'>
                    <p>Grand Total</p>
                    <span>
                      <h3>NZ$ {checkIsZero(getGrandTotal())}</h3>
                      <p>(Inclusive of GST)</p>
                    </span>
                  </div>
                  <div className='queries-section'>
                    <span onClick={() => handleOpenEmailEnquiry('email-qoute')}>
                      <FaEnvelope size={15} color='var(--primary-color)' />
                      <p>Email Enquiry</p>
                    </span>
                    {/* <span onClick={() => handleOpenEmailEnquiry('qoute')}>
                      <CgFileDocument size={15} color='var(--primary-color)' />
                      <p>Save Quote</p>
                    </span> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className='booking-vehicle-detailsshimmer'></div>
            )}


          </div>

        </div>
      </div>

      <CarDateNotAvailable
        showModal={showCarAvailableModal}
        handleCloseModal={handleCloseCarNotAvailableModal}
        modalMessages={submitBookingMessage}
      />

      <Toust
        showToust={toustShow}
        setShowToust={setTOustShow}
        message={toustMessage}
      />

      <RefundPolicyModal 
        showRefundModal={refundModal}
        setShowRefundModal={setRefundModal}
      />

      <EmailEnquiryModal
        showEmailEnquiry={emailModal}
        setShowEmailEnquiry={setEmailModal}
        carObj={bookingVehicleData}
        modalType={modalType}
        bookingPayload={bookingPayload}

      />

      

    </div>
  )
}

export default BookNowClient