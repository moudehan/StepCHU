import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  userId: string | null;
  updateUserId: (newUserId: string | null) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  updateUserId: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };

    loadUserId();
  }, []);

  const updateUserId = async (newUserId: string | null) => {
    if (newUserId === null) {
      await AsyncStorage.removeItem("userId");
    } else {
      await AsyncStorage.setItem("userId", newUserId);
    }
    setUserId(newUserId);
  };

  return (
    <AuthContext.Provider value={{ userId, updateUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
