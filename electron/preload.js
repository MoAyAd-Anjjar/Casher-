const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  CreateProduct: (product) => ipcRenderer.send("Create-Product", product),
  getProductList:() => ipcRenderer.invoke("Get-Product"),

});
