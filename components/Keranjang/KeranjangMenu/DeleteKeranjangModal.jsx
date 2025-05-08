import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DeleteKeranjangModal = ({
  handleDeleteModal,
  isDeleteModal,
  selectedItem,
  setIsDeleteModal,
}) => {
  const [altImage, setAltImage] = useState(selectedItem?.nama_menu || "");
  const [srcImage, setSrcImage] = useState(selectedItem?.menu?.image || "");
  const [namaMenu, setNamaMenu] = useState(selectedItem?.nama_menu || "");
  const [jumlah, setJumlah] = useState(Number(selectedItem?.jumlah) || 0);
  const [totalHarga, setTotalHarga] = useState(
    Number(selectedItem?.total_harga) || 0
  );
  const [note, setNote] = useState(selectedItem?.note || "");
  const [isCreated, setIsCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAltImage(selectedItem?.nama_menu || "");
    setJumlah(Number(selectedItem?.jumlah) || 0);
    setNamaMenu(selectedItem?.nama_menu || "");
    setSrcImage(selectedItem?.menu?.image || "");
    setTotalHarga(Number(selectedItem?.total_harga) || 0);
    setNote(selectedItem?.note || "");
  }, [selectedItem]);
  if (!selectedItem) return null;

  const handleDeleteKeranjangMenu = async (event) => {
    event.preventDefault();
    const data = {
      id: selectedItem.id,
    };
    const response = await fetch("/api/keranjang", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.isCreated) {
      setIsCreated(true);
      alert("Pesanan Berhasil Di Hapus Dari Keranjang");
      setIsDeleteModal(false); // Tutup modal setelah berhasil
      window.location.reload();
      window.scrollTo(0, 0);
    } else {
      // Tambahkan penanganan error jika permintaan gagal
      console.error("Gagal Delete Pesanan :", result);
      alert("Gagal Pesanan .");
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 bg-primary/50 left-0 bottom-0 z-50 duration-200
    ${
      isDeleteModal
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    } text-secondary`}
    >
      <div className="flex justify-center items-center h-screen">
        <div
          className={`bg-trirdary p-4 rounded-lg border-2 border-secondary ${
            isDeleteModal ? "scale-100" : "scale-0"
          } duration-200`}
        >
          <h1 className="font-bold text-xl py-2">
            Yakin ingin menghapus pesanan ini ?
          </h1>
          <div className="bg-secondary w-full h-[2px]"></div>
          <div className="flex flex-row py-4 justify-between items-center">
            {srcImage ? (
              <div className="relative rounded-lg overflow-hidden md:w-[100px] md:h-[100px] w-[50px] h-[50px]">
                <Image
                  src={srcImage}
                  fill
                  className="object-cover"
                  alt={altImage}
                />
              </div>
            ) : null}
            <div className=" w-2/3">
              <h3 className="font-semibold text-center text-xl">{namaMenu}</h3>
              <table>
                <tbody>
                  <tr className="">
                    <td className=" px-2">Jumlah</td>
                    <td className=" px-2">:</td>
                    <td className=" px-2">{jumlah}</td>
                  </tr>
                  <tr className="">
                    <td className=" px-2">Total Harga</td>
                    <td className=" px-2">:</td>
                    <td className=" px-2">
                      Rp {Number(totalHarga).toLocaleString("id-ID")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2">Catatan</td>
                    <td className="px-2">:</td>
                  </tr>
                </tbody>
              </table>

              <p className="px-2">{note}</p>
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-between items-center my-4">
            <button
              type="button"
              disabled={isSubmitting}
              className="bg-red-600 w-1/2 p-2 text-trirdary rounded-md hover:scale-105 duration-200"
              onClick={handleDeleteKeranjangMenu}
            >
              Hapus
            </button>
            <button
              type="button"
              className="w-1/2 bg-green-500 p-2 text-trirdary rounded-md hover:scale-105 duration-200"
              onClick={handleDeleteModal}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteKeranjangModal;
