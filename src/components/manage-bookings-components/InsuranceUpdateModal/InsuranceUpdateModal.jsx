import React, { useEffect, useState } from 'react'
import './InsuranceUpdateModal.css';
import { CgCloseO } from "react-icons/cg";
import { url } from '../../../utils/services';
import axios from 'axios';

const InsuranceUpdateModal = ({ insuranceModal, setInsuranceModal, carId, payload, setPayload }) => {

    const [vehicleData, setVehicleData] = useState({});
    const [selectedPackage, setSelectedPackage] = useState()

    const handleGetCarWithId = async () => {
        const api = `${url}/cars/get/${payload?.booking?.car_id}`;
        try {
            const response = await axios.get(api);
            if (response.status === 200) {
                setVehicleData(response.data)
            }
        } catch (error) {
            console.error("UnExpected Server Error", error);
        }
    }
    useEffect(() => { handleGetCarWithId() }, [carId])

    useEffect(() => {
        const selectedOption = vehicleData?.insurance?.find((item) => item.id === payload?.booking?.insurance_id);
        // const selectedOption = vehicleData?.insurance?.find((item) => item.insurance_option_id === payload?.booking?.insurance_id);
        setSelectedPackage(selectedOption?.insurance_option_id)
    }, [vehicleData])

    const handleInsuranceSelect = (item) => {
        setSelectedPackage(item.insurance_option_id)
        setPayload((prev) => ({
            ...prev,
            booking: {
                ...prev.booking,
                insurance_id: item.id
            }
        }))
    }
    
    return (
        <div className={`insurance-update-modal-main-contianer ${insuranceModal ? 'show-insurance-modal' : ''}`} onClick={() => setInsuranceModal(false)}>
            <div className={`insurance-modal-inner-contianer ${insuranceModal ? 'show-inner-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className='insurance-update-head'>
                    <h3>Insurance</h3>
                    <CgCloseO color='#000' size={20} style={{ cursor: 'pointer' }} onClick={() => setInsuranceModal(false)} />
                </div>

                <div className='insurance-update-vehicle-contianer'>
                    <div className='insurance-modal-vehilce-image-contianer'>
                        <img src={url + vehicleData?.image} alt='img' />
                    </div>
                    <div className='insurance-update-vehicle-details-section'>
                        <h3>{vehicleData?.name}</h3>
                        <p>{vehicleData?.type?.name}</p>
                        <span>NZD {vehicleData?.base_rate}/Day</span>
                    </div>
                </div>

                <div className='insurace-update-options'>
                    {vehicleData && vehicleData?.insurance?.map((item, index) => (
                        <div className='insurance-update-single-option' onClick={() => handleInsuranceSelect(item)}>
                            <div className='insurance-update-head'>
                                <input
                                    type='radio'
                                    key={item.id}
                                    checked={item.insurance_option_id === selectedPackage}
                                    readOnly
                                />
                                <h3>{item.name}</h3>
                            </div>

                            <div className='insuranceupdate-bond-and-excees'>
                                <span>
                                    <p>Bond</p>
                                    <p>NZD {item.bond}</p>
                                </span>
                                <span>
                                    <p>Excess</p>
                                    <p>NZD {item.excess}</p>
                                </span>
                            </div>

                            <div className='insurance-update-price'>
                                {parseInt(item.rate) === 0 ? (
                                    <h3>Free</h3>
                                ) : (
                                    <h3>NZD {item.rate}</h3>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InsuranceUpdateModal