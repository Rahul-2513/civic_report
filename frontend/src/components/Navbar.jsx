function Navbar() {
  return (
    <div className="h-20 bg-white shadow-sm px-6 flex items-center justify-between">

      <div className="w-[400px]">

        <input type="text" placeholder="Search complaints ..."
        className="w-full bg-gray-100 px-4 py-3 rounded-xl outline-none focus: ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-6">

         <div className="relative cursor-pointer">

          <span className="text-2xl">
            🔔
          </span>

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            3
          </span>

        </div>
        <div className=" flex items-center gap-3 cursor-pointer">
            <img  src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-blue-500"/>

            <div>
               <h4 className="font-semibold text-grey-800">
              Sumit kumar</h4>
              <p className="text-sm text-gray-500">
                Citizen
              </p>
            </div>
        </div>
      </div>

    </div>
    
  
  );
}

export default Navbar;