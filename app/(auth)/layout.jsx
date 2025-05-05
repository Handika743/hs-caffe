import React from "react";

const authLayout = ({ children }) => {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-between px-6 py-8 mx-auto min-h-screen">
        <div className="w-full border-2 border-secondary bg-bar rounded-lg shadow mt-0 max-w-md text-trirdary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default authLayout;
