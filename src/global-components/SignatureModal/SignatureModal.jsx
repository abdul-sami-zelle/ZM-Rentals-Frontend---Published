import React, { useRef } from 'react'
import './SignatureModal.css'
import { IoCloseCircleOutline } from "react-icons/io5";
import SignaturePad from "react-signature-pad-wrapper";

const SignatureModal = ({ showSignature, setShowSignature, setCustomerSignature,}) => {
    const handleCloseSignatureModal = () => {
        setShowSignature(false);
    }

    const sigPadRef = useRef(null);

    const handleClear = () => {
        sigPadRef.current.clear();
    };

    const handleSave = () => {
        if (!sigPadRef.current.isEmpty()) {
            const dataURL = sigPadRef.current.toDataURL("image/png");

            // Convert Base64 → Blob
            const byteString = atob(dataURL.split(",")[1]);
            const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });

            // Now you have a real PNG blob ✅

            // If you want as a File (to upload)
            const file = new File([blob], "signature.png", { type: "image/png" });

            setCustomerSignature(file)
            setShowSignature(false)
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCustomerSignature(file);
            setShowSignature(false);
        }
    };


    return (
        <div className={`signature-modal-main-container ${showSignature ? 'show-signature' : ''}`} onClick={handleCloseSignatureModal}>
            <div className={`signature-modal-inner ${showSignature ? 'signature-inner-show' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className='signature-modal-head'>
                    <h3>Add Signature</h3>
                    <button onClick={handleCloseSignatureModal}>
                        <IoCloseCircleOutline size={20} color='#535353' />
                    </button>
                </div>
                <div className='signature-modal-pad'>
                    <div>
                        <SignaturePad
                            ref={sigPadRef}
                            options={{
                                penColor: "blue", // 👈 custom pen color
                            }}
                            style={{
                                border: "1px solid #ccc",
                                width: "100%", // responsive
                                height: "300px",
                            }}
                        />
                    </div>
                </div>
                <div className='signature-modal-footer'>
                    <div className='signature-upload-and-clear'>
                        <p onClick={handleClear}>Clear Signature</p>
                        <button onClick={() => document.getElementById("signatureUpload").click()}>Upload Signature</button>
                        <input
                            id="signatureUpload"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleUpload}
                            
                        />
                    </div>
                    <button className='save-signature-button' onClick={handleSave}>Save Signature</button>
                </div>
            </div>
        </div>
    )
}

export default SignatureModal