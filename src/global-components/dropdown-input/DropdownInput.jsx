import React, { useEffect, useRef, useState } from 'react'
import './DropdownInput.css'
import { MdOutlineArrowDropDown } from "react-icons/md";
import useDropdownNavigation from '../../utils/keyPress'

const DropdownInput = ({ 
    width, 
    setSelectedCity, 
    type, 
    setClicktype, 
    mobilePlaceholder, 
    height, 
    defaultValue, 
    placeholder, 
    data, 
    bgColor, 
    selectedValue, 
    setSelectedValue , 
    setHeight = false,
 }) => {

    const [showList, setShowList] = useState(false);
    // const [selectedValue, setSelectedValue] = useState('')
    const dropdownRef = useRef(null)
    const handleShowList = () => {
        if(type === 'pick') {
            setClicktype('pickup')
        } else {
            setClicktype('drop')
        }
        setShowList((prevState) => prevState === true ? false : true)
    }

    const handleSelectValue = (value) => {
        setSelectedValue(value.name);
        setShowList(false);
        if (setSelectedCity) setSelectedCity(value);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowList(false); // Close only if clicked *outside*
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const refIndex = useDropdownNavigation(dropdownRef, showList, 'drop-down-list-single-item')


  return (
    <div  ref={dropdownRef} className={`dropdown-input-main-container ${setHeight ? 'decrease-height' : ''} ${showList ? 'remove-border-radios-bottom' : ''}`} style={{width: width, backgroundColor: bgColor}}>
        <div className='dropdown-input-selected-value-container' onClick={handleShowList}>
            <div className={`dropdown-placeholder ${selectedValue !== '' ? 'show-place-holder' : ''}`}>
                  <p>{placeholder}</p>
                  <p>{mobilePlaceholder}</p>
            </div>
            <div className='dropdown-option-select-head'>
                <p>{selectedValue !== '' ? selectedValue : defaultValue}</p>
                {/* <p>{selectedValue !== '' ? selectedValue : mobilePlaceholder}</p> */}
                <MdOutlineArrowDropDown size={15} color='var(--primary-color)' className='dropdown-arrow-icon' />
            </div>
        </div>
        <div className={`dropdown-list-container ${showList ? 'show-drop-down-list' : ''}`} style={{height: showList ? height : 0}}>
            {data.map((item, index) => (
                <p className={`drop-down-list-single-item ${refIndex === index ? 'active-dropdown-item' : ''}`}  key={index} onClick={() => handleSelectValue(item)}>{item.name}</p>
            ))}
        </div>
    </div>
  )
}

export default DropdownInput