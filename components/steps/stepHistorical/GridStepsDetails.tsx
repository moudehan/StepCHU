import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface GridStepsDetailsProps {
  date: string;
  steps: any;
  additionalInfo: Array<{ label: string; value: string }>;
}

const GridStepsDetails: React.FC<GridStepsDetailsProps> = ({
  date,
  steps,
  additionalInfo,
}) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={[styles.dataContainer, { width: screenWidth - 40 }]}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.stepsText}>{steps}</Text>
      {additionalInfo.map((info, index) => (
        <Text key={index} style={styles.infoText}>
          {`${info.label} : ${info.value}`}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    backgroundColor: "#146591",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dateText: {
    color: "#cccccc",
    marginBottom: 15,
  },
  stepsText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoText: {
    color: "white",
    marginBottom: 5,
  },
});

export default GridStepsDetails;
