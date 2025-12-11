import React from 'react'
import './LuxuryCar.css'
import StaticPageContent from '@/components/StaticPageContent/StaticPageContent'

const LuxuryCArs = () => {
  const secTwoParas = [
    `Your time in Auckland deserves more than an ordinary ride. A luxury car hire adds sophistication and comfort to every route, from the energy of downtown to the serenity of coastal drives. With top-tier features, refined interiors, and advanced safety, you can relax and focus on enjoying the road ahead.`,
    `Expect premium amenities such as climate control, adjustable seating, and plush interiors designed for all-day comfort. Our vehicles also come equipped with cutting-edge safety systems that enhance protection and reduce stress, giving you complete peace of mind. Instead of worrying about the details of driving, you can savor the moments that truly matter.`,
    `Beyond leisure, luxury cars also create the right impression for business and formal occasions. From client meetings to social gatherings, a premium car hire reflects professionalism, prestige, and refined taste, ensuring you always arrive in style.`,
  ]

  const secThreeItems = [
    {heading: 'Status and Style:', para: `Drive in confidence with a car that makes the right impression without saying a word.`},
    {heading: 'Advanced Safety Features:', para: `From adaptive cruise control to lane-keeping assist, luxury vehicles keep you secure on the road. `},
    {heading: 'Spacious Luxe Interiors:', para: `Extra legroom, refined finishes, and thoughtful design to relax, work, or simply enjoy the journey.`},
    {heading: 'High-End Tech & Infotainment:', para: `Stay connected with seamless smartphone integration, maps, and entertainment at your fingertips. `},
    {heading: 'Performance Engineering:', para: `Experience superior driving with engines designed for smooth power and precision.`},
  ]

  return (
    <div className='van-people-carrier-main-contianer'>

      <StaticPageContent 
        sectionMainHeading={'Luxury Cars: Where Every Ride Feels First Class'}
        sectionMainPara={`Planning to explore Auckland in style and prestige? At ZM Rentals, our fleet of exquisite vehicles turns every journey into an unforgettable experience. Whether you’re on a corporate trip, attending a special event, or seeking a travel upgrade, our luxury car rental options ensure you arrive with elegance and confidence. Explore our premium selection to find the vehicle that best suits your needs.`}
        sectionTwoHeading={'Make Your Journey Unforgettable with Luxury Rentals'}
        secTwoParaErray={secTwoParas}

        sectionThreeHeading={'Level Up Your Auckland Experience'}
        sectionThreeItems={secThreeItems}
      />
    </div>
  )
}

export default LuxuryCArs