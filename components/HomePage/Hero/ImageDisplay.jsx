import React from "react";

const ImageDisplay = ({ newsMenu }) => {
  return (
    <div className="" key={newsMenu.id}>
      <div className="relative flex flex-col items-center">
        <img
          src={newsMenu.image_display}
          alt="image display"
          className="h-[300px] w-[300px] md:h-[400px] md:w-[400px]"
        />
        <p className="absolute -top-5 left-1/2 text-2xl font-bold uppercase">
          <span className="text-gradient-animate">B</span>
          <span className="text-gradient-animate">A</span>
          <span className="text-gradient-animate">R</span>
          <span className="text-gradient-animate">U</span>{" "}
          <span className="text-gradient-animate">!!!</span>
        </p>

        <div className="bg-secondary/75 absolute right-0 bottom-0 rounded-xl">
          <h3 className="p-2 text-2xl font-bold">{newsMenu.nama_menu}</h3>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
