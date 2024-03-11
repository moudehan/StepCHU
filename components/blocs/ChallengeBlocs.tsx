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
          du {start.toDate().getDay().toString().padStart(2, "0")}{" "}
          {months[start.toDate().getMonth()]} {start.toDate().getFullYear()}{" "}
        </Text>
        <Text>
          au {end.toDate().getDay().toString().padStart(2, "0")}{" "}
          {months[end.toDate().getMonth()]} {end.toDate().getFullYear()}
        </Text>
      </View>
      <Progress.Bar progress={0.5} width={null} height={10} />
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
});
