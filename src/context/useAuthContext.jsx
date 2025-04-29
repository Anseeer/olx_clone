import { createContext,  useContext } from "react";

export const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;