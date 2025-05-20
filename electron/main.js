import { app, BrowserWindow, ipcMain, Notification } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import sqlite3 from "sqlite3";
import fs from "fs";
import ProductHook from "../electron/Hooks/ProductHook.js";
import DebtHook from "./Hooks/DebtHook.js"; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { Create_Product, Delete_Product, Update_Product, Get_Product } =
  ProductHook();
  const { Create_User_Info,Get_User_Info,Add_User_Debt ,Delete_User_Product} = DebtHook();

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

        // Enable foreign key constraints
        db.run("PRAGMA foreign_keys = ON");

        // Create products table
        db.serialize(() => {
          db.run(
            `CREATE TABLE IF NOT EXISTS products (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              vendor TEXT,
              price REAL,
              quantity INTEGER DEFAULT 1,
              InsertDate TEXT,
              InsertTime TEXT,
              barcode TEXT UNIQUE NOT NULL,
              image TEXT
            )`,
            (err) => {
              if (err) {
                console.error("Error creating products table", err);
                reject(err);
                return;
              }
            }
          );

          // Create debts table
          db.run(
            `CREATE TABLE IF NOT EXISTS debts (
              CostumerID INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              phone TEXT NOT NULL,
              DebtValue REAL NOT NULL DEFAULT 0,
              creationDate TEXT NOT NULL,
              notes TEXT,
              DebtList TEXT , 
              status TEXT DEFAULT 'active' CHECK(status IN ('active', 'paid', 'cancelled'))
            )`,
            (err) => {
              if (err) {
                console.error("Error creating debts table", err);
                reject(err);
                return;
              }
            }
          );

          // Create debt_products junction table
          db.run(
            `CREATE TABLE IF NOT EXISTS debt_products (
              debt_id INTEGER NOT NULL,
              product_id INTEGER NOT NULL,
              quantity INTEGER NOT NULL DEFAULT 1,
              price_at_time REAL NOT NULL,
              PRIMARY KEY (debt_id, product_id),
              FOREIGN KEY (debt_id) REFERENCES debts(CostumerID) ON DELETE CASCADE,
              FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
            )`,
            (err) => {
              if (err) {
                console.error("Error creating debt_products table", err);
                reject(err);
                return;
              }
              
              console.log("All tables created successfully");
              resolve();
            }
          );
        });
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
    ipcMain.handle('get-userData-path', (event, fileData) => {
      try {
        const appDataPath = app.getPath('appData');
        const appImagesDir = path.join(appDataPath, 'Casher', 'images');
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(appImagesDir)) {
          fs.mkdirSync(appImagesDir, { recursive: true });
        }
        
        // Create unique filename
        const fileExt = path.extname(fileData.name) || '.png';
        const fileName = `img_${Date.now()}${fileExt}`;
        const filePath = path.join(appImagesDir, fileName);
        
        // Save file
        fs.writeFileSync(filePath, Buffer.from(fileData.data));
        
        return filePath;
      } catch (err) {
        console.error('Error saving image:', err);
        return null;
      }
    });

    await initializeDatabase();
    await createWindow();
    await Create_Product(db);
    await Get_Product(db);
    await Update_Product(db);
    await Delete_Product(db);
    await Create_User_Info(db)
    await Get_User_Info(db)
    await Add_User_Debt(db)
    await Delete_User_Product(db)
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
