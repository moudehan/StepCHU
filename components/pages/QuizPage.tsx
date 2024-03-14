import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import { useAuth } from "../../AuthContext";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import Badge from "../../types/Badge";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

interface Quiz {
  id: string;
  title: string;
  badge: Badge;
  description: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
  point: Point;
}

interface Answer {
  id: string;
  isCorrect: boolean;
  text: string;
}

interface Point {
  id: string;
  name: string;
  number: number;
}

export default function QuizPage({ navigation }: NewsPageProps) {
  const { authState } = useAuth();
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [doneQuiz, setDoneQuiz] = useState<Quiz[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchQuiz = async () => {
        const userDocRef = doc(db, "utilisateurs", authState.userId!);
        const allQuiz = await getDocs(query(collection(db, "quizzes")));
        const userData = (await getDoc(userDocRef)).data();

        const quiz: any = [];
        const quizDone: any = [];

        if (userData?.quiz) {
          await userData?.quiz.forEach(async (userQuiz: any) => {
            const quizDocRef = doc(db, "quizzes", userQuiz.id);
            const quizDoc = await getDoc(quizDocRef);

            allQuiz.forEach((doc) => {
              if (quizDoc.id != doc.id) {
                quiz.push({ id: doc.id, ...doc.data() });
              } else {
                quizDone.push({ id: doc.id, ...doc.data() });
              }
            });
            setQuiz(quiz);
            setDoneQuiz(quizDone);
          });
        } else {
          allQuiz.forEach((doc) => {
            quiz.push({ id: doc.id, ...doc.data() });
          });
          setQuiz(quiz);
        }
      };
      fetchQuiz();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.safeArea}>
      <NavBar
        paramIcon={false}
        title="Quiz"
        navigation={navigation}
        paramBack={true}
      />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Quiz</Text>
        <View style={{ display: "flex", gap: 20, marginBottom: 15 }}>
          {quiz.map((quiz) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Question", { quiz })}
              key={quiz.id}
            >
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                <Image source={require("../../assets/quizIcon.png")} />
                <View style={{ width: "70%" }}>
                  <Text style={styles.titleQuiz}>{quiz.title}</Text>
                  <Text>{quiz.description}</Text>
                </View>
                <Image source={require("../../assets/StartQuizIcon.png")} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.title}>Quiz terminés</Text>
        <View style={{ display: "flex", gap: 20, marginBottom: 15 }}>
          {/* TODO QUIZZ DONE  */}
          {doneQuiz.map((quiz) => (
            <View
              key={quiz.id}
              style={{ display: "flex", flexDirection: "row", gap: 5 }}
            >
              <Image source={require("../../assets/quizIcon.png")} />
              <View style={{ width: "70%" }}>
                <Text style={styles.titleQuiz}>{quiz.title}</Text>
                <Text>{quiz.description}</Text>
              </View>
              <Image source={require("../../assets/checkIcon.png")} />
            </View>
          ))}
        </View>
      </ScrollView>
      <TabBar
        activeTab="Quiz"
        setActiveTab={() => {}}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  titleQuiz: {
    fontSize: 16,
    fontWeight: "bold",
  },

  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
});
