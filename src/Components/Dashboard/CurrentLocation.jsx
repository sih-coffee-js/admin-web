import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SideBarLayout from './SideBarLayout';

const CurrentLocation = () => {
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`
          );
          const place = response.data.features[0];
          const address = place?.place_name || "";
          setAddress(address);
        } catch (error) {
          toast.error("Failed to get address from coordinates.");
          console.error("Error getting address:", error);
        }
      }, (error) => {
        toast.error("Failed to get current location.");
        console.error("Error getting location:", error);
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (coordinates.latitude && coordinates.longitude) {
      const payload = {
        name: buildingName || "Unnamed Building",
        longitude: coordinates.longitude,
        latitude: coordinates.latitude
      };

      try {
        const response = await axios.post('http://localhost:8000/api/location/add', payload);
        if (response.status === 200) {
          toast.success('Location submitted successfully!');
        } else {
          toast.error('Failed to submit location.');
        }
      } catch (error) {
        toast.error('Failed to submit location.');
        console.error("Error submitting location:", error);
      }
    } else {
      toast.error("Please fetch your location before submitting.");
    }
  };

  return (
    <SideBarLayout currentView="currentLocation" setCurrentView={() => {}}>
      <div className="flex flex-col items-center min-h-screen text-gray-100 bg-gray-900 p-6">
        <h1 className="text-4xl font-bold mb-4">Submit Your Current Location</h1>
        <form onSubmit={handleSubmit} className="p-6 w-full max-w-lg bg-gray-800 rounded-lg shadow-lg">
          {/* Building Name */}
          <div className="mb-4">
            <label htmlFor="buildingName" className="block text-gray-300 font-semibold mb-2">
              Building Name:
            </label>
            <input
              type="text"
              id="buildingName"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              className="w-full p-2 border rounded bg-gray-700 text-gray-300"
              placeholder="Enter building name"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-300 font-semibold mb-2">
              Current Location:
            </label>
            <div className="flex">
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-l bg-gray-700 text-gray-300"
                placeholder="Your address"
              />
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
              >
                Use Current Location
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
          >
            Submit Location
          </button>
        </form>
      </div>
    </SideBarLayout>
  );
};

export default CurrentLocation;
