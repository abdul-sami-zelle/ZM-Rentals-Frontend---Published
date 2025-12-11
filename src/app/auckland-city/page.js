import React from 'react'
import './Auckland.css'

const AucklandCity = () => {
  return (
    <div className='auckland-city-main-container'>
      <div className='auckland-city-width-controller-contianer'>
        <h1 className='section-main-heading'>Auckland</h1>
        <p className='global-content-style'>
          Begin your Auckland journey as soon as you step outside the terminal. Our airport car rental location based in Mangere ensures that you get on the road right from the runway. This means less time waiting, and more time driving, whether you’re heading into the city, chasing beaches, or starting a North Island adventure.  
        </p>

        <div className='auckland-list-items-contianer'>
          <h2 className='global-heading-style'>Why Mangere is the Perfect Starting Point</h2>
          <ul className='auckland-city-features-list'>
            <li className='global-content-style'>
              <strong>Airport Convenience:</strong> A quick shuttle from arrivals to keys in hand.
            </li>
            <li className='global-content-style'>
              <strong>Skip the City Traffic:</strong> No backtracking into the bustling central Auckland.
            </li>
            <li className='global-content-style'>
              <strong>Family-Friendly Roads:</strong> Wide and even streets for smooth navigation.
            </li>
            <li className='global-content-style'>
              <strong>Local Gems Nearby:</strong> Parks and Cafes right outside our office location. 
            </li>
            <li className='global-content-style'>
              <strong>Motorway Access:</strong> Seamless connectivity to all areas via SH1 and SH2. 
            </li>
          </ul>
        </div>

        <h2 className='global-heading-style'>Your Gateway to North & South</h2>

        <p className='global-content-style'>
          Think of ZM Rentals’ Mangere car rental depots as your ultimate New Zealand launch pad. Head north and you’ll reach Auckland’s Central Business District in under half an hour. Then continue to Nothland’s coastline, Orewa, Matakana, and beyond. These northern routes are perfect for beach lovers and wine trail explorers.
        </p>

        <p className='global-content-style'>
          Drive south and the landscape shifts quickly: rolling farmland toward Waikato, geothermal wonders in Rotorua, and adventure spots in Taupo. Further still, SH1 guides you toward Wellington. From Mangere, every direction leads to a road trip worth remembering. 
        </p>

          <h2 className='global-heading-style'>Our Guide to the Best Auckland Drives</h2>

          <span className='auckland-visiting-points'>
            <h3 className='auckland-visiting-point-name'>Mission Bay</h3>
            <p className='auckland-visiting-point-details'>Hugging the Waitemata Harbour, this drive is a favorite of locals and visitors alike. Cruise past beaches, stop for ice cream, and watch the sunset behind Rangitoto Island. </p>
          </span>
          <span className='auckland-visiting-points'>
            <h3 className='auckland-visiting-point-name'>Piha Beach</h3>
            <p className='auckland-visiting-point-details'>Just 45 minutes west, this black-sand beauty feels wild and untamed. The winding route offers breathtaking lookouts before opening up to Piha’s dramatic coastline. </p>
          </span>
          <span className='auckland-visiting-points'>
            <h3 className='auckland-visiting-point-name'>Waitakere Ranges</h3>
            <p className='auckland-visiting-point-details'>Aptly named scenic drive, Waitakere Ranges wind through dense native forests with rolling greenery and sweeping views over the Tasman Sea.</p>
           </span>
          <span className='auckland-visiting-points'>
            <h3 className='auckland-visiting-point-name'>Awhitu Peninsula</h3>
            <p className='auckland-visiting-point-details'>An underrated gem south-west of the city, offering winding roads, stunning coastlines, farmland views, and the historic Manukau Heads Lighthouse. </p>
          </span>
          <span className='auckland-visiting-points'>
            <h3 className='auckland-visiting-point-name'>Hunua Ranges</h3>
            <p className='auckland-visiting-point-details'>Head south-east for a pleasant drive through rolling countryside, boutique cafes, and onto the forested Hunua Ranges with waterfalls and walking tracks.</p>
          </span>
          <span className='auckland-visiting-points'>
            <h3 className='auckland-visiting-point-name'>Wenderholm Park</h3>
            <p className='auckland-visiting-point-details'>North of Auckland, this refreshing coastal spot is best reached by car, passing through the stunning sandy beaches of Orewa and winding alongside the water.</p>
          </span>

      </div>
    </div>
  )
}

export default AucklandCity