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
  PeopleNames: [],
  SetProductList: () => {},
  setScannedProductList: () => {},
  setScannedResult: () => {},
  setPage: () => {},
  setPeopleNames: () => {},
});

function DataProvider({ children }: ChildrenNode) {
  const [ProductList, setProductList] = useState<Product[]>([]);
  const [ScanProduct, setScanProduct] = useState<Product[] | []>([]);
  const [ScanResult, setScanResult] = useState<string | number>("");
  const [SelectedPage, setSelectedPage] = useState<number>(0);
  const [PeopleNames, setPeopleName] = useState<string[]>([]);

  const SetProductList = (value: Product[]) => {
    setProductList(value);
  };
  function formatDateDDMMYY(date) {
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year

    return `${day}/${month}/${year}`;
  }
  const setScannedProductList = (value: Product | Product[] | any) => {
    if (Array.isArray(value)) {
      setScanProduct(value);
    } else {
      setScanProduct((prev: any[]) => {
        // Check if product already exists (assuming Product has an 'id' field)
        const alreadyExists = prev.some((product) => product.id === value.id);

        if (!alreadyExists) {
          value = { ...value, InsertDate: formatDateDDMMYY(new Date()),InsertTime: new Date().toTimeString().split(' ')[0] };
          return [...prev, value];
        } else {
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
  const setPeopleNames = (value: string ) => {
    PeopleNames.push(...value);
    };
  const value = {
    ProductList,
    ScanResult,
    ScanProduct,
    SelectedPage,
    PeopleNames,
    SetProductList,
    setScannedProductList,
    setScannedResult,
    setPage,
    setPeopleNames,
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
