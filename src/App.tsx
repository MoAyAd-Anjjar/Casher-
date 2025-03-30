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

function App() {
  const changeTab = (Page: number) => {
    setCount(Page);
  };
  const [count, setCount] = useState<number>(0);

  return (
    <>

      {count > 0 && (
        <div className="absolute top-[0%] left-[0%]">
          <FaArrowLeft
            onClick={() => setCount(0)}
            cursor="pointer"
            size={45}
            style={{ background: "wheat" }}
          />
        </div>
      )}
      {count === 0 ? <Main Page={changeTab} /> : ""}
      {count === 1 ? <Cash /> : ""}
      {count === 2 ? <ProductForm /> : ""}
      {count === 3 ? <Debt /> : ""}
      {count === 4 ? <Modify /> : ""}
      {count === 5 ? <User /> : ""}
    </>
  );
}

export default App;
