import { Product,DebtFormData } from "./Types";

export {};

declare global {
  interface Window {
    electronAPI: {
      CreateProduct: (product: Product) => Promise<boolean>;
      getProductList: () => Promise<Product[]>;
      DeleteProduct: (product: { barcode: string }) => Promise<boolean>;
      UpdateProduct: (product: Product,) => Promise<boolean>;
      CreateUserInfo: (Info:DebtFormData ) => Promise<boolean>;
      GetUsersInfo: () =>Promise<DebtFormData[]>;
      GetUsersDebt: (Info: Product) => Promise<boolean>;
      AddUsersDebt: (Info: Product) => Promise<boolean>;
      DeleteUserProduct: (Info: Product) => Promise<boolean>;



      // If you're using invoke (recommended for Electron's contextBridge)
      invoke: (channel: string, ...args: any[]) => Promise<any>;

    };
  }
}

