import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TitleBlocks = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Newsletter</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 20,
    zIndex: 1,
  },
  headerContainer: {
    backgroundColor: "#FFBB00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 150,
    height: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    left: 85,
    marginRight: "100%",
    marginTop: 0,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerTitle: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
export default TitleBlocks;
