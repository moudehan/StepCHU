import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import {
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
  title: string;
  quantity: number;
  type: {
    id: string;
    name: string;
  };
  start: string;
  end: string;
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
      let quizz: number = userData?.quiz?.length || 0;
      const stepsQuery = query(
        collection(db, "steps"),
        where("userId", "==", authState.userId)
      );
      const querySnapshot = await getDocs(stepsQuery);
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const date = new Date(data.date);
        const startDate = new Date(start);
        const endDate = new Date(end);
        if (
          date.setUTCHours(0, 0, 0, 0) >= startDate.setUTCHours(0, 0, 0, 0) &&
          date.setUTCHours(0, 0, 0, 0) <= endDate.setUTCHours(0, 0, 0, 0)
        ) {
          if (type.name === "steps") {
            steps += parseInt(data.steps);
          }
        }
      });
      setStepsData(steps);
      setQuizzNumber(quizz);
    };

    fetchSteps();
  }, [authState.userId, start, end, type.name]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dates}>
        <Text>
          du {new Date(start).getDate().toString().padStart(2, "0")}{" "}
          {months[new Date(start).getMonth()]} {new Date(start).getFullYear()}{" "}
        </Text>
        <Text>
          au {new Date(end).getDate().toString().padStart(2, "0")}{" "}
          {months[new Date(end).getMonth()]} {new Date(end).getFullYear()}
        </Text>
      </View>

      <View>
        {type.name == "steps" && (
          <View>
            <Text style={styles.objectiveSteps}>
              {stepsData}/{quantity}
            </Text>
            {new Date(start).setUTCHours(0, 0, 0, 0) <=
              today.setUTCHours(0, 0, 0, 0) &&
              new Date(end).setUTCHours(0, 0, 0, 0) >=
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
        {type.name == "quiz" && (
          <View>
            <Text style={styles.objectiveSteps}>
              {quizNumber}/{quantity}
            </Text>

            {new Date(start).setUTCHours(0, 0, 0, 0) <=
              today.setUTCHours(0, 0, 0, 0) &&
              new Date(end).setUTCHours(0, 0, 0, 0) >=
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

      {new Date(start).setUTCHours(0, 0, 0, 0) >
        today.setUTCHours(0, 0, 0, 0) && (
        <Text style={styles.soonText}>Le challenge démarre bientôt !</Text>
      )}

      {new Date(end).setUTCHours(0, 0, 0, 0) < today.setUTCHours(0, 0, 0, 0) && (
        <Text style={styles.soonText}>Le challenge est terminé !</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
