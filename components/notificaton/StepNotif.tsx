import { useEffect } from "react";
import * as Notifications from "expo-notifications";

// Cette fonction demande les permissions de notification et affiche le token Expo Push.
async function registerForPushNotificationsAsync() {
  const { status: initialStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = initialStatus;

  if (initialStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } catch (error) {
    console.error(error);
  }
}

// Composant pour gérer les permissions
export const PermissionsHandler: React.FC = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return null;
};
