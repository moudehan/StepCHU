import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import {
  collection,
  getDoc,
  getDocs,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import ChallengeBlocs from "../blocs/ChallengeBlocs";
import ChallengeLineSeparator from "../separator/ChallengeLineSeparator";

interface ChallengesPageProps {
  navigation: any;
}

interface EventTypes {
  id: string;
  name: string;
}

interface Challenges {
  BadgeId: string;
  points: number;
  id: string;
  title: string;
  start: string;
  end: string;
  quantity: number;
  type: EventTypes;
}

export default function ChallengesPage({ navigation }: ChallengesPageProps) {
  const [activeTab, setActiveTab] = useState("challenges");
  const [challenges, setChallenges] = useState<Challenges[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchChallenges = async () => {
        const querySnapshot = await getDocs(collection(db, "events1"));
        const challengesData = querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          let typeData = null;
          if (data.type instanceof DocumentReference) {
            const typeDoc = await getDoc(data.type);
            typeData = typeDoc.data() as EventTypes;
          } else if (typeof data.type === "object") {
            typeData = data.type as EventTypes;
          } else {
            console.error("Invalid type reference:", data.type);
          }
          if (typeData) {
            return {
              id: doc.id,
              BadgeId: data.BadgeId,
              points: data.points,
              title: data.title,
              start: data.start,
              end: data.end,
              quantity: data.quantity,
              type: {
                id: typeData.id,
                name: typeData.name,
              },
            };
          } else {
            return null;
          }
        });
        const resolvedChallenges = await Promise.all(challengesData);
        const validChallenges = resolvedChallenges.filter(
          (challenge) => challenge !== null
        ) as Challenges[];
        setChallenges(validChallenges);
      };
      fetchChallenges();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* NavBar */}
      <NavBar
        paramBack={true}
        paramIcon={true}
        title="Challenges"
        navigation={navigation}
      />

      <FlatList
        data={challenges}
        extraData={challenges}
        renderItem={({ item, index }) => (
          <ChallengeBlocs
            key={index.toString()}
            title={item.title}
            quantity={item.quantity}
            type={item.type}
            start={item.start}
            end={item.end}
            id={item.id}
            badgeId={item.BadgeId}
            points={item.points}
          />
        )}
        ItemSeparatorComponent={ChallengeLineSeparator}
      />

      {/* TabBar */}
      <TabBar
        activeTab={activeTab}
        setActiveTab={() => setActiveTab}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});
