import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";

const Greeting = async ({ newsMenu }) => {
  return (
    <div>
      <div className="flex flex-col gap-5" key={newsMenu.id}>
        <div className="flex flex-col gap-10">
          <h1 className="text-trirdary text-2xl font-bold md:text-4xl">
            Awali Hari Indahmu dengan{" "}
            <span className="text-secondary block text-3xl uppercase md:text-5xl">
              Secangkir <span className="block">{newsMenu.nama_menu}</span>
            </span>
          </h1>
          <p className="text-justify text-base md:text-lg">
            {newsMenu.deskripsi}
          </p>
        </div>
        <Link
          href="/menu"
          className="bg-secondary hover:bg-trirdary hover:text-secondary w-fit transform cursor-pointer rounded-xl duration-200 ease-linear hover:scale-110"
        >
          <p className="p-2">Pesan Sekarang</p>
        </Link>
      </div>
    </div>
  );
};

export default Greeting;
