import React from "react";
import { StyleSheet, View } from "react-native";

export default function ChallengeLineSeparator() {
    return(
        <View style={Styles.separator} />
    )
}

const Styles = StyleSheet.create({
    separator: {
      height: 1,
      opacity: 0.3,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'gray',
    },
  });
