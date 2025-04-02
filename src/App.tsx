import { useEffect, useState } from "react";
import Main from "./Tabs/Main-comp/Main";
import Cash from "./Tabs/Cash-comp/Cash";
import { FaArrowLeft } from "react-icons/fa";
import React from "react";
import "./App.css";
import ProductForm from "./Tabs/Product-comp/Product";
import Debt from "./Tabs/Debt-comp/Debt";
import Modify from "./Tabs/Modify-comp/Modify";
import User from "./Tabs/User-comp/User";
import useProduct from "./hook/ProductHook";
import { useData } from "./Provider/DataProvider";
import Model from "./Tabs/model/modle";

function App() {

  const {getProducts}=useProduct()
  const {SelectedPage,setPage}=useData()
  useEffect(() => {
    getProducts()
  }, [])
  
  return (
    <>

      {SelectedPage > 0 && (
        <div className="absolute top-[0%] left-[0%]">
          <FaArrowLeft
            onClick={() => setPage(0)}
            cursor="pointer"
            size={45}
            style={{ background: "wheat" }}
          />
        </div>
      )}
      {SelectedPage === 0 ? <Main  /> : ""}
      {SelectedPage === 1 ? <Cash /> : ""}
      {SelectedPage === 2 ? <ProductForm /> : ""}
      {SelectedPage === 3 ? <Debt /> : ""}
      {SelectedPage === 4 ? <Modify /> : ""}
      {SelectedPage === 5 ? <User /> : ""}

    </>
  );
}

export default App;
