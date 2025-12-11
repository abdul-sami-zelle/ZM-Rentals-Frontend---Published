import React from 'react'
import './CardShimmer.css';

const CardShimmer = () => {
  return (
    <div className='card-shimmer-main-contianer'>
        <div className='card-shimmer-image'></div>
        <div className='card-shimmer-content'>
            <div className='card-shimmer-name-model'>
                <div className='card-shimmer-name'></div>
                <div className='card-shimmer-model'></div>
            </div>
            <div className='card-shimmer-line'></div>
            <div className='card-shimmer-price'></div>
            <div className='card-shimmer-info'>
                <div className='card-shimmer-engine-and-gear'>
                    <div></div>
                    <div></div>
                </div>
                <div className='car-shimmer-info-text'></div>
            </div>
        </div>
    </div>
  )
}

export default CardShimmer