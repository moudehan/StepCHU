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
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import { fetchBage } from "../services/BadgesService";
import { fetchUserByID } from "../services/UserService";
import Badge from "../../types/Badge";
import { set } from "date-fns";
import BadgeColor from "../../types/BadgeColor";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

const nbItemsInRow = 3;

export default function BadgePage({ navigation }: NewsPageProps) {
  const [badges, setBadges] = useState<any[]>([]);

  const userId = useAuth();

  async function getBadgesUser() {
    useEffect(() => {
      const fetchAllBadge = async () => {
        if (userId.authState.userId) {
          const user = await fetchUserByID(userId.authState.userId);
          const fetchBadges = await fetchBage();
          let tabBadge: any[] = [];
          fetchBadges.map((badge) => {
            if (user?.badges) {
              let badgeFound = false;
              user?.badges.map((userBadge) => {
                if (badge.id == userBadge.id) {
                  badgeFound = true;
                  tabBadge.push({ ...badge, points: userBadge.points });
                }
              });
              if (!badgeFound) {
                tabBadge.push({ ...badge, points: 0 });
              }
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

  useEffect(() => {
    async function updateUserBages() {
      let tabBadge: any[] = [];
      badges.map((badge) => {
        tabBadge.push({ id: badge.id, points: badge.points });
      });

      const userDocRef = doc(db, "utilisateurs", userId.authState.userId!);
      await updateDoc(userDocRef, { badges: tabBadge });
    }
    if (badges.length != 0) {
      updateUserBages();
    }
  }, [badges]);

  function getBadgeColor(badge: Badge): BadgeColor {
    let color = badge.badgeColors[0];

    badge.badgeColors.map((badgeColor) => {
      if (
        badgeColor.maxPoints >= (badge.points ?? 0) &&
        badgeColor.minPoints <= (badge.points ?? 0)
      ) {
        color = badgeColor;
      }
    });

    return color;
  }

  getBadgesUser();

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
                source={{ uri: getBadgeColor(badge).image }}
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
                progress={badge.points / getBadgeColor(badge).maxPoints}
                width={79}
                height={10}
                color="#E26C61"
              />
              <Text style={styles.gridTextDescription}>
                {badge.points} / {getBadgeColor(badge).maxPoints}
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
