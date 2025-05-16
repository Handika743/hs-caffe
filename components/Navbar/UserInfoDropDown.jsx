"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut, signIn } from "next-auth/react";
import {
  ChevronDown,
  ChevronUp,
  ShoppingBasket,
  LayoutDashboard,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";

const UserInfoDropDown = ({ isOpenDropDown, click }) => {
  const { data: session, status } = useSession();
  const actionLabel = session ? "Logout" : "Login";
  const actionURL = session ? "/api/auth/signout" : "/api/auth/signin";
  const actionStyle = session ? "bg-red-500" : "bg-green-500";
  const router = useRouter();
  const [keranjangMenu, setKeranjangMenu] = useState([]);
  const [orderMenu, setOrder] = useState([]);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };
  const handleLogin = () => {
    window.location.href = "/login";
  };
  const handleClick = session ? handleLogout : handleLogin;

  const truncateChars = (str, maxChars = 10) => {
    if (!str) return "";
    return str.length <= maxChars ? str : str.slice(0, maxChars) + "...";
  };

  const fetchKeranjangNotif = async () => {
    const response = await fetch("/api/keranjang");
    if (response.ok) {
      const data = await response.json();
      setKeranjangMenu(data);
    }
  };
  const fetchOrderNotif = async () => {
    const response = await fetch("/api/order");
    if (response.ok) {
      const data = await response.json();
      setOrder(data);
    }
  };
  useEffect(() => {
    fetchKeranjangNotif();
    fetchOrderNotif();
  }, []);
  return (
    <div className="h-full  flex flex-row items-center relative">
      <div
        className="flex font-bold border-2 border-secondary p-1.5 rounded-2xl items-center gap-4 min-w-[150px] justify-between "
        onClick={click}
      >
        <div className="w-full text-center cursor-pointer">
          {session ? (
            <>
              <h1 className="md:text-lg text-base">
                <span className="text-secondary">Halo! </span>
                <span className="uppercase">
                  {truncateChars(session?.user.name)}
                </span>
              </h1>
            </>
          ) : (
            <h1>
              <span>Guest</span>
            </h1>
          )}
        </div>
        <div>
          <button className="flex flex-col ">
            <ChevronUp
              className={`${
                isOpenDropDown ? "rotate-180" : "rotate-0"
              } transform duration-200 ease-in-out md:w-[20px] md:h-[20px] w-[15px] h-[15px]`}
            />
            <ChevronDown
              className={`${
                isOpenDropDown ? "rotate-180" : "rotate-0"
              } transform duration-200 ease-in-out md:w-[20px] md:h-[20px] w-[15px] h-[15px]`}
            />
          </button>
        </div>
      </div>
      <div
        className={`absolute bottom-15 md:top-20 md:bottom-auto origin-bottom md:origin-top bg-primary border-2 border-secondary w-full p-2 rounded-2xl overflow-hidden transform duration-300 ease-in-out transition-all
    ${
      isOpenDropDown
        ? "opacity-100 scale-y-100 pointer-events-auto"
        : "opacity-0 scale-y-0 pointer-events-none"
    }`}
      >
        {session && (
          <ul className="flex flex-col items-start justify-start text-start text-lg font-semibold">
            {session.user.role === "Admin" ? (
              <li className="border-b-2 hover:border-secondary w-full border-transparent duration-200 py-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 hover:text-secondary"
                >
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </li>
            ) : (
              ""
            )}

            <li className="border-b-2 hover:border-secondary w-full border-transparent duration-200 py-2">
              <Link
                href="/keranjang"
                className="flex items-center gap-4 hover:text-secondary"
              >
                <ShoppingBasket className="" />
                Keranjang{" "}
                <span className="bg-red-600 px-3 rounded-full">
                  {keranjangMenu.length}
                </span>
              </Link>
            </li>
            <li className="border-b-2 hover:border-secondary w-full border-transparent duration-200 py-2">
              <Link
                href="/pesanan"
                className="flex items-center gap-4 hover:text-secondary"
              >
                <ListOrdered />
                Pesanan{" "}
                <span className="bg-red-600 px-3 rounded-full">
                  {orderMenu.length}
                </span>
              </Link>
            </li>
          </ul>
        )}

        <div
          className={`${actionStyle} rounded-2xl  hover:border-secondary w-full border-transparent duration-200 py-2 ${
            session ? "mt-2" : ""
          }`}
        >
          <button
            onClick={handleClick}
            className={`flex items-center  text-center uppercase justify-center w-full font-semibold text-lg`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoDropDown;
