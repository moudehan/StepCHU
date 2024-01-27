import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";

interface CercleProgressProps {
  currentSteps: number;
}

const CercleProgress = ({ currentSteps }: CercleProgressProps) => {
  const goalSteps = 10000;
  const progressValue =
    currentSteps >= goalSteps ? 100 : (currentSteps / goalSteps) * 10000;

  return (
    <CircularProgress
      value={progressValue}
      radius={80}
      maxValue={goalSteps}
      activeStrokeColor={"#F86A53"}
      inActiveStrokeColor={"#EAF2FF"}
      inActiveStrokeWidth={40}
      activeStrokeWidth={20}
      progressValueFontSize={30}
      progressValueColor={"black"}
      circleBackgroundColor="white"
      //   valueSuffix={"\n pas"}
      //   valueSuffixStyle={{ color: "black", fontSize: 20 }}
      showProgressValue={true}
    />
  );
};

export default CercleProgress;
