import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface NavBarProps {
  paramBack: boolean;
  paramIcon: boolean;
  title: string;
  navigation: any;
}

const NavBar: React.FC<NavBarProps> = ({
  paramBack,
  paramIcon,
  title,
  navigation,
}) => {
  return (
    <View style={styles.navBar}>
      {paramBack !== false ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <View style={styles.iconCircle}>
            <Icon name="chevron-back" size={18} color="#DADDDD" />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      <Text style={styles.navBarTitle}> {title ? title : "StepCHU"}</Text>
      {paramIcon !== false ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")} // Remplacez 'Settings' par le nom de la route des paramètres
          style={styles.iconButton}
        >
          <View style={styles.iconCircle}>
            <Icon name="settings-outline" size={18} color="#DADDDD" />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#146591",
    paddingHorizontal: 10,
    paddingTop: 35,
    paddingBottom: 15,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
  },
  navBarTitle: {
    color: "#DADDDD",
    fontWeight: "bold",
    fontSize: 20,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  iconCircle: {
    backgroundColor: "#146591",
    borderRadius: 17,
    borderColor: "#DADDDD",
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
  },
});

export default NavBar;
