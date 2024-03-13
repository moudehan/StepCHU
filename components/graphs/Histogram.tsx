import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { db } from "../../fireBase/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../AuthContext";

interface StepData {
  date: string;
  steps: number;
}

const Histogram = () => {
  const [stepsData, setStepsData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!authState.userId) {
        console.debug("UserId is undefined or not set");
        return;
      }

      const stepsQuery = query(
        collection(db, "steps"),
        where("userId", "==", authState.userId)
      );

      try {
        const querySnapshot = await getDocs(stepsQuery);
        let dataArr: StepData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as StepData;
          dataArr.push(data);
        });

        dataArr.sort((a, b) => a.date.localeCompare(b.date));
        const todayFormatted = formatDate(new Date());
        dataArr = dataArr.filter(
          (data) => formatDate(data.date) !== todayFormatted
        );

        const labels = dataArr.map((data) => formatDate(data.date));
        const stepsData = dataArr.map((data) => data.steps);

        setLabels(labels);
        setStepsData(stepsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [authState.userId]);
  const data = {
    labels,
    datasets: [
      {
        data: stepsData,
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
    barThickness: 50,
  };
  const barWidth = 50;
  const spaceBetweenBars = 15;
  const minimumChartContainerWidth = Dimensions.get("window").width;
  const calculatedChartWidth =
    labels.length * (barWidth + spaceBetweenBars) - spaceBetweenBars;
  const chartWidth = Math.max(calculatedChartWidth, minimumChartContainerWidth);

  const styles = StyleSheet.create({
    chartContainer: {
      marginTop: 30,
      marginLeft: 0,
    },
  });
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: "flex-start" }}
    >
      <View style={styles.chartContainer}>
        {data.labels.length > 1 ? (
          <BarChart
            data={data}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            yAxisLabel=""
            yAxisSuffix=""
            fromZero
            showBarTops={false}
            showValuesOnTopOfBars={true}
            withHorizontalLabels={true}
            withVerticalLabels={true}
            flatColor={true}
          />
        ) : (
          <Text> Vous n'avez pas effectué de pas récemment</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Histogram;
