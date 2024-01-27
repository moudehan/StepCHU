import React from "react";
import { ScrollView, Dimensions, View, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

// Fonction pour ajouter des jours à une date
const addDays = (date: any, days: any) => {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
};

// Générer les étiquettes de date
const generateDateLabels = () => {
  const today = new Date();
  const labels = [];
  for (let i = 0; i < 10; i++) {
    const date = addDays(today, i);
    labels.push(`${date.getDate()}/${date.getMonth() + 1}`);
  }
  return labels;
};

const data = {
  labels: generateDateLabels(),
  datasets: [
    {
      data: [
        12000, 15000, 13000, 17000, 14000, 16000, 18000, 19000, 20000, 21000,
      ],
      color: () => "rgba(0, 0, 255, 1)",
    },
  ],
};

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
  color: () => `rgba(0, 0, 0, 1)`,
  labelColor: () => `rgba(0, 0, 0, 1)`,
  style: {
    borderRadius: 16,
  },
  barPercentage: 1,
  propsForBackgroundLines: {
    strokeWidth: 0,
  },
};

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 30,
    marginLeft: -60,
    marginRight: 20,
  },
});

const Histogram = () => {
  const chartWidth = screenWidth * 1.5;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={chartWidth}
          height={170}
          chartConfig={chartConfig}
          yAxisLabel=""
          yAxisSuffix=""
          fromZero
          showBarTops={false}
          showValuesOnTopOfBars={true}
          withHorizontalLabels={false}
          withVerticalLabels={true}
          flatColor={true}
        />
      </View>
    </ScrollView>
  );
};

export default Histogram;
