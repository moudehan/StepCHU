import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";

interface NewsPageProps {
  navigation: any;
}
export default function NewsPage({ navigation }: NewsPageProps) {
  const [activeTab, setActiveTab] = useState("news");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveTab("news");
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* NavBar */}
      <NavBar
        paramIcon={false}
        title="Actualités"
        navigation={navigation}
        paramBack={true}
      />

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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    marginBottom: 30,
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
  titleBelowCircle: {
    fontSize: 16,
    color: "#363F5E",
    fontWeight: "bold",
  },
});
