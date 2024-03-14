import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";

interface TutorialProps {
  navigation: any;
}
export default function TutorialPage({ navigation }: TutorialProps) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <View style={styles.safeArea}>
      {/* NavBar */}
      <NavBar
        paramBack
        paramIcon={false}
        title="Didacticiel"
        navigation={navigation}
      />

      {/* Contenu principal */}
      <ScrollView contentContainerStyle={styles.contentContainer}></ScrollView>

      {/* TabBar */}
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    paddingBottom: 110,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  headerContainer1: {
    flexDirection: "row",
    marginTop: 40,
  },
  headerContainer2: {
    flexDirection: "row",
    marginTop: 40,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#363F5E",
    marginLeft: 10,
  },
  textContainer: {
    marginTop: 5,
  },
  bodyText: {
    fontSize: 16,
    color: "#363F5E",
    textAlign: "justify",
  },
});
