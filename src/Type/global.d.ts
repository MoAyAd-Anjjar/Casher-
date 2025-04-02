import { Product } from "./Types";

export {};

declare global {
  interface Window {
    electronAPI: {
      CreateProduct: (product: Product) => Promise<boolean>;
      getProductList: () => Promise<Product[]>;
      DeleteProduct: (product: { barcode: string }) => Promise<boolean>;
      UpdateProduct: (product: Product,) => Promise<boolean>;
      // If you're using invoke (recommended for Electron's contextBridge)
      invoke: (channel: string, ...args: any[]) => Promise<any>;

    };
  }
}

