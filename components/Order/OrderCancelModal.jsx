import React from "react";
import { useRouter } from "next/navigation";

const OrderCancelModal = ({
  cancelOrder,
  handleCancelOrderModal,
  selectedItem,
}) => {
  const router = useRouter();
  const handleCancelOrder = async () => {
    const data = {
      id: selectedItem.id,
    };
    const response = await fetch("/api/order", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.isCreated) {
      alert("Order berhasil dibatalkan");
      window.location.reload();
      handleCancelOrderModal();
    } else {
      console.error("Gagal membatalkan order");
    }
  };
  return (
    <div
      className={`${
        cancelOrder
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed top-0 left-0 right-0 bottom-0 z-50 bg-primary/50 duration-300 ease-in-out`}
    >
      <div className="flex justify-center items-center h-screen">
        <div
          className={`bg-trirdary py-4 px-10 rounded-lg border-2 border-secondary ${
            cancelOrder ? "scale-100" : "scale-0"
          } duration-200 ease-in-out`}
        >
          <h1>
            Yakin ingin Membatalkan Pesanan Nomor{" "}
            <span className="font-bold">{selectedItem?.id}</span> ?
          </h1>
          <div className="block h-[2px] w-full bg-secondary my-2"></div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="bg-red-600 text-trirdary py-2 px-4 rounded-md hover:scale-105 duration-200 w-1/3"
              onClick={handleCancelOrderModal}
            >
              Batal
            </button>
            <button
              className="bg-green-600 text-trirdary py-2 px-4 rounded-md hover:scale-105 duration-200 w-1/3"
              onClick={handleCancelOrder}
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCancelModal;
