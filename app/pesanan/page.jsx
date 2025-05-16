"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import LoadingPage from "../loading";
import OrderList from "@/components/Order";

const PesananPage = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);

  const fetchdata = async () => {
    const res = await fetch("/api/order");
    const data = await res.json();

    setOrder(data);
    setIsLoading(false);
    console.log(isLoading);
  };

  useEffect(() => {
    if (session) {
      fetchdata();
    }
  }, [session]);

  return (
    <div>
      {/* {isLoading ? (
        <LoadingPage />
      ) : (
        <OrderList session={session} setIsLoading={setIsLoading} />
      )} */}
      {isLoading ? <LoadingPage /> : <OrderList order={order} />}
    </div>
  );
};

export default PesananPage;
