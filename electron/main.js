import { app, BrowserWindow, ipcMain, Notification } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import sqlite3 from "sqlite3";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use userData directory for better cross-platform compatibility
const dbPath = path.join(app.getPath("userData"), "POS.database");
let db;

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const dbExists = fs.existsSync(dbPath);

    db = new sqlite3.Database(
      dbPath,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          console.error("Error opening database", err);
          reject(err);
          return;
        }

        if (!dbExists) {
          new Notification({
            title: "Database Status",
            body: "Creating new database",
          }).show();
        }

        // Create tables if they don't exist
        db.run(
          `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        vendor TEXT,
        price REAL NOT NULL,
        barcode TEXT UNIQUE,
        image TEXT
      )`,
          (err) => {
            if (err) {
              console.error("Error creating table", err);
              reject(err);
            } else {
              console.log("Database ready");
              resolve();
            }
          }
        );
      }
    );
  });
}

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "assets/icons/icon.ico"), // Windows requires .ico
    webPreferences: {
      preload: path.join(__dirname, "../electron/preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.removeMenu();

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173/");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(async () => {
  try {
    if (process.platform === "win32") {
      app.setAppUserModelId("com.Casher.app"); // Important for Windows notifications
    }
    await initializeDatabase();
    await createWindow();

    ipcMain.handle("Create-Product", async (_, product) => {
      if (!product) return false;

      try {
        const row = await new Promise((resolve, reject) => {
          db.get(
            "SELECT id FROM products WHERE barcode = ?",
            [product.barcode],
            (err, row) => (err ? reject(err) : resolve(row))
          );
        });

        if (row) return false;

        const success = await new Promise((resolve) => {
          const stmt = db.prepare(
            "INSERT INTO products (name, vendor, price, barcode, image) VALUES (?, ?, ?, ?, ?)"
          );

          stmt.run(
            product.name,
            product.vendor,
            product.price,
            product.barcode,
            product.image,
            function (err) {
              resolve(!err);
            }
          );
          stmt.finalize();
        });

        return success;
      } catch (error) {
        console.error("Create product error:", error);
        return false;
      }
    });

    // Product retrieval handler
    ipcMain.handle("Get-Product", async () => {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products", (err, rows) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });

    ipcMain.handle("Delete-Product", async (_, product) => {
      return new Promise((resolve, reject) => {
        db.run(
          "DELETE FROM products WHERE barcode = ?",
          [product.barcode],
          function (err) {
            if (err) {
              console.error("Error deleting product:", err);
              reject(false);
            } else {
              // Check if any rows were actually deleted
              if (this.changes > 0) {
                resolve(true);
              } else {
                console.log("No product found with barcode:", product.barcode);
                resolve(false);
              }
            }
          }
        );
      });
    });

    ipcMain.handle("Update-Product", async (_, product) => {
      const targetBarcode=product.Prevbarcode|| product.barcode
      if (!product ) {
        console.error("Invalid product data or missing previous barcode");
        return false;
      }
    
      // Validate the barcode to prevent SQL injection
      if (!/^[a-zA-Z0-9]+$/.test(targetBarcode)) {
        console.error("Invalid barcode format");
        return false;
      }
    
      return new Promise((resolve, reject) => {
        // Using template literal for WHERE clause
        const sql = `UPDATE products 
                     SET name = ?, vendor = ?, price = ?, image = ?, barcode = ?
                     WHERE barcode = '${targetBarcode}'`;
        
        db.run(
          sql,
          [
            product.name,
            product.vendor,
            product.price,
            product.image,
            product.barcode
          ],
          function(err) {
            if (err) {
              console.error("Error updating product:", err);
              reject(false);
            } else {
              if (this.changes > 0) {
                resolve(true);
              } else {
                console.log("No product found with barcode:", targetBarcode);
                resolve(false);
              }
            }
          }
        );
      });
    });
  } catch (error) {
    console.error("App initialization failed:", error);
    app.quit();
  }
});

// Close database when app quits
app.on("before-quit", () => {
  if (db) {
    db.close();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
