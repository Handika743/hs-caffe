import React from "react";
import { X } from "lucide-react";
import { useState } from "react";

const OrderModal = ({
  checkedItems,
  handleOrderModal,
  isOrderModal,
  setCheckedItems,
}) => {
  const [isNomorMeja, setIsNomorMeja] = useState(0);

  const totalHarga = checkedItems.reduce(
    (total, item) => total + Number(item.total_harga),
    0
  );

  const handleTambahOrder = async () => {
    if (!isNomorMeja) {
      alert("Tolong Isi No meja anda...");
      return;
    }
    const orderItems = checkedItems.map((item) => ({
      item_id: item.id,
      menu_id: item.menu_id,
      nama_menu: item.nama_menu,
      jumlah: item.jumlah,
      harga: item.total_harga,
      note: item.note,
    }));
    const numberNoMeja = Number(isNomorMeja);
    const data = {
      total_harga: totalHarga,
      no_meja: numberNoMeja,
      orderItems,
    };
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.isCreated) {
      alert("Pesanan Berhasil Di Buat");
      setCheckedItems([]);
      handleOrderModal();
    } else {
      alert("Gagal Buat Pesanan .");
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-primary/50 z-50 flex items-center justify-center ${
        isOrderModal
          ? " opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } duration-200 ease-in-out`}
    >
      <div
        className={`bg-trirdary border-2 border-secondary p-4 text-secondary rounded-lg relative ${
          isOrderModal ? "scale-100" : "scale-0"
        } duration-200 ease-in-out w-full md:w-[600px]`}
      >
        <h1 className="text-xl">Rincian Pesanan</h1>
        <button className="absolute top-4 right-4" onClick={handleOrderModal}>
          <X size={30} />
        </button>
        <div className="block h-[2px] w-full bg-secondary my-4"></div>
        <div className="flex flex-row justify-between">
          <label htmlFor="no_meja">Nomor Meja</label>
          <input
            placeholder="Nomor Meja..."
            type="number"
            id="no_meja"
            className="border border-secondary outline-none rounded-md p-1"
            onChange={(e) => setIsNomorMeja(e.target.value)}
            required
          />
        </div>
        <div className="block h-[2px] w-full bg-secondary my-4"></div>
        <div>
          <table className=" w-full">
            <tbody>
              <tr className="">
                <th className="text-start">Nama Item</th>
                <th className="px-4 ">Jumlah</th>
                <th className="">Harga</th>
              </tr>
              {checkedItems.map((item) => {
                return (
                  <tr className="text-center" key={item?.id}>
                    <td className="text-start">{item?.nama_menu}</td>
                    <td>{item?.jumlah}</td>
                    <td>
                      Rp {Number(item?.total_harga).toLocaleString("id-ID")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="block h-[2px] w-full bg-secondary my-2"></div>
        <div className="  flex justify-end">
          <div className=" w-1/2 flex justify-between ">
            <p className="font-bold w-1/2">Total Harga :</p>
            <p className="text-center x w-1/2">
              Rp {totalHarga.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
        <div className="block h-[2px] w-full bg-secondary my-2"></div>
        <div className="flex justify-center">
          <div className="flex flex-row justify-center gap-5 items-center w-1/2 text-trirdary">
            <button
              className="bg-red-500 p-2 rounded-md hover:scale-105 duration-200 w-1/3"
              onClick={handleOrderModal}
            >
              Batal
            </button>
            <button
              className="bg-green-500 p-2 rounded-md hover:scale-105 duration-200 w-1/3"
              onClick={handleTambahOrder}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
