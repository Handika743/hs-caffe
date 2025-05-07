import React from "react";
import Image from "next/image";
import { SquarePen, Trash2 } from "lucide-react";

const KeranjangMenu = ({ keranjangMenu }) => {
  return (
    <div>
      {keranjangMenu.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        keranjangMenu.map((item) => (
          <div
            key={item.id}
            className="bg-trirdary/80 border-2 border-secondary rounded-lg p-5 my-3"
          >
            <div className="flex gap-4 items-center">
              <label htmlFor="id_menu">
                <input type="checkbox" className="" />
              </label>
              <div className="relative rounded-lg overflow-hidden md:w-[100px] md:h-[100px] w-[50px] h-[50px]">
                <Image
                  src={item.menu.image}
                  fill
                  className="object-cover"
                  alt={item.menu.nama_menu}
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <div>
                  <h3 className="font-bold text-xl">{item.menu.nama_menu}</h3>
                  <table className="text-sm md:text-base">
                    <tbody>
                      <tr className="">
                        <td className="md:px-5 px-2">Jumlah</td>
                        <td className="md:px-5 px-2">:</td>
                        <td className="md:px-5 px-2">{item.jumlah}</td>
                      </tr>

                      <tr>
                        <td className="md:px-5 px-2">Total Harga</td>
                        <td className="md:px-5 px-2">:</td>
                        <td className="md:px-5 px-2">
                          Rp {Number(item.total_harga).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex  flex-col md:flex-row gap-4 items-center">
                  <button className="bg-green-600 p-1.5 rounded-md text-trirdary hover:scale-105 duration-200 h-fit">
                    <SquarePen className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]" />
                  </button>
                  <button className="bg-red-600 p-1.5 rounded-md text-trirdary  hover:scale-105 duration-200 h-fit">
                    <Trash2 className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]" />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-secondary w-full h-[2px] my-4"></div>
            <div className="flex items-center">
              <h3 className="font-bold text-lg px-5">Catatan :</h3>
              <p className="text-sm md:text-base">{item.note}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default KeranjangMenu;
