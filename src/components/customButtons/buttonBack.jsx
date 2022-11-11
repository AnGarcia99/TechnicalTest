import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function ButtonBack({ iconName, onPress, ...props }) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.8}
      onPress={onPress}
      {...props}
    >
      <FontAwesomeIcon icon={iconName} color={"#1BBCB2"} size={22} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 20,
    flex: 1,
  },
});
