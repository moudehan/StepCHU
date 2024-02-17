import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import TabBar from "../navDrawer/TabBar";
import NavBar from "../navDrawer/NavBar";
import StepHistorical from "../steps/StepHistorical";

interface StatsPageProps {
  navigation: any;
}
export default function StatsPage({ navigation }: StatsPageProps) {
  const [activeTab, setActiveTab] = useState("home");

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
        paramBack={true}
        paramIcon={true}
        title="StepCHU"
        navigation={navigation}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Mes Statistiques</Text>
        </View>
        <View style={styles.genericBlock}>
          <StepHistorical></StepHistorical>
        </View>
        <View style={{ height: 100 }} />
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
  genericBlock: {
    width: "100%",
    alignItems: "center",
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 10,
    color: "#000",
    textAlign: "center",
  },
});
