import React from 'react'
import './StaticPageContent.css'

const StaticPageContent = ({sectionMainHeading, sectionMainPara, sectionTwoHeading, secTwoParaErray, sectionThreeHeading, sectionThreeItems}) => {
  return (
    <div className='van-people-carrier-width-controler'>
        <h1 className='section-main-heading'>{sectionMainHeading}</h1>
        <p className='global-content-style'>
          {sectionMainPara}
        </p>

        <div className='van-people-carrrier-second-section'>
          <h2 className='global-heading-style'>{sectionTwoHeading}</h2>
          {secTwoParaErray.map((item, index) => (
              <p key={index} className='global-content-style'>{item}</p>
          ))}
          <div className='van-people-carrier-list-contianer'>
            <h3 className='global-heading-style'>{sectionThreeHeading}</h3>

            <ul className='van-people-list-items'>
                {sectionThreeItems.map((item, index) => (
                    <li key={index}>
                        <strong className='list-item-heading'>{item.heading}</strong>
                        <p>{item.para} </p>
                    </li>

                ))}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default StaticPageContent