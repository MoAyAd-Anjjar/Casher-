import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useData } from "../../Provider/DataProvider";
import { Product, DebtFormData } from "../../Type/Types";
import InputField from "../../common/Input";

// Define types for our data

// Sample data

// Filter options
type FilterOption = "all" | "active" | "inactive" | "on leave" | "none";
const Debt = () => {
  const { setPage, ScanProduct } = useData();
  const [PeopleData, setPeopleData] = useState<DebtFormData[]>([]);
  const [PersonDebt, setPersonDebt] = useState<number>();
  const [PersonDebtNotes, setPersonDebtNotes] = useState<string>("");
  const [PersonDebtList, setPersonDebtList] = useState<Product[] | any>([]);
  const [PersonDebtName, setPersonDebtName] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      if (!window.electronAPI) {
        toast.error("Electron API not available");
        return;
      }

      const result: DebtFormData[] = await window.electronAPI.GetUsersInfo();
      
      
      if (result.length > 0) {
        setPeopleData(result);
      }
    };
    getUsers();
  }, []);
  var HandelSearch = (value: number | string) => {
    if (value.toString().trim()) {
      const filtered: any = PeopleData.filter(
        (pr) => pr.name.toLowerCase() === value.toString().trim().toLowerCase()
      );

      if (filtered.length > 0) {
        const firstMatch = filtered[0];

        if (firstMatch.DebtList != null && firstMatch != null) {
          setPersonDebtNotes(firstMatch.notes);
          setPersonDebtName(firstMatch.name);

          setPersonDebtList(JSON.parse(firstMatch.DebtList) || []);
          ScanProduct.map((pro: Product) =>
            setPersonDebtList((prev) => [...prev, pro])
          );
          const newTotal = ScanProduct.reduce(
            (sum, product) => sum + product.price * (product.quantity || 1),
            0
          );

          setPersonDebt(newTotal);
        } else {
          setPersonDebtNotes("");
          setPersonDebtName("");
          setPersonDebtList(null);
          setPersonDebt(0);
        }
      }
    } else {
      setPersonDebtNotes("");
      setPersonDebtName("");
      setPersonDebtList(null);
      setPersonDebt(0);
    }
  };

  // Filter data based on selected option

  return (
    <div className="p-6 max-w-6xl mx-auto h-[90vh]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        دين العاميل الحالي
      </h1>

      {/* Filter control */}
      <div
        dir="rlt"
        className="mb-6 flex rtl:ml-0 items-center w-full flex-row-reverse gap-2"
      >
        <InputField
          name="userName"
          type="text"
          label="اسم العميل"
          onChange={(e) => HandelSearch(e.target.value)}
        ></InputField>
        <InputField
          name="userData"
          type="date"
          label=" تاريخ الدين"
        ></InputField>
        <InputField
          name="userDebt"
          type="text"
          label="قيمة الدين"
          defaultValue={PersonDebt}
        ></InputField>
        <InputField
          name="userDebt"
          type="textarea"
          label="ملاحظات العميل"
          defaultValue={PersonDebtNotes}
        ></InputField>
      </div>
      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                رقم
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                اسم العميل
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                تاريخ
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                المنتج
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                السعر
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                كميه
              </th>
              <th
                scope="col"
                className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                العمليات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {PersonDebtList?.length > 0 && PersonDebtList ? (
              PersonDebtList.map((person, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.barcode}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {PersonDebtName}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.InsertDate}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.name}{" "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.quantity || 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    <button className="text-white bg-red-500">
                      ازاله من القائمة
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  لا يوجد معلومات للعميل الحالي{" "}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Debt;
