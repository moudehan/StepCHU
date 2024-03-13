import { useState, useEffect } from "react";
import { Platform, PermissionsAndroid } from "react-native";
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
import { UserType } from "../../types/UserType";

export const StepCounter = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const { authState } = useAuth();
  useEffect(() => {
    const updateCurrentUser = async () => {
      if (authState.userId) {
        if (authState.userId !== currentUserId) {
          setCurrentUserId(authState.userId);
        }
      } else {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId !== null && storedUserId !== currentUserId) {
          setCurrentUserId(storedUserId);
        }
      }
    };

    updateCurrentUser();
  }, [authState.userId, currentUserId]);
  const updateStepCount = async (steps: any) => {
    try {
      await AsyncStorage.setItem("latestStepCount", String(steps));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const updateCurrentUserObject = async () => {
      if (authState.userDetails) {
        if (authState.userDetails !== currentUser) {
          setCurrentUser(authState.userDetails);
        }
      } else {
        const storedUserJson = await AsyncStorage.getItem("user");

        if (storedUserJson !== null && storedUserJson !== currentUserId) {
          const storedUser: UserType = JSON.parse(storedUserJson);
          setCurrentUser(storedUser);
        }
      }
    };

    updateCurrentUserObject();
  }, [authState.userDetails, currentUser]);

  async function requestActivityRecognitionPermission() {
    try {
      if (Platform.OS === "android") {
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
      } else if (Platform.OS === "ios") {
        const isPermissionGranted = await Pedometer.requestPermissionsAsync();
        if (isPermissionGranted) {
          console.debug("You can use the activity recognition");
          await AsyncStorage.setItem(
            "activityRecognitionPermissionGranted",
            "true"
          );
          setPermissionGranted(true);
        } else {
          console.debug("Activity recognition permission denied");
        }
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
      const authenticated = await AsyncStorage.getItem("Authenticate");
      const isAuthenticated = authenticated === "true";

      if (
        permissionGranted &&
        currentUserId &&
        currentUser &&
        isAuthenticated
      ) {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
          const today = format(new Date(), "yyyy-MM-dd");
          const stepsCollectionRef = collection(db, "steps");
          const q = query(
            stepsCollectionRef,
            where("userId", "==", currentUserId),
            where("date", "==", today)
          );
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty && !isCreatingDoc) {
            setIsCreatingDoc(true);
            const docRef = await addDoc(stepsCollectionRef, {
              userId: currentUserId,
              date: today,
              steps: 0,
            });
            setIsCreatingDoc(false);
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
            updateStepCount(updatedStepCount);
            if (docId) {
              await updateDoc(doc(db, "steps", docId), {
                steps: updatedStepCount,
              });
            }
          });
        }
      }
    }
    subscribe();
    return () => subscription?.remove();
  }, [permissionGranted, currentUserId, currentUser]);

  return { currentStepCount, isPedometerAvailable };
};
