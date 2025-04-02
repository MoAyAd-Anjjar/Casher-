const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  CreateProduct: (product) => ipcRenderer.invoke("Create-Product", product),
  getProductList: () => ipcRenderer.invoke("Get-Product"),
  DeleteProduct: (product) => ipcRenderer.invoke("Delete-Product",product),
  UpdateProduct: (product) => ipcRenderer.invoke("Update-Product",product),
});
