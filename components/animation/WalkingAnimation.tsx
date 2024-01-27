import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function WalkingAnimation() {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    const runAnimation = () => {
      // Réinitialiser à 0 au début
      animationProgress.current.setValue(0);

      // Animer jusqu'à 1
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => runAnimation());
    };

    runAnimation();
  }, []);

  return (
    <AnimatedLottieView
      source={require("./WalkingAnimation.json")}
      progress={animationProgress.current}
      style={{ width: 100, height: 100 }} // Ajustez la taille selon vos besoins
    />
  );
}
