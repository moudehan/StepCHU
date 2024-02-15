import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { calculateCalories } from "../../utils/calculateCalories";
import { calculerDistance } from "../../utils/calculateDistance";

const screenWidth = Dimensions.get("window").width;

interface StepData {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
  }[];
}

interface DayDetailsProps {
  chartData: StepData;
}

export const DayDetails = ({ chartData }: DayDetailsProps) => {
  const combinedData = chartData.labels
    .map((label, index) => ({
      label,
      steps: chartData.datasets[0].data[index],
      calories: calculateCalories(chartData.datasets[0].data[index]),
      distance: calculerDistance(chartData.datasets[0].data[index]),
    }))
    .sort((a, b) => new Date(a.label).getTime() - new Date(b.label).getTime());

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {combinedData.map((data, index) => (
        <View
          key={index}
          style={{ width: screenWidth, alignItems: "center", padding: 20 }}
        >
          <Text>Date: {data.label}</Text>
          <Text>Nombre de pas: {data.steps}</Text>
          <Text>Calories brûlées: {data.calories.toFixed(2)}</Text>
          <Text>Distance parcourue: {data.distance.toFixed(2)} km</Text>
        </View>
      ))}
    </ScrollView>
  );
};
