// "use client"; // important: ensures this runs on the client

// import { useEffect } from "react";

// export default function TrustpilotWidget() {
//   useEffect(() => {
//     if (!window.Trustpilot) {
//       const script = document.createElement("script");
//       script.src = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
//       script.async = true;
//       document.body.appendChild(script);
//     } else {
//       // Re-render widget if script already loaded
//       window.Trustpilot.loadFromElement(
//         document.querySelector(".trustpilot-widget")
//       );
//     }
//   }, []);

//   return (
//     <div
//       className="trustpilot-widget"
//       data-locale="en-US"
//       data-template-id="56278e9abfbbba0bdcd568bc"
//       data-businessunit-id="696441eba1c7054e87aa4382"
//       data-style-height="52px"
//       data-style-width="100%"
//       data-token="dd0b50b7-f118-4cc8-bc93-e4af28edc4c0"
//     >
//       <a
//         href="https://www.trustpilot.com/review/zmrentals.co.nz"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Trustpilot
//       </a>
//     </div>
//   );
// }


"use client";

import Image from "next/image";

export default function TrustpilotWidget() {
    return (
        <a
            href="https://www.trustpilot.com/review/zmrentals.co.nz"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", cursor: "pointer" }}
        >
            <img src="/assets/trustpillot.png" style={{ width: "150px", height: "auto" }} alt="" srcset="" />
            {/* <Image
                src="/assets/trustpillot.webp" // put your badge image in /public folder
                alt="Read our Trustpilot Reviews"
                width={150}  // adjust as needed
                height={50}  // adjust as needed
                style={{ objectFit: "contain" }}
            /> */}
        </a>
    );
}
