import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChallengeBlocsProps {
    title: String;
    quantity: number;
    type: string;
  }

export default function ChallengeBlocs({ title, quantity, type } : ChallengeBlocsProps) {
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>{ title }</Text>
            <Text style={Styles.title}>{ type }</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "grey",
        margin: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    }
})