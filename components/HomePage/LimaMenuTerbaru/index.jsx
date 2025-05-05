import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";

const LimaMenuTerbaru = async () => {
  const limaTerbaru = await prisma.menu.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  });
  return (
    <section className="px-10">
      <div className="bg-secondary text-trirdary w-fit rounded-xl">
        <h4 className="p-2 text-xl font-bold">Menu Terbaru</h4>
      </div>
      <div className="mt-4 flex w-full gap-4 overflow-auto">
        {limaTerbaru.map((menu) => (
          <div
            className="bg-trirdary border-secondary m-2 flex h-[300px] w-[200px] flex-shrink-0 transform flex-col overflow-hidden rounded-xl border-2 shadow-md duration-200 hover:scale-105"
            key={menu.id}
          >
            <div className="h-[200px] w-full overflow-hidden">
              <img src={menu.image} alt={menu.nama_menu} className="" />
            </div>
            <div className="flex h-[100px] flex-col justify-between px-4">
              <div className="h-1/2">
                <h3 className="text-secondary text-center text-base font-bold">
                  {menu.nama_menu}
                </h3>
              </div>
              <div className="flex h-1/2 items-end justify-between py-2">
                <p className="p-1 text-sm font-medium text-gray-700">
                  Rp {Number(menu.harga).toLocaleString("id-ID")}
                </p>
                <Link href="/menu">
                  <button className="bg-secondary hover:bg-trirdary hover:text-secondary border-secondary rounded-md border p-1 duration-200 hover:font-semibold text-trirdary">
                    Pesan
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LimaMenuTerbaru;
