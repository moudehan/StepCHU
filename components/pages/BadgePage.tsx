import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import { useAuth } from "../../AuthContext";
import * as Progress from "react-native-progress";
import { getBadgeUser, updateUserBadges } from "../services/BadgesService";
import { fetchUserByID } from "../services/UserService";
import Badge from "../../types/Badge";
import BadgeColor from "../../types/BadgeColor";

interface NewsPageProps {
  navigation: any;
  route?: any;
}

export default function BadgePage({ navigation }: NewsPageProps) {
  const [badges, setBadges] = useState<Badge[]>([]);

  const userId = useAuth();

  async function getBadgesUser() {
    useEffect(() => {
      const fetchAllBadge = async () => {
        if (userId.authState.userId) {
          const user = await fetchUserByID(userId.authState.userId);
          if (!user) {
            return [];
          }
          const tabBadge = await getBadgeUser(user);

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

      await updateUserBadges(userId.authState.userId!, tabBadge);
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
    <View style={styles.safeArea}>
      <NavBar
        paramIcon={false}
        title="Mes Badges"
        navigation={navigation}
        paramBack={true}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.badges}>
          {badges.map((badge, index) => (
            <View key={badge.id} style={[styles.shadowBorderContainer]}>
              <View key={badge.id} style={[styles.badge]}>
                <Image
                  source={{ uri: getBadgeColor(badge).image }}
                  height={101}
                  width={79}
                />
                <View style={styles.badgeText}>
                  <Text style={styles.badgeTitle}>{badge.name}</Text>
                  <Text style={styles.badgeDescription}>
                    {badge.description}
                  </Text>
                  <Text style={styles.gridTextDescription}>
                    {badge.points} points restants
                  </Text>
                  <Progress.Bar
                    progress={
                      (badge.points ?? 0) / getBadgeColor(badge).maxPoints
                    }
                    width={Dimensions.get("window").width * 0.7 - 40}
                    height={10}
                    color="#146591"
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TabBar
        activeTab="home"
        setActiveTab={() => {}}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shadowBorderContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    // marginBottom: 20,
    // marginVertical: 20,
    marginHorizontal: 5,
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    // marginHorizontal: 7,
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
  badges: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 30,
    paddingTop: 25,
  },
  badge: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  badgeText: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    marginLeft: 15,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  badgeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  badgeDescription: {
    fontSize: 14,
  },
  gridTextDescription: {
    fontSize: 12,
    textAlign: "center",
    width: "100%",
  },
});
