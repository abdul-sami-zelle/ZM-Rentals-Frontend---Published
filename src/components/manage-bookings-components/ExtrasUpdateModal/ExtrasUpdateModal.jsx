import React, { useEffect, useState } from 'react'
import './ExtrasUpdateModal.css';
import { CgCloseO } from 'react-icons/cg';
import { url } from '../../../utils/services';
import axios from 'axios';
import { FiMinus, FiPlus } from "react-icons/fi";

const ExtrasUpdateModal = ({ showExtrasModal, setShowExtrasModal, payload, setPayload, carId }) => {

    
    const [tempExtras, setTempExtras] = useState([])
    const [vehicleData, setVehicleData] = useState({});
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
        if (
            payload?.booking?.extras?.length > 0 &&
            vehicleData?.extras?.length > 0
        ) {
            const mappedExtras = payload.booking.extras.map((extraItem) => {
                // find the matching object from vehicleData


                const foundItem = vehicleData.extras.find(
                    (v) => v.id === extraItem.extras_pricing_id
                );


                return {
                    extras_option_id: foundItem ? foundItem.id : 0,
                    main_id: foundItem ? foundItem.extras_option_id : 0,
                    quantity: extraItem.quantity || 0, // 👈 taking quantity from booking payload
                    rate: extraItem.rate,
                    name: extraItem.name
                };
            });

            setTempExtras(mappedExtras);
        }
    }, [vehicleData]);


    




    const handleInputChange = (item, value) => {
        const min = Number(item.min_qty) || 0;
        const max = Number(item.max_qty) || Infinity;

        // Convert to number safely
        let quantity = Number(value);
        if (isNaN(quantity)) quantity = 0;

        // Get current quantity if already exists
        const existingExtra = tempExtras.find(e => e.extras_option_id === item.id);
        const currentQty = existingExtra ? Number(existingExtra.quantity) : 0;

        // 🔹 If increasing or decreasing manually, always step by 1
        if (quantity > currentQty) quantity = currentQty + 1;
        if (quantity < currentQty) quantity = currentQty - 1;

        // 🔹 Clamp within min/max
        if (quantity < 0) quantity = 0;
        if (quantity > max) quantity = max;

        // 🔹 Remove if quantity = 0
        if (quantity === 0) {
            setTempExtras(prev =>
                prev.filter(extra => extra.extras_option_id !== item.id)
            );
            return;
        }

        // 🔹 Update or add new
        setTempExtras(prev => {
            const existingIndex = prev.findIndex(
                extra => extra.extras_option_id === item.id
            );

            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity,
                };
                return updated;
            }

            // Add new item on first click
            return [
                ...prev,
                {
                    extras_option_id: item.id,
                    main_id: item.extras_option_id,
                    quantity,
                    rate: item.rate,
                    name: item.name,
                },
            ];
        });
    };




    const handleUpdateExtras = () => {
        setPayload((prev) => ({
            ...prev,
            booking: {
                ...prev.booking,
                extras: tempExtras
            }
        }))
        setShowExtrasModal(false)
    }





    return (
        <div className={`extras-modal-main-contianer ${showExtrasModal ? 'show-extras-main-modal' : ''}`} onClick={() => setShowExtrasModal(false)}>
            <div className={`extrasinner-modal ${showExtrasModal ? 'show-extras-inner-modal' : ''}`} onClick={(e) => e.stopPropagation()}>

                <div className='extras-head-contianer'>
                    <h3>Extras</h3>
                    <CgCloseO color='#000' size={20} style={{ cursor: 'pointer' }} onClick={() => setShowExtrasModal(false)} />
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

                <div className='update-extras-options-contianer'>
                    {vehicleData?.extras?.map((item, index) => (
                        <div className='update-extras-single-option' key={index}>
                            <h3>{item.name}</h3>
                            <div className='update-extras-single-option-quantity-controler'>
                                <button
                                    disabled={
                                        (tempExtras.find(q => q.extras_option_id === item.id)?.quantity || 0) <= 0
                                    }
                                    onClick={() => {
                                        const currentQty = tempExtras.find(q => q.extras_option_id === item.id)?.quantity || 0;
                                        handleInputChange(item, currentQty - 1);
                                    }}
                                >
                                    <FiMinus size={20} color='#FFF' />
                                </button>
                                <input
                                    type="number"
                                    className="bottom-single-extra-input-value"
                                    readOnly
                                    value={
                                        tempExtras.find((qty) => qty.extras_option_id === item.id)?.quantity ?? 0
                                    }
                                />
                                <button
                                    disabled={
                                        (tempExtras.find(q => q.extras_option_id === item.id)?.quantity || 0) >= Number(item.max_qty)
                                    }
                                    onClick={() => {
                                        const currentQty = tempExtras.find(q => q.extras_option_id === item.id)?.quantity || 0;
                                        handleInputChange(item, currentQty + 1);
                                    }}
                                >
                                    <FiPlus size={20} color='#FFF' />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                <button onClick={handleUpdateExtras} className='desktop-extras-update-button'>Update Extras</button>


            </div>


        </div>
    )
}

export default ExtrasUpdateModal