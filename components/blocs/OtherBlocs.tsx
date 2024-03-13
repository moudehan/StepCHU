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
    title: "Quiz",
    image: require("../../assets/quizLogo.png"),
    screen: "",
  },
  {
    title: "Mes Badges",
    image: require("../../assets/badgesLogo.png"),
    screen: "Settings",
  },
  {
    title: "Mes statistique",
    image: require("../../assets/stats-chart.png"),
    screen: "Stats",
  },
];

interface AboutPageProps {
  navigation?: any;
}

const OthersBlocs = ({ navigation }: AboutPageProps) => {
  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View>
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
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
    marginBottom: 20,
  },
  block: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    width: 250,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#1a8cc9",
  },
  textContainer: {
    marginRight: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 100,
  },
  imageContainer: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
});

export default OthersBlocs;
