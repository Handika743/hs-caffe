"use client";
import React from "react";
import {
  House,
  Info,
  BookOpenText,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UserInfoDropDown from "./UserInfoDropDown";

const SlideNavMenu = ({ isOpen, session }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const Hoverstyle =
    "hover:text-secondary hover:border-b-2 hover:border-secondary";

  const handleUserInfoDropDown = () => {
    setIsOpenDropDown((prev) => !prev);
  };
  return (
    <div
      className={`flex  items-center absolute top-20 right-0  md:static md:h-20 bg-primary h-[calc(100vh-80px)] min-w-[200px] origin-right duration-300 ease-in-out scale-x-0 ${
        isOpen ? "scale-x-100" : ""
      } md:bg-transparent md:scale-100`}
    >
      <ul className="flex flex-col items-start justify-start text-start md:flex-row gap-5 md:items-center  h-full w-full p-4 text-lg font-semibold">
        <Link
          href={"/"}
          className="border-b-2 hover:border-secondary w-full border-transparent duration-200 py-2 hover:text-secondary"
        >
          <li className="flex items-center gap-4  ">
            {" "}
            <House className="md:hidden" />
            Home
          </li>
        </Link>
        <Link
          href={"/about"}
          className="border-b-2 hover:border-secondary w-full border-transparent duration-200 py-2 hover:text-secondary"
        >
          <li className="flex items-center gap-4  ">
            {" "}
            <Info className="md:hidden" />
            About
          </li>
        </Link>
        <Link
          href={"/menu"}
          className="border-b-2 hover:border-secondary w-full border-transparent duration-200 py-2 hover:text-secondary"
        >
          <li className="flex items-center gap-4  ">
            {" "}
            <BookOpenText className="md:hidden" /> Menu
          </li>
        </Link>
        <Link
          href={"/"}
          className="border-b-2 hover:border-secondary w-full border-transparent duration-200 py-2 hover:text-secondary"
        >
          <li className="flex items-center gap-4  ">
            {" "}
            <LayoutDashboard className="md:hidden" />
            Dashboard
          </li>
        </Link>
        <Link
          href={"/keranjang"}
          className="border-b-2 hover:border-secondary w-full border-transparent duration-200 py-2 hover:text-secondary"
        >
          <li className="flex items-center gap-4  ">
            {" "}
            <ShoppingBasket className="md:hidden" />
            Keranjang
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SlideNavMenu;
