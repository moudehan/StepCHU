import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoBlocks = () => {
  return (
    <View style={styles.blocksContainer}>
      <View style={styles.block}>
        <View style={styles.gridTitle}>
          <Text style={styles.gridText}>Distance</Text>
        </View>
        <Text style={styles.blockTitle}>2,50 KM</Text>
      </View>
      <View style={styles.block}>
        <View style={styles.gridTitle}>
          <Text style={styles.gridText}>Calories</Text>
        </View>
        <Text style={styles.blockTitle}>500,50</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blocksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 50,
  },
  block: {
    backgroundColor: "#146591",
    borderRadius: 8,
    padding: 15,
    width: 140,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    position: "relative",
  },
  blockTitle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  gridTitle: {
    position: "absolute",
    top: -15,
    left: 5,
    width: "80%",
    height: "80%",
    backgroundColor: "#F86A53",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: "visible",
  },
  gridText: {
    color: "#FFF",
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
});

export default InfoBlocks;
