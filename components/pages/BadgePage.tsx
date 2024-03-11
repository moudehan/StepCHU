import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Svg, SvgFromUri, SvgXml } from "react-native-svg";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import { useAuth } from "../../AuthContext";
import * as Progress from "react-native-progress";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import { fetchBage } from "../services/BadgesService";
import Badge from "../../types/Badge";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

const nbItemsInRow = 3;

function updateBadgesUser() {
  const [alBadges, setAllBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const fetchAlBadge = async () => {
      const badges = await fetchBage();
      setAllBadges(badges);
    };
    fetchAlBadge();
  }, []);
}

export default function BadgePage({ navigation }: NewsPageProps) {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const fetchAlBadge = async () => {
      const badges = await fetchBage();
      setBadges(badges);
    };
    fetchAlBadge();
  }, []);

  // console.log({ badges });
  // if (badges[0]) console.log(badges[0].badgeColors[0].image);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavBar
        paramIcon={false}
        title="Mes Badges"
        navigation={navigation}
        paramBack={true}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.gridContainer}>
          {badges.map((badge, index) => (
            <View key={index} style={[styles.gridItem]}>
              <Image
                source={{ uri: badge.badgeColors[2].image }}
                height={101}
                width={79}
              />

              <Text style={styles.gridTextTitle}>{badge.name}</Text>
              <View
                style={{
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.gridTextDescription}>
                  Marcher 10.000 pendant 7 jours d’affilés
                </Text>
              </View>
              <Progress.Bar
                progress={0.5}
                width={79}
                height={10}
                color="#E26C61"
              />
              <Text style={styles.gridTextDescription}>
                185 / {badge.badgeColors[0].maxPoints}
              </Text>
            </View>
          ))}
          {badges.map((badge, index) => (
            <View key={index} style={[styles.gridItem]}>
              <Image
                source={{ uri: badge.badgeColors[0].image }}
                height={101}
                width={79}
              />

              <Text style={styles.gridTextTitle}>{badge.name}</Text>
              <View
                style={{
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.gridTextDescription}>
                  {badge.description}
                </Text>
              </View>
              <Progress.Bar
                progress={0.5}
                width={79}
                height={10}
                color="#E26C61"
              />
              <Text style={styles.gridTextDescription}>
                185 / {badge.badgeColors[0].maxPoints}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TabBar
        activeTab="home"
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
    flexGrow: 1,
    // paddingVertical: 50,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 20,
    marginBottom: 10,
  },
  gridItem: {
    width: Dimensions.get("window").width / nbItemsInRow - 10,
    height: Dimensions.get("window").width / nbItemsInRow + 70,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  gridTextTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  gridTextDescription: {
    fontSize: 12,
    textAlign: "center",
  },
});
