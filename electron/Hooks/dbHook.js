import { ipcMain } from "electron";
import { toast } from "react-toastify";

const useDB = () => {
  const getCustomersNames = async (db) => {
    // Set up IPC handler for fetching customer names
    ipcMain.handle("fetch-Customers-Names", async () => {
      try {
        const collection = await db.collection("debt_db");
        const data = await collection.find({}).toArray(); // Ensure you convert it to array
        return data; // Return fetched customer data
      } catch (error) {
        console.error("Error fetching data in main process:", error);
        throw error; // Propagate the error
      }
    });
  };

  const getItemsInfo = async (db) => {
    ipcMain.handle("fetch-data", async () => {
      try {
        const collection = await db.collection("Items_db");
        const data = await collection.find({}).toArray();

        return data;
      } catch (error) {
        console.error("Error fetching data in main process:", error);
        throw error;
      }
    });
  };
  const InsertItemsInfo = async (db) => {
    ipcMain.handle("insert-data", async (event, item) => {
      try {
        const collection = db.collection("Items_db");
        const result = await collection.insertOne(item);
        return result.insertedId;
      } catch (error) {
        console.error("Error inserting data in main process:", error);
        throw error;
      }
    });
  };
  
  return {
    getCustomersNames,
    getItemsInfo,
    InsertItemsInfo,
    // Return the function for external use
  };
};

export default useDB;
