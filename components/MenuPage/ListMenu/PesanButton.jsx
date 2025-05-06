import React from "react";

const PesanButton = ({ openModal, click }) => {
  return (
    <button
      className="bg-secondary hover:bg-trirdary hover:text-secondary mb-3 transform rounded-md p-2 px-4 font-semibold duration-200 hover:scale-105 border border-secondary text-trirdary"
      // onClick={openModal}
      onClick={click}
    >
      Pesan
    </button>
  );
};

export default PesanButton;
