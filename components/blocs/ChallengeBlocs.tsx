import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import { useAuth } from "../../AuthContext";

interface ChallengeBlocsProps {
  title: String;
  quantity: number;
  type: string;
  start: Timestamp;
  end: Timestamp;
}

export default function ChallengeBlocs({
  title,
  quantity,
  type,
  start,
  end,
}: ChallengeBlocsProps) {
  const { authState } = useAuth();
  const [stepsData, setStepsData] = useState([]);
  const [today, setToday] = useState(new Date());
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  useEffect(() => {
    const fetchSteps = async () => {
      const stepsQuery = query(
        collection(db, "steps"),
        where("user.userId", "==", authState.userId)
      );
      const querySnapshot = await getDocs(stepsQuery);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
      });
    };

    fetchSteps();
  }, [authState.userId]);

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>{title}</Text>
      <View style={Styles.dates}>
        <Text>
          du {start.toDate().getDate().toString().padStart(2, "0")}{" "}
          {months[start.toDate().getMonth()]} {start.toDate().getFullYear()}{" "}
        </Text>
        <Text>
          au {end.toDate().getDate().toString().padStart(2, "0")}{" "}
          {months[end.toDate().getMonth()]} {end.toDate().getFullYear()}
        </Text>
      </View>

      {start.toDate() < today && end.toDate() > today ? (
        <Progress.Bar progress={0.5} width={null} height={10} />
      ) : (
        <Text style={Styles.soonText}>Le challenge démarre bientôt !</Text>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  dates: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  soonText: {
    textAlign: "center",
  }
});
