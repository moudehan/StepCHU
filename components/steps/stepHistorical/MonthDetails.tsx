import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { calculateCalories } from "../../../utils/calculateCalories";
import { calculerDistance } from "../../../utils/calculateDistance";
import GridStepsDetails from "./GridStepsDetails";

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(20, 101, 145, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

interface StepData {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
  }[];
}

interface MonthTotalData {
  month: string;
  totalSteps: number;
}

export const MonthDetails: React.FC<{ chartData: StepData }> = ({
  chartData,
}) => {
  const [monthTotals, setMonthTotals] = useState<MonthTotalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const now = new Date();
    const monthlyTotals: { [key: string]: number } = {};
    const startMonth = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    for (let m = 0; m < 12; m++) {
      const monthDate = new Date(
        startMonth.getFullYear(),
        startMonth.getMonth() + m,
        1
      );
      const monthYearKey = `${monthDate.getMonth() + 1}-${monthDate.getFullYear()}`;
      monthlyTotals[monthYearKey] = 0;
    }

    chartData.labels.forEach((label, index) => {
      const date = new Date(label);
      const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`;
      monthlyTotals[monthYearKey] += chartData.datasets[0].data[index];
    });

    const totalsArray: MonthTotalData[] = Object.entries(monthlyTotals).map(
      ([key, totalSteps]) => {
        const [month, year] = key.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1, 1);
        const monthName = date.toLocaleDateString("fr-FR", {
          month: "2-digit",
          year: "2-digit",
        });
        return { month: monthName, totalSteps };
      }
    );

    setMonthTotals(
      totalsArray.sort(
        (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
      )
    );
    setIsLoading(false);
  }, [chartData]);

  const chartWidth = monthTotals.length * 50;
  const validMonths = monthTotals.filter((month) => month.totalSteps > 1);

  const totalSteps = validMonths.reduce(
    (acc, curr) => acc + curr.totalSteps,
    0
  );
  const averageSteps = totalSteps / validMonths.length;
  const averageCalories = calculateCalories(totalSteps) / validMonths.length;
  const averageDistance = calculerDistance(totalSteps) / validMonths.length;

  if (isLoading) {
    return <ActivityIndicator size="large" color="#146591" />;
  }
  return (
    <>
      <GridStepsDetails
        date={`Période : ${monthTotals[0]?.month} - ${monthTotals[monthTotals.length - 1]?.month}`}
        steps={`Total de pas : ${totalSteps}`}
        additionalInfo={[
          {
            label: "Moyenne",
            value: `${averageSteps.toFixed(0)} pas/mois`,
          },
          {
            label: "Calories",
            value: `${averageCalories.toFixed(2)} kcal/mois`,
          },
          {
            label: "Distance",
            value: `${averageDistance.toFixed(2)} km/mois`,
          },
        ]}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 20 }}
      >
        <View style={{ width: chartWidth, alignItems: "center", padding: 20 }}>
          <BarChart
            data={{
              labels: monthTotals.map((data) => data.month),
              datasets: [{ data: monthTotals.map((data) => data.totalSteps) }],
            }}
            width={chartWidth}
            height={220}
            yAxisSuffix=""
            yAxisLabel=""
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars={true}
            withInnerLines={true}
          />
        </View>
      </ScrollView>
    </>
  );
};
