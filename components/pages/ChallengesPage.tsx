import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import NavBar from "../navDrawer/NavBar";
import TabBar from "../navDrawer/TabBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fireBase/FirebaseConfig";
import ChallengeBlocs from "../blocs/ChallengeBlocs";
import ChallengeLineSeparator from "../separator/ChallengeLineSeparator";

interface ChallengesPageProps {
  navigation: any;
}

interface Challenges {
  id: string;
  description: string;
  name: string;
}

export default function ChallengesPage({ navigation }: ChallengesPageProps) {
  const [activeTab, setActiveTab] = useState("ChallengesScreen");
  const [challenges, setChallenges] = useState<Challenges[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => { });
    const fetchChallenges = async () => {
      const querySnapshot = await getDocs(collection(db, "challenges"));
      const challengesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          description: data.description,
          name: data.name,
        };
      });
      setChallenges(challengesData);
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
        renderItem={({ item }) => <ChallengeBlocs title={item.name} />}
        ItemSeparatorComponent={ChallengeLineSeparator}/>

      {/* TabBar */}
      <TabBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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