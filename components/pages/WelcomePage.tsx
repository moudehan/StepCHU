import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  BackHandler,
} from "react-native";
import TabBar from "../navDrawer/TabBar";
import NavBar from "../navDrawer/NavBar";
import InfoBlocks from "../blocs/InfosBlocs";
import OthersBlocs from "../blocs/OtherBlocs";
import LinkedBlocks from "../blocs/LinkedBlocs";
import Histogram from "../graphs/Histogram";
import CercleProgress from "../graphs/CircularProgress";
import { StepCounter } from "../steps/StepCounter";

interface WelcomePageProps {
  navigation: any;
}
export default function WelcomePage({ navigation }: WelcomePageProps) {
  const { currentStepCount } = StepCounter();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const onBackPress = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
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
            <CercleProgress currentSteps={currentStepCount}></CercleProgress>
          </View>
        </View>
        <View style={styles.genericBlock}>
          <InfoBlocks currentStepCount={currentStepCount}></InfoBlocks>
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
