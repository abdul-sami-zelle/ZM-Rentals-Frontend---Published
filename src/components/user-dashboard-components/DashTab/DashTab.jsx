import React, { useEffect, useState } from 'react'
import './DashTab.css'
import { url } from '../../../utils/services';
import axios from 'axios';
import DashCard from '../DashCard/DashCard'
import { GiGearStickPattern } from "react-icons/gi";
import { FaBluetoothB } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";


import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { BarChart } from '@mui/x-charts/BarChart';

const DashTab = () => {

  const [dashData, setDashData] = useState({});

  const handleGetDashboardData = async () => {
    const userToken = localStorage.getItem('userToken');
    const api = `${url}/customer/dashboard`;
    try {
      const response = await axios.get(api, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      })
      if (response.status === 200) {
        setDashData(response.data.data)
      }
    } catch (error) {
      console.error("UnExpected Server Error", error);
    }
  }
  useEffect(() => { handleGetDashboardData() }, [])

  const carFeatures = [
    { id: 1, name: dashData?.last_booked_car?.details?.transmission, icon: GiGearStickPattern },
    { id: 2, name: dashData?.last_booked_car?.details?.is_bluetooth_capable === true ? 'Yes' : 'Na', icon: FaBluetoothB },
    { id: 3, name: dashData?.last_booked_car?.details?.air_conditioned === true ? 'Yes' : 'NA', icon: TbAirConditioning },
    { id: 4, name: dashData?.last_booked_car?.details?.passenger_capacity, icon: HiUserGroup },
  ]

  // Get Month Name
  function getMonthName(dateStr) {
    const [month, year] = dateStr.split('-').map(Number);
    if (!month || !year || month < 1 || month > 12) return "Invalid date";
    const date = new Date(year, month - 1);
    const monthName = date.toLocaleString('default', { month: 'long' });
    return `${monthName} ${year}`;
  }

  const [tickPlacement, setTickPlacement] = useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = useState('middle');

  // ✅ Helper to get short month name (Jan, Feb, Mar)
  function getShortMonthName(monthIndex) {
    return new Date(2000, monthIndex).toLocaleString('default', { month: 'short' });
  }

  const dataset = React.useMemo(() => {
    if (!Array.isArray(dashData?.bar_chart) || dashData.bar_chart.length === 0)
      return [];

    // ✅ Sort data by actual date
    const sortedData = [...dashData.bar_chart].sort((a, b) => {
      const [ma, ya] = a.month.split('-').map(Number);
      const [mb, yb] = b.month.split('-').map(Number);
      return new Date(ya, ma - 1) - new Date(yb, mb - 1);
    });

    // ✅ Get starting month & year from first API entry
    const [startMonth, startYear] = sortedData[0].month.split('-').map(Number);

    // ✅ Generate 12 continuous months starting from startMonth
    const monthsArray = [];
    let currentMonth = startMonth - 1;
    let currentYear = startYear;

    for (let i = 0; i < 12; i++) {
      const monthName = getShortMonthName(currentMonth);
      monthsArray.push({
        month: `${monthName} ${currentYear}`,
        seoul: null,
      });

      // Move to next month correctly
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }

    // ✅ Fill data where month matches
    sortedData.forEach((item) => {
      const [m, y] = item.month.split('-').map(Number);
      const match = monthsArray.find(
        (d) => d.month === `${getShortMonthName(m - 1)} ${y}`
      );
      if (match) match.seoul = item.total_bookings;
    });

    return monthsArray;
  }, [dashData]);



  const valueFormatter = (value) => `${value}`;

  function TickParamsSelector({
    tickPlacement,
    tickLabelPlacement,
    setTickPlacement,
    setTickLabelPlacement,
  }) {
    return (
      <Stack direction="column" justifyContent="space-between" sx={{ width: '100%' }}>
        <FormControl>
          <FormLabel id="tick-placement-radio-buttons-group-label">
            Bookings
          </FormLabel>
        </FormControl>
      </Stack>
    );
  }

  const chartSetting = {
    yAxis: [
      {
        label: 'Bookings',
        width: 60,
        tickMinStep: 1, // ✅ force integer steps
        tickFormat: (v) => Math.floor(v),
      },
    ],
    series: [{ dataKey: 'seoul', valueFormatter, color: '#961502', }],
    height: 310,
    margin: { left: 60, right: 20, top: 20, bottom: 30 },
    tooltip: {
      sx: {
        backgroundColor: '#961502', // ✅ tooltip same color as bar
        color: '#FFF', // text color
        borderRadius: '6px',
        px: 1,
        py: 0.5,
      },
    },

  };

  return (
    <div className='user-dash-main-container'>
      
      {/* <div className='user-dash-baord-user-name-and-profile-contianer'>
        <div className='user-dashboard-user-greetings-contianer'></div>
        <div className='user-dashoard-profile-and-logout-container'></div>
      </div> */}

      <div className='user-dash-head-contianer'>
        <DashCard name={"Booked"} thunder={'white'} value={dashData?.cummulations?.booked_bookings} unit={dashData?.cummulations?.booked_bookings > 1 ? "Bookings" : 'Booking'} slug={"total-orders"} />

        <DashCard name={"Cancel"} thunder={'white'} value={dashData?.cummulations?.canceled_bookings} unit={dashData?.cummulations?.canceled_bookings > 1 ? "Bookings" : 'Booking'} slug={"total-orders"} />

        <DashCard name={"Complete"} thunder={'white'} value={dashData?.cummulations?.completed_bookings} unit={dashData?.cummulations?.completed_bookings > 1 ? "Bookings" : 'Booking'} slug={"total-orders"} />

        <DashCard name={"Confirmed"} thunder={'white'} value={dashData?.cummulations?.confirmed_bookings} unit={dashData?.cummulations?.confirmed_bookings > 1 ? "Bookings" : 'Booking'} slug={"total-orders"} />

        <DashCard name={"Failed"} thunder={'white'} value={dashData?.cummulations?.failed_bookings} unit={dashData?.cummulations?.failed_bookings > 1 ? "Bookings" : 'Booking'} slug={"total-orders"} />

        <DashCard name={"Total"} thunder={'white'} value={dashData?.cummulations?.total_bookings} unit={dashData?.cummulations?.total_bookings > 1 ? "Bookings" : 'Booking'} slug={"total-orders"} />
      </div>

      <div className='user-dash-car-and-total-booking-contianer'>
        <div className='user-dash-car-contianer'>

          <div className='user-dashboard-booked-car-image-and-name'>
            <img src={url + dashData?.last_booked_car?.image} />
            <div className='user-dashboard-booked-car-name-contianer'>
              <h3>{dashData?.last_booked_car?.name}</h3>
            </div>
          </div>

          <div className='user-dashboard-booked-car-features-contianer'>
            {carFeatures.map((item, index) => (
              <span>
                <item.icon size={20} color='#000' />
                <p>{item.name}</p>
              </span>
            ))}
          </div>

        </div>
        <div className='user-dash-total-bookings-chart'>
          <div style={{ width: '100%', height: '100%' }}>
            <TickParamsSelector
              tickPlacement={tickPlacement}
              tickLabelPlacement={tickLabelPlacement}
              setTickPlacement={setTickPlacement}
              setTickLabelPlacement={setTickLabelPlacement}
            />
            <BarChart
              dataset={dataset}
              xAxis={[
                {
                  dataKey: 'month',
                  scaleType: 'band',
                  paddingInner: 0.2,   // spacing *between* bars
                  paddingOuter: 0, 
                  tickPlacement: 'middle',
                  tickLabelPlacement: 'middle',
                },
              ]}
              barGap="20%"
              height={310}
              // margin={{ left: 20, right: 20, top: 20, bottom: 30 }}
              margin={{ left: 0, right: 0, top: 20, bottom: 30 }}
              slotProps={{
                legend: { hidden: true },
                bar: {
                  style: {
                    borderTopLeftRadius: 8,   // ✅ Rounded top-left
                    borderTopRightRadius: 8,  // ✅ Rounded top-right
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    clipPath: 'inset(0 round 8px 8px 0 0)', // ✅ Ensures corners stay rounded visually
                  },
                },
              }}
              tooltip={{
                sx: {
                  backgroundColor: '#961502',
                  color: '#fff',
                  borderRadius: '6px',
                  px: 1,
                  py: 0.5,
                },
              }}
              {...chartSetting}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default DashTab