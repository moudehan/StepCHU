import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPage from "./LoadingPage";
import TabBar from "../navDrawer/TabBar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

const avatars = [
  require("../../assets/avatar/Avatar1.png"),
  require("../../assets/avatar/Avatar2.png"),
  require("../../assets/avatar/Avatar3.png"),
  require("../../assets/avatar/Avatar4.png"),
  require("../../assets/avatar/Avatar5.png"),
  require("../../assets/avatar/Avatar6.png"),
  require("../../assets/avatar/Avatar7.png"),
  require("../../assets/avatar/Avatar8.png"),
  require("../../assets/avatar/Avatar9.png"),
  require("../../assets/avatar/Avatar10.png"),
  require("../../assets/avatar/Avatar11.png"),
  require("../../assets/avatar/Avatar12.png"),
];

export default function ProfilPage({ navigation }: ProfilPageProps) {
  const [activeTab, setActiveTab] = useState("profil");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    idAvatar: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [avatarId, setAvatarId] = useState(0);
  const [tmpAvatarId, setTmpAvatarId] = useState(avatarId);

  const { authState } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (authState.userId) {
        const userRef = doc(db, "utilisateurs", authState.userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            id: docSnap.id,
            name: data.name,
            idAvatar: data.idAvatar ?? Math.floor(Math.random() * 10) + 1,
          });
        } else {
          console.debug("Aucun document trouvé!");
        }
      }
    };

    if (userData.idAvatar) {
      setAvatarId(userData.idAvatar);
    }

    fetchUserData();
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveTab("profil");
    });

    return unsubscribe;
  }, [authState.userId]);

  const handleLogout = async () => {
    setActiveTab("home");
    setIsLoading(true);
    await AsyncStorage.clear();
    navigation.navigate("/");
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (userData.idAvatar) {
      setAvatarId(userData.idAvatar);
    }
  }, [userData.idAvatar]);

  useEffect(() => {
    setTmpAvatarId(avatarId);
    async function updateUser() {
      const userDocRef = doc(db, "utilisateurs", userData.id!);
      await updateDoc(userDocRef, { idAvatar: avatarId });
    }
    if (userData.id) {
      updateUser();
    }
  }, [avatarId]);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.upperSection}>
        {/* <Icon name="stats-chart" color="white" style={styles.editIcon} /> */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Image source={avatars[avatarId - 1]} style={styles.profilePic} />
          </TouchableOpacity>
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
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Avatar</Text>
            <View style={styles.modalListeImage}>
              {avatars.map((avatar, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setTmpAvatarId(index + 1);
                  }}
                >
                  {tmpAvatarId === index + 1 ? (
                    <Image
                      source={require("../../assets/avatar/selected.png")}
                      style={{ position: "absolute", bottom: -6, right: -6 }}
                    />
                  ) : null}
                  <Image source={avatar} style={styles.profilePic} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={styles.buttonAnnuler}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonValider}
                onPress={() => (setShowModal(false), setAvatarId(tmpAvatarId))}
              >
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalListeImage: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 25,
    marginBottom: 20,
  },
  buttonValider: {
    backgroundColor: "#146591",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonAnnuler: {
    backgroundColor: "#E26C61",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    marginHorizontal: "auto",
  },
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
