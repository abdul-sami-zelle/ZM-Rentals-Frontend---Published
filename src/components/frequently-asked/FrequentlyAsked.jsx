import React, { useState } from 'react'
import './FrequentlyAsked.css';
import { FiPlus } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const FrequentlyAsked = ({ faqData }) => {

    // Main 7 Headings (Categories) ki states
    const [activeDesktopCategory, setActiveDesktopCategory] = useState(0);
    const [activeMobileCategory, setActiveMobileCategory] = useState(0);

    // Inner Questions ki states
    const [currentIndex, setCurrentIndex] = useState(null);
    const [desktopIndex, setDesktopIndex] = useState(null)

    function toTitleCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div className='frequently-asked-outer-container'>
            <div className='frequently-asked-inner'>
                <h3 className='section-main-heading'>Frequently Asked Questions</h3>
                
                <div className='frequently-asked-ques-anw'>
                    {faqData.map((catItem, catIndex) => (
                        <div key={`desktop-cat-${catIndex}`} style={{ width: '100%', marginBottom: '15px' }}>
                 
                            <div 
                                className='faq-desktop-head' 
                                onClick={() => {
                                    setActiveDesktopCategory(activeDesktopCategory === catIndex ? null : catIndex);
                                    setDesktopIndex(null); 
                                }}
                                style={{ cursor: 'pointer', borderBottom: '1px solid #eee' }}
                            >
                                <MdKeyboardDoubleArrowRight size={25} color='var(--primary-color)' style={{ transform: activeDesktopCategory === catIndex ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{toTitleCase(catItem.category)}</h2>
                            </div>

                            <div className={`faq-desktop-body ${activeDesktopCategory === catIndex ? 'show-desktop-body' : ''}`} style={{ paddingLeft: '20px', height: activeDesktopCategory === catIndex ? 'auto' : '0px', overflow: 'hidden' }}>
                                {catItem.faqs && catItem.faqs.map((item, index) => (
                                    <div key={`desktop-faq-${index}`} className='frequently-asked-single-que-ans' style={{ marginTop: '10px' }}>
                                        <div className={`faq-desktop-head`} onClick={() => setDesktopIndex((prevIndex) => prevIndex === index ? null : index)} style={{ cursor: 'pointer' }}>
                                            <MdKeyboardDoubleArrowRight size={25} color='var(--secondary-color)'  />
                                            <h3>{toTitleCase(item.question)}</h3>
                                        </div>
                                        <div className={`faq-desktop-body ${desktopIndex === index ? 'show-desktop-body' : ''}`}>
                                            <div>{item.answer}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mobile-view-frequently-asked-que-ans'>
                    {faqData.map((catItem, catIndex) => (
                        <div key={`mobile-cat-${catIndex}`} style={{ width: '100%', marginBottom: '10px' }}>
          
                            <div 
                                className='mobile-faq-que' 
                                onClick={() => {
                                    setActiveMobileCategory(activeMobileCategory === catIndex ? null : catIndex);
                                    setCurrentIndex(null); 
                                }}
                                style={{ cursor: 'pointer', backgroundColor: '#f9f9f9', padding: '10px' }}
                            >
                                <MdKeyboardDoubleArrowRight size={25} color='var(--secondary-color)' style={{ transform: activeMobileCategory === catIndex ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                                <h2 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{toTitleCase(catItem.category)}</h2>
                            </div>

                            <div className={`mobile-faq-ans ${activeMobileCategory === catIndex ? 'show-ans-drawer' : ''}`} style={{ paddingLeft: '15px', height: activeMobileCategory === catIndex ? 'auto' : '0px', overflow: 'hidden' }}>
                                {catItem.faqs && catItem.faqs.map((item, index) => (
                                    <div className='mobile-single-faq-main-container' key={`mobile-faq-${index}`} style={{ marginTop: '10px' }}>
                                        <div className='mobile-faq-que' onClick={() => setCurrentIndex((prevIndex) => prevIndex === index ? null : index)}>
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                
                                            <FiPlus color='var(--primary-color)' style={{width:'20px', height:'20px', display:'flex', justifyContent:'center', alignItems:'center'}} />
                                            </div>
                                            <h3>{toTitleCase(item.question)}</h3>
                                        </div>
                                        <div className={`mobile-faq-ans ${currentIndex === index ? 'show-ans-drawer' : ''}`}>
                                            <div>{item.answer}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default FrequentlyAsked