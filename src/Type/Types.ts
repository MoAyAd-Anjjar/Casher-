export type Product = {
  id?: number;
  name: string;
  vendor: string;
  price?: number;
  quantity?: number;
  InsertDate?: number | string;
  barcode: string;
  image: File | string;
};

export interface DebtFormData {
  CostumerID?: number;
  name: string;
  phone: string;
  DebtValue: number;
  creationDate: string;
  DebtList: Product[] | null;
  notes: string;
  status?: string;
}

export type ChildrenNode = {
  children: React.ReactNode;
};
export type DataProviderType = {
  ProductList: Product[] | [];
  ScanProduct: Product[] | [];
  ScanResult: string | number;
  SelectedPage: number;
  PeopleNames : string[] 
  SetProductList(value: Product[]): any;
  setScannedProductList(value: Product | []): any;
  setScannedResult(value: string): any;
  setPage(value: number): any;
  setPeopleNames(value: string[]|string): any;
};
