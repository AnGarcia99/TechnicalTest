import React from "react";
import Constants from "expo-constants";
import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import Input from "../components/customInput/input";
import ButtonLarge from "../components/customButtons/buttonLarge";
import Loader from "../components/customLoader/loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { faMobileButton } from "@fortawesome/free-solid-svg-icons/faMobileButton";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons/faEnvelope";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ phone: "", email: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.phone.match(RegExp(/^[0-9]{10}$/))) {
      handleError("Por favor ingresa un celular a 10 dígitos", "phone");
      setDisabled(valid);
    } else if (
      !inputs.email.match(
        RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
      )
    ) {
      handleError("Por favor ingresa un correo valido", "email");
      setDisabled(valid);
    } else {
      setDisabled(!valid);
    }
  };

  const register = () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        let userData = await AsyncStorage.getItem("userData");
        if (userData) {
          userData = JSON.parse(userData);
          if (
            userData.phone === inputs.phone &&
            userData.email === inputs.email
          ) {
            Alert.alert("Error", "El usuario ya existe");
          } else {
            AsyncStorage.setItem("userData", JSON.stringify(inputs));
            Alert.alert("Success", "El usuario fue creado exitosamente");
          }
        } else {
          AsyncStorage.setItem("userData", JSON.stringify(inputs));
          Alert.alert("Success", "El usuario fue creado exitosamente");
        }
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "Algo salio mal");
    }
  };

  const login = () => {
    try {
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        let userData = await AsyncStorage.getItem("userData");
        if (userData) {
          userData = JSON.parse(userData);
          if (
            userData.phone === inputs.phone &&
            userData.email === inputs.email
          ) {
            navigation.navigate("Main");
            AsyncStorage.setItem(
              "userData",
              JSON.stringify({ ...userData, loggedIn: true })
            );
          } else {
            Alert.alert("Error", "Usuario o contraseña incorrectos");
          }
        } else {
          Alert.alert("Error", "El usuario no existe");
        }
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "Algo salio mal");
    }
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <Text style={styles.title}>Bitcoin APP</Text>
      <KeyboardAwareScrollView>
        <View style={styles.form}>
          <Text style={styles.h1}>Crea tu cuenta</Text>
          <Input
            keyboardType="phone-pad"
            label="Ingresa tu celular"
            placeholder="a 10 dígitos"
            iconName={faMobileButton}
            error={errors.phone}
            onEndEditing={() => {
              validate();
            }}
            onBlur={() => {
              handleError(null, "phone");
            }}
            onChangeText={(text) => {
              handleOnChange(text, "phone");
            }}
          />
          <Input
            label="Y tu correo"
            placeholder="tucorreo@mail.com"
            iconName={faEnvelope}
            error={errors.email}
            onEndEditing={() => {
              validate();
            }}
            onBlur={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => {
              handleOnChange(text, "email");
            }}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.h4}>
            Al continuar, aceptas los{" "}
            <Text style={[styles.h4, { color: "#198C9B" }]}>
              términos y condiciones y el aviso de privacidad
            </Text>
          </Text>
          <View style={styles.buttonContainer}>
            <ButtonLarge
              label="Crear cuenta"
              backgroundPrimary="#198C9B"
              backgroundSecondary="#CACACA"
              colorPrimary="#FFF"
              colorSecondary="#FFF"
              isDisabled={disabled ? true : false}
              onPress={() => register()}
            />
            <ButtonLarge
              label="Iniciar sesión"
              backgroundPrimary="#EEEEF2"
              backgroundSecondary="#EEEEF2"
              borderColor="#198C9B"
              colorPrimary="#5C7190"
              colorSecondary="#198C9B"
              isDisabled={disabled ? true : false}
              onPress={() => login()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#F6F7F8",
  },

  title: {
    marginTop: Constants.statusBarHeight,
    textAlign: "center",
    color: "#5C7190",
    fontSize: 24,
  },

  form: {
    margin: 50,
    flexDirection: "column",
    flex: 2,
    flexGrow: 1,
    alignItems: "center",
  },

  h1: {
    textAlign: "center",
    color: "#2C3747",
    fontSize: 24,
    fontWight: "700",
    lineHeight: 28,
    marginBottom: 25,
  },

  h4: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17,
    textAlign: "center",
    color: "#7B8186",
  },

  footer: {
    flexDirection: "column",
    flexGrow: 1,
    flex: 3,
    margin: 50,
    alignItems: "center",
  },

  buttonContainer: {
    margin: 20,
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
});

export default Login;
