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
import { fetchUserByID } from "../services/UserService";
import Badge from "../../types/Badge";
import { set } from "date-fns";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

const nbItemsInRow = 3;

export default function BadgePage({ navigation }: NewsPageProps) {
  const [badges, setBadges] = useState<any[]>([]);

  const userId = useAuth();

  async function updateBadgesUser() {
    useEffect(() => {
      const fetchAllBadge = async () => {
        if (userId.authState.userId) {
          const user = await fetchUserByID(userId.authState.userId);
          const fetchBadges = await fetchBage();
          let tabBadge = [];
          fetchBadges.map((badge) => {
            if (user?.badges) {
              user?.badges.map((userBadge) => {
                if (badge.id != userBadge.badge.id) {
                } else {
                }
              });
            } else {
              tabBadge.push({ ...badge, points: 0 });
            }
          });
          setBadges(tabBadge);
        }
      };
      fetchAllBadge();
    }, []);
  }
  //   console.log();
  updateBadgesUser();

  //   console.log(badges);
  if (badges.length > 0) console.log(badges[0].badgeColors[2].maxPoints);
  if (badges.length > 0) console.log(badges[0].badgeColors[2].minPoints);
  if (badges.length > 0) console.log(badges[0].points);

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
              {}
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
                {badge.points} / {badge.badgeColors[0].maxPoints}
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
