"use client";

import React, { useState } from "react";
import FilterMenu from "@/components/MenuPage/Filter";
import MenuList from "@/components/MenuPage/ListMenu";
import SearchMenu from "@/components/MenuPage/Search";
import LoadingPage from "../loading";

const MenuPage = () => {
  const [jenisMenu, setJenisMenu] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState(""); // hanya aktif saat tombol search diklik
  const [isLoading, setIsLoading] = useState(false);

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

  return (
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
        <MenuList jenisMenu={jenisMenu} search={activeSearch} />
      )}
    </section>
  );
};

export default MenuPage;
