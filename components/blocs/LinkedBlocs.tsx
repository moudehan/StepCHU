import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const data = [
  {
    title: "LES Actulaités",
    description: "Découvrez les nouveaux challenges.",
    image: require("../../assets/news.png"),
    screen: "Actualites",
  },
  {
    title: "CHU 2024",
    description: "Actulaités du CHU ...",
    image: require("../../assets/news.png"),
    screen: "Actualites",
  },
];
interface AboutPageProps {
  navigation: any;
}
const LinkedBlocks = ({ navigation }: AboutPageProps) => {
  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Actualités</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.block}
            onPress={() => handlePress(item.screen)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
