// app/components/MenuPage/Filter.js
"use client";

import React, { useEffect, useState } from "react";

const FilterMenu = ({ onChange, selected }) => {
  const [uniqueTypes, setUniqueTypes] = useState([]);

  useEffect(() => {
    fetch("/api/menu/JenisMenu")
      .then((res) => res.json())
      .then((data) => setUniqueTypes(data));
  }, []);

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-secondary p-1 rounded-md border text-trirdary"
    >
      <option value="">All</option>
      {uniqueTypes.map((tipe) => (
        <option key={tipe} value={tipe}>
          {tipe}
        </option>
      ))}
    </select>
  );
};

export default FilterMenu;
