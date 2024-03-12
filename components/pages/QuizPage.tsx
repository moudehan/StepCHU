import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import { useAuth } from "../../AuthContext";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

const QuizDebloques = [
  {
    id: 1,
    name: "Quiz 1",
    description: "20 questions",
  },
  {
    id: 2,
    name: "Quiz 2",
    description: "20 questions",
  },
];

const QuizNonDebloques = [
  {
    id: 3,
    name: "Quiz 3",
    description: "20 questions",
  },
  {
    id: 4,
    name: "Quiz 4",
    description: "20 questions",
  },
];

const QuizTermines = [
  {
    id: 5,
    name: "Quiz 5",
    description: "20 questions",
  },
  {
    id: 6,
    name: "Quiz 6",
    description: "20 questions",
  },
];

export default function QuizPage({ navigation }: NewsPageProps) {
  // const { userId } = useAuth();
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      // const querySnapshot = await getDocs(collection(db, "badges"));
      const querySnapshot = await getDocs(query(collection(db, "quizzes")));
      // console.log(querySnapshot);
      let quiz = [];
      querySnapshot.forEach((doc) => {
        quiz.push({ id: doc.id, ...doc.data() });
      });
      setQuiz(quiz);
    };
    fetchQuiz();
  }, []);

  // console.log(quiz[0].title);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar
        paramIcon={false}
        title="Quiz"
        navigation={navigation}
        paramBack={true}
      />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Quiz débloqués</Text>
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
        <Text style={styles.title}>Quiz non débloqués</Text>
        <View style={{ display: "flex", gap: 20, marginBottom: 15 }}>
          {QuizNonDebloques.map((quiz) => (
            <View
              key={quiz.id}
              style={{ display: "flex", flexDirection: "row", gap: 5 }}
            >
              <Image source={require("../../assets/quizIcon.png")} />
              <View style={{ width: "70%" }}>
                <Text style={styles.titleQuiz}>{quiz.name}</Text>
                <Text>{quiz.description}</Text>
              </View>
              <Image source={require("../../assets/lockIcon.png")} />
            </View>
          ))}
        </View>
        <Text style={styles.title}>Quiz terminés</Text>
        <View style={{ display: "flex", gap: 20, marginBottom: 15 }}>
          {QuizTermines.map((quiz) => (
            <View
              key={quiz.id}
              style={{ display: "flex", flexDirection: "row", gap: 5 }}
            >
              <Image source={require("../../assets/quizIcon.png")} />
              <View style={{ width: "70%" }}>
                <Text style={styles.titleQuiz}>{quiz.name}</Text>
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
    </SafeAreaView>
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

// import React, { useState } from "react";
// import {
//   StyleSheet,
//   SafeAreaView,
//   Text,
//   View,
//   Dimensions,
//   ScrollView,
//   Image,
//   FlatList,
// } from "react-native";

// import NavBar from "../navDrawer/NavBar";
// import TabBar from "../navDrawer/TabBar";

// interface QuizPageProps {
//   navigation: any;
//   route?: any;
// }

// const nbItemsInRow = 2;

// interface QuizItem {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// }

// export default function QuizPage({ navigation }: QuizPageProps) {
//   const [dataSource, setDataSource] = useState<QuizItem[]>([]);

//   useState(() => {
//     let items: QuizItem[] = Array.apply(null, Array(60)).map((v, i) => {
//       return {
//         id: i,
//         title: "Quiz " + (i + 1),
//         description: "Description du quiz " + (i + 1),
//         image: "http://placehold.it/200x200?text=" + (i + 1),
//       };
//     });
//     setDataSource(items);
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <NavBar
//         paramIcon={false}
//         title="Quiz"
//         navigation={navigation}
//         paramBack={true}
//       />
//       <ScrollView style={styles.scrollView}>
//         <Text style={styles.title}>Quiz débloqués</Text>
//         <FlatList
//           data={dataSource}
//           renderItem={({ item }) => (
//             <View style={styles.quizItemContainer}>
//               <Image
//                 style={styles.quizItemImage}
//                 source={{ uri: item.image }}
//               />
//               <Text style={styles.quizItemTitle}>{item.title}</Text>
//               <Text style={styles.quizItemDescription}>{item.description}</Text>
//             </View>
//           )}
//           //Setting the number of column
//           numColumns={nbItemsInRow}
//           keyExtractor={(item) => item.id.toString()}
//         />
//         <Text style={styles.title}>Quiz non débloqués</Text>
//         <Text style={styles.title}>Quiz terminés</Text>
//       </ScrollView>
//       <TabBar
//         activeTab="home"
//         setActiveTab={() => {}}
//         navigation={navigation}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#f2f2f2",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   scrollView: {
//     flex: 1,
//     marginHorizontal: 20,
//   },
//   quizItemContainer: {
//     flex: 1,
//     flexDirection: "column",
//     margin: 1,
//     alignItems: "center",
//   },
//   quizItemImage: {
//     justifyContent: "center",
//     alignItems: "center",
//     height: 100,
//   },
//   quizItemTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginTop: 8,
//   },
//   quizItemDescription: {
//     fontSize: 14,
//     marginTop: 4,
//   },
// });
