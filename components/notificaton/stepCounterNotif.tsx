// useBackgroundNotification.js

import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useBackgroundNotification() {
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (nextAppState === "background") {
          let latestStepCount = await AsyncStorage.getItem("latestStepCount");
          latestStepCount = latestStepCount || "0"; // Fallback si aucune valeur n'est trouvée

          Notifications.scheduleNotificationAsync({
            content: {
              title: "Vous nous quittez déjà ?",
              body: `Nombre de pas : ${latestStepCount}`,
            },
            trigger: { seconds: 1 },
            identifier: "application-background-notification",
          });
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);
}
