import React, { useEffect, useState } from 'react'
import './MyBookings.css'
import Link from 'next/link';
import axios from 'axios';
import { url } from '../../../utils/services';

const MyBookings = () => {
  const [bookingTable, setBookingTable] = useState([]);

  const handleGetBookingData = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `${url}/customer/bookings`;
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      if (response.status === 200) {
        setBookingTable(response.data.data)
      }
    } catch (error) {
      console.error("unexpected server Error", error)
    }
  }

  useEffect(() => {
    handleGetBookingData()
  }, [])

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get date components in local time (not UTC)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <div className='my-bookings-main-container'>
      {bookingTable.length > 0 ? (
        <>
        <div className='user-bookings-preview-table'>
          <table className='booking-table-main-container'>
            <thead>
              <th>Booking Id</th>
              <th>Name</th>
              <th className='hide-on-mobile'>Vehicle Name</th>
              <th className='hide-on-mobile'>Pick-Up Date</th>
              <th>Drop-Off Date</th>
              <th>Status</th>
            </thead>
            {bookingTable?.map((item, index) => {
              return (
                <tbody>
                  <td>{item.booking_id}</td>
                  <td>{item?.Customer?.first_name + ' ' + item.Customer?.last_name}</td>
                  <td className='hide-on-mobile'>{item.Car.name}</td>
                  <td className='hide-on-mobile'>{formatDate(item.pickup_time)}</td>
                  <td>{formatDate(item.drop_time)}</td>
                  <td>{item.status}</td>
                </tbody>
              )
            })}
          </table>
        </div>

        <div className='mobile-booking-detials-main-contianer'>
          {bookingTable?.map((item) => (
            <div className='single-booking-details'>

              <div className='single-booking-details-head'>
                <span>
                  <p>Booking id:</p>
                  <h3>{item.booking_id}</h3>
                </span>

                <button>{item.status}</button>
              </div>

              <div className='single-booking-hirer-and-vehicle-name'>
                <h3>{item?.Customer?.first_name + ' ' + item.Customer?.last_name}</h3>
                <p>{item.Car.name}</p>
              </div>

              <div className='single-booking-pick-and-drop-contianer'>
                <span>
                  <p>Pick-Up Date</p>
                  <h3>{formatDate(item.pickup_time)}</h3>
                </span>

                <span>
                  <p>Drop-Off Date</p>
                  <h3>{formatDate(item.pickup_time)}</h3>
                </span>
              </div>

            </div>
          ))}
        </div>
        </>
      ) : (
        <div className='add-booking-button-contianer'>
          <Link href={'/vehicles'}>Add Booking Now</Link>
        </div>
      )}
    </div>
  )
}

export default MyBookings