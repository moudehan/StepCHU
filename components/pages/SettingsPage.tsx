import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Switch,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";

interface SettingsPageProps {
  navigation: any;
}

interface SettingsProps {
  title: string;
  description?: string;
  iconName: string;
  isSwitch?: boolean;
  onToggle?: any;
  switchValue?: any;
  navigation?: any;
  navigateTo?: any;
}
export default function SettingsPage({ navigation }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("home");

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const toggleSwitch = () =>
    setIsNotificationsEnabled((previousState) => !previousState);

  const SettingItem = ({
    title,
    description,
    iconName,
    isSwitch,
    onToggle,
    switchValue,
    navigation,
    navigateTo,
  }: SettingsProps) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo)}
        style={styles.settingItem}
      >
        <Icon name={iconName} size={24} color="#FF0000" style={styles.icon} />
        <View style={styles.settingTexts}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && (
            <Text style={styles.settingDescription}>{description}</Text>
          )}
        </View>
        {isSwitch ? (
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={switchValue ? "#ff0000" : "#f4f3f4"}
            onValueChange={onToggle}
            value={switchValue}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* NavBar */}
      <NavBar
        paramIcon={false}
        title="Paramètres"
        navigation={navigation}
        paramBack={true}
      />

      <ScrollView style={styles.container}>
        <Text style={styles.mainTitle}>Gérer vos autorisations</Text>
        <SettingItem
          title="Autoriser les notifications"
          iconName="notifications"
          isSwitch={true}
          onToggle={toggleSwitch}
          switchValue={isNotificationsEnabled}
        />
        <Text style={styles.mainTitle}>Documentation</Text>
        <SettingItem
          title="Didacticiel"
          description="Découvrir l'utilisation de notre app"
          iconName="school"
        />
        <SettingItem
          title="À Propos"
          description="Informations sur notre organisation"
          iconName="info"
          navigation={navigation}
          navigateTo="Apropos"
        />
        <SettingItem
          title="Conditions générales d'utilisation"
          iconName="description"
        />
      </ScrollView>
      {/* TabBar */}
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    paddingVertical: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  settingTexts: {
    flex: 1,
    marginLeft: 10,
  },
  settingTitle: {
    fontSize: 14,
    color: "#001F1C",
  },
  settingDescription: {
    fontSize: 12,
    color: "#ABB0AF",
  },
  icon: {
    width: 24,
    height: 24,
  },
});