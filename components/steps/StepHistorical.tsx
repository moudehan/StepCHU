import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import { useAuth } from "../../AuthContext";
import { DayDetails } from "./stepHistorical/DayDetails";
import { WeekDetails } from "./stepHistorical/WeekDetails";
import { MonthDetails } from "./stepHistorical/MonthDetails";

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(20, 101, 145, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 1,
};

interface StepData {
  labels: string[];
  datasets: [
    {
      data: number[];
      color: (opacity: number) => string;
    },
  ];
  chartWidth?: number;
}

const StepHistorical: React.FC = () => {
  const { userId } = useAuth();
  const [active, setActive] = useState<"Jour" | "Semaine" | "Mois">("Jour");
  const [chartDataForDay, setChartDataForDay] = useState<StepData>({
    labels: [],
    datasets: [{ data: [], color: () => "" }],
  });
  const [chartDataWeekAndYear, setChartDataWeekAndYear] = useState<StepData>({
    labels: [],
    datasets: [{ data: [], color: () => "" }],
  });

  useEffect(() => {
    const fetchSteps = async () => {
      const stepsQuery = query(
        collection(db, "steps"),
        where("user.userId", "==", userId)
      );
      const querySnapshot = await getDocs(stepsQuery);
      let stepsData: number[] = [];
      let labels: string[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        stepsData.push(data.steps);
        labels.push(data.date);
      });
      const chartWidth = labels.length * (50 + 10);
      setChartDataWeekAndYear({
        labels,
        datasets: [
          {
            data: stepsData,
            color: (opacity = 1) => `rgba(20, 101, 145, ${opacity})`,
          },
        ],
        chartWidth,
      });
      let combinedData = labels.map((label, index) => ({
        label,
        steps: stepsData[index],
      }));
      combinedData.sort(
        (a, b) => new Date(a.label).getTime() - new Date(b.label).getTime()
      );
      labels = combinedData.map((data) =>
        new Date(data.label).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        })
      );
      stepsData = combinedData.map((data) => data.steps);

      setChartDataForDay({
        labels,
        datasets: [
          {
            data: stepsData,
            color: (opacity = 1) => `rgba(20, 101, 145, ${opacity})`,
          },
        ],
        chartWidth: labels.length < 7 ? labels.length * 80 : labels.length * 60,
      });
    };

    fetchSteps();
  }, [userId]);

  const renderContent = () => {
    switch (active) {
      case "Jour":
        return (
          <>
            <DayDetails chartData={chartDataForDay} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {chartDataForDay.chartWidth &&
                (chartDataForDay.labels.length > 1 ? (
                  <BarChart
                    style={{
                      marginVertical: 32,
                      marginRight: 10,
                      borderRadius: 16,
                    }}
                    data={chartDataForDay}
                    width={chartDataForDay.chartWidth}
                    height={220}
                    yAxisSuffix=""
                    yAxisLabel=""
                    showValuesOnTopOfBars={true}
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                    fromZero
                  />
                ) : (
                  <Text> Vous n'avez pas effectué de pas récemment</Text>
                ))}
            </ScrollView>
          </>
        );
      case "Semaine":
        return <WeekDetails chartData={chartDataWeekAndYear} />;
      case "Mois":
        return <MonthDetails chartData={chartDataWeekAndYear} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.tabContainer}>
        {["Jour", "Semaine", "Mois"].map((item: any) => (
          <TouchableOpacity
            key={item}
            onPress={() => setActive(item)}
            style={[
              styles.button,
              active === item ? styles.activeButton : styles.inactiveButton,
            ]}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    width: 100,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#146591",
  },
  inactiveButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StepHistorical;
