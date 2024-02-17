import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { calculateCalories } from "../../../utils/calculateCalories";
import { calculerDistance } from "../../../utils/calculateDistance";
import GridStepsDetails from "./GridStepsDetails";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#146591" />
      </View>
    );
  }

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
        <View key={index}>
          <GridStepsDetails
            date={`Date : ${data.label}`}
            steps={`Total de pas : ${data.steps}`}
            additionalInfo={[
              {
                label: "Calories brûlées",
                value: `${data.calories.toFixed(2)} kcal`,
              },
              {
                label: "Distance parcourue",
                value: `${data.distance.toFixed(2)} km`,
              },
            ]}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
