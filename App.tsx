import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc, doc } from "firebase/firestore";
import AppNavigator from "./AppNavigator";
import LoadingPage from "./components/pages/LoadingPage";
import { db } from "./fireBase/FirebaseConfig";

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
            setIsAuthenticated(false); // Redirection vers la page de connexion
            await AsyncStorage.removeItem("userId");
            await AsyncStorage.removeItem("phoneId");
          }
        } else {
          console.log("Aucun utilisateur ou phoneId stocké trouvé");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'utilisateur", error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    verifyUser();
  }, [isAuthenticated]);

  const initialRouteName = isAuthenticated ? "home" : "/";

  return (
    <NavigationContainer>
      {loading ? (
        <LoadingPage />
      ) : (
        <AppNavigator initialRouteName={initialRouteName} />
      )}
    </NavigationContainer>
  );
}
