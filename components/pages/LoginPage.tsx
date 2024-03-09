import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useAuth } from "../../AuthContext";
import { JSHash, CONSTANTS } from "react-native-hash";
import { fetchSecurityQuestions } from "../services/SecurityQuestions";
import { SecurityQuestion } from "../../types/SecurityQuestionTypes";
import { UserType } from "../../types/UserType";

interface LoginPageProps {
  navigation: any;
}

const LoginPage = ({ navigation }: LoginPageProps) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [customError, setCustomError] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [deviceUUID, setDeviceUUID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState<
    SecurityQuestion[]
  >([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const { setAuthState } = useAuth();

  useEffect(() => {
    const loadSecurityQuestions = async () => {
      const questions = await fetchSecurityQuestions();
      setSecurityQuestions(questions);
    };
    loadSecurityQuestions();
  }, []);

  const resetForm = () => {
    setUserId("");
    setUserName("");
    setCustomError("");
    setSecurityQuestion("");
    setSecurityAnswer("");
    setIsUserDataLoaded(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      setUserId("");
      setUserName("");
      setCustomError("");
      setSecurityQuestion("");
      setSecurityAnswer("");
      setIsUserDataLoaded(false);
    }, [])
  );

  useEffect(() => {
    const getOrGenerateUUID = async () => {
      let storedUUID = await AsyncStorage.getItem("deviceUUID");
      if (!storedUUID) {
        storedUUID = uuid.v4() as string;
        await AsyncStorage.setItem("deviceUUID", storedUUID);
      }
      setDeviceUUID(storedUUID);
    };

    getOrGenerateUUID();
  }, []);

  const handleSecurityQuestionUpdate = async () => {
    if (selectedQuestion && securityAnswer && userId) {
      const userDocRef = doc(db, "utilisateurs", userId);
      const hashedAnswer = await JSHash(
        securityAnswer,
        CONSTANTS.HashAlgorithms.sha256
      );
      try {
        await updateDoc(userDocRef, {
          securityQuestion: selectedQuestion,
          securityAnswer: hashedAnswer,
        });
        navigation.navigate("home");
      } catch (error) {
        setCustomError("Erreur lors de la mise à jour. Veuillez réessayer.");
      }
    }
  };

  const handleLogin = async () => {
    setCustomError("");
    if (!userName) {
      setCustomError("Veuillez entrer votre Nom d'utilisateur.");
      return;
    }
    setIsLoading(true);
    try {
      const usersRef = collection(db, "utilisateurs");
      const q = query(usersRef, where("name", "==", userName));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        setUserId(userId);
        const userDocRef = doc(db, "utilisateurs", userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          await setAuthState({
            userId: userId,
            userDetails: userDocSnap.data() as UserType,
          });
          const userData = userDocSnap.data();
          if (!userData.phoneId || userData.phoneId === deviceUUID) {
            handlePostLogin(userData);
          } else {
            setSecurityQuestion(userData.securityQuestion);
            setIsUserDataLoaded(true);
          }
        } else {
          setCustomError("Utilisateur non trouvé.");
        }
      } else {
        setCustomError("Utilisateur non trouvé.");
      }
    } catch (error) {
      setCustomError("Erreur lors de la connexion. Veuillez réessayer.");
      console.error("Erreur lors de la connexion :", error);
    }
    setIsLoading(false);
  };

  const handlePostLogin = (userData: any) => {
    if (!userData.securityQuestion) {
      setIsUserDataLoaded(true);
    } else {
      setSecurityQuestion(userData.securityQuestion);
      setIsUserDataLoaded(true);
    }
  };

  const verifySecurityAnswer = async () => {
    setCustomError("");
    if (!userId.trim()) {
      setCustomError("Veuillez entrer un ID utilisateur.");
      return;
    }

    try {
      const userDocRef = doc(db, "utilisateurs", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        setCustomError("ID utilisateur non trouvé dans la base de données.");
        return;
      }

      const userData = userDocSnap.data();
      const hashedAnswerInput = await JSHash(
        securityAnswer,
        CONSTANTS.HashAlgorithms.sha256
      );

      if (hashedAnswerInput === userData.securityAnswer) {
        await updateDoc(userDocRef, { phoneId: deviceUUID });
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        await AsyncStorage.setItem("phoneId", deviceUUID);
        navigation.navigate("home");
      } else {
        setCustomError("Réponse de sécurité incorrecte");
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de vérification :", error);
      setCustomError("Erreur lors de la vérification. Veuillez réessayer.");
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        {isUserDataLoaded && (
          <TouchableOpacity onPress={resetForm} style={styles.backButton}>
            <Ionicons name="arrow-back-circle" size={32} color="#10669D" />
          </TouchableOpacity>
        )}
        <Image source={require("../../assets/step1.png")} style={styles.logo} />
        {!isUserDataLoaded && <Text style={styles.title}>StepCHU</Text>}

        <View style={styles.inputContainer}>
          <AntDesign name="user" size={24} color="#B0E0E6" />
          <TextInput
            style={styles.input}
            onChangeText={setUserName}
            value={userName}
            placeholder="Entrez votre ID"
            placeholderTextColor="#B0E0E6"
            editable={!isUserDataLoaded}
          />
          {isLoading && <ActivityIndicator size="small" color="#B0E0E6" />}
          {isUserDataLoaded && (
            <MaterialIcons name="verified-user" size={24} color="#B0E0E6" />
          )}
        </View>
        {isUserDataLoaded && !securityQuestion && (
          <>
            <View style={styles.selectStyle}>
              <SelectList
                setSelected={(val: any) => setSelectedQuestion(val)}
                data={securityQuestions.map((question) => ({
                  key: question.id,
                  value: question.name,
                }))}
                save="value"
                placeholder="Sélectionnez une question..."
                searchPlaceholder="Chercher une question"
                boxStyles={{
                  borderWidth: 1,
                  borderColor: "#B0E0E6",
                  borderRadius: 25,
                  width: 270,
                  marginTop: 5,
                  marginBottom: 10,
                }}
                inputStyles={{
                  color: "#10669D",
                }}
                dropdownStyles={{
                  borderWidth: 1,
                  borderColor: "#B0E0E6",
                  borderRadius: 25,
                  marginTop: 0,
                  marginBottom: 10,
                }}
                dropdownTextStyles={{
                  color: "#10669D",
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setSecurityAnswer}
                value={securityAnswer}
                placeholder="Entrez votre réponse"
                placeholderTextColor="#B0E0E6"
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSecurityQuestionUpdate}
            >
              <Text style={styles.buttonText}>Se Connecter</Text>
            </TouchableOpacity>
          </>
        )}
        {isUserDataLoaded || !deviceUUID ? (
          securityQuestion && (
            <>
              <Text style={styles.securityQuestion}>
                Question secrète :{" "}
                <Text style={styles.securityQuestion1}>
                  {" "}
                  {securityQuestion}
                </Text>
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input1}
                  onChangeText={setSecurityAnswer}
                  value={securityAnswer}
                  placeholder="Entrez votre réponse"
                  placeholderTextColor="#B0E0E6"
                />
              </View>

              {customError !== "" && (
                <Text style={styles.errorText}>{customError}</Text>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={verifySecurityAnswer}
              >
                <Text style={styles.buttonText}>Se Connecter</Text>
              </TouchableOpacity>
            </>
          )
        ) : (
          <>
            {customError !== "" && (
              <Text style={styles.errorText}>{customError}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>
                Charger la question de sécurité
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectStyle: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    flex: 1,
    backgroundColor: "#146591",
    paddingHorizontal: 24,
    paddingVertical: 34,
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: "20%",
    paddingTop: 170,
    paddingBottom: 100,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    justifyContent: "center",
    alignContent: "center",
    elevation: 5,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginTop: -50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10669D",
    marginBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: -140,
    marginBottom: 80,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    width: "100%",
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#B0E0E6",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    color: "#151624",
    fontSize: 16,
    marginLeft: 10,
  },
  input1: {},
  input2: {
    flex: 1,
    color: "#151624",
    fontSize: 16,
    marginLeft: 10,
  },
  securityQuestion: {
    fontSize: 16,
    color: "#000000",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  securityQuestion1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 40,
    marginBottom: 75,
    textAlign: "center",
  },
  button: {
    height: 45,
    backgroundColor: "#13A6B6",
    borderRadius: 25,
    width: "100%",
    justifyContent: "center",
    marginTop: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
});

export default LoginPage;
