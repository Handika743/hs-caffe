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

const NavMenu = ({ isOpen, handleDropDown, isOpenDropDown }) => {
  return (
    <div
      className={`flex   absolute top-20 right-0  md:static md:h-20 bg-primary h-[calc(100vh-80px)] min-w-[200px] origin-right duration-300 ease-in-out scale-x-0 ${
        isOpen ? "scale-x-100" : ""
      } md:bg-transparent md:scale-100`}
    >
      <div className="flex flex-col justify-between items-center p-6">
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
        </ul>
        {/* <div className="md:hidden ">
          <UserInfoDropDown
            click={handleDropDown}
            isOpenDropDown={isOpenDropDown}
          />
        </div> */}
      </div>
    </div>
  );
};

export default NavMenu;
