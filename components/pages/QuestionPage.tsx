import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";

import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import * as Progress from "react-native-progress";
import { useAuth } from "../../AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

interface Quiz {
  id: number;
  name: string;
  id_badge: number;
  id_question_quiz: number;
}

interface QuestionQuiz {
  id: number;
  question: string;
  reponses: reponse[];
}

interface reponse {
  id: number;
  reponse: string;
  correct: boolean;
}

const questionQuiz: QuestionQuiz[] = [
  {
    id: 1,
    question: "Quel est le nom de la capitale de la France ?",
    reponses: [
      {
        id: 1,
        reponse: "Paris",
        correct: true,
      },
      {
        id: 2,
        reponse: "Londres",
        correct: false,
      },
      {
        id: 3,
        reponse: "Berlin",
        correct: false,
      },
      {
        id: 4,
        reponse: "Madrid",
        correct: false,
      },
    ],
  },
  {
    id: 2,
    question: "Quel est le nom de la capitale de l'Angleterre ?",
    reponses: [
      {
        id: 1,
        reponse: "Paris",
        correct: false,
      },
      {
        id: 2,
        reponse: "Londres",
        correct: true,
      },
      {
        id: 3,
        reponse: "Berlin",
        correct: false,
      },
      {
        id: 4,
        reponse: "Madrid",
        correct: false,
      },
    ],
  },
];

export default function QuestionPage({ navigation, route }: NewsPageProps) {
  const { quiz }: { quiz: Quiz } = route.params;
  // console.log(quiz.questions);
  // console.log(quiz.questions[0].answers[0]);
  // const { userId } = useAuth();
  // const [questionQuiz, setQuestionQuiz] = useState<QuestionQuiz[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [nbResponseCorrect, setNbResponseCorrect] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progressValue, setProgressValue] = useState(1);
  const [selectedReponse, setSelectedReponse] = useState<number>(-1);

  let dateNow = new Date();
  let partieEntiere = parseInt((quiz.questions.length / 2).toString());
  let partieDecimale = (quiz.questions.length / 2 - partieEntiere) * 60;

  let datePlusXMinutes = new Date(
    dateNow.getTime() + partieEntiere * 60 * 1000 + partieDecimale * 1000
  );

  const getTime = () => {
    const time = Date.parse(datePlusXMinutes.toString()) - Date.now();

    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
    setProgressValue(Number((time / 1000 / 60 / 10).toFixed(2)));
    if (time < 0) {
      setMinutes(0);
      setSeconds(0);
      setProgressValue(0);
      setShowModal(true);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar
        paramIcon={false}
        title={quiz.name}
        navigation={navigation}
        paramBack={true}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text>
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </Text>
          <View>
            <Progress.Bar
              progress={progressValue}
              width={200}
              height={10}
              color="#E26C61"
            />
          </View>
          <Text>10:00</Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 20,
            color: "#13A6B6",
          }}
        >
          Question {questionIndex + 1}/{quiz.questions.length}
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.TextQuestion}>
            {quiz.questions[questionIndex].text}
          </Text>
          <View style={styles.listeReponse}>
            {quiz.questions[questionIndex].answers.map((reponse, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
                onPress={() => {
                  setSelectedReponse(index);
                }}
              >
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  {/* {selectedReponse === reponse.id ? ( */}
                  {selectedReponse === index ? (
                    <Image
                      source={require("../../assets/radio_selected.png")}
                    />
                  ) : (
                    <Image source={require("../../assets/radio.png")} />
                  )}

                  <Text style={{ fontSize: 16 }}>{reponse.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#13A6B6",
            padding: 10,
            borderRadius: 25,
            width: "70%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (selectedReponse != -1) {
              if (
                quiz.questions[questionIndex].answers[selectedReponse].isCorrect
              ) {
                setNbResponseCorrect(nbResponseCorrect + 1);
              }
              if (questionIndex < quiz.questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
              } else {
                setShowModal(true);
              }
            }
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Valider</Text>
        </TouchableOpacity>
      </ScrollView>
      <TabBar
        activeTab="Quiz"
        setActiveTab={() => {}}
        navigation={navigation}
      />

      <Modal transparent={true} visible={showModal}>
        <View style={{ backgroundColor: "rgba(0,0,0,0.4)", flex: 1 }}>
          <View
            style={{
              height: "60%",
              backgroundColor: "white",
              padding: 20,
              top: "50%",
              borderRadius: 50,
            }}
          >
            <Image
              source={require("../../assets/finQuiz.png")}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Bravo, vous avez terminé le quiz !
            </Text>

            <Text style={{ textAlign: "center", marginVertical: 20 }}>
              Vous avez obtenu {nbResponseCorrect}/{quiz.questions.length}
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: "#E26C61",
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={() => {
                navigation.navigate("Quiz");
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Retour à la liste des quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  TextQuestion: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  listeReponse: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  ButtonValider: {
    backgroundColor: "#E26C61",
    padding: 10,
    borderRadius: 10,
  },
  TextValider: {
    color: "white",
  },
});
