import React from "react";
import { useState } from "react";
import {useData} from "../../Provider/DataProvider"
import { toast } from "react-toastify";
import { Product } from "../../Type/Types";
import fs from 'fs';
import path from 'path';
const ProductForm = () => {
  const [ViewIMG, setViewIMG] = useState<null| string>("")
  const {setPage}=useData()
  const [product, setProduct] = useState<Product>({
    name: "",
    vendor: "",
    price: 0,
    barcode: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
  
    const selectedFile = e.target.files[0];
    
    try {
      // 1. Update state with the selected file
      
      // 2. Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setViewIMG(previewUrl);
      
      // 3. Send file data to main process for saving
      const arrayBuffer = await selectedFile.arrayBuffer();
      const fileData = {
        name: selectedFile.name,
        type: selectedFile.type,
        data: Array.from(new Uint8Array(arrayBuffer))
      };
      
      // 4. Invoke IPC to save file
      const savedPath = await window.electronAPI.SaveIMG(fileData)
      
      // 5. Update state with saved path
      if (savedPath) {
        setProduct((prev) => ({ ...prev, image: savedPath }));

      }
    } catch (err) {
      console.error('Error handling image change:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!window.electronAPI) {
      toast.error("Electron API not available");
      return;
    }
    console.log(product);
    
    try {
      const success = await window.electronAPI.CreateProduct(product);
      console.log(success);
      
      if (success) {
        toast.success("تم انشاء المنتج بنجاح");
        setPage(0);
      } else {
        toast.error("فشل إنشاء المنتج. الرجاء التأكد من البيانات أو أن الباركود  مستخدم مسبقاً");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("حدث خطأ غير متوقع أثناء إنشاء المنتج");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-6 bg-white shadow-xl rounded-xl flex  w-max  flex-col transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">إضافة منتج</h2>
      <form onSubmit={handleSubmit} className="w-[65vh] flex max-w-screen-xl flex-col flex-shrink-0 " >
        <div className="transition-all duration-300 hover:scale-105">
          <label className="block mb-2 text-right font-medium text-gray-600">اسم المنتج</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <label className="block mb-2 text-right font-medium text-gray-600">المورد</label>
          <input type="text" name="vendor" value={product.vendor} onChange={handleChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <label className="block mb-2 text-right font-medium text-gray-600">السعر</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
        </div>
        <div className="transition-all duration-300 hover:scale-105">
          <label className="block mb-2 text-right font-medium text-gray-600">الباركود</label>
          <input type="text" name="barcode" value={product.barcode} onChange={handleChange} className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
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

export default ProductForm;
