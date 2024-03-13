import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
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
  const [stepsData, setStepsData] = useState(0);
  const [quizNumber, setQuizzNumber] = useState(0);
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
      const userDocRef = doc(db, "utilisateurs", authState.userId!);
      const userData = (await getDoc(userDocRef)).data();

      let steps: number = 0;
      let quizz: number = userData?.quiz?.length;
      const stepsQuery = query(
        collection(db, "steps"),
        where("user.userId", "==", authState.userId)
      );
      const querySnapshot = await getDocs(stepsQuery);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = new Date(data.date);
        if (
          date.setUTCHours(0, 0, 0, 0) >=
            start.toDate().setUTCHours(0, 0, 0, 0) &&
          date.setUTCHours(0, 0, 0, 0) <= end.toDate().setUTCHours(0, 0, 0, 0)
        ) {
          steps = steps + parseInt(data.steps);
        }
      });
      setStepsData(steps);
      setQuizzNumber(quizz);
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

      <View>
        {type == "steps" && (
          <View>
            <Text style={Styles.objectiveSteps}>
              {stepsData}/{quantity}
            </Text>
            {start.toDate().setUTCHours(0, 0, 0, 0) <=
              today.setUTCHours(0, 0, 0, 0) &&
              end.toDate().setUTCHours(0, 0, 0, 0) >=
                today.setUTCHours(0, 0, 0, 0) && (
                <Progress.Bar
                  progress={stepsData / quantity}
                  width={null}
                  height={10}
                  color="#E26C61"
                />
              )}
          </View>
        )}
        {type == "quiz" && (
          <View>
            <Text style={Styles.objectiveSteps}>
              {quizNumber}/{quantity}
            </Text>

            {start.toDate().setUTCHours(0, 0, 0, 0) <=
              today.setUTCHours(0, 0, 0, 0) &&
              end.toDate().setUTCHours(0, 0, 0, 0) >=
                today.setUTCHours(0, 0, 0, 0) && (
                <Progress.Bar
                  progress={quizNumber / quantity}
                  width={null}
                  height={10}
                  color="#E26C61"
                />
              )}
          </View>
        )}
      </View>

      {start.toDate().setUTCHours(0, 0, 0, 0) >
        today.setUTCHours(0, 0, 0, 0) && (
        <Text style={Styles.soonText}>Le challenge démarre bientôt !</Text>
      )}

      {end.toDate().setUTCHours(0, 0, 0, 0) < today.setUTCHours(0, 0, 0, 0) && (
        <Text style={Styles.soonText}>Le challenge est terminé !</Text>
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
    fontWeight: "bold",
    padding: 10,
  },
  objectiveSteps: {
    color: "grey",
  },
});
