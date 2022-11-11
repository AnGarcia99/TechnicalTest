import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function ButtonSmall({ label, iconName, onPress, ...props }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={onPress}
      {...props}
    >
      <Text style={styles.textButton}>{label}</Text>
      <FontAwesomeIcon icon={iconName} color={"white"} size={16} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
    backgroundColor: "#198C9B",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 40,
    borderRadius: 20,
  },

  textButton: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "600",
    marginRight: 5,
    color: "#FFFF",
  },
});
