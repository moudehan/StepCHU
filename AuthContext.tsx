import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
  userId: string | null;
  userDetails: UserType | null;
};

const defaultAuthState: AuthState = {
  userId: null,
  userDetails: null,
};

type AuthContextType = {
  authState: AuthState;
  setAuthState: (
    newState: AuthState | ((prevState: AuthState) => AuthState)
  ) => void;
};

const AuthContext = createContext<AuthContextType>({
  authState: defaultAuthState,
  setAuthState: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    const loadAuthState = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedUserJson = await AsyncStorage.getItem("user");
      setAuthState({
        userId: storedUserId,
        userDetails: storedUserJson ? JSON.parse(storedUserJson) : null,
      });
    };

    loadAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
