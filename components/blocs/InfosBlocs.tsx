import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import { calculateCalories } from "../../utils/calculateCalories";
import { calculerDistance } from "../../utils/calculateDistance";
interface InfoBlocksProps {
  currentStepCount: number;
}
const InfoBlocks = ({ currentStepCount }: InfoBlocksProps) => {
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setCalories(calculateCalories(currentStepCount));
    setDistance(calculerDistance(currentStepCount));
  }, [currentStepCount]);
  return (
    <View style={styles.blocksContainer}>
      <View style={styles.block}>
        <View style={styles.gridTitle}>
          <Text style={styles.gridText}>Distance</Text>
        </View>
        <View style={styles.content}>
          <Icon2 name="location" size={20} color="#FFBB00" />
          <Text style={styles.blockTitle}>{distance.toFixed(2)} KM</Text>
        </View>
      </View>
      <View style={styles.block}>
        <View style={styles.gridTitle}>
          <Text style={styles.gridText}>Calories</Text>
        </View>
        <View style={styles.content}>
          <Icon name="fire" size={30} color="red" />
          <Text style={styles.blockTitle}>{calories.toFixed(2)}</Text>
        </View>
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
    marginLeft: 5,
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
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default InfoBlocks;
