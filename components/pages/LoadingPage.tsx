import React from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";

const LoadingPage = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Image source={require("../../assets/step1.png")} style={styles.logo} />
        <ActivityIndicator
          size="large"
          color="#E26C61"
          style={styles.loadingIndicator}
        />
        <Text style={styles.loadingText}>Chargement en cours</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#146591",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  loadingIndicator: {
    marginVertical: 30,
  },
  loadingText: {
    fontSize: 14,
    color: "#146591",
    opacity: 0.5,
  },
});

export default LoadingPage;
