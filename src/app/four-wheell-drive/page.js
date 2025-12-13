import StaticPageContent from '../../components/StaticPageContent/StaticPageContent'
import './FourWheelDrive.css'

const FourWheelsDrive = () => {
  const secTwoParas = [
    `Your Auckland journey isn’t complete without venturing into mountain trails, beach tracks, or remote camping spots. Locals and tourists alike escape the city to recharge, and the best way to explore is at your own pace. Rigid group tours and public transport schedules can limit your freedom, but a 4WD hire lets you travel independently and comfortably while staying in control of your time.`,
    `At ZM Rentals, our 4WD car rentals are built to deliver strength, safety, and convenience. Designed with advanced engineering, they feature robust interiors, space for 4–5 passengers, and modern safety systems to keep your group secure. Whether you’re navigating unpredictable highways or rugged countryside roads, the 4-wheel drive system ensures added traction, stability, and control.`,
    `With a 4WD rental by your side, you’re free to enjoy coastlines, forests, and open roads without worrying about terrain. It’s not just about getting to your destination; it’s about experiencing the journey with confidence, comfort, and adventure-ready performance.`,
  ]

  const secThreeItems = [
    {heading: 'Room for Everyone:', para: `Spacious cabins can accommodate families and friends to create joyful travel memories in Auckland.`},
    {heading: 'Smart Safety Tech:', para: `Traction control, stability assist, and driver aids give you peace of mind anywhere you go.`},
    {heading: 'Weather Versatility:', para: `Rain, wind, sun, or snow, 4WD systems help you tackle unpredictable conditions safely.`},
    {heading: 'All-Terrain Capability:', para: `Tackle hills, dirt tracks, gravel, mud puddles, wet roads, and sand effortlessly. `},
    {heading: 'Higher Ground Clearance:', para: `With 4WDs, you can navigate obstacles, uneven roads, and rugged trails without worry.`},
    {heading: 'Enhanced Control:', para: `Power distributed to all four wheels keeps you steady and in command, no matter the route. `},
  ]

  return (
    <div className='van-people-carrier-main-contianer'>

      <StaticPageContent 
        sectionMainHeading={'4 Wheel Drive: Always Adventure-Ready'}
        sectionMainPara={`Take on Auckland’s stunning suburbs and beyond with a 4WD vehicle from ZM Rentals. Our larger vehicles combine power, higher ground clearance, advanced safety, and smooth handling, perfect for both on-road comfort and off-road confidence. Explore our fleet today and find the 4WD car hire that matches your adventure.`}
        sectionTwoHeading={'Conquer Every Road with 4WD Power'}
        secTwoParaErray={secTwoParas}

        sectionThreeHeading={'Drive Anywhere, Worry-Free'}
        sectionThreeItems={secThreeItems}
      />
    </div>
  )
}

export default FourWheelsDrive