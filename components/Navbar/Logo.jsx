import React from "react";
import { Coffee } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="text-secondary flex gap-4 flex-row items-center h-full ">
        <Coffee size={32} className="" />
        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
          HS<span className="text-trirdary">Café</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
