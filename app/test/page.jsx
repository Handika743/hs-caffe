// Halaman atau komponen yang ingin mengubah <title>
"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";

const TestPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Anda belum login</div>;
  }

  return (
    <div>
      <Head>
        <title>My Page Title</title> {/* Mengubah title halaman */}
      </Head>
      <div>
        <h1>Welcome, {session.user.name}</h1>
        <p>Email: {session.user.email}</p>
        <p>Role: {session.user.role}</p>
        <p>Image: {session.user.image}</p>
      </div>
    </div>
  );
};

export default TestPage;
