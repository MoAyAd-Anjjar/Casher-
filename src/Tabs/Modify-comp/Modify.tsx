import React, { useEffect, useState } from "react";
import { Product } from "../../Type/Types";


const Modify = () => {
    const [ViewIMG, setViewIMG] = useState<null| string>("")
  const [productList, setProductList] = useState<Product[]>([]);
  const [SelectedProduct, setSelectedProduct] = useState<Product>()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getList = async () => {
      try {
        if (!window.electronAPI?.getProductList) {
          throw new Error("Electron API is not available");
        }

        const products = await window.electronAPI.getProductList();
        console.log("Received products:", products);
        
        if (!Array.isArray(products)) {
          throw new Error("Invalid data format received");
        }

        setProductList(products);
        setSelectedProduct(products[1]);
        setViewIMG(SelectedProduct?.image||"")
        setError(null);
      } catch (error) {
        console.error("Failed to fetch product list:", error);
        setError(error instanceof Error ? error.message : "Failed to load products");
        setProductList([]);
      } finally {
        setIsLoading(false);
      }
    };

    getList();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
    };
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
  
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
    };

  return (
    <div className="max-w-screen-2xl mx-auto p-6 bg-white shadow-xl rounded-xl flex  w-max  flex-col transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">تعديل منتج الحالي</h2>
    <form onSubmit={handleSubmit} className="w-[65vh] flex max-w-screen-xl flex-col flex-shrink-0 " >
      <div className="transition-all duration-300 hover:scale-105">
        <label className="block mb-2 text-right font-medium text-gray-600">اسم المنتج</label>
        <input type="text" name="name"  defaultValue={SelectedProduct?.name} onChange={handleChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
      </div>
      <div className="transition-all duration-300 hover:scale-105">
        <label className="block mb-2 text-right font-medium text-gray-600">المورد</label>
        <input type="text" name="vendor" defaultValue={SelectedProduct?.price} onChange={handleChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
      </div>
      <div className="transition-all duration-300 hover:scale-105">
        <label className="block mb-2 text-right font-medium text-gray-600">السعر</label>
        <input type="number" name="price" defaultValue={SelectedProduct?.price}  onChange={handleChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
      </div>
      <div className="transition-all duration-300 hover:scale-105">
        <label className="block mb-2 text-right font-medium text-gray-600">الباركود</label>
        <input type="text" name="barcode" defaultValue={SelectedProduct?.barcode}  onChange={handleChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
      </div>
      <div className="transition-all duration-300 hover:scale-105 ">
        <label className="block mb-2 text-right font-medium text-gray-600">الصورة</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        <div className="w-full align-bottom flex justify-center">
          {ViewIMG?<img className="w-[25%]  m-2" src={ViewIMG}/>:null}
          </div>
      </div>
      <button type="submit" className="w-full m-0 bg-blue-500 text-white pb-3 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-105">إضافة المنتج</button>
    </form>
  </div>
  );
};

export default Modify;