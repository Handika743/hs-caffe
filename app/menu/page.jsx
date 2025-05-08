"use client";

import React, { useEffect, useState } from "react";
import FilterMenu from "@/components/MenuPage/Filter";
import MenuList from "@/components/MenuPage/ListMenu";
import SearchMenu from "@/components/MenuPage/Search";
import LoadingPage from "../loading";
import PesanModal from "@/components/MenuPage/PesanModal";
import AuthGuard from "@/components/AuthGuard";

const MenuPage = () => {
  const [jenisMenu, setJenisMenu] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // hanya aktif saat tombol search diklik
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [jumlah, setJumlah] = useState(1);
  const [jenis, setJenis] = useState("");
  const [note, setNote] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);
  const [hargaSatuan, setHargaSatuan] = useState(0);

  const handleFilterChange = (value) => {
    setIsLoading(true);
    setTimeout(() => {
      setJenisMenu(value);
      setSearchValue("");
      setActiveSearch("");
      setIsLoading(false);
    }, 1000);
  };

  const handleSearchClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setJenisMenu("");
      setActiveSearch(searchValue);
      setIsLoading(false);
    }, 500);
  };
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setTotalHarga(item.harga);
    setHargaSatuan(item.harga);
    setIsOpenModal((prev) => !prev);
    if (isOpenModal === false) {
      setJumlah(1);
      setJenis("");
      setNote("");
    }
  };

  const handleTambahJumlah = () => {
    setJumlah((prev) => prev + 1);
  };
  const handleKurangJumlah = () => {
    if (jumlah > 1) {
      setJumlah((prev) => prev - 1);
    }
  };
  const handleChangeJenis = (event) => {
    const selectedValue = event.target.value;
    setJenis(selectedValue);
  };

  const handleChangeNote = (event) => {
    const selectedValue = event.target.value;
    setNote(selectedValue);

    // alert(note);
  };
  useEffect(() => {
    setTotalHarga(jumlah * hargaSatuan);
  }, [jumlah, hargaSatuan]);

  return (
    <AuthGuard>
      <section className="min-h-screen bg-polygon pt-10 flex flex-col items-center">
        <h1 className="text-center md:text-2xl text-lg font-bold uppercase bg-secondary p-2 rounded-md border border-trirdary">
          Menu <span className="text-trirdary">HS</span>Café
        </h1>
        <div className="p-2 flex gap-2">
          <div className="w-1/2">
            <FilterMenu onChange={handleFilterChange} selected={jenisMenu} />
          </div>
          <div className="w-1/2">
            <SearchMenu
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearchClick={handleSearchClick}
            />
          </div>
        </div>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <MenuList
            jenisMenu={jenisMenu}
            search={activeSearch}
            openModal={handleOpenModal}
          />
        )}
        <div>
          <PesanModal
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            selectedItem={selectedItem}
            jenis={jenis}
            jumlah={jumlah}
            handleKurangJumlah={handleKurangJumlah}
            handleTambahJumlah={handleTambahJumlah}
            handleChangeJenis={handleChangeJenis}
            setJumlah={setJumlah}
            note={note}
            setNote={setNote}
            handleChangeNote={handleChangeNote}
            totalHarga={totalHarga}
          />
        </div>
      </section>
    </AuthGuard>
  );
};

export default MenuPage;
