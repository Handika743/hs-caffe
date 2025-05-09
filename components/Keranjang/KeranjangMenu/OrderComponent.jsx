import React from "react";

const OrderComponent = ({ checkedItems }) => {
  return (
    <div className="bg-trirdary text-secondary border-t-2 border-l-2 border-r-2 border-secondary rounded-t-lg fixed bottom-0 w-full z-30">
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-center">
          Ringkasan Pemesanan
        </h1>
        <div className="flex flex-row justify-between">
          <p className="text-lg font-semibold">Total Item</p>
          <p>{checkedItems.length}</p>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-lg font-semibold">Total Harga</p>
          <p>
            Rp{" "}
            {checkedItems
              .reduce((total, item) => total + Number(item.total_harga), 0)
              .toLocaleString("id-ID")}
          </p>
        </div>
        <button className="bg-secondary p-2 rounded-md w-full text-center text-trirdary">
          Order
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default OrderComponent;
