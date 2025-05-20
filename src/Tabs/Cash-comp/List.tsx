import React, { useState } from "react";
import cashStyle from "./Cash.module.scss";
import Camera from "./Camera";
import { useData } from "../../Provider/DataProvider";
import { DebtFormData, Product } from "../../Type/Types";
import ModelDebt from "../Model/ModelDbet";
import { FaImage } from "react-icons/fa";


const List = () => {
  const { ScanProduct, setScannedProductList,setPeopleNames } = useData();
  const [Total, setTotal] = useState(0);
  const [Data, setData] = useState<DebtFormData[]>([])
  const [Clicked, setClicked] = useState(false)

  // Calculate total whenever ScanProduct changes
  React.useEffect(() => {
    const newTotal = ScanProduct.reduce(
      (sum, product:any) => sum + (product.price * (product.quantity || 1)), 
      0
    );
    setTotal(newTotal);
  }, [ScanProduct]);

  const HandelQuantity = (value: number, barcode: string) => {
    const quantity = Number(value);
    if (isNaN(quantity) || quantity < 1) return;

    const updatedScanProduct:any = ScanProduct.map(item => 
      item.barcode === barcode ? { ...item, quantity } : item
    );
    
    setScannedProductList(updatedScanProduct);
  };

  const handleClearProducts = () => {
    setScannedProductList([]);
  };
  const ChangeModel=(value)=>{
    setClicked(value)
  }
  const HandleClicked = async () => {
    const result: DebtFormData[] = await window.electronAPI.GetUsersInfo();
    setPeopleNames(result.map(item=>item.name))
    setClicked(!Clicked)
  }
  return (
    <div className="flex flex-col justify-between bg-white w-[60vh] overflow-auto max-h-full">
      <ModelDebt Clicked={Clicked} Data={Data}  Change={ChangeModel}></ModelDebt>
      <div className="h-full">
        {ScanProduct.length > 0 ? (
          ScanProduct.map((product) => (
            <div className={cashStyle["flex-list"]} key={`${product.id}-${product.barcode}`}>
              <img
                className="size-[35px] bg-transparent"
                src={JSON.parse(product.image)}
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'fallback-image-url';
                }}
              />
              <span className="flex flex-row gap-2">
                {product.name} {"#"}
                <select
                  value={product.quantity || 1}
                  onChange={(e) => HandelQuantity(Number(e.target.value), product.barcode)}
                >
                  {Array.from({ length: 15 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </span>
              <span style={{ direction: "ltr" }}>
                {(product.price * (product.quantity || 1)).toFixed(2)} ₪‎
              </span>
            </div>
          ))
        ) : (
          <div className="text-center p-4"></div>
        )}
      </div>
      
      <div className="bg-blue-800 h-max p-5 flex flex-col text-white items-center">
        <div className="flex gap-2">
          <button
            className="bg-red-400 font-medium px-4 py-2 rounded"
            onClick={handleClearProducts}
          >
            ازالة المنتجات
          </button>
          <Camera />
          <button onClick={()=>HandleClicked()} className="bg-green-600 px-4 py-2 rounded">
            اضافه للدين
          </button>
        </div>
        <div className="mt-2 text-lg font-bold  flex flex-row-reverse items-center justify-end gap-1">
  <span className="text-white/90">:السعر الكلي</span>
  <span className="text-white px-2 py-1 bg-blue-900 rounded-md">
    {Total.toFixed(2)} ₪‎
  </span>
</div>
      </div>
    </div>
  );
};

export default List;