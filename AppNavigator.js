import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "./components/pages/WelcomePage";
import AboutPage from "./components/pages/AboutPage";
import LoginPage from "./components/pages/LoginPage";
import SettingsPage from "./components/pages/SettingsPage";
import NewsPage from "./components/pages/NewsPage";
import ProfilPage from "./components/pages/ProfilPage";

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
      {/* <Stack.Screen
        name="Badges"
        component={BadgePage}
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        name="Actualites"
        component={NewsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={AboutPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
