import { toast } from "react-toastify";
import { ipcMain } from "electron";

const useDebt = () => {
  const addDebt = (data) => {
    if (data && data.CustomerName && data.CustomerDebt) {
      toast.success(
        `تم اضافة دين جديد على حساب ${data.CustomerName} بقيمة ${data.CustomerDebt} شيكل بنجاح`,
        { autoClose: 2000, position: "top-center" }
      );
    } else {
      toast.error(`لم تتوفر المعلومات الكافيه لاضافة الدين`, {
        autoClose: 2000,
        position: "top-center",
      });
    }
  };
  const CreateUserDebt = async (db) => {
    ipcMain.handle("Create-User-Debt", async (event, List) => {
      try {
        console.log(List);
        
      } catch (error) {
        console.log(error);
      }
      
    });
  };

  return { addDebt, CreateUserDebt };
};

export default useDebt;
