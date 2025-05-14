// app/keranjang/page.js
"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import KeranjangMenu from "@/components/Keranjang/KeranjangMenu";
import LoadingPage from "../loading";
import EditKeranjangModal from "@/components/Keranjang/KeranjangMenu/EditKeranjangModal";
import DeleteKeranjangModal from "@/components/Keranjang/KeranjangMenu/DeleteKeranjangModal";
import OrderComponent from "@/components/Keranjang/KeranjangMenu/OrderComponent";
import OrderModal from "@/components/Keranjang/KeranjangMenu/OrderModal";

const KeranjangPage = () => {
  const { data: session } = useSession();
  const [keranjangMenu, setKeranjangMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModal, setIsEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOrderModal, setIsOrderModal] = useState(false);

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

  const handleOrderModal = () => {
    if (checkedItems.length === 0) {
      alert("Pilih item terlebih dahulu");
      return;
    }

    setIsOrderModal((prev) => !prev);
  };
  return (
    <>
      <div className="px-10 flex flex-col">
        <h1 className="font-bold text-2xl text-center p-10 text-stroke text-trirdary">
          Keranjang
        </h1>
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
        <OrderComponent
          checkedItems={checkedItems}
          handleOrderModal={handleOrderModal}
        />
      </div>
      <div>
        <OrderModal
          checkedItems={checkedItems}
          isOrderModal={isOrderModal}
          handleOrderModal={handleOrderModal}
          setCheckedItems={setCheckedItems}
        />
      </div>
    </>
  );
};

export default KeranjangPage;
