const Home = () => {
  return (
    <div>
      <div
        className="relative bg-cover bg-no-repeat bg-center h-48 w-full"
        style={{ backgroundImage: "url('logo.jpg')" }}
      >
        <div className="flex items-center justify-center h-full w-full bg-gradient-to-r from-transparent to-black">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg text-center px-4">
            Geo Track
          </h1>
        </div>
      </div>
      {/* <div className="">
        <h1 className="text-7xl text-gray-700 font-bold">Geo Track</h1>
      </div> */}
      <div className="flex">
        <div className="flex-1 flex flex-col justify-center p-8">
          <div className="text-4xl font-bold mb-4 text-blue-800">
            Welcome to Geo Track
          </div>
          <div className="text-xl mb-6 text-gray-700">
            Your technology partner for geo attendance solutions.
          </div>
          

          {/* Dynamic Display Text */}
          {/* <div className="text-2xl text-blue-700 p-4">
            {displayText}
          </div> */}
          <div className="text-lg mb-8 text-gray-800">
            Geo Track is your ultimate solution for tracking and managing
            attendance for any organisation.
          </div>
          <br></br>
          <div>
          <button className="text-4xl bg-blue-500 text-white py-2 px-10 w-40 rounded-md" 
          onClick={() => window.location.href = '/login'}>Login</button>
          </div>
        </div>

        <div className="flex">
          <img
            className="w-[800px] h-[600px] bg-cover bg-center flex items-end p-10"
            src="pic.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
