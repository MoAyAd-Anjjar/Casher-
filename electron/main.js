/* eslint-disable no-undef */
import { app, BrowserWindow, ipcMain, Notification } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import sqlite3 from "sqlite3";
import fs from "fs";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the database file path to the app's directory with the name POS.DATABASE
const dbPath = path.join(__dirname, "POS.database"); // This will place the database in the same directory as the app

// Declare the db variable globally so it can be accessed in different places
let db;

// Check if the database exists
if (!fs.existsSync(dbPath)) {
  console.log("Creating new database...");

  // Create the SQLite database
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error opening database", err);
    } else {
      // Create the products table if it doesn't exist
      db.run(
        `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          vendor TEXT,
          price REAL,
          barcode TEXT,
          image TEXT
        )`,
        (tableErr) => {
          if (tableErr) {
            console.error("Error creating table", tableErr);
          } else {
            console.log("Database and table created successfully!");
          }
        }
      );
    }
  });
} else {
  console.log("Database already exists.");

  // If the database already exists, connect to it
  db = new sqlite3.Database(dbPath);
}

let mainWindow;

// Function to create the Electron window
async function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "assets/icons/icon.ico"), // for Windows
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
    mainWindow.setMenuBarVisibility(true);
    mainWindow.menuBarVisible(true);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(true);
    mainWindow.menuBarVisible(true);


  }
}

// Create the window when the app is ready
app.whenReady().then(async () => {
  await createWindow();

  // Handle product creation
  ipcMain.on("Create-Product", (event, product) => {
    if (product) {
      // Prepare the SQL query to insert product data
      const stmt = db.prepare(
        "INSERT INTO products (name, vendor, price, barcode, image) VALUES (?, ?, ?, ?, ?)"
      );

      // Run the prepared statement with the product data
      stmt.run(
        product.name,
        product.vendor,
        product.price,
        product.barcode,
        product.image,
        function (err) {
          if (err) {
            // Handle insertion error
            console.error("Error inserting product:", err);
            new Notification({
              title: "Product Status",
              body: "Error creating product",
            }).show();
          } else {
            // Successful product insertion
            console.log("Product created with ID:", this.lastID);
            new Notification({
              title: "Product Status",
              body: "Product created successfully!",
            }).show();
          }
        }
      );

      // Finalize the statement
      stmt.finalize();
    } else {
      // Handle case where product data is missing
      new Notification({
        title: "Product Status",
        body: "Error: Product data is missing",
      }).show();
    }
  });

  // Handle retrieving products
  ipcMain.handle("Get-Product", async () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM products", (err, rows) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("Retrieved products:", rows);
          resolve(rows);
        }
      });
    });
})})

// Quit the app when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Recreate the window if the app is activated
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
