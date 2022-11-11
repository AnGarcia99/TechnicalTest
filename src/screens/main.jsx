import React from "react";
import Constants from "expo-constants";
import { Alert, StyleSheet, Text, View } from "react-native";
import ButtonBack from "../components/customButtons/buttonBack";
import ButtonLarge from "../components/customButtons/buttonLarge";
import Item from "../components/customItem/item";
import Label from "../components/customLabel/label";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { FlatList } from "react-native-gesture-handler";

export default function Main({ navigation }) {
  const coinData = [
    { id: "1", title: "USD" },
    { id: "2", title: "GBP" },
    { id: "3", title: "EUR" },
  ];

  const [currency, setCurrency] = React.useState("");
  const [coinName, setCoinName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const callApi = async (currency) => {
    try {
      await axios
        .get("https://blockchain.info/ticker")
        .then(function (response) {
          let data;
          if (currency == "USD") {
            data = "$ " + response.data.USD.last;
            setCoinName("United States Dollar");
          } else if (currency == "GBP") {
            data = "£ " + response.data.GBP.last;
            setCoinName("Great Britain Pound");
          } else {
            data = "€ " + response.data.EUR.last;
            setCoinName("Euro");
          }
          setPrice(data);
        });
    } catch (error) {
      Alert.alert("Error", "Algo salio mal");
    }
  };

  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate("Login");
  };

  const [selectedId, setSelectedId] = React.useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#FFFFFF" : "#F6F7F8";
    const color = item.id === selectedId ? "#1BBCB2" : "#5C7190";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setCurrency(item.title.toString());
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ButtonBack onPress={logout} iconName={faArrowLeft} />
        <Text style={styles.title}>Resumen Bitcoin</Text>
      </View>

      <View style={styles.bitcoinContainer}>
        <Text style={styles.h1}>Valor de Bitcoin actual</Text>
        <View style={styles.selectContainer}>
          <Text style={styles.selectTitle}>Moneda</Text>
          <View style={styles.itemContainer}>
            <FlatList
              data={coinData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              horizontal={true}
            />
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.h4}>Detalle</Text>
          <Text style={styles.h5}>{coinName}</Text>
          <Label text={price} />
        </View>
      </View>

      <ButtonLarge
        label="Actualizar"
        isDisabled={currency.length != 0 ? false : true}
        onPress={() => {
          callApi(currency);
        }}
        backgroundPrimary="#198C9B"
        backgroundSecondary="#CACACA"
        colorPrimary="#FFF"
        colorSecondary="#FFF"
        borderColor="#198C9B"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F6F7F8",
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  bitcoinContainer: {
    alignItems: "center",
    margin: 50,
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    lineHeight: 26,
    color: "#7B8186",
    flex: 3,
  },

  h1: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 26,
    color: "#4A4A4A",
  },

  selectContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "column",
    flex: 0.35,
    alignItems: "center",
    margin: 20,
    width: 312,
  },

  selectTitle: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    margin: 20,
    color: "#4A4A4A",
    textAlign: "center",
  },

  itemContainer: {
    width: 280,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "#F6F7F8",
    borderRadius: 40,
  },

  priceContainer: {
    backgroundColor: "#F6F7F8",
    borderRadius: 20,
    flexDirection: "column",
    flex: 0.35,
    alignItems: "flex-start",
    padding: 20,
    width: 312,
    shadowColor: "#171717",
    shadowOffset: { width: 16, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },

  h4: {
    color: "#198C9B",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    margin: 5,
  },

  h5: {
    color: "#5C7190",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    margin: 5,
  },
});
