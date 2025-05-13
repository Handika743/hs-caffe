"use client";
import React from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import Hamburger from "./Hamburger";
import { useState } from "react";
import { useSession } from "next-auth/react";
import UserInfoDropDown from "./UserInfoDropDown";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const handleNavMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleUserInfoDropDown = () => {
    setIsOpenDropDown((prev) => !prev);
  };
  return (
    <section className="bg-primary text-trirdary h-20   fixed top-0 w-full z-50">
      <div className="flex justify-between px-10 relative h-20">
        <div>
          <Logo />
        </div>
        <div className="">
          <NavMenu
            isOpen={isOpen}
            session={session}
            isOpenDropDown={isOpenDropDown}
            click={handleUserInfoDropDown}
          />
        </div>
        <div className="hidden md:block">
          <UserInfoDropDown
            setIsOpenDropDown={setIsOpenDropDown}
            isOpenDropDown={isOpenDropDown}
            click={handleUserInfoDropDown}
          />
        </div>
        <div className="md:hidden">
          <Hamburger click={handleNavMenu} isOpen={isOpen} />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
