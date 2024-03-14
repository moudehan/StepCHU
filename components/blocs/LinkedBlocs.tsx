import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchNewsletters } from "../services/NewsLetterService";

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
    const loadData = async () => {
      const newslettersData = await fetchNewsletters();
      setNewsletters(newslettersData);
    };

    loadData();
  }, []);

  const handlePress = (newsletterId: string) => {
    navigation.navigate("Newsletter", { id: newsletterId });
  };

  return (
    <View style={styles.mainContainer}>
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
                  ? `${item.description}`
                  : item.description}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/news.jpg")}
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
    marginBottom: 10,
  },

  scrollContainer: {
    flexGrow: 0,
    marginTop: 0,
  },
  block: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    width: 350,
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
    width: "75%",
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
  },
  title: {
    color: "#146591",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "#000",
    fontSize: 14,
  },
  imageContainer: {
    width: "25%",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default LinkedBlocks;
