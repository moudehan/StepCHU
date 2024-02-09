import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc, doc } from "firebase/firestore";
import AppNavigator from "./AppNavigator";
import LoadingPage from "./components/pages/LoadingPage";
import { db } from "./fireBase/FirebaseConfig";
import { AuthProvider } from "./AuthContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const storedPhoneId = await AsyncStorage.getItem("phoneId");

        if (userId && storedPhoneId) {
          const userDocRef = doc(db, "utilisateurs", userId);
          const userDocSnap = await getDoc(userDocRef);

          if (
            userDocSnap.exists() &&
            userDocSnap.data().phoneId === storedPhoneId
          ) {
            setIsAuthenticated(true); // Utilisateur authentifié
          } else {
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("phoneId");
            setIsAuthenticated(false); // Redirection vers la page de connexion
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    verifyUser();
  }, []);

  const initialRouteName = isAuthenticated ? "home" : "/";

  return (
    <AuthProvider>
      <NavigationContainer>
        {loading ? (
          <LoadingPage />
        ) : (
          <AppNavigator initialRouteName={initialRouteName} />
        )}
      </NavigationContainer>
    </AuthProvider>
  );
}
