import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useData } from "../../Provider/DataProvider";

export default function ModelDebt({ Clicked, Change, Data }) {
  const [ViewModel, setViewModel] = useState(false);
  const [FilterArray, setFilterArray] = useState([]);
  const { setPage, setScannedResult, PeopleNames } = useData();
  const CloseModel = () => setViewModel(false);

  const onClicked = async () => {
    CloseModel();
    Change(false);
  };
  const onAppend = async () => {
    CloseModel();
    Change(false);
  };
  const HandleChange = (name: string) => {
    if(name.trim()){
      const newArray = PeopleNames.filter((p:string) => p.includes(name));
      setFilterArray(newArray);
    }
    else{
      setFilterArray([]);
    }
    };
  useEffect(() => {
    setViewModel(Clicked);
  }, [Clicked]);

  return (
    <div dir="rtl">
      <div className="  bg-orange-300 w-40 ">
        {ViewModel && (
          <div className="fixed inset-0  bg-black bg-opacity-40 flex items-center justify-center p-4 z-10">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                اختيار العميل
              </h2>
              <input
              className="border-solid-red"
                type="text"
                onChange={(e) => HandleChange(e.target.value)}
              />
              {FilterArray.length > 0 ? (
                <select>
                  {FilterArray.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-x  text-gray-800 mb-4">
                  لا يوجد عميل عليه دين
                </span>
              )}

              <div className="flex justify-start space-x-3 space-x-reverse">
                <button
                  onClick={onAppend}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  نعم، تأكيد
                </button>
                <button
                  onClick={onClicked}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  اغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
