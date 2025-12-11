import React, { use, useEffect, useState } from "react";
import "./VehicleCard.css";
import Image from "next/image";
import { BsFillFuelPumpFill, BsFillGearFill } from "react-icons/bs";
import { FaDroplet } from "react-icons/fa6";
import { handleScrolllTop } from "../../utils/midlewares";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useBookingContext } from "@/context/bookingContext/bookingContext";
import { useSearchVehicle } from "@/context/searchVehicleContext/searchVehicleContext";
import Toust from "@/modals/Toust/Toust";
import { formatPrice } from "../../utils/fotmateValues.js";
import { url } from "@/utils/services";

const VehicleCard = ({
  vehicleImage,
  vehicleName,
  vehicleAge,
  seePrice,
  transmission,
  fuelType,
  handleModalOpen,
  vehicleId,
  vehicleData,
}) => {
  // const { searchVehiclePayload, setSearchVehiclePayload } = useSearchVehicle()
  const { setVehicleSesionData } = useBookingContext();
  const [toustShow, setTOustShow] = useState(false);
  const [toustMessage, setToustMessage] = useState("");

  const router = useRouter();
  const { setBookingVehicleData } = useBookingContext();

  const {
    isVehicleSearched,
    showBookingButton,
    setShowBookingButton,
    searchVehiclePayload,
  } = useSearchVehicle();

  const { pickup_location, drop_location, pickup_time, drop_time } =
    searchVehiclePayload;
  // const [showBookingButton, setShowBookingButton] = useState(false);
  useEffect(() => {
    if (pickup_location && drop_location && pickup_time && drop_time) {
      setShowBookingButton(true);
    } else {
      setShowBookingButton(false);
    }
  }, []);

  const handleBookVehicle = async (e) => {
    e.stopPropagation();
    const api = `${url}/cars/get/${vehicleId}`;

    try {
      const response = await axios.get(api);
      if (response.status === 200) {
        setShowBookingButton(true);
        setBookingVehicleData(response.data);
        setVehicleSesionData(vehicleData);
        sessionStorage.setItem(
          "selected-vehicle-details",
          JSON.stringify(response.data)
        );
        sessionStorage.setItem("vehicle-details", JSON.stringify(vehicleData));
        router.push("/book-now");
      } else {
        setShowBookingButton(false);
      }
    } catch (error) {
      console.error("Validation or Server Error:", error.message);
      setShowBookingButton(false);
      return;
    }
  };

  const [bookingDays, setBookingDays] = useState({});

  useEffect(() => {
    const bookingDetails = JSON.parse(
      sessionStorage.getItem("pick_and_drop_details")
    );
    setBookingDays(bookingDetails);
  }, []);

  function countDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Convert both to UTC midnight (ignore local timezone)
    const utcStart = Date.UTC(
      start.getUTCFullYear(),
      start.getUTCMonth(),
      start.getUTCDate()
    );
    const utcEnd = Date.UTC(
      end.getUTCFullYear(),
      end.getUTCMonth(),
      end.getUTCDate()
    );

    // Difference in days
    const diffDays = Math.floor((utcEnd - utcStart) / (1000 * 60 * 60 * 24));

    // Always include the start day
    return diffDays + 1;
  }

  const pathname = usePathname();

  return (
    <div className="vehicle-card-main-container" onClick={handleModalOpen}>
      <div
        className={`vehicle-card-image-container ${
          pathname !== "/" && vehicleData?.available === 0 ? "sold-out-car" : ""
        }`}
      >
        <Image src={vehicleImage} alt="small car" width={315} height={160} />
      </div>
      <div className="vehicle-details-container">
        <div className="vehicle-name-and-price">
          <span>
            <h3>{vehicleName}</h3>
            <div className="vehicle-age-and-fuel-efficiency-container">
              <p>{vehicleAge} Year Old</p>
              {vehicleData.details.fuel_efficiency === 1 ? (
                <Image
                  src={"/assets/Meter-Chart/red.png"}
                  width={100}
                  height={30}
                  alt="img"
                />
              ) : vehicleData.details.fuel_efficiency === 2 ? (
                <Image
                  src={"/assets/Meter-Chart/orange.png"}
                  width={100}
                  height={30}
                  alt="img"
                />
              ) : vehicleData.details.fuel_efficiency === 3 ? (
                <Image
                  src={"/assets/Meter-Chart/yellow.png"}
                  width={100}
                  height={30}
                  alt="img"
                />
              ) : vehicleData.details.fuel_efficiency === 4 ? (
                <Image
                  src={"/assets/Meter-Chart/light-green.png"}
                  width={100}
                  height={30}
                  alt="img"
                />
              ) : (
                <Image
                  src={"/assets/Meter-Chart/dark-green.png"}
                  width={100}
                  height={30}
                  alt="img"
                />
              )}
            </div>
          </span>
          <div
            className={`price-and-book-now ${
              vehicleData.available === 0 ? "items-align-end" : ""
            }`}
          >
            {vehicleData.available && vehicleData.available !== 0 ? (
              isVehicleSearched ? (
                <div className="price-and-book-now-ammount">
                  <span>
                    {" "}
                    <h3>NZ$ {vehicleData.base_rate}</h3>
                    <p>/day</p>{" "}
                  </span>
                  {vehicleData.duration_discount !== 0 ? (
                    <span>
                      {" "}
                      <del style={{ marginRight: "10px" }}>
                        NZ$ {formatPrice(vehicleData?.was_price)}
                      </del>{" "}
                      <span className="total-price-after-discount">
                        {" "}
                        <h3>NZ$ {formatPrice(vehicleData.sub_total)}</h3>{" "}
                        <p>Total</p>{" "}
                      </span>{" "}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      <span className="total-price-after-discount">
                        {" "}
                        <h3>NZ$ {formatPrice(vehicleData.sub_total)}</h3>{" "}
                      </span>{" "}
                    </span>
                  )}
                </div>
              ) : (
                <h3
                  className="vehicle-price-heading"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScrolllTop();
                  }}
                >
                  {seePrice}
                </h3>
              )
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  width: "100%",
                }}
              >
                <h3
                  className="vehicle-price-heading"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScrolllTop();
                  }}
                >
                  {seePrice}
                </h3>
              </div>
            )}

            {vehicleData?.daily_rates &&
              vehicleData?.daily_rates &&
              (vehicleData.available === 0 ? (
                <button
                  disabled
                  className={`sold-button ${
                    pathname !== "/" && showBookingButton
                      ? "show-booking-button"
                      : ""
                  }`}
                >
                  Sold Out
                </button>
              ) : (
                <button
                  className={`booking-button ${
                    showBookingButton ? "show-booking-button" : ""
                  }`}
                  onClick={handleBookVehicle}
                >
                  Book Now
                </button>
              ))}

            {/* {vehicleData.available === 0 ? (
              <button disabled className={`sold-button ${pathname !== '/' && showBookingButton ? 'show-booking-button' : ''}`}>Sold Out</button>
            ) : (
              <button className={`booking-button ${showBookingButton ? 'show-booking-button' : ''}`} onClick={handleBookVehicle}>Book Now</button>
            )} */}
          </div>
        </div>
        <div className="vehicle-type">
          <div className="vehicle-fuel-type-and-gear-container">
            <span>
              <BsFillGearFill size={20} color="var(--primary-color)" />
              {transmission}
            </span>
          </div>

          <p className="vehicle-type-info">+info</p>
        </div>
      </div>
      <Toust
        showToust={toustShow}
        setShowToust={setTOustShow}
        message={toustMessage}
      />
    </div>
  );
};

export default VehicleCard;
