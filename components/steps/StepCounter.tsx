import { useState, useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import { Pedometer } from "expo-sensors";

export const StepCounter = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  async function requestActivityRecognitionPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: "Permission de Reconnaissance d'Activité",
          message:
            "Cette application a besoin d'accéder à votre reconnaissance d'activité pour compter vos pas.",
          buttonNeutral: "Demander Plus Tard",
          buttonNegative: "Annuler",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.debug("You can use the activity recognition");
        setPermissionGranted(true);
      } else {
        console.debug("Activity recognition permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestActivityRecognitionPermission();
  }, []);

  useEffect(() => {
    let subscription: { remove: any };
    async function subscribe() {
      if (permissionGranted) {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
          subscription = Pedometer.watchStepCount((result) => {
            setCurrentStepCount(result.steps);
          });
        }
      }
    }

    subscribe();

    return () => subscription && subscription.remove();
  }, [permissionGranted]);

  return { currentStepCount, isPedometerAvailable };
};
