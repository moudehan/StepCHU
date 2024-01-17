import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
  navigation: any;
}

const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  setActiveTab,
  navigation,
}) => {
  const tabIcons = [
    {
      name: "news",
      label: "Actualités",
      icon: "globe-outline",
      screen: "Actualites",
    },
    {
      name: "challenges",
      label: "Challenges",
      icon: "medal-outline",
      screen: "ChallengesScreen",
    },
    {
      name: "home",
      icon: "home-outline",
      screen: "home",
    },
    {
      name: "quiz",
      label: "Quiz",
      icon: "school-outline",
      screen: "QuizScreen",
    },
    {
      name: "profil",
      label: "Profil",
      icon: "person-circle-outline",
      screen: "Profil",
    },
  ];

  const handleTabPress = (tab: any) => {
    setActiveTab(tab.name);
    navigation.navigate(tab.screen);
  };

  return (
    <View style={styles.tabBar}>
      {tabIcons.map((tab) => {
        const isHomeTab = tab.name === "home";
        return (
          <View
            // key={index}
            style={styles.tabItemContainer}
          >
            {isHomeTab && <View style={styles.homeButtonBackground} />}
            <TouchableOpacity
              onPress={() => handleTabPress(tab)}
              style={[
                styles.tabItem,
                isHomeTab ? styles.homeButton : {},
                activeTab === tab.name ? styles.activeTabItem : null,
              ]}
            >
              {activeTab === tab.name && (
                <View style={isHomeTab ? {} : styles.activeTabHighlight} />
              )}
              <Icon
                name={tab.icon}
                size={activeTab === tab.name ? 30 : 29}
                color={activeTab === tab.name ? "#E26C61" : "#A3A3A3"}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: activeTab === tab.name ? "#E26C61" : "#A3A3A3",
                fontSize: 10,
                textTransform: "capitalize",
              }}
            >
              {tab.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 15,
    position: "absolute",
    borderTopRightRadius: 10,
    borderTopStartRadius: 10,
    bottom: 0,
    zIndex: 1,
  },
  tabItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabItem: {
    paddingTop: 0,
  },
  homeButtonBackground: {
    position: "absolute",
    top: -25,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1a8cc9",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  homeButton: {
    marginBottom: 0,
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.5,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    top: -15,
  },
  activeTabHighlight: {
    position: "absolute",
    top: -10,
    width: "70%",
    height: 2,
    backgroundColor: "#E26C61",
    alignSelf: "center",
  },
});

export default TabBar;
