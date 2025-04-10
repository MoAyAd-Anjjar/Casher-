const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  CreateProduct: (product) => ipcRenderer.invoke("Create-Product", product),
  getProductList: () => ipcRenderer.invoke("Get-Product"),
  DeleteProduct: (product) => ipcRenderer.invoke("Delete-Product",product),
  UpdateProduct: (product) => ipcRenderer.invoke("Update-Product",product),
  CreateUserInfo:(Debt) => ipcRenderer.invoke("Create-User-info", Debt),
  GetUsersInfo:() => ipcRenderer.invoke("Get-User-info")

});
