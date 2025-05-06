"use client";

import React, { useEffect, useState } from "react";
import PesanButton from "./PesanButton";
import LoadingPage from "@/app/loading";

const MenuList = ({ jenisMenu, search, openModal }) => {
  const [listMenu, setListMenu] = useState([]);
  const test = (item) => {
    alert(
      `Nama: ${item.nama_menu}, Harga: ${item.harga}, Jenis: ${item.jenis_menu}`
    );
  };

  useEffect(() => {
    // <LoadingPage />;
    const fetchMenu = async () => {
      let url = "/api/menu/ListMenu";

      if (search && search.trim() !== "") {
        // ✅ Jika sedang search, abaikan filter jenisMenu
        url += `?nama_menu=${search}`;
      } else if (jenisMenu && jenisMenu !== "All") {
        // ✅ Jika tidak sedang search, baru filter by jenis
        url += `?jenis_menu=${jenisMenu}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setListMenu(data);
    };

    fetchMenu();
  }, [jenisMenu, search]);

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {listMenu.map((item) => (
        <div
          key={item.id}
          className="bg-trirdary/50 border-secondary relative min-h-[300px] w-fit min-w-[100px] overflow-hidden rounded-md border md:min-h-[400px]"
        >
          <img
            src={item.image}
            alt={item.nama_menu}
            className="h-[150px] w-[150px] md:h-[250px] md:w-[250px]"
          />
          <h2 className="text-secondary pt-2 text-center font-bold uppercase">
            {item.nama_menu}
          </h2>
          <div className="flex justify-between px-2 py-3 font-semibold">
            <p>{`( ${item.jenis_menu} )`}</p>
            <p>Rp {Number(item.harga).toLocaleString("id-ID")}</p>
          </div>
          <div className="absolute bottom-0 flex w-full items-center justify-center">
            <PesanButton click={() => openModal(item)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
