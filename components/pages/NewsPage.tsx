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
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import Icon from "react-native-vector-icons/MaterialIcons";
import NewsletterModal from "../Modals/NewsletterModal";
import { fetchNewsletters } from "../services/NewsLetterService";
import { NewsletterType } from "../../types/NewsletterTypes";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

export default function NewsPage({ navigation, route }: NewsPageProps) {
  const [newsletters, setNewsletters] = useState<NewsletterType[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] =
    useState<NewsletterType | null>(null);

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
    const loadData = async () => {
      const newslettersData = await fetchNewsletters();
      setNewsletters(newslettersData);
    };

    loadData();
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
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    flex: 1,
    padding: 20,
    paddingTop: 30,
    justifyContent: "center",
  },
  rightContainer: {
    width: 60,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: "100%",
    width: 2,
    backgroundColor: "#146591",
    transform: [{ rotate: "15deg" }],
    marginRight: 20,
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
