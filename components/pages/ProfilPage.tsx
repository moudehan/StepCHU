import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import usersData from "../../data/users.json";
import LoadingPage from "./LoadingPage";
import TabBar from "../navDrawer/TabBar";

interface ProfilPageProps {
  navigation: any;
}

interface MenuItemsProps {
  iconName: string;
  text: string;
  isLastItem?: boolean;
  onPress: any;
}

export default function ProfilPage({ navigation }: ProfilPageProps) {
  const [activeTab, setActiveTab] = useState("profil");
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const user = usersData.find((u) => u.id.toString() === userId);
      if (user) {
        setUserData({ username: user.username, email: user.email });
      }
    };

    fetchUserData();

    const unsubscribe = navigation.addListener("focus", () => {
      setActiveTab("profil");
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    setIsLoading(true);
    await AsyncStorage.clear(); // Supprime toutes les données d'AsyncStorage
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("/");
    }, 2000);
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.upperSection}>
        <Icon name="pencil" size={24} color="white" style={styles.editIcon} />
        <View style={styles.profileSection}>
          {/* <Image  style={styles.profilePic} /> */}
          <Text style={styles.profileName}>{userData.username}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
        </View>
      </View>

      <View style={styles.lowerSection}>
        <MenuItem iconName="person" text="Mon Compte" onPress={() => ""} />
        <MenuItem
          iconName="medal-outline"
          text="Mes Badges"
          onPress={() => navigation.navigate("Badges")}
        />
      </View>

      <View style={styles.lowerSection2}>
        <MenuItem
          iconName="log-out-outline"
          text="Déconnexion"
          onPress={handleLogout}
          isLastItem
        />
      </View>

      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const MenuItem = ({ iconName, text, isLastItem, onPress }: MenuItemsProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.menuItem, isLastItem && styles.lastMenuItem]}
  >
    <Icon name={iconName} size={24} color="#E26C61" />
    <Text style={styles.menuItemText}>{text}</Text>
    <Icon name="chevron-forward-outline" size={24} color="#001F1C" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  upperSection: {
    backgroundColor: "#146591",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingBottom: 200,
    alignItems: "center",
    marginBottom: -170,
  },
  editIcon: {
    position: "absolute",
    right: 20,
    top: 50,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 50,
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 40,
    backgroundColor: "#ccc",
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  profileEmail: {
    color: "#D3D4D4",
    fontSize: 12,
    marginTop: 4,
  },
  lowerSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 40,
    paddingHorizontal: 24,
  },
  lowerSection2: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 40,
    paddingVertical: 0,
    marginTop: 20,
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 14,
    color: "#001F1C",
  },
});
