import React, { useEffect, useState } from "react";
import { Product, ChildrenNode, DataProviderType } from "../Type/Types";
import { createContext, useContext } from "react";
import useProduct from "../hook/ProductHook";
import { toast } from "react-toastify";

const DataContext = createContext<DataProviderType>({
  ProductList: [],
  ScanProduct: [],
  ScanResult: "",
  SelectedPage: 0,
  SetProductList: () => {},
  setScannedProductList: () => {},
  setScannedResult: () => {},
  setPage: () => {},
});

function DataProvider({ children }: ChildrenNode) {
  const [ProductList, setProductList] = useState<Product[]>([]);
  const [ScanProduct, setScanProduct] = useState<Product[] | []>([]);
  const [ScanResult, setScanResult] = useState<string | number>("");
  const [SelectedPage, setSelectedPage] = useState<number>(0);

  const SetProductList = (value: Product[]) => {
    setProductList(value);
  };
  const setScannedProductList = (value: Product | Product[]) => {

    if (Array.isArray(value)) {
      setScanProduct(value);
    } else {
      setScanProduct((prev: Product[]) => {
        // Check if product already exists (assuming Product has an 'id' field)
        const alreadyExists = prev.some((product) => product.id === value.id);

        if (!alreadyExists) {
          return [...prev, value];
        }

        else{
          toast.info(`المنتج ${value.name} موجود مسبقاً`);
          return prev;
        }
      });
    }
  };
  const setScannedResult = (value: string | number) => {
    setScanResult(value);
  };
  const setPage = (value: number) => {
    setSelectedPage(value);
  };
  const value = {
    ProductList,
    ScanResult,
    ScanProduct,
    SelectedPage,
    SetProductList,
    setScannedProductList,
    setScannedResult,
    setPage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export default DataProvider;
