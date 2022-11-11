import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ButtonLarge({
  label,
  backgroundPrimary,
  backgroundSecondary,
  colorPrimary,
  colorSecondary,
  borderColor,
  isDisabled,
  onFocus = () => {},
  onPress,
  ...props
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          borderColor: isFocused
            ? borderColor
            : !isDisabled
            ? backgroundPrimary
            : backgroundSecondary,
          backgroundColor: !isDisabled
            ? backgroundPrimary
            : backgroundSecondary,
        },
      ]}
      onFocus={() => {
        onFocus;
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          styles.textButton,
          { color: isFocused ? colorSecondary : colorPrimary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 312,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
  },

  textButton: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "600",
    marginRight: 5,
  },
});
