import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import network from "../../constants/index"

const Otp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  
  const [isloading, setIsloading] = useState(false);
  const sendInstructionsHandle = () => {
    if (email == "") {
      setIsloading(false);
      return setError("Please enter your email");
    }
    if (!email.includes("@")) {
      setIsloading(false);
      return setError("Email is not valid");
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      email: email,
    });
   
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

     const network = "http://192.168.1.93:5000/api";
    fetch(network + "/auth/forget-password", requestOptions) // API call
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      setError(result?.message)
      // if (
      //   result.status == 200 ||
      //   (result.status == 1 && result.success != false)
      // ) {
      //   _storeData(result.data);
      //   navigation.replace("dashboard", { authUser: result.data }); // naviagte to Admin Dashboard
      //   // if (result?.data?.userType == "ADMIN") {
      //   //   //check the user type if the type is ADMIN then navigate to Dashboard else navigate to User Home
      //   //   _storeData(result.data);
      //   //   setIsloading(false);
      //   //   navigation.replace("dashboard", { authUser: result.data }); // naviagte to Admin Dashboard
      //   // } else {
      //   //   _storeData(result.data);
      //   //   setIsloading(false);
      //   //   navigation.replace("tab", { user: result.data }); // naviagte to User Dashboard
      //   // }
      // } else {
      //   setIsloading(false);
      //   return setError(result.message);
      // }
    })
    .catch((error) => {
      setIsloading(false);
      console.log("error", setError(error.message));
    });
    alert(JSON.stringify(email))
    //TODO: handle user verfication and mail password reset link
  };
  return (
    <View style={styles.container}>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
      <ProgressDialog visible={isloading} label={"Login ..."} />
        <View>
          <Text style={styles.screenNameText}>Reset Password</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            Enter the email associated with your account and we'll send an email
            with instruction to reset the password.
          </Text>
          <CustomAlert message={error} type={"error"} />
        </View>
      </View>
      <View style={styles.formContainer}>
      <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Email"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
      </View>
      <View style={styles.formContainer}>
      <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Email"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
      </View>
      <CustomButton
        text={"Send Otp"}
        onPress={sendInstructionsHandle}
        // radius={5}
      />
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  formContainer: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
  },
});
