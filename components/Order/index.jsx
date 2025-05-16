import React from "react";
import { X } from "lucide-react";
import OrderCancelModal from "./OrderCancelModal";
import { useState } from "react";

const OrderList = ({ order }) => {
  const [cancelOrder, setCancelOrder] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCancelOrderModal = (item) => {
    setCancelOrder((prev) => !prev);
    setSelectedItem(item);
  };
  return (
    <>
      {order?.length === 0 ? (
        <p>Belum ada pesanan</p>
      ) : (
        <div className="mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.map((item) => (
              <div
                key={item.id}
                className="bg-trirdary/80 border-2 border-secondary rounded-lg p-5 my-3 flex flex-col gap-3 justify-between"
              >
                <div>
                  <div>
                    <h1 className="text-center font-bold">
                      Nomor Pesanan <span className="block">{item.id}</span>
                    </h1>
                    <div className="block bg-secondary h-[2px] w-full my-2"></div>
                    <div className="grid grid-cols-3 ">
                      <p>Nomor Meja</p>
                      <p className="text-center">:</p>
                      <p>{item.no_meja}</p>

                      <p>Jumlah Item</p>
                      <p className="text-center">:</p>
                      <p>{item.order_items.length}</p>

                      <p>Status</p>
                      <p className="text-center">:</p>
                      <p>{item.status}</p>
                    </div>
                  </div>

                  <table className="w-full text-center my-4">
                    <thead className="border-t border-b border-secondary">
                      <tr>
                        <th className="w-1/3">Nama Item</th>
                        <th className="w-1/3">Jumlah</th>
                        <th className="w-1/3">Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.order_items.map((orderItem) => (
                        <tr key={orderItem.id} className="">
                          <td className="w-1/3 ">{orderItem.nama_menu}</td>
                          <td className="w-1/3">{orderItem.jumlah}</td>
                          <td className="w-1/3">
                            Rp {Number(orderItem.harga).toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}

                      <tr className="border-t border-b border-secondary">
                        <td
                          colSpan={2}
                          className="text-right font-semibold pr-4"
                        >
                          Total Harga
                        </td>
                        <td className="font-bold">
                          Rp{" "}
                          {item.order_items
                            .reduce((total, i) => total + Number(i.harga), 0)
                            .toLocaleString("id-ID")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center w-full justify-center flex-col">
                  {item.status === "pending" ? (
                    <button
                      className="bg-red-600 text-trirdary p-2 rounded-md hover:scale-105 duration-200 ease-in-out flex"
                      onClick={() => handleCancelOrderModal(item)}
                    >
                      <X /> Cancel
                    </button>
                  ) : null}

                  <p className="font-bold text-sm">
                    Note : Pesanan yang sudah diproses tidak dapat dicancel
                  </p>
                </div>
              </div>
            ))}
          </div>
          <OrderCancelModal
            cancelOrder={cancelOrder}
            handleCancelOrderModal={handleCancelOrderModal}
            selectedItem={selectedItem}
          />
        </div>
      )}
    </>
  );
};

export default OrderList;
