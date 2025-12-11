'use client'
import React, { useEffect, useState } from 'react'
import './Navbar.css'
import Image from 'next/image'
import logoImage from '../../assets/logo.png'
import Link from 'next/link'
import NavCard from '../nav-card/NavCard'
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import beforeImage from '../../assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg'
import carImage from '../../assets/images/cars/small_cars_menu_Tablet.jpg'
import { useParams, usePathname, useRouter } from 'next/navigation'

const Navbar = () => {

  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(null);
  const navData = [
    { id: 1, name: 'Vehicles', dropdown: false, link: '/vehicles' },
    { id: 2, name: 'Car Rental Services', dropdown: false, link: '/car-rental-services' },
    { id: 3, name: 'Booking Info', dropdown: false, link: '/booking-info' },
    { id: 4, name: 'Locations', dropdown: false, link: '/locations' },
    { id: 5, name: 'Contact Us', dropdown: false, link: '/contact-us' },
    { id: 6, name: 'About Us', dropdown: false, link: '/about-us' },
  ]

  const dropdownData = [
    {
      item: 'Vehicles',
      data: [
        { name: 'Small Cars', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        { name: 'Electric Vehicles', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        { name: 'Hybrid Cars', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
      ]
    },
    {
      item: 'Car rental services',
      data: [
        // { name: 'Auckland City', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        // { name: 'Auckland Airport', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        // { name: 'Waiheke', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        // { name: 'Wellington Airport', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        // { name: 'Nelson Airport', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        // { name: 'Cristchurch Airport', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        // { name: 'Queenston Airport', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        // { name: 'Dunedin  Airport', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        // { name: 'InverCargill Airport', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
      ]
    },
    {
      item: 'Booking info',
      data: [
        { name: 'Hot Deals', image: carImage, link: '#' },
        { name: 'Relocation Deals', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', },
      ]
    },
    {
      item: 'Locations',
      data: [
        { name: 'Trip Planner', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        { name: 'Travel Guide', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        { name: 'Go Play', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        { name: 'Travel Blog', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        { name: 'Snap Happy', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        { name: 'Drive Safe', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
        { name: 'Tiaki Promise', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '144px', height: '72px' },
      ]
    },
    {
      item: 'Help',
      data: [
        { name: 'Before You Book', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '209px', height: '104px' },
        { name: 'Ahead of Your Trip', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '209px', height: '104px' },
        { name: 'Help on the Roads', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '209px', height: '104px' },
        { name: 'After Your Journey', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '209px', height: '104px' },
        { name: 'Account and App', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '209px', height: '104px' },
      ]
    },
    {
      item: 'About Us',
      data: [
        { name: 'Why Go With Us?', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '173px', height: '86px' },
        { name: 'Awards & Endorsements', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '173px', height: '86px' },
        { name: 'Costumer Reviews', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '173px', height: '86px' },
        { name: 'Our Team', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '173px', height: '86px' },
        { name: 'Work For Us', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '173px', height: '86px' },
        { name: 'News', image: '/assets/images/explore-nz/Travel_Guides_menu_Tablet.jpg', link: '#', width: '173px', height: '86px' },
      ]
    },
  ]

  // Find the dropdown data based on the current hovered item
  const getDropdownData = () => {
    const currentItem = navData.find(item => item.id === currentIndex);
    return dropdownData.find(data => data.item === currentItem?.name);
  }

  // Mobile Menu Script
  const [openMenu, setOpenMenu] = useState(false);
  const handleMenuToggler = () => {
    setOpenMenu(true);
  }

  const handleCloseMenuToggler = () => {
    setOpenMenu(false);
  }

  useEffect(() => {
    const shouldDisableScroll = openMenu;
    document.body.style.overflow = shouldDisableScroll ? "hidden" : "auto";
  }, [openMenu]);

  const handleNavigate = (link) => {
    router.push(link)
    setOpenMenu(false)
  }

  const [navItem, setNavItem] = useState('');


  const currentPath = usePathname();

  useEffect(() => {
    const pathWithoutSlash = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath
    const splitedPath = pathWithoutSlash.split('-');
    setNavItem(splitedPath.join(' ').toLowerCase())

  }, [currentPath])


  const [navSticky, setNavSticky] = useState(false);
    useEffect(() => {
  
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
  
        if (scrollPosition > 90) {
          setNavSticky(true); // hide
        } else if (scrollPosition < 60) {
          setNavSticky(false); // show again when back up
        }
      };
  
  
  
      document.addEventListener('scroll', handleScroll);
  
      return () => { document.removeEventListener('scroll', handleScroll) }
    }, [])






  return (
    <>
      <div className={`navbar-main-container ${navSticky ? 'fix-nav-contianer' : ''}`}>
        <Link href={'/'}>
          <Image src={'/assets/logos/ZM-Rentals-Horizontal-logo.png'} alt="Logo" width={200} height={50} className="navbar-logo" />
        </Link>
        <nav className="navbar">
          <ul className="navbar-list">
            {navData.map((item) => (
              <li
                key={item.id}
                className={`navbar-item ${navItem === item.name.toLowerCase() ? 'active' : ''}`}
                onClick={() => setNavItem(item.name.toLowerCase())}
                onMouseOver={() => setCurrentIndex(item.id)}
                onMouseLeave={() => setCurrentIndex(null)}
              >
                <Link
                  href={item.link}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className='nav-login-and-manage'>

            <Link
              className='nav-login-item'
              href={'/sign-up'}
            >
              <FaRegUser />
              Login
            </Link>
            <Link
              className='nav-login-item'
              href={'/manage-booking'}
            >
              <FaRegUser />
              Manage Booking
            </Link>

          </div>


        </nav>
      </div>

      <div className='mobile-view-menu-main-container'>
        <Link href={'/'}>
          <Image src={'/assets/logos/ZM-Rentals-Horizontal-logo.png'} alt='logo image' width={200} height={50} className='mobile-view-logo' />
        </Link>
        <button className='mobile-menu-toggler' onClick={handleMenuToggler}>
          <IoMenuSharp size={25} />
        </button>
      </div>

      {/* Mobile Side bar */}
      <div className={`mobile-menu-side-bar-main-container ${openMenu ? 'show-mobile-menu' : ''}`}>

        <div className='mobile-menu-bar-nav-section'>
          <div className='mobile-menu-close-container'>
            <button onClick={handleCloseMenuToggler}>
              <IoCloseOutline size={30} color='var(--color-white)' />
            </button>
          </div>
          <div className='mobile-menu-nav-items-container'>
            <ul className='mobile-menu-list'>
              {navData.map((item) => (
                <li key={item.id} className='mobile-menu-list-item' >
                  <p onClick={() => handleNavigate(item.link)}>{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div></div>
        </div>

        <div className='mobile-menu-footer'>

          <div className='mobile-menu-other-options-top'>
            <Link href={'/sign-up'} onClick={() => setOpenMenu(false)}>
              <HiOutlineUserCircle size={20} color='var(--color-white)' />
              Login
            </Link>

            <Link href={'/manage-booking'} onClick={() => setOpenMenu(false)}>
              <FaRegCheckCircle size={20} color='var(--color-white)' />
              Manage booking
            </Link>
          </div>

          <div className='mobile-menu-other-options-bottom'>
            
            <a href="tel:+64221708848" className="contact-link">
              <MdOutlinePhoneIphone size={20} color='var(--color-white)' />
              <strong>NZ</strong> +64221708848
              <MdOutlineArrowDropDown size={15} color='var(--color-white)' />
            </a>

            <a href="mailto:info@zmrentals.co.nz" className="contact-link">
              <IoMailOutline size={20} color='var(--color-white)' />
              Email us
            </a>
          </div>

        </div>
      </div>

      {/* Drop down  */}
      {/* {
        currentIndex !== null && navData.find((item) => item.id === currentIndex)?.dropdown && ( */}

      {/* <div
        className={`nav-drop-down-main-container ${currentIndex !== null && navData.find((item) => item.id === currentIndex)?.dropdown ? 'show-drop-down' : ''} `}
        onMouseEnter={() => setCurrentIndex(currentIndex)}
        onMouseLeave={() => setCurrentIndex(null)}
      >
        {
          // Dynamically render dropdown content based on the current item
          getDropdownData()?.data.map((dataItem, index) => {
            return <div key={index} style={{ width: dataItem.width }}>
              <NavCard
                name={dataItem.name}
                image={dataItem.image}
                navLink={dataItem.link}
                width={dataItem.width}
                selectedIndex={index}
                height={dataItem.height}
              />
            </div>
          })
        }
      </div> */}
      {/* )
      } */}



    </>
  )
}

export default Navbar