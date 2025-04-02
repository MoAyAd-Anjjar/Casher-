import React, { useState } from "react";
import cashStyle from "./Cash.module.scss";
import { Product } from "../../Type/Types";
import Camera from './Camera'
import { useData } from "../../Provider/DataProvider";

const List = () => {
const {ScanProduct,setScannedProductList}=  useData()

  return (
    <div className="flex flex-col  justify-between bg-white w-[60vh] overflow-auto max-h-full">
      <div>
        {ScanProduct.length>0?ScanProduct.map((product) => (
          <div className={cashStyle["flex-list"]} key={product.id}>
            <img
              className="size-[35px] bg-transparent"
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s"
              }
              alt={product.name}
            />
            <span className="flex flex-row gap-2">
              {product.name} {"#"}
              <select>
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </span>
            <span style={{ direction: "ltr" }}>{Math.floor(product.price).toFixed(2)} ₪‎</span>
          </div>
        )):""}
      </div>
      <div className="bg-blue-800 h-max h-full p-5 flex flex-col text-white items-center">
        <div className="flex">

        <button className="bg-red-400 font-medium" onClick={()=>setScannedProductList([])}>ازالة المنتجات</button>
        <Camera></Camera>
        <button className="bg-green-600">اضافه للدين</button>
        </div>
        <div>
        <span>₪‎السعر الكلي:{Math.floor(ScanProduct.reduce((sum,pro)=>pro.price+sum,0)).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default List;
