import { useData } from "../Provider/DataProvider";
import { Product } from "../Type/Types"; // Import your Product type

const useProduct = () => {
  const { SetProductList } = useData(); // Assuming lowercase naming convention

  const getProducts = async () => {
    try {
      if (!window.electronAPI?.getProductList) {
        throw new Error("Electron API is not available");
      }

      const data: Product[] = await window.electronAPI.getProductList();
      
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from Electron API");
      }

      SetProductList(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // You might want to add error state handling here
      throw error; // Re-throw if you want components to handle the error
    }
  };

  return { getProducts };
};

export default useProduct;