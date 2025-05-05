import React from "react";
import Greeting from "./Greeting";
import ImageDisplay from "./ImageDisplay";
import prisma from "@/lib/prisma";

const Hero = async () => {
  const newsMenu = await prisma.menu.findFirst({
    where: {
      jenis_menu: "Kopi",
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <div>
      <div className="relative bg-primary text-white pb-20" key={newsMenu.id}>
        <div className="p-10 flex flex-col gap-10 md:flex-row items-center">
          <div className="md:w-1/2">
            <Greeting newsMenu={newsMenu} />
          </div>
          <div className="md:w-1/2">
            <ImageDisplay newsMenu={newsMenu} />
          </div>
        </div>

        {/* Wave W Shape */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[100px] md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 Q150,0 300,30 T600,30 T900,30 T1200,30 L1200,100 L0,100 Z"
              fill="#fff"
            />
          </svg>
          <svg
            className="relative w-full h-[100px] hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1800 100"
            preserveAspectRatio="none"
          >
            <path
              d="
        M0,30 
        Q75,0 150,30 
        T300,30 
        T450,30 
        T600,30 
        T750,30 
        T900,30 
        T1050,30 
        T1200,30 
        T1350,30 
        T1500,30 
        T1650,30 
        T1800,30 
        L1800,100 
        L0,100 
        Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
