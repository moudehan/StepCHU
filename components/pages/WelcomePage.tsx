import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import usersData from "../../data/users.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabBar from "../navDrawer/TabBar";
import NavBar from "../navDrawer/NavBar";
import InfoBlocks from "../blocs/InfosBlocs";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import OthersBlocs from "../blocs/OtherBlocs";
import LinkedBlocks from "../blocs/LinkedBlocs";

interface WelcomePageProps {
  navigation: any;
}
export default function WelcomePage({ navigation }: WelcomePageProps) {
  const goalSteps = 10000;
  const [activeTab, setActiveTab] = useState("home");
  const [currentSteps, setCurrentSteps] = useState(2500);

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
      <View style={styles.blueContainer}></View>

      {/* NavBar */}
      <NavBar
        paramBack={false}
        paramIcon={true}
        title="StepCHU"
        navigation={navigation}
      />
      {/* Contenu principal */}
      <View style={styles.container}>
        <View style={styles.circleContainer}>
          <View style={styles.innerCircleBackground}>
            <AnimatedCircularProgress
              size={150}
              width={15}
              rotation={270}
              fill={(currentSteps / goalSteps) * 100}
              tintColor="#F86A53"
              backgroundColor="#EAF2FF"
            >
              {() => (
                <Text style={styles.stepsText}>
                  <Text style={styles.stepsCount}>{currentSteps}</Text>
                  <Text style={styles.stepsLabel}> {"\nPas"}</Text>
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
        </View>
        <View style={styles.blueContainer1}></View>
        <InfoBlocks></InfoBlocks>
        <OthersBlocs navigation={navigation}></OthersBlocs>
        <LinkedBlocks navigation={navigation}></LinkedBlocks>
      </View>

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
  blueContainer: {
    position: "absolute",
    bottom: 390,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#1a8cc9",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    transform: [{ rotateZ: "-85deg" }],
  },
  blueContainer1: {
    position: "absolute",
    bottom: -250,
    left: 0,
    right: 0,
    height: "100%",
    backgroundColor: "#1a8cc9",
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    transform: [{ rotateZ: "-85deg" }],
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

  circleContainer: {
    marginTop: -70,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBelowCircle: {
    fontSize: 16,
    color: "#363F5E",
    fontWeight: "bold",
    marginTop: 150,
  },
  stepsCount: {
    color: "#363F5E",
    fontWeight: "bold",
    fontSize: 30,
  },
  stepsText: {
    fontSize: 20,
    color: "#EAF2FF",
    textAlign: "center",
  },
  stepsLabel: {},
});
