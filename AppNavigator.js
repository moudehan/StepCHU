import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "./components/pages/WelcomePage";
import AboutPage from "./components/pages/AboutPage";
import LoginPage from "./components/pages/LoginPage";
import SettingsPage from "./components/pages/SettingsPage";
import NewsPage from "./components/pages/NewsPage";
import ProfilPage from "./components/pages/ProfilPage";
import StatsPage from "./components/pages/StatsPage";
import GeneralConditionsPage from "./components/pages/GeneralConditionsPage";
import ChallengesPage from "./components/pages/ChallengesPage";
import BadgePage from "./components/pages/BadgePage";
import QuizPage from "./components/pages/QuizPage";
import QuestionPage from "./components/pages/QuestionPage";

const Stack = createNativeStackNavigator();

function AppNavigator({ initialRouteName }) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="/"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profil"
        component={ProfilPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Badges"
        component={BadgePage}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Newsletter"
        component={NewsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GeneralConditions"
        component={GeneralConditionsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Stats"
        component={StatsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChallengesScreen"
        component={ChallengesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Question"
        component={QuestionPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
