import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from "react-native";
import usersData from "../../data/users.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabBar from "../navDrawer/TabBar";
import NavBar from "../navDrawer/NavBar";
import InfoBlocks from "../blocs/InfosBlocs";
import OthersBlocs from "../blocs/OtherBlocs";
import LinkedBlocks from "../blocs/LinkedBlocs";
import Histogram from "../graphs/Histogram";
import CercleProgress from "../graphs/CircularProgress";

interface WelcomePageProps {
  navigation: any;
}
export default function WelcomePage({ navigation }: WelcomePageProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [currentSteps, setCurrentSteps] = useState(2500);

  useEffect(() => {
    // Fonction appelée lors de l'appui sur le bouton de retour
    const onBackPress = () => {
      // Tu peux ajouter ici la logique que tu souhaites exécuter
      // Par exemple, fermer l'application :
      BackHandler.exitApp(); // Ferme l'application
      return true; // Empêche l'action par défaut
    };

    // Ajoute l'écouteur
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    // Nettoie l'écouteur
    return () => backHandler.remove();
  }, []); // Ajoute tes dépendances si nécessaire

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const user = usersData.find((u: any) => u.id.toString() === userId);
        if (user) {
          setCurrentSteps(user.steps);
        }
      }
    };

    getUserId();

    const unsubscribe = navigation.addListener("focus", () => {
      setActiveTab("home");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* NavBar */}
      <NavBar
        paramBack={false}
        paramIcon={true}
        title="StepCHU"
        navigation={navigation}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.genericBlock}>
          <View style={styles.blueContainer}></View>
          <Text style={styles.stepsTitle}>Nombre de pas aujord'hui</Text>
          <View style={styles.circleContainer}>
            <CercleProgress currentSteps={currentSteps}></CercleProgress>
          </View>
        </View>
        <View style={styles.genericBlock}>
          <InfoBlocks></InfoBlocks>
        </View>
        <View style={styles.genericBlock}>
          <Text style={styles.histogramTitle}>Historique des pas :</Text>
        </View>
        <View style={styles.genericBlockHistogram}>
          <Histogram></Histogram>
        </View>
        <View style={styles.genericBlock}>
          <OthersBlocs navigation={navigation}></OthersBlocs>
        </View>
        <View style={styles.linkedBlocksWrapper}>
          <View style={styles.blueContainer1} />
          <View style={styles.linkedBlocksContainer}>
            <LinkedBlocks navigation={navigation} />
          </View>
        </View>
      </ScrollView>
      {/* TabBar */}
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  circleContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  genericBlock: {
    width: "100%",
    alignItems: "center",
  },
  genericBlockHistogram: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  linkedBlocksWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  blueContainer: {
    position: "absolute",
    top: -20,
    left: -10,
    right: 0,
    height: "70%",
    width: "120%",
    backgroundColor: "#1a8cc9",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    transform: [{ rotateZ: "5deg" }],
  },
  blueContainer1: {
    position: "absolute",
    bottom: -5,
    left: -15,
    right: 0,
    height: "90%",
    width: "120%",
    backgroundColor: "#1a8cc9",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    transform: [{ rotateZ: "5deg" }],
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircleBackground: {
    width: 200 - 25 * 2,
    height: 200 - 25 * 2,
    borderRadius: (200 - 25 * 2) / 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  linkedBlocksContainer: {
    marginBottom: 40,
  },
  stepsTitle: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  histogramTitle: {
    fontSize: 20,
    color: "#146591",
    marginTop: 20,
  },
});
