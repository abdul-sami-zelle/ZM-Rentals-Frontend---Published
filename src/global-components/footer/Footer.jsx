'use client'

import React from 'react'
import './Footer.css'
import Link from 'next/link'
// import logo from '../../assets/logo.png'
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Footer = () => {

  const pathname = usePathname()

  const excludedNotFooter = ['/manage-booking'];
  

  const hideFooter = excludedNotFooter.includes(pathname)


  const footerData = [
    {
      name: 'Vehicles', link: '#', footerItems: [
        { itemName: 'Small Cars', itemLink: '/small-cars' },
        { itemName: 'Luxury Cars', itemLink: '/luxury-cars' },
        { itemName: 'Hybrid Cars', link: '/hybrid-cars' },
        { itemName: '4 Wheel Drives', itemLink: '/four-wheell-drive' },
        { itemName: 'Van or People Carriers', itemLink: '/van-or-people-carriers' },
      ]
    },
    {
      name: 'Helpful Links', link: '#', footerItems: [
        { itemName: 'About Us', itemLink: '/about-us' },
        { itemName: 'Why ZM Rentals', itemLink: '/why-zm-rentals' },
        { itemName: 'Before You Book', itemLink: '/before-you-book' },
        { itemName: 'After Your Journey', itemLink: '/after-journey' },
        { itemName: 'Contact Us', itemLink: '/contact-us' },
        // { itemName: 'News & Events', itemLink: '/news-and-events' },
      ]
    },
    {
      name: 'Services', link: '#', footerItems: [
        { itemName: 'Weekend Car Rental', itemLink: '/weekend-car-rental' },
        { itemName: 'Long-Term Car Rental', itemLink: '/long-term-car-rental' },
        { itemName: 'Car Rental Insurance', itemLink: '/car-rental-insurance' },
      ]
    },
  ]

  const socialLinks = [
    { icon: <FaFacebookF size={25} color='var(--secondary-color)' />, link: 'https://www.facebook.com/ZmRentalCars' },
    { icon: <FaTiktok size={25} color='var(--secondary-color)' />, link: '#' },
    { icon: <FaInstagram size={25} color='var(--secondary-color)' />, link: '#' },
  ]

  return ( 
    <div className='footer-main-container'>
      <div className='footer-bg-container' style={{display: hideFooter ? 'none' : 'flex'}}>
        <div className='footer-width-controller-container'>

          <div className='footer-menu-items-main-container'>

            <div className='footer-column footer-logo-container'>
              <Image src={'/assets/logos/ZM-Rentals-Horizontal-logo-in-white.png'} width={150} height={50} alt='foote-logo' className='footer-logo-image' />
              <p>Providing seamless, sustainable <br /> travel experiences with <br /> Auckland car rentals. <br /> Find out what makes us tick.</p>
            </div>

            {footerData.map((item, index) => (
              <div key={index} className='footer-column'>
                <Link className='footer-menu-heading' href={item.link}>{item.name}</Link>
                <div className='footer-menu-items'>
                  {item.footerItems && item.footerItems.length > 0 ? (
                    item.footerItems.map((menuItem, itemIndex) => (
                      typeof menuItem.itemLink === 'string' && menuItem.itemLink ? (
                        <Link className='footer-menu-link' href={menuItem.itemLink} key={itemIndex}>
                          {menuItem.itemName}
                        </Link>
                      ) : null
                    ))
                  ) : (<></>)

                  }
                </div>
              </div>
            ))}
            <div className='footer-column'>
                <div className='footer-deal-of-month-column'>
                    <h3 className='footer-menu-heading'>Deals</h3>
                    <Link href={'/hot-deal'} className='footer-menu-link'>Hot Deals</Link>
                </div>
                <div className='footer-locations-column'>
                    <h3 className='footer-menu-heading'>Our Locations</h3>
                    <Link href={'auckland-city'} className='footer-menu-link'>Auckland</Link>
                </div>
            </div>
          </div>


        </div>
      </div>
      <div className='footer-social-links-main-container' style={{display: hideFooter ? 'none' : 'flex'}} >
        <div className='footer-social-links-width-controller'>

            <div className='footer-social-and-terms-inner-section'>
              <div className='footer-terms-and-privacy-container'>
                <Link className='footer-terms-item' href={'/privacy-policy'}>Privacy & Cookie Policy</Link>
                <Link className='footer-terms-item' href={'/terms-and-conditions'}>Terms & Conditions</Link>
                {/* <Link className='footer-terms-item' href={'#'}>Careers</Link> */}
              </div>

              

              <div className='footer-social-links-container'>
                {socialLinks.map((item, index) => (
                  <Link key={index} href={item.link}>
                    {item.icon}
                  </Link>
                ))}
              </div>

              <div className='footer-design-by-container'>
                <p>Designed & Managed By</p>
                <Link href={'https://zellesolutions.com/'} target='_blank'>Zelle Solutions</Link>
              </div>

            </div>

        </div>
      </div>


    </div>
  )
}

export default Footer