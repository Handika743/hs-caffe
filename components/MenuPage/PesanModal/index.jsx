"use client";
import React, { useState } from "react"; // Tambahkan useState di sini
import { X, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

const PesanModal = ({
  isOpenModal,
  setIsOpenModal,
  selectedItem,
  jumlah,
  jenis,
  handleTambahJumlah,
  handleKurangJumlah,
  handleChangeJenis,
  setJumlah,
  note,
  handleChangeNote,
  totalHarga,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isCreated, setIsCreated] = useState(false); // Deklarasikan state isCreated

  const router = useRouter();

  const handleTambahKeranjangMenu = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    alert("bisa diklik");

    const data = {
      menu_id: selectedItem.id,
      nama_menu: selectedItem.nama_menu,
      harga: selectedItem.harga,
      total_harga: totalHarga,
      jumlah,
      jenis,
      note,
    };

    const respon = await fetch("/api/keranjang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert(JSON.stringify(data));
    const result = await respon.json();
    setIsSubmitting(false); // Set isSubmitting kembali setelah respons diterima
    if (result.isCreated) {
      setIsCreated(true);
      alert("Menu Ditambahkan Ke Keranjang");
      setIsOpenModal(false); // Tutup modal setelah berhasil
      router.refresh();
    } else {
      // Tambahkan penanganan error jika permintaan gagal
      console.error("Gagal menambahkan ke keranjang:", result);
      alert("Gagal menambahkan menu ke keranjang.");
    }
  };
  if (!selectedItem) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 bg-primary/50 flex items-center justify-center
        transition-opacity duration-200
        ${
          isOpenModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <div
        className={`bg-trirdary relative text-secondary px-10 py-5 rounded-lg transform transition-all duration-200
          ${isOpenModal ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `}
      >
        <div className=" text-lg font-bold text-center">
          <h1>Pesan</h1>
        </div>
        <X
          onClick={() => setIsOpenModal(false)}
          className="absolute right-5 top-3 hover:text-primary duration-200"
        />
        <div className="h-[2px] w-full bg-secondary block mb-4"></div>
        <form className="flex flex-col gap-4">
          {/* ... bagian input form lainnya ... */}
          <div className="hidden">
            <label htmlFor="id_menu" className="w-1/2 ">
              Id Menu
            </label>
            <input
              type="text"
              id="id_menu"
              name="id_menu"
              className="border border-secondary p-1 rounded-md w-1/2"
              value={selectedItem?.id || ""}
              readOnly
            />
          </div>
          <div className="flex flex-row gap-4 items-center justify-between">
            <label htmlFor="nama_menu" className="w-1/2 font-semibold">
              Nama Menu
            </label>
            <input
              type="text"
              id="nama_menu"
              name="nama_menu"
              className="border border-secondary p-1 rounded-md w-1/2"
              value={selectedItem?.nama_menu || ""}
              readOnly
            />
          </div>
          <div className="flex flex-row gap-4 items-center justify-between">
            <label htmlFor="id" className="w-1/2 font-semibold">
              Jumlah
            </label>
            <div className="w-1/2 flex items-center justify-between gap-1">
              <button
                type="button"
                className="bg-secondary text-trirdary p-1 rounded-md"
                onClick={handleTambahJumlah}
              >
                <Plus />
              </button>
              <input
                type="text"
                id="jumlah"
                name="jumlah"
                className="border border-secondary p-1 rounded-md w-20 text-center"
                value={jumlah}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val > 0) {
                    setJumlah(val);
                  } else if (e.target.value === "") {
                    setJumlah("");
                  }
                }}
              />
              <button
                type="button"
                className="bg-secondary text-trirdary p-1 rounded-md"
                onClick={handleKurangJumlah}
              >
                <Minus />
              </button>
            </div>
          </div>
          {selectedItem?.jenis_menu === "Kopi" ||
          selectedItem?.jenis_menu === "Teh" ? (
            <div className="flex flex-row gap-4 items-center justify-between">
              <label htmlFor="jenis" className="w-1/2 font-semibold">
                Jenis
              </label>
              <select
                name="jenis"
                id="jenis"
                className="w-1/2 border border-secondary p-1 rounded-md"
                value={jenis}
                onChange={handleChangeJenis}
              >
                <option value="Dingin">Dingin</option>
                <option value="Hangat">Hangat</option>
              </select>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col ">
            <label htmlFor="note" className="font-semibold">
              Catatan
            </label>
            <textarea
              name="note"
              id="note"
              className="p-1 border border-secondary rounded-md outline-none"
              onChange={handleChangeNote}
              value={note}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="total_harga" className="font-bold">
              TOTAL HARGA
            </label>
            <input
              type="number"
              id="total_harga"
              name="total_harga"
              className="w-full text-center outline-none hidden"
              value={totalHarga}
              readOnly
            />
            <p className="text-center text-xl">
              Rp {Number(totalHarga).toLocaleString("id-ID")}
            </p>
          </div>
          <button
            type="button"
            onClick={handleTambahKeranjangMenu}
            className="w-full bg-red-500 text-white p-3 rounded-lg"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default PesanModal;
