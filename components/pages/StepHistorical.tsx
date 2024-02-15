import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import { useAuth } from "../../AuthContext";
import { WeekDetails } from "../stepHistorical/WeekDetails";
import { DayDetails } from "../stepHistorical/DayDetails";

interface StepData {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
  }[];
  chartWidth?: number;
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(20, 101, 145, ${opacity})`,
  strokeWidth: 2,
};

const StepHistorical: React.FC = () => {
  const { userId } = useAuth();
  const [active, setActive] = useState("day");
  const [chartData, setChartData] = useState<StepData>({
    labels: [],
    datasets: [{ data: [], color: () => "" }],
  });

  useEffect(() => {
    const fetchSteps = async () => {
      const stepsQuery = query(
        collection(db, "steps"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(stepsQuery);
      const stepsData: number[] = [];
      const labels: string[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        stepsData.push(data.steps);
        labels.push(data.date);
      });
      const chartWidth = labels.length * (50 + 10);
      setChartData({
        labels,
        datasets: [
          {
            data: stepsData,
            color: (opacity = 1) => `rgba(20, 101, 145, ${opacity})`,
          },
        ],
        chartWidth,
      });
    };

    fetchSteps();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        <TouchableOpacity onPress={() => setActive("day")}>
          <Text style={{ color: active === "day" ? "#146591" : "black" }}>
            Jour
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive("week")}>
          <Text style={{ color: active === "week" ? "#146591" : "black" }}>
            Semaine
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActive("month")}>
          <Text style={{ color: active === "month" ? "#146591" : "black" }}>
            Mois
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {chartData.chartWidth && (
          <BarChart
            style={{ marginVertical: 8, marginHorizontal: 8, borderRadius: 16 }}
            data={chartData}
            width={chartData.chartWidth}
            height={220}
            yAxisSuffix=""
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero
          />
        )}
      </ScrollView>
      {active === "day" && <DayDetails chartData={chartData} />}

      {active === "week" && <WeekDetails chartData={chartData} />}
    </View>
  );
};

export default StepHistorical;
