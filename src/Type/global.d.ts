export {};

declare global {
  interface Window {
    electronAPI: {
      CreateProduct: (product: any) => void;
      getProductList: () => Promise<any>; // Updated to return a promise of an array
    };
  }
}
