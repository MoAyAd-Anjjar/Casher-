import React, { useEffect, useState } from "react";
import { Product } from "../../Type/Types";
import Camera from "../Cash-comp/Camera";
import { useData } from "../../Provider/DataProvider";
import Model from "../model/modle";
import { toast } from "react-toastify";

const Modify = () => {
  const [ViewIMG, setViewIMG] = useState<string>("");
  const [Clicked, setClicked] = useState(false);
  const [barcode, setbarcode] = useState<string|null>(null)
  const [Type, setType] = useState<"delete"|"update"| null>(null)
  const [SelectedProduct, setSelectedProduct] = useState<Product>({
    name: "",
    vendor: "",
    barcode: "",
    image: "",
    price: 0 // Added missing price field to match your form
  });
  const { ScanResult } = useData();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getList = async () => {
      try {
        if (!window.electronAPI?.getProductList) {
          throw new Error("Electron API is not available");
        }

        const products: Product[] = await window.electronAPI.getProductList();

        if (!Array.isArray(products)) {
          throw new Error("Invalid data format received");
        }

        const result = products.find(
          (product) => product.barcode === ScanResult
        );

        if (result) {
          setbarcode(result.barcode)
          setSelectedProduct(result);
          setViewIMG(result.image || "");
        }
        else {
            toast.warn("لا يوجد منتج يحمل الرقم المدخل")
        }
        setError(null);
      } catch (error) {
        console.error("Failed to fetch product list:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load products"
        );
      }
    };

    if (ScanResult) {
      getList();
    }
  }, [ScanResult]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedProduct((prev) => ({ ...prev, image: e.target.files![0] }));
    }
    setViewIMG(URL.createObjectURL(e.target.files![0]))
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setType("update")
    setClicked(!Clicked);
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    setType("delete")
    setClicked(!Clicked);
    
  };

  return (
    <>
      {Clicked && <Model barcode={barcode}  Data={SelectedProduct} type={Type} Clicked={Clicked} />}
      <div className="max-w-screen-2xl rtl:* mx-auto p-6 bg-white shadow-xl rounded-xl flex w-max flex-col transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          تعديل منتج الحالي
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-[65vh] flex max-w-screen-xl flex-col rtl flex-shrink-0"
        >
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block mb-2 text-right font-medium text-gray-600">
              اسم المنتج
            </label>
            <input
              type="text"
              name="name"
              value={SelectedProduct.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block mb-2 text-right font-medium text-gray-600">
              المورد
            </label>
            <input
              type="text"
              name="vendor"
              value={SelectedProduct.vendor}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block mb-2 text-right font-medium text-gray-600">
              السعر
            </label>
            <input
              type="number"
              name="price"
              value={SelectedProduct.price || 0}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <span>
              <label className="block mb-2 text-right font-medium text-gray-600">
                الباركود
              </label>
            </span>
            <span className="flex">
              <Camera />
              <input
                type="text"
                name="barcode"
                value={SelectedProduct.barcode}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </span>
          </div>
          <div className="transition-all duration-300 hover:scale-105">
            <label className="block mb-2 text-right font-medium text-gray-600">
              الصورة
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <div className="w-full align-bottom flex justify-center">
              {ViewIMG && <img className="w-[25%] m-2" src={ViewIMG} alt="Product" />}
            </div>
          </div>
          <div className="flex">
            <button
              onClick={handleDelete}
              type="button"
              className="w-full m-0 bg-red-500 text-white pb-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-red-600 hover:scale-105"
            >
              حذف المنتج
            </button>
            <button
              type="submit"
              className="w-full m-0 bg-blue-500 text-white pb-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105"
            >
              تعديل المنتج
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modify;