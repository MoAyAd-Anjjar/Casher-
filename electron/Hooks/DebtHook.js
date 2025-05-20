import { ipcMain } from "electron";

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
            "INSERT INTO debts (CostumerID,name, phone, DebtValue, creationDate, notes,status,DebtList) VALUES (?,?, ?, ?, ?, ?,?, ?)"
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
  };
  const Get_User_Info = (db) => {
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
  };
  const Add_User_Debt = (db) => {
    ipcMain.handle("Add-User-info", async (_, Debt) => {
      if (!Debt) return false;
      try {
        const row = await new Promise((resolve, reject) => {
          db.get(
            "SELECT * FROM debts WHERE CostumerID = ?",
            [Debt.CostumerID],
            (err, row) => (err ? reject(err) : resolve(row))
          );
        });

        if (row) {
          // Parse existing DebtList (default to empty array if missing/invalid)
          const existingDebts = JSON.parse(row.DebtList);

          console.log("1", existingDebts);

          // Merge with new debts (assuming Debt.DebtList is an array)

          const newList = [...existingDebts, ...Debt.DebtList];
          console.log("2", newList);
          if (newList) {
            await new Promise((resolve, reject) => {
              db.run(
                "UPDATE debts SET DebtList = ? WHERE CostumerID = ?",
                [JSON.stringify(newList), Debt.CostumerID],
                (err) => (err ? reject(err) : resolve())
              );
            });
            return true;
          }
        } else return false;
      } catch (error) {
        console.error("Error in Add-User-info:", error);
        return false;
      }
    });
  };

  const Delete_User_Product = (db) => {
    ipcMain.handle("Delete-User-List", async (_, time,id,CostumerID) => {
        try {
          const row = await new Promise((resolve, reject) => {
            db.get(
              "SELECT * FROM debts    WHERE CostumerID = ?",[CostumerID],
              (err, row) => (err ? reject(err) : resolve(row))
            );
          });
          if(row)
          { 
          const rowparse=JSON.parse(row.DebtList);
            
            const newList=rowparse.filter((item) => item.id !== id && item.InsertTime !== time);
            await new Promise((resolve, reject) => {
              db.run(
                "UPDATE debts SET DebtList = ? WHERE CostumerID = ?",
                [JSON.stringify(newList), CostumerID],
                (err) => (err ? reject(err) : resolve())
              );
            });
            return true;
          }
          else
          {
            console.log("no data found");
            return false;
            
          }
  
        } catch (error) {
          console.error("Error in Add-User-info:", error);
          return false;
        }

    });
  };

  return {
    Create_User_Info,
    Get_User_Info,
    Add_User_Debt,
    Delete_User_Product,
  };
};

export default DebtHook;
