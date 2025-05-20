import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useData } from "../../Provider/DataProvider";
import { Product, DebtFormData } from "../../Type/Types";
import InputField from "../../common/Input";

const Debt = () => {
  const { setPage, ScanProduct } = useData();
  const [PeopleData, setPeopleData] = useState<DebtFormData[]>([]);
  const [PersonDebt, setPersonDebt] = useState<number>();
  const [PersonDebtNotes, setPersonDebtNotes] = useState<string>("");
  const [PersonDebtList, setPersonDebtList] = useState<Product[] | any>([]);
  const [PersonDebtName, setPersonDebtName] = useState<string>("");
  const [PersonDebtDate, setPersonDebtDate] = useState<any>();
  const [PersonID, setPersonID] = useState<number|any>()
  const [FilteredPersonDebtList, setFilteredPersonDebtList] = useState<
    Product[] | any
  >([]);

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
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
    const formattedDate = firstDayOfMonth.toISOString().split("T")[0]; // "2024-06-01"
    setPersonDebtDate(formattedDate);
  }, []);
  const HandelSearch = (value: string) => {
    if (value.toString().trim()) {
      const filtered: any = PeopleData.filter(
        (pr) => pr.name.toLowerCase() === value.toString().trim().toLowerCase()
      );

      if (filtered.length > 0) {
        const firstMatch = filtered[0];
        setFilteredPersonDebtList(JSON.parse(firstMatch.DebtList) || []);
        if (firstMatch.DebtList != null && firstMatch != null) {
          setPersonDebtNotes(firstMatch.notes);
          setPersonDebtName(firstMatch.name);
          setPersonID(firstMatch.CostumerID)
          setPersonDebtList(JSON.parse(firstMatch.DebtList) || []);

          const newTotal = JSON.parse(firstMatch.DebtList).reduce(
            (sum, product) => sum + product.price * (product.quantity || 1),
            0
          );

          setPersonDebt(newTotal);
        } else {
          setPersonDebtNotes("");
          setPersonDebtName("");
          setPersonDebtList(null);
          setFilteredPersonDebtList(null);
          setPersonDebt(0);
          setPersonID(0)
        }
      }
    } else {
      setPersonDebtNotes("");
      setPersonDebtName("");
      setPersonDebtList(null);
      setFilteredPersonDebtList(null);
      setPersonDebt(0);
      setPersonID(0)

    }
  };

  const HandelSearchDate = (value: string) => {
    if (!PersonDebtList) {
      console.log("Person debt list is null or undefined");
      return;
    }

    // Convert the search value to different possible formats
    const normalizeDate = (dateStr: string) => {
      // Handle formats like 15/4/2025, 15/04/2025, 2025/4/15, etc.
      const parts = dateStr.split(/[/-]/);

      if (parts.length === 3) {
        // If format is DD/MM/YYYY or similar
        if (parts[0].length === 2) {
          const [day, month, year] = parts;
          return `${year.padStart(4, "20")}/${month.padStart(
            2,
            "0"
          )}/${day.padStart(2, "0")}`;
        }
        // If format is YYYY/MM/DD or similar
        else if (parts[0].length === 4) {
          const [year, month, day] = parts;
          return `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
        }
      }
      return dateStr; // fallback
    };

    const normalizedSearchValue = normalizeDate(value);

    const filteredPeople = FilteredPersonDebtList.filter(
      (person) =>
        person.InsertDate &&
        normalizeDate(person.InsertDate) === normalizedSearchValue
    );

    setPersonDebtList(filteredPeople);
  };

  const RemoveFromList = async (time: string,id:number) => {
    if(PersonID &&id&&time )
    setPersonDebtList(PersonDebtList.filter((item:Product) => item.InsertTime !== time && item.id !== id));
    const success=  await window.electronAPI.DeleteUserProduct(time,id,PersonID)
    if(success){
    console.log(time,id);
    }
    else
    console.log("error");

    
  };

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
          defaultValue={PersonDebtDate}
          label=" تاريخ الدين"
          onChange={(e) => HandelSearchDate(e.target.value)}
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
  
                    {person.InsertDate}:--:{person.InsertTime}
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
                    <button
                      className="text-white bg-red-500"
                      onClick={()=>RemoveFromList(person.InsertTime,person.barcode)}
                    >
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
