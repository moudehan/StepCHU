import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
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
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        console.debug("UserId is undefined or not set");
        return;
      }

      const stepsQuery = query(
        collection(db, "steps"),
        where("userId", "==", userId)
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
  }, [userId]);

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
  };

  const styles = StyleSheet.create({
    chartContainer: {
      marginTop: 30,
      marginLeft: -60,
      marginRight: 20,
    },
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={labels.length * 65}
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
      </View>
    </ScrollView>
  );
};

export default Histogram;
