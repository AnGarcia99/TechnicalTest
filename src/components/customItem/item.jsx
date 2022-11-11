import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Item({ item, onPress, backgroundColor, textColor }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 2,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 11,
  },
});
