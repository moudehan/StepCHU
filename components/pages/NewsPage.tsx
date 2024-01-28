import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import { db } from "../../fireBase/FirebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons";
import NewsletterModal from "../Modals/NewsletterModal";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

interface Newsletter {
  id: string;
  description: string;
  name: string;
  pdfUrl: string;
}

export default function NewsPage({ navigation, route }: NewsPageProps) {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] =
    useState<Newsletter | null>(null);

  useEffect(() => {
    if (route?.params?.id) {
      const newsletterId = route.params.id;
      if (newsletters.length > 0) {
        const newsletter = newsletters.find((n) => n.id === newsletterId);
        if (newsletter) {
          setSelectedNewsletter(newsletter);
          setModalVisible(true);
        }
      }
    }
  }, [route?.params?.id, newsletters]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    const fetchNewsletters = async () => {
      const querySnapshot = await getDocs(collection(db, "newsletters"));
      const newslettersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          description: data.description,
          name: data.name,
          pdfUrl: data.pdfUrl,
        };
      });
      setNewsletters(newslettersData);
    };
    fetchNewsletters();
    return unsubscribe;
  }, [navigation]);

  const handleDownloadPDF = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar
        paramIcon={false}
        title="Actualités"
        navigation={navigation}
        paramBack={true}
      />
      <NewsletterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        newsletter={selectedNewsletter}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.headerTitleContainer}>
          <View style={styles.headerLine} />
          <Text style={styles.headerTitle}>Newsletter</Text>
          <View style={styles.headerLine} />
        </View>
        {newsletters.map((newsletter, index) => (
          <View key={index} style={styles.newsletterContainer}>
            <View style={styles.gridTitle}>
              <Text style={styles.gridText}>{newsletter.name}</Text>
            </View>
            <View style={styles.leftContainer}>
              <Text style={styles.description}>{newsletter.description}</Text>
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.rightContainer}
              onPress={() => handleDownloadPDF(newsletter.pdfUrl)}
            >
              <Icon name="cloud-download" size={50} color="#F86A53" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TabBar
        activeTab="news"
        setActiveTab={() => {}}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollView: {
    flex: 1,
    marginBottom: 80,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerTitleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    width: "100%",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  newsletterContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row", // Organiser les éléments horizontalement
    justifyContent: "space-between", // Espacer les éléments
    shadowOffset: {
      width: 0, // Décalage horizontal de l'ombre
      height: 2, // Décalage vertical de l'ombre
    },
    shadowOpacity: 0.25, // Opacité de l'ombre
    shadowRadius: 3.84, // Rayon de flou de l'ombre
    elevation: 5, // Elevation pour Android
  },
  gridTitle: {
    position: "absolute",
    top: -15,
    left: 10,
    width: 150,
    height: 40,
    backgroundColor: "#146591",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    overflow: "visible",
  },
  gridText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 5,
  },
  leftContainer: {
    flex: 1, // Prendre la moitié de l'espace disponible
    padding: 20,
    paddingTop: 30,
    justifyContent: "center", // Centrer verticalement
  },
  rightContainer: {
    width: 60, // Largeur fixe pour le bouton
    paddingRight: 20,
    justifyContent: "center", // Centrer verticalement
    alignItems: "center", // Centrer horizontalement
  },
  separator: {
    height: "100%",
    width: 2, // Un peu plus épais pour plus de visibilité
    backgroundColor: "#146591",
    transform: [{ rotate: "15deg" }],
    marginRight: 20, // On décale un peu le séparateur vers la gauche
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#146591",
    marginBottom: 15,
  },
});
