import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const OrderComponent = ({ checkedItems, handleOrderModal }) => {
  const [isRingkasan, setIsRingkasan] = useState(true);
  const handleRingkasan = () => {
    setIsRingkasan((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Wrapper posisi tetap di bottom */}
      <div className="fixed bottom-0 w-full z-30">
        {/* Tombol Chevron */}

        {/* Ringkasan Pemesanan */}
        <div
          className={`bg-trirdary text-secondary border-t-2 border-l-2 border-r-2 border-secondary rounded-t-lg transition-transform duration-300 ease-in-out ${
            isRingkasan ? "translate-y-0" : "translate-y-[80%]"
          }`}
        >
          <div className="p-4 flex flex-col gap-4 mt-6">
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

            <button
              className="bg-secondary p-2 rounded-md w-full text-center text-trirdary"
              onClick={handleOrderModal}
            >
              Order
            </button>
          </div>
          <button
            className="absolute -top-6 left-1/2 -translate-x-1/2 border-2 border-secondary rounded-full bg-trirdary z-40"
            onClick={handleRingkasan}
          >
            {isRingkasan ? <ChevronDown size={40} /> : <ChevronUp size={40} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
