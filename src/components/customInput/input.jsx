import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function Input({
  label,
  iconName,
  error,
  onFocus = () => {},
  ...props
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? "red" : isFocused ? "#1BBCB2" : "#FFF" },
        ]}
      >
        <FontAwesomeIcon icon={iconName} color={"#1BBCB2"} size={16} />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus;
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={styles.placeholder}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    marginLeft: 20,
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#4A4A4A",
  },

  inputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 2,
    shadowColor: "rgba(0,0,0,0.25)",
    borderRadius: 25,
  },

  placeholder: {
    marginLeft: 10,
    color: "#7B8186",
    flex: 1,
  },

  error: {
    color: "red",
    fontSize: 14,
    marginTop: 7,
  },
});
