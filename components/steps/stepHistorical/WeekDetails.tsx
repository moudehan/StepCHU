import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { calculerDistance } from "../../../utils/calculateDistance";
import { calculateCalories } from "../../../utils/calculateCalories";
import GridStepsDetails from "./GridStepsDetails";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(20, 101, 145, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const getStartOfWeek = (date: Date) => {
  const resultDate = new Date(date);
  const day = date.getDay() || 7;
  if (day !== 1) resultDate.setHours(-24 * (day - 1));
  return resultDate;
};

interface StepData {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
  }[];
}

interface WeekData {
  weekStart: string;
  labels: string[];
  steps: number[];
  totalSteps: number;
}
interface WeekDetailsProps {
  chartData: StepData;
}

export const WeekDetails: React.FC<WeekDetailsProps> = ({ chartData }) => {
  const [weeksData, setWeeksData] = useState<WeekData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const dataByWeek: {
      [weekStart: string]: { labels: string[]; steps: number[] };
    } = {};

    chartData.labels.forEach((label, index) => {
      const date = new Date(label);
      const startOfWeek = getStartOfWeek(date).toISOString().slice(0, 10);
      const dayOfWeek = date.getDay() || 7;

      if (!dataByWeek[startOfWeek]) {
        dataByWeek[startOfWeek] = {
          labels: Array(7).fill(""),
          steps: Array(7).fill(0),
        };
      }

      dataByWeek[startOfWeek].steps[dayOfWeek - 1] =
        chartData.datasets[0].data[index];
      dataByWeek[startOfWeek].labels[dayOfWeek - 1] = `${date.getDate()}`;
    });

    const weeksArray = Object.entries(dataByWeek).map(([weekStart, data]) => {
      const totalSteps = data.steps.reduce((acc, current) => acc + current, 0);
      return {
        weekStart,
        labels: data.labels,
        steps: data.steps,
        totalSteps,
      };
    });

    setWeeksData(weeksArray);
    setIsLoading(false);
  }, [chartData]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#146591" />;
  }
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {weeksData.map((week, index) => {
        const startDate = new Date(week.weekStart);
        startDate.setDate(startDate.getDate() + 1);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return (
          <View key={index}>
            <GridStepsDetails
              date={`Semaine du : ${startDate.toLocaleDateString("fr-FR", { day: "2-digit" })} au ${endDate.toLocaleDateString(
                "fr-FR",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}`}
              steps={`Total de pas : ${week.totalSteps}`}
              additionalInfo={[
                {
                  label: "Moyenne",
                  value: `${(week.totalSteps / 7).toFixed(2)} Pas/Jour`,
                },
                {
                  label: "Distance parcourue",
                  value: `${calculerDistance(week.totalSteps).toFixed(2)} Km`,
                },
                {
                  label: "Calories brûlés",
                  value: `${calculateCalories(week.totalSteps).toFixed(2)}${" "}Kcal`,
                },
              ]}
            />
            <BarChart
              style={{ marginVertical: 40 }}
              data={{
                labels: week.labels,
                datasets: [{ data: week.steps }],
              }}
              yAxisSuffix=""
              yAxisLabel=""
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              showValuesOnTopOfBars={true}
              withHorizontalLabels={true}
              withVerticalLabels={true}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};
