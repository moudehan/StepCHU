import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPage from "./LoadingPage";
import TabBar from "../navDrawer/TabBar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import { useAuth } from "../../AuthContext";

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
  const [userData, setUserData] = useState({ id: "", name: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userRef = doc(db, "utilisateurs", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            id: docSnap.id,
            name: data.name,
          });
        } else {
          console.debug("Aucun document trouvé!");
        }
      }
    };

    fetchUserData();
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveTab("profil");
    });

    return unsubscribe;
  }, [userId]);

  const handleLogout = async () => {
    setActiveTab("home");
    setIsLoading(true);
    await AsyncStorage.clear();
    setTimeout(() => {
      navigation.navigate("/");
      setIsLoading(false);
    }, 3000);
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.upperSection}>
        {/* <Icon name="stats-chart" color="white" style={styles.editIcon} /> */}
        <View style={styles.profileSection}>
          <Image
            source={require("../../assets/splash.png")}
            style={styles.profilePic}
          />
          <Text style={styles.profileUserName}>
            utilisateur : {userData.name}
          </Text>
          <Text style={styles.profileId}>ID : {userData.id}</Text>
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
      <View style={styles.lowerSection3}>
        <MenuItem
          iconName="stats-chart"
          text="Mes statistiques"
          onPress={() => navigation.navigate("Stats")}
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
    paddingBottom: 290,
    alignItems: "center",
    marginBottom: -250,
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
    width: 78,
    height: 78,
    borderRadius: 40,
    backgroundColor: "#ccc",
  },
  profileId: {
    color: "#D3D4D4",
    fontSize: 12,
    marginTop: 4,
  },
  profileUserName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  lowerSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 40,
    paddingHorizontal: 24,
  },
  lowerSection3: {
    marginTop: 20,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
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
