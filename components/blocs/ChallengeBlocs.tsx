import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChallengeBlocsProps {
    title: String;
  }

export default function ChallengeBlocs({ title } : ChallengeBlocsProps) {
    return (
        <View>
            <Text>{ title }</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    
})