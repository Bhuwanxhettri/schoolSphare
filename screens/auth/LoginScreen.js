import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import instance from "../../api/index";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../image/companyLogo.png";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  //method to store the authUser to aync storage
  _storeData = async (token) => {
    try {
      alert(token);
      AsyncStorage.setItem("access_token", JSON.stringify(token));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: password,
    deviceId: expoPushToken,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //method to validate the user credentials and navigate to Home Screen / Dashboard
  const loginHandle = () => {
    setIsloading(true);
    //[check validation] -- Start
    // if email does not contain @ sign
    if (email == "") {
      setIsloading(false);
      return setError("Please enter your email");
    }
    if (password == "") {
      setIsloading(false);
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      setIsloading(false);
      return setError("Email is not valid");
    }
    // length of email must be greater than 5 characters
    if (email.length < 6) {
      setIsloading(false);
      return setError("Email is too short");
    }
    // length of password must be greater than 5 characters
    if (password.length < 6) {
      setIsloading(false);
      return setError("Password must be 6 characters long");
    }

    // instance
    //   .post("api/auth/login", raw)
    //   .then((response) => {
    //     console.log(response.data);
    //     setIsloading(false);
    //   })
    //   .catch((error) => {
    //     console.log(JSON.stringify(error));
    //     setIsloading(false);
    //   });
    const network = "https://sms-twox.onrender.com/api";
    // [check validation] -- End

    fetch(network + "/auth/login", requestOptions) // API call
      .then((response) => response.json())
      .then((result) => {
        if (
          result.status == 200 ||
          (result.status == 1 && result.success != false)
        ) {
          alert(JSON.stringify(result));
          _storeData(result.access_token);
          navigation.replace("dashboard"); // naviagte to Admin Dashboard
          // if (result?.data?.userType == "ADMIN") {
          //   //check the user type if the type is ADMIN then navigate to Dashboard else navigate to User Home
          //   _storeData(result.data);
          //   setIsloading(false);
          //   navigation.replace("dashboard", { authUser: result.data }); // naviagte to Admin Dashboard
          // } else {
          //   _storeData(result.data);
          //   setIsloading(false);
          //   navigation.replace("tab", { user: result.data }); // naviagte to User Dashboard
          // }
        } else {
          setIsloading(false);
          return setError(result.message);
        }
      })
      .catch((error) => {
        setIsloading(false);
        console.log("error", setError(error.message));
      });
  };

  return (
    <InternetConnectionAlert onChange={(connectionState) => {}}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <ProgressDialog visible={isloading} label={"Login ..."} />
          <StatusBar></StatusBar>
          <View style={styles.welconeContainer}>
            <View>
              <Text style={styles.welcomeText}>School Sphare</Text>
            </View>
          </View>
          <View style={styles.screenNameContainer}>
            <Text style={styles.screenNameText}>Login</Text>
          </View>
          <View style={styles.formContainer}>
            <CustomAlert message={error} type={"error"} />
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Username"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <CustomInput
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              placeholder={"Password"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <Text
              onPress={() => navigation.navigate("forgetpassword")}
              style={styles.ForgetText}
            >
              Forget Password?
            </Text>
            <View style={styles.forgetPasswordContainer}></View>
          </View>
          <View style={styles.buttomContainer}>
            <CustomButton text={"Login"} onPress={loginHandle} />
          </View>
          <View style={styles.bottomContainer}>
            <Text>Don't have an account?</Text>
            <Text
              onPress={() => navigation.navigate("signup")}
              style={styles.signupText}
            >
              signup
            </Text>
          </View>
        </ScrollView>
        <Text
          onPress={() => navigation.navigate("dashboard")}
          style={styles.signupText}
        >
          Dashboard
        </Text>
      </KeyboardAvoidingView>
    </InternetConnectionAlert>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.info,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 15,
    marginBottom: 50,
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.secondary,
  },
  welcomeParagraph: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary_shadow,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginLeft: 2,
    color: colors.secondary,
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
});
