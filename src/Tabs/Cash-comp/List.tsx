import React, { useState } from "react";
import cashStyle from "./Cash.module.scss";
import { Product } from "../../Type/Types";

const List = () => {
  const [ListProduct, setViewProduct] = useState<Product[]>([
    {
      id: 1,
      name: "test1",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 2,
      name: "test2",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 3,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 4,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 5,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 6,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 7,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 7,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 7,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 7,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
    {
      id: 7,
      name: "test3",
      vendor: "test",
      price: 100,
      barcode: "test",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s",
    },
  ]);
  return (
    <div className="bg-white w-[60vh] overflow-auto max-h-full">
      <div>
        {ListProduct.map((product) => (
          <div className={cashStyle["flex-list"]} key={product.id}>
            <img
              className="size-[35px] bg-transparent"
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDU-J6J7T4VieQJ_s-puomSF2Do4CnbW-TEA&s"
              }
              alt={product.name}
            />
            <span className="flex flex-row gap-2">
              {product.name}{" "}
              <select>
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </span>
            <span style={{ direction: "ltr" }}>{product.price}.₪‎</span>
          </div>
        ))}
      </div>
      <div>
        <button>ازالة المنتجات</button>
        <button>قراءة المنتجات</button>
      </div>
    </div>
  );
};

export default List;
