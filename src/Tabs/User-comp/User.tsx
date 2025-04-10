import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { DebtFormData, Product } from "../../Type/Types";
import { useData } from "../../Provider/DataProvider";

export default function User() {
  const {setPage}= useData()
  const [formData, setFormData] = useState<DebtFormData>({
    CostumerID: Date.now(),
    name: "",
    phone: "",
    DebtList: [],
    DebtValue: 0,
    creationDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("الاسم ورقم الهاتف مطلوبان");
      return;
    }

    // Here you would typically send data to your backend
    if (!window.electronAPI) {
         toast.error("Electron API not available");
         return;
       }
     
       try {
         const success = await window.electronAPI.CreateUserInfo(formData);
         
         if (success) {
           toast.success("تم انشاء العميل بنجاح");
           setPage(0);
         } else {
           toast.error("فشل إنشاء العميل. الرجاء التأكد من البيانات أو أن اسم العميل  مستخدم مسبقاً");
         }
       } catch (error) {
         console.error("Error creating product:", error);
         toast.error("حدث خطأ غير متوقع أثناء إنشاء العميل");
       }

  
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        نموذج انشاء دين جديد
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              الاسم الكامل
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رقم الهاتف
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Initial Debt */}
          <div>
            <label
              htmlFor="initialDebt"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              قيمة الدين (بالريال)
            </label>
            <input
              type="number"
              id="initialDebt"
              name="DebtValue"
              min="0"
              step="0.01"
              value={formData.DebtValue}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Creation Date */}
          <div>
            <label
              htmlFor="creationDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تاريخ الدين
            </label>
            <input
              type="date"
              id="creationDate"
              name="creationDate"
              value={formData.creationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ملاحظات إضافية
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            أنشاء معلومات للعميل
          </button>
        </div>
      </form>
    </div>
  );
}
