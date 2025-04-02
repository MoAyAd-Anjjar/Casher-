import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Model({ Clicked, type, Data, barcode }) {
  const [ViewModel, setViewModel] = useState(Clicked);
  const [Checked, setChecked] = useState(false);

  const CloseModel = () => setViewModel(false);

  const onClicked = async () => {
    setChecked(true);
    if (type == "update") {
      try {
        if (!window.electronAPI?.getProductList) {
          throw new Error("Electron API is not available");
        }
        if (barcode == Data.barcode) {
          var Result = await window.electronAPI.UpdateProduct(Data);
          if (Result) toast.success("تم تعديل المنتج بنجاح");
          else toast.error("حدث خطا أثناء عملة التعديل");
        } else {
          Result = await window.electronAPI.UpdateProduct({
            ...Data,
            Prevbarcode: barcode,
          });
          if (Result) toast.success("تم تعديل المنتج بنجاح");
          else toast.error("حدث خطا أثناء عملة التعديل");
        }
      } catch (error) {
        console.error("Failed to Update product list:", error);
      }
    }
    if (type == "delete") {
      try {
        if (!window.electronAPI?.getProductList) {
          throw new Error("Electron API is not available");
        }

        var Result = await window.electronAPI.DeleteProduct(Data);
        if (Result) toast.success("تم حذف المنتج بنجاح");
        toast.error("حدث خطا أثناء عملة الحذف");
      } catch (error) {
        console.error("Failed to delete product list:", error);
      }
    }
    CloseModel();
    // هنا يمكنك إضافة منطق حفظ التغييرات
  };

  return (
    <div dir="rtl">
      <div className="  bg-orange-300 w-40 ">
        {ViewModel && (
          <div className="fixed inset-0  bg-black bg-opacity-40 flex items-center justify-center p-4 z-10">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                تأكيد التغييرات
              </h2>

              <p className="text-gray-600 mb-6">
                هل أنت متأكد أنك تريد حفظ هذه التغييرات؟ لا يمكن التراجع عن هذا
                الإجراء لاحقاً.
              </p>

              <div className="flex justify-start space-x-3 space-x-reverse">
                <button
                  onClick={onClicked}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  نعم، تأكيد
                </button>

                <button
                  onClick={CloseModel}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
