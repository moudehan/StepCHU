import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";

interface AboutPageProps {
  navigation: any;
}
export default function AboutPage({ navigation }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* NavBar */}
      <NavBar
        paramBack
        paramIcon={false}
        title="A propos"
        navigation={navigation}
      />

      {/* Contenu principal */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/step1.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>C.H.U Rouen</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Accedent enim eius asperitati, ubi inminuta vel...
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Image
            source={require("../../assets/CHULogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>C.H.U Rouen</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Accedent enim eius asperitati, ubi inminuta vel...
          </Text>
        </View>
        <View style={styles.headerContainer2}>
          <Image
            source={require("../../assets/DepsLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Deps</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            Accedent enim eius asperitati, ubi inminuta vel...
          </Text>
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
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
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
