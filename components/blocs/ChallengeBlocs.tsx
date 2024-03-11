import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';

interface ChallengeBlocsProps {
    title: String;
    quantity: number;
    type: string;
  }

export default function ChallengeBlocs({ title, quantity, type } : ChallengeBlocsProps) {
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>{ title }</Text>
            <Progress.Bar
                progress={0.5}
                width={null}
                height={10} />
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    }
})