import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useData } from "../../Provider/DataProvider";
import InputField from "../../common/Input";
import { DebtFormData } from "../../Type/Types";

export default function ModelDebt({ Clicked, Change, Data }) {
  const [ViewModel, setViewModel] = useState(false);
  const [FilterArray, setFilterArray] = useState<string[]>([]);
  const { setPage, setScannedResult, PeopleNames, ScanProduct ,setScannedProductList} = useData();
  const [SelectedClient, setSelectedClient] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const CloseModel = () => {
    setViewModel(false);
    Change(false);
  };

  const onClicked = async () => {
    CloseModel();
    setFilterArray([]);
  };

  const onAppend = async () => {
    if (!SelectedClient) {
      toast.warning("الرجاء اختيار عميل");
      return;
    }

    try {
      const result: DebtFormData[] = await window.electronAPI.GetUsersInfo();
      const SelectedCustomer = result.find(
        (rs) =>
          rs.name.toLowerCase().trim() === SelectedClient.toLowerCase().trim()
      );
      const ChangeDebtList = JSON.parse(SelectedCustomer?.DebtList)||[];
      const FullCustomerInfo:any = {
        ...SelectedCustomer,
        DebtList: [... ScanProduct],
      };
      if(ScanProduct.length>0)
      {
        const success: boolean = await window.electronAPI.AddUsersDebt(FullCustomerInfo);
        if (success)
          {toast.success("نو ارفاق الدين بنجاح")
          setScannedProductList([]);}
        else
        toast.error("حدث خطأ أثناء ارفاق الدين")
      }
        
      CloseModel();
      setFilterArray([]);
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب بيانات العميل");
      console.error(error);
    }
  };

  const HandleChange = (name: string) => {
    if (name.trim()) {
      let newArray = PeopleNames.filter((p: string) =>
        p.toLowerCase().includes(name.toLowerCase())
      );
      newArray = [...new Set(newArray)];

      setFilterArray(newArray);
    } else {
      setFilterArray([]);
    }
  };

  useEffect(() => {
    setViewModel(Clicked);
  }, [Clicked]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        CloseModel();
      }
    };

    if (ViewModel) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ViewModel]);

  return (
    <div dir="rtl">
      {ViewModel && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              اختيار العميل
            </h2>

            <InputField
              label="اسم العميل"
              type="text"
              name="nameclient"
              onChange={(e) => HandleChange(e.target.value)}
            />

            {FilterArray.length > 0 ? (
              <div className="relative mt-4">
                <select
                  ref={selectRef}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-red-500 rounded-lg bg-white text-gray-800 
    font-medium shadow-sm hover:border-red-600 focus:border-red-700 focus:ring-2 
    focus:ring-red-200 appearance-none transition-colors cursor-pointer"
                  size={FilterArray.length > 5 ? 5 : undefined}
                  defaultValue="" // Set default value to empty string
                >
                  <option value="" disabled hidden>
                    اختر اسم العميل
                  </option>
                  {FilterArray.map((name, index) => (
                    <option
                      key={index}
                      value={name}
                      className="py-2 hover:bg-red-100 focus:bg-red-100"
                    >
                      {name}
                    </option>
                  ))}
                </select>
                {FilterArray.length <= 5 && (
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                لا يوجد عميل عليه دين
              </div>
            )}

            <div className="flex justify-start gap-3 mt-6">
              <button
                onClick={onAppend}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                ارفاق الدين
              </button>
              <button
                onClick={onClicked}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                اغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
