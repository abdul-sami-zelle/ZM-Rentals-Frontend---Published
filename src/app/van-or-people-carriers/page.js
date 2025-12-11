import React from 'react'
import './VanPeopleCarrier.css'
import StaticPageContent from '../../components/StaticPageContent/StaticPageContent'

const VanOrPeopleCarriers = () => {

  const secTwoParas = [
    `Van rentals in Auckland are an ideal solution when traveling with a group or a large family. They’re perfect for family holidays with kids, offering generous space for passengers, luggage, and gear. Plus, you can enjoy family-friendly features such as easy-access doors and child seat anchors for safer, smoother trips.`,
    `Planning a short adventure with friends? Booking one group vehicle keeps everyone together, making travel more enjoyable while building memories along coastal roads, scenic cliffs, and lush forest drives. With one vehicle, the trip starts the moment you set off, not just when you reach your destination.`,
    `People carriers also make a smart choice for event planners and activity organizers. Whether you’re heading to a countryside wedding, arranging a city tour, or managing a club outing, an MPV rental simplifies logistics and ensures the whole group arrives together. It’s not only convenient and efficient but also more affordable than hiring multiple smaller cars.`,
  ]

  const secThreeItems = [
    {heading: 'Power and Performance:', para: `Strong engines and intuitive controls turn all terrain into pure driving enjoyment.`},
    {heading: 'Peace of Mind:', para: `Our van rentals in Auckland keep everyone secure with stability control, multiple airbags, and seatbelts.`},
    {heading: 'Excellent Capacity:', para: `Seats for everyone with ample legroom and headspace to stretch out during long drives comfortably.`},
    {heading: 'Cargo-Friendly:', para: `Generous boot space and flexible interiors allow for sufficient luggage, sports gear, or equipment.`},
    {heading: 'Connectivity & Technology:', para: `Entertainment systems, USB ports, and connectivity keep everyone engaged on longer trips.`},
    {heading: 'Ideal for Any Occasion:', para: `From group city tours to weekend expeditions with loved ones, travel together without compromise.`},
  ]

  return (
    <div className='van-people-carrier-main-contianer'>

      <StaticPageContent 
        sectionMainHeading={'Van or People Carrier: Group Travels Made Easy'}
        sectionMainPara={`Exploring beautiful Auckland with family,
          friends, or a like-minded travel group? Our MPVs
          (multi-purpose vehicles) and van rentals are designed to carry
          larger groups without compromising comfort or convenience.
          With our wide fleet options, you can easily choose the
          vehicle that best fits your journey.`}
        sectionTwoHeading={'Comfortable, Spacious, and Ready for Adventure'}
        secTwoParaErray={secTwoParas}

        sectionThreeHeading={'Group Vehicles You Can Count On'}
        sectionThreeItems={secThreeItems}
      />
    </div>
  )
}

export default VanOrPeopleCarriers