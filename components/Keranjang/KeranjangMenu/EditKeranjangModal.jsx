import React, { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

const EditKeranjangModal = ({
  isEditModal,
  handleEditModal,
  selectedItem,
  setIsEditModal,
}) => {
  const [jumlah, setJumlah] = useState(Number(selectedItem?.jumlah) || 0);
  const [note, setNote] = useState(selectedItem?.note || "");
  const [jenis, setJenis] = useState(selectedItem?.jenis || "");
  const [idKeranjangMenu, setIdKeranjangMenu] = useState(selectedItem?.id);
  const [totalHarga, setTotalHarga] = useState(selectedItem?.total_harga || 0);
  const [hargaSatuan, setHargaSatuan] = useState(selectedItem?.harga || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const router = useRouter();

  // Sinkronisasi jika selectedItem berubah
  useEffect(() => {
    setJumlah(Number(selectedItem?.jumlah) || 0);
    setNote(selectedItem?.note || "");
    setJenis(selectedItem?.jenis || "");
    setIdKeranjangMenu(selectedItem?.id || 0);
    setTotalHarga(selectedItem?.total_harga || 0);
    setHargaSatuan(selectedItem?.harga || 0);
  }, [selectedItem]);

  const handleEditTambahJumlah = () => {
    setJumlah((prev) => Number(prev) + 1);
    setTotalHarga(Number(jumlah) * Number(hargaSatuan));
  };

  const handleEditKurangJumlah = () => {
    setJumlah((prev) => Math.max(1, Number(prev) - 1)); // mencegah < 1
  };

  const handleChangeJumlah = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setJumlah(val); // hanya angka
  };
  useEffect(() => {
    setTotalHarga(Number(jumlah) * Number(hargaSatuan));
  }, [jumlah, hargaSatuan]);

  const handleEditKeranjangMenu = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const data = {
      id: idKeranjangMenu,
      nama_menu: selectedItem.nama_menu,
      menu_id: selectedItem.menu_id,
      harga: selectedItem.harga,
      jumlah,
      jenis,
      note,
      total_harga: totalHarga,
    };
    const response = await fetch("/api/keranjang", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    setIsSubmitting(false); // Set isSubmitting kembali setelah respons diterima
    if (result.isCreated) {
      setIsCreated(true);
      alert("Pesanan Berhasil Di Edit Ke Keranjang");
      setIsEditModal(false); // Tutup modal setelah berhasil
      window.location.reload();
      window.scrollTo(0, 0);
    } else {
      // Tambahkan penanganan error jika permintaan gagal
      console.error("Gagal Edit Pesanan :", result);
      alert("Gagal Pesanan .");
    }
  };
  return (
    <div
      className={`bg-primary/50 fixed top-0 left-0 right-0 bottom-0 z-50 text-secondary ${
        isEditModal
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-200`}
    >
      <div className="flex items-center justify-center h-screen">
        <div
          className={`bg-trirdary p-4 rounded-lg border-2 border-secondary relative ${
            isEditModal ? "scale-100" : "scale-0"
          } duration-200`}
        >
          <div>
            <h1 className="uppercase text-center">Edit Pesanan</h1>
          </div>
          <button className="absolute top-2 right-4" onClick={handleEditModal}>
            <X />
          </button>
          <div className="block w-full h-[2px] bg-secondary"></div>
          <form className="my-4 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="nama_menu" className="w-1/2">
                Nama Menu
              </label>
              <input
                type="text"
                name="nama_menu"
                id="nama_menu"
                value={selectedItem?.nama_menu || ""}
                readOnly
                className="border border-secondary outline-none rounded-md p-1.5 w-1/2"
              />
            </div>
            <div className="flex flex-row items-center">
              <label htmlFor="jumlah" className="w-1/2">
                Jumlah
              </label>
              <div className="w-1/2 flex flex-row gap-2">
                <button
                  type="button"
                  className="bg-secondary text-trirdary p-1.5 rounded-md"
                  onClick={handleEditTambahJumlah}
                >
                  <Plus />
                </button>
                <input
                  type="text"
                  name="jumlah"
                  id="jumlah"
                  value={jumlah}
                  onChange={handleChangeJumlah}
                  className="bg-trirdary border border-secondary outline-none rounded-md p-1.5 w-2/3 text-center"
                />
                <button
                  type="button"
                  className="bg-secondary text-trirdary p-1.5 rounded-md"
                  onClick={handleEditKurangJumlah}
                >
                  <Minus />
                </button>
              </div>
            </div>
            {selectedItem?.jenis ? (
              <div className="flex flex-row gap-4 items-center justify-between">
                <label htmlFor="jenis" className="w-1/2 font-semibold">
                  Jenis
                </label>
                <select
                  name="jenis"
                  id="jenis"
                  className="w-1/2 border border-secondary p-1 rounded-md"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                >
                  <option value="Dingin">Dingin</option>
                  <option value="Hangat">Hangat</option>
                </select>
              </div>
            ) : null}
            <div className="flex flex-col">
              <label htmlFor="note" className="font-semibold">
                Catatan
              </label>
              <textarea
                type="text"
                name="note"
                id="note"
                value={note}
                className="border border-secondary p-1.5 rounded-md"
                onChange={(e) => setNote(e.target.value)}
              />
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
              onClick={handleEditKeranjangMenu}
              className="w-full bg-secondary text-white p-3 rounded-lg hover:scale-105 duration-200"
              disabled={isSubmitting}
            >
              EDIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditKeranjangModal;
