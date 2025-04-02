import React from "react";
const Header = () => {
  return (
    <header className="bg-white shadow-sm border-t-2 border-[var(--cms-dark)]">
      <div className="max-w-[900px] mx-auto">
        <div className="bg-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="ml-4">
              <img
                src="https://asett.cms.gov/resource/1549656663000/Images/all-purpose-banner-v3.jpg"
                alt="ASETT Banner"
                className="h-16 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
