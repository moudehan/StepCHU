import { useState, useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import { Pedometer } from "expo-sensors";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { useAuth } from "../../AuthContext";

export const StepCounter = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { userId } = useAuth();
  useEffect(() => {
    const updateCurrentUser = async () => {
      if (userId) {
        if (userId !== currentUser) {
          setCurrentUser(userId);
        }
      } else {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId !== null && storedUserId !== currentUser) {
          setCurrentUser(storedUserId);
        }
      }
    };

    updateCurrentUser();
  }, [userId, currentUser]);

  async function requestActivityRecognitionPermission() {
    const isPermissionGranted = await AsyncStorage.getItem(
      "activityRecognitionPermissionGranted"
    );
    if (isPermissionGranted === "true") {
      setPermissionGranted(true);
      return;
    }

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
        await AsyncStorage.setItem(
          "activityRecognitionPermissionGranted",
          "true"
        );
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
    let subscription = { remove: () => {} };
    let initialStepCount = 0;
    let docId = "";

    async function subscribe() {
      if (permissionGranted && currentUser) {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
          const today = format(new Date(), "yyyy-MM-dd");
          const stepsCollectionRef = collection(db, "steps");
          const q = query(
            stepsCollectionRef,
            where("userId", "==", currentUser),
            where("date", "==", today)
          );

          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            const docRef = await addDoc(stepsCollectionRef, {
              userId: currentUser,
              date: today,
              steps: 0,
            });
            docId = docRef.id;
          } else {
            querySnapshot.forEach((doc) => {
              docId = doc.id;
              initialStepCount = doc.data().steps;
              setCurrentStepCount(initialStepCount);
            });
          }

          subscription = Pedometer.watchStepCount(async (result) => {
            const updatedStepCount = initialStepCount + result.steps;
            setCurrentStepCount(updatedStepCount);
            await updateDoc(doc(db, "steps", docId), {
              steps: updatedStepCount,
            });
          });
        }
      }
    }

    subscribe();

    return () => subscription?.remove();
  }, [permissionGranted, currentUser]);

  return { currentStepCount, isPedometerAvailable };
};
