// app/keranjang/page.js
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import KeranjangMenu from "@/components/Keranjang/KeranjangMenu";
import LoadingPage from "../loading";
import EditKeranjangModal from "@/components/Keranjang/KeranjangMenu/EditKeranjangModal";
import DeleteKeranjangModal from "@/components/Keranjang/KeranjangMenu/DeleteKeranjangModal";
import OrderComponent from "@/components/Keranjang/KeranjangMenu/OrderComponent";

const KeranjangPage = () => {
  const { data: session } = useSession();
  const [keranjangMenu, setKeranjangMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const fetchKeranjang = async () => {
    if (!session) return;

    const response = await fetch("/api/keranjang");
    if (response.ok) {
      const data = await response.json();
      setKeranjangMenu(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchKeranjang();
    }
  }, [session]);

  const [checkedItems, setCheckedItems] = useState([]);

  const handleSetItem = (e, item) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedItems((prev) => [...prev, item]);
    } else {
      setCheckedItems((prev) => prev.filter((i) => i.id !== item.id));
    }
    console.log("Checked items:", checkedItems);
  };
  const handleEditModal = (item) => {
    setIsEditModal((prev) => !prev);
    setSelectedItem(item);
  };

  const handleDeleteModal = (item) => {
    setIsDeleteModal((prev) => !prev);
    setSelectedItem(item);
  };

  const handleCheckAll = () => {
    if (checkedItems.length === keranjangMenu.length) {
      // Semua item sudah dicentang → batalkan semua
      setCheckedItems([]);
    } else {
      setCheckedItems(keranjangMenu);
    }
    console.log("Checked items:", checkedItems);
  };
  return (
    <>
      <div className="px-10 flex flex-col">
        <h1 className="font-bold text-2xl text-center p-10">Keranjang</h1>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <KeranjangMenu
            keranjangMenu={keranjangMenu}
            handleEditModal={handleEditModal}
            handleDeleteModal={handleDeleteModal}
            handleSetItem={handleSetItem}
            handleCheckAll={handleCheckAll}
            checkedItems={checkedItems}
          />
        )}
        <div>
          <EditKeranjangModal
            handleEditModal={handleEditModal}
            isEditModal={isEditModal}
            selectedItem={selectedItem}
            setIsEditModal={setIsEditModal}
          />
        </div>
        <div>
          <DeleteKeranjangModal
            handleDeleteModal={handleDeleteModal}
            isDeleteModal={isDeleteModal}
            selectedItem={selectedItem}
            setIsDeleteModal={setIsDeleteModal}
          />
        </div>
      </div>
      <div>
        <OrderComponent checkedItems={checkedItems} />
      </div>
    </>
  );
};

export default KeranjangPage;
