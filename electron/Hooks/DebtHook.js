import { ipcMain,Notification } from "electron";

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

  return { Create_User_Info,Get_User_Info };
};

export default DebtHook;
