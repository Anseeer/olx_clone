import { createContext,  useContext } from "react";

export const ProductContext = createContext();
const useProductContext = () => useContext(ProductContext);

export default useProductContext;