const Footer = () => {
  return (
    <footer className="bg-blue-50 text-black py-8 mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Footer Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-8">
          {/* ELocate Description */}
          <div className="mb-4 lg:w-1/3">
            <h3 className="text-lg font-bold mb-2">GeoTrack</h3>
            <p className="text-sm">
                Geolocation-Based Attendance Tracking Mobile Application.
            </p>
          </div>

          {/* Services */}
          <div className="lg:w-1/3">
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
          </div>

          {/* Contact Information */}
          <div className="lg:w-1/3">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p><i className="fa-solid fa-location-dot"></i> KLE Technological University</p>
            <p>Hubballi, Karnataka, 580031</p>
            <p><i className="fa-solid fa-phone"></i> +911234567890</p>
            <p><i className="fa-solid fa-envelope"></i> contact@ewaste-eco.com</p>
            <div className="flex items-center space-x-2 mt-3">
              <i className="fa-brands fa-instagram text-blue-500 hover:text-blue-700 cursor-pointer ml-36"></i>
              <i className="fa-brands fa-twitter text-blue-500 hover:text-blue-700 cursor-pointer "></i>
              <i className="fa-brands fa-facebook text-blue-500 hover:text-blue-700 cursor-pointer "></i>
              <i className="fa-brands fa-linkedin text-blue-500 hover:text-blue-700 cursor-pointer"></i>
            </div>
          </div>

        </div>

        {/* Footer Bottom Section */}
        <div className="flex justify-between items-center border-t border-gray-600 pt-4">
          {/* Copyright */}
          <p className="text-sm">&copy; {new Date().getFullYear()} 	GAIL, Ministry of Petroleum and Natural Gas. All Rights Reserved.</p>

          {/* Legal Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm hover:underline">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

