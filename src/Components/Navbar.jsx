import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";

function Navbar() {
  const [locations, setLocation] = useState("Loading...");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex items-center justify-between p-4 border-b bg-gray-700 shadow-md">
      <div className="flex flex-grow items-center">
        <Link
          to="/"
          className="text-white text-xl mx-4 hover:text-blue-400 focus:text-blue-400 transition-colors"
        >
          Home
        </Link>
      </div>
      <h1 className="font-bold text-white flex items-center gap-2 text-lg md:text-xl">
        <FiMapPin aria-hidden="true" role="img" className="text-xl" />
        {locations}
      </h1>
    </div>
  );
}

export default Navbar;
