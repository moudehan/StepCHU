import { useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { useAuth } from "../../AuthContext";

export const useUserAlert = (navigation: any, setIsLoading: any) => {
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    const db = getFirestore();
    const userDocRef = doc(db, "utilisateurs", userId);

    const unsubscribe = onSnapshot(
      userDocRef,
      async (doc) => {
        const userDocData = doc.data();
        const deviceUUID = await AsyncStorage.getItem("phoneId");

        if (userDocData && deviceUUID && userDocData.phoneId !== deviceUUID) {
          Alert.alert(
            "Alerte",
            "Vous êtes déjà connecté sur un autre appareil."
          );
          setIsLoading(true);
          await AsyncStorage.clear();
          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate("/");
          }, 2000);
        }
      },
      (error) => {
        console.error(
          "Erreur lors de l'écoute des changements de document:",
          error
        );
      }
    );

    return () => unsubscribe();
  }, [userId, navigation, setIsLoading]);
};
