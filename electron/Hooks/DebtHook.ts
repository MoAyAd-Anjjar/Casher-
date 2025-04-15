import { log } from "console";
import { ipcMain,Notification } from "electron";
import { DebtFormData } from "../../src/Type/Types";

const DebtHook = () => {

  const Create_User_Info = (db) => { 
   ipcMain.handle("Create-User-info", async (_, Debt) => {
      if (!Debt) return false;

      try {
        const row = await new Promise((resolve, reject) => {
          db.get(
            "SELECT CostumerID FROM debts WHERE name = ?",
            [Debt.name],
            (err, row) => (err ? reject(err) : resolve(row))
          );
        });

        if (row) return false;
 
        const success = await new Promise((resolve) => {
          const stmt = db.prepare(
            "INSERT INTO debts (CostumerID,name, phone, DebtValue, creationDate, notes,status,DebtList) VALUES (?,?, ?, ?, ?, ?,?, ?)",
          );

          stmt.run(
            Debt.CostumerID,
            Debt.name,
            Debt.phone,
            Debt.DebtValue,
            Debt.creationDate,
            Debt.notes,
            Debt.status,
            JSON.stringify(Debt.DebtList),
            function (err) {
              resolve(!err);
            }
          );
          stmt.finalize();
        });

        return success;
      } catch (error) {
        console.error("Create userinfo error:", error);
        return false;
      }
    });
  }
  const Get_User_Info =(db) =>{
    ipcMain.handle("Get-User-info", async () => {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM debts", (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });
  }
  const Add_User_Debt=(db)=>{
    ipcMain.handle("Add-User-info", async (_, Debt:DebtFormData) => {
      if (!Debt) return false;

      console.log(Debt);
      return true
      
        });

        
    
    
    

  }
  return { Create_User_Info,Get_User_Info,Add_User_Debt };
};

export default DebtHook;
