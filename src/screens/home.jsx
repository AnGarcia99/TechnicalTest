import React from "react";
import Constants from "expo-constants";
import { StyleSheet, Image, Text, View } from "react-native";
import ButtonSmall from "../components/customButtons/buttonSmall";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bitcoin APP</Text>
      <Image
        style={styles.image}
        source={require("../assets/Images/data_analytics.png")}
      ></Image>
      <View style={styles.footer}>
        <Text style={styles.question}>¿Cuál es el valor actual del BTC?</Text>
        <Text style={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <ButtonSmall
          label="Iniciar"
          iconName={faArrowRight}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#E7F2F2",
  },

  title: {
    marginTop: Constants.statusBarHeight,
    color: "#5C7190",
    fontSize: 24,
  },

  image: {
    flex: 1,
    margin: 50,
    width: "95%",
  },

  footer: {
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    flex: 3,
    borderTopLeftRadius: 60,
    width: "100%",
    padding: 35,
    alignItems: "center",
  },

  question: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 28,
    marginTop: 15,
    marginHorizontal: 35,
    textAlign: "center",
  },

  text: {
    color: "#2C3747",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    margin: 20,
    textAlign: "center",
  },
});
