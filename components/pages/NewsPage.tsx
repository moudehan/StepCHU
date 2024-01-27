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
      <ScrollView style={styles.container}>
        <View style={styles.headerTitleContainer}>
          <View style={styles.headerLine} />
          <Text style={styles.headerTitle}>Newsletter</Text>
          <View style={styles.headerLine} />
        </View>
        {newsletters.map((newsletter, index) => (
          <View key={index} style={styles.newsletterContainer}>
            <Text style={styles.title}>{newsletter.name}</Text>
            <Text style={styles.description}>{newsletter.description}</Text>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownloadPDF(newsletter.pdfUrl)}
            >
              <Icon name="file-download" size={20} color="#FFF" />
              <Text style={styles.buttonText}>PDF Download</Text>
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
  container: {
    flex: 1,
    paddingVertical: 50,
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
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  downloadButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
  },
});
