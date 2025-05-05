"use client";
import React from "react";

const SelectJenis = ({ uniqueTypes, click }) => {
  return (
    <select
      name="filter_menu"
      id="filter_menu"
      className="w-full bg-secondary/80 p-1 outline-1 rounded-md text-trirdary border border-primary"
      onChange={click}
    >
      {uniqueTypes.map((tipe) => (
        <option key={tipe} value={tipe}>
          {tipe}
        </option>
      ))}
    </select>
  );
};

export default SelectJenis;
