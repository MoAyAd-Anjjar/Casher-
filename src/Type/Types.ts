export type Product = {
  id?: number;
  name: string;
  vendor: string;
  price?: number ;
  barcode: string;
  image: File | string ;
};
export type ChildrenNode = {
  children: React.ReactNode;
};
export type DataProviderType = {
  ProductList: Product[] | [];
  ScanProduct: Product[] | [];
  ScanResult: string|number;
  SelectedPage: number;
  SetProductList(value: Product[]): any;
  setScannedProductList(value: Product |[]): any;
  setScannedResult(value: string): any;
  setPage(value: number): any;
};
