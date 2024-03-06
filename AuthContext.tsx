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
  userDetails: UserType | null;
  updateUserDetails: (
    newUser: UserType,
    newUserId: string | null
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  updateUserId: async () => {},
  userDetails: null,
  updateUserDetails: async () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserType | null>(null);

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedUserJson = await AsyncStorage.getItem("user");
      if (storedUserId) {
        setUserId(storedUserId);
      }
      if (storedUserJson) {
        const storedUser: UserType = JSON.parse(storedUserJson);
        setUserDetails(storedUser);
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
  const updateUserDetails = async (
    newUser: UserType,
    newUserId: string | null
  ) => {
    if (newUserId === null) {
      await AsyncStorage.removeItem("user");
    } else {
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    }
    setUserDetails(newUser);
  };
  return (
    <AuthContext.Provider
      value={{ userId, userDetails, updateUserId, updateUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
