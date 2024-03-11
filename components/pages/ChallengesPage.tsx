import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import { Timestamp, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
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
  id: string;
  title: string;
  start: Timestamp;
  end: Timestamp;
  quantity: number;
  type: string;
}

export default function ChallengesPage({ navigation }: ChallengesPageProps) {
  const [activeTab, setActiveTab] = useState("challenges");
  const [challenges, setChallenges] = useState<Challenges[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => { });
    const fetchChallenges = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const challengesData = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const typeDoc = await getDoc(data.type);
        const typeData = typeDoc.data() as EventTypes;
        return {
          id: doc.id,
          title: data.title,
          start: data.start,
          end: data.end,
          quantity: data.quantity,
          type: typeData.name
        };
      });
      const resolvedChallenges = await Promise.all(challengesData);
      setChallenges(resolvedChallenges);
    };
    fetchChallenges();
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
        renderItem={({ item }) => <ChallengeBlocs title={item.title} quantity={item.quantity} type={item.type} start={item.start} end={item.end}/>}
        ItemSeparatorComponent={ChallengeLineSeparator}/>

      {/* TabBar */}
      <TabBar
        activeTab={activeTab}
        setActiveTab={() => setActiveTab}
        navigation={navigation}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});