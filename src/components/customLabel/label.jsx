import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Label({ text }) {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
  },

  label: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#7B8186",
  },
});
