import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const GetAccessToken = async () => {
  return await AsyncStorage.getItem("access_token");
};
const instance = axios.create({
  baseURL: "https://sms-twox.onrender.com/api",
});

export default instance;
