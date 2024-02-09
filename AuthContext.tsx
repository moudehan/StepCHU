import React, { createContext, useContext, useState, ReactNode } from "react";
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

  const updateUserId = async (newUserId: string | null) => {
    if (newUserId) {
      await AsyncStorage.setItem("userId", newUserId);
    } else {
      await AsyncStorage.removeItem("userId");
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
