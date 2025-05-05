import React from "react";

const Hamburger = ({ click, isOpen }) => {
  return (
    <button className="h-full cursor-pointer" onClick={click}>
      <span
        className={`bg-secondary my-2 block h-[2px] w-[30px] origin-left transform duration-300 ease-in-out ${
          isOpen ? "rotate-45" : ""
        }`}
      ></span>

      <span
        className={`bg-secondary my-2 block h-[2px] w-[30px] origin-center transform duration-300 ease-in-out ${
          isOpen ? "scale-0" : ""
        }`}
      ></span>
      <span
        className={`bg-secondary my-2 block h-[2px] w-[30px] origin-left transform duration-300 ease-in-out ${
          isOpen ? "-rotate-45" : ""
        } `}
      ></span>
    </button>
  );
};

export default Hamburger;
