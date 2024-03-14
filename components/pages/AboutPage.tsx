import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";

interface AboutPageProps {
  navigation: any;
}
export default function AboutPage({ navigation }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <View style={styles.safeArea}>
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
          <Text style={styles.title}>StepCHU</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            STEP CHU est une application mobile accompagnant le projet 10.000
            pas du CHU de Rouen.{"\n"}Développée en collaboration avec le CESI
            de Rouen, cette application a été dans un premier temps à projet
            pédagogique ayant un but réel étant de collaborer avec le CHU de
            Rouen pour faire une nouvelle édition de leur projet.
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
            Le CHU de Rouen comprend 5 hôpitaux, dont l'hôpital Charles Nicolle,
            l'hôpital de Bois-Guillaume, l'hôpital Saint-Julien, l'hôpital
            d'Oissel et l'EHPAD Boucicaut.{"\n"}Il emploie plus de 10 000
            personnes. Ses missions essentielles sont les soins, la formation,
            la recherche et la prévention.
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
            Le "DEPS" au CHU de Rouen fait référence au Département d'Éducation
            et de Promotion de la Santé.{"\n"}C'est un service qui fait partie
            de nombreux hôpitaux et centres de santé, y compris le Centre
            Hospitalier Universitaire (CHU) de Rouen en France.
          </Text>
        </View>
        <View style={styles.headerContainer1}>
          <Image
            source={require("../../assets/cesi.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>CESI de Rouen</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.bodyText}>
            CESI a développé un modèle unique au sein de l’enseignement
            supérieur. Elle accompagne ses étudiants dans les secteurs de
            l’Industrie, du BTP, et de l’Informatique et du Numérique, à travers
            son offre de formation composée de ses programmes : Grande École,
            Grade de Licence, Professionnel Supérieur de bac +2 à bac +5,
            Mastère Spécialisé®, Doctorat, Executive et Passerelles.{"\n"}
            Convaincue de la nécessité de concilier sciences, technologies et
            sciences humaines, CESI se distingue également par une offre de
            formation en Ressources Humaines & Management
          </Text>
        </View>
      </ScrollView>

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
