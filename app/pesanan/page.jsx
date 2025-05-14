"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import LoadingPage from "../loading";

const PesananPage = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  const fetchdata = async () => {
    const res = await fetch("/api/order");
    const data = await res.json();
    console.log(data);
    setOrder(data.order);
    setItems(data.items);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchdata();
    }
  }, [session]);
  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <h2>Pesanan Terbaru (Meja {order.no_meja})</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.nama_menu} - {item.jumlah} x Rp{item.harga}
              </li>
            ))}
          </ul>
          <p>Total: Rp{order.total_harga}</p>
        </div>
      )}
    </div>
  );
};

export default PesananPage;
