import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { db } from "../../fireBase/FirebaseConfig";

interface AboutPageProps {
  navigation: any;
}
interface Newsletter {
  id: string;
  description: string;
  name: string;
  pdfUrl: string;
}
const LinkedBlocks = ({ navigation }: AboutPageProps) => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect(() => {
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
  }, []);

  const handlePress = (newsletterId: string) => {
    navigation.navigate("Actualites", { id: newsletterId });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Actualités</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {newsletters.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.block}
            onPress={() => handlePress(item.id)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>
                {item.description.length > 30
                  ? `${item.description.substring(0, 40)}...`
                  : item.description}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/news.png")}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 20,
  },
  headerContainer: {
    backgroundColor: "#FFBB00",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 150,
    height: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 10,
    marginRight: -20,
    marginTop: 0,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
  },
  headerTitle: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  scrollContainer: {
    flexGrow: 0,
    marginTop: 10,
  },
  block: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    width: 250,
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 8.84,
    elevation: 5,
    marginBottom: 20,
  },
  textContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    width: "50%",
    justifyContent: "center",
    zIndex: 1,
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "#000",
    fontSize: 14,
  },
  imageContainer: {
    width: "50%",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
export default LinkedBlocks;
