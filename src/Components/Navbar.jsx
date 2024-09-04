import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";

function Navbar() {
  const [locations, setLocation] = useState("Loading...");

  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.features[0].context.find((context) =>
                context.id.includes("place")
              ).text;
              const state = data.features[0].context.find((context) =>
                context.id.includes("region")
              ).text;
              setLocation(`${city}, ${state}`);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        },
        (error) => {
          console.error(error);
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex flex-grow justify-start">
        <Link
          to="/"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Home
        </Link>
      </div>

      <h1 className="font-montserrat font-bold mr-5 md:ml-4 md:text-xl text-emerald-600 flex items-center gap-[1vh]">
        <FiMapPin aria-hidden="true" role="img" />
        {locations}
      </h1>
    </div>
  );
}

export default Navbar;
