import { ipcMain,Notification } from "electron";

const ProductHook = () => {
  
  const Create_Product = (db) => {
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
            JSON.stringify(product.image),
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

  };
  const Get_Product =(db) => {
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
    

  }
  const Delete_Product = (db) => {
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
  }
  const Update_Product = (db)=>{
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
                JSON.stringify(product.image),
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
    
  }
  return {
    Create_Product,
    Get_Product,
    Delete_Product,
    Update_Product
    // Return the function for external use
  };
};

export default ProductHook;
