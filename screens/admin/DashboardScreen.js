import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import CustomCard from "../../components/CustomCard/CustomCard";
import OptionList from "../../components/OptionList/OptionList";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressDialog from "react-native-progress-dialog";
import { Avatar } from "@rneui/themed";
import { PricingCard, lightColors } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const DashboardScreen = ({ navigation, route }) => {
  // const { authUser } = route.params;
  // const [user, setUser] = useState(authUser);
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  // const [data, setData] = useState([]);
  // const [refeshing, setRefreshing] = useState(false);

  //method to remove the auth user from async storage and navigate the login if token expires
  // const logout = async () => {
  //   await AsyncStorage.removeItem("authUser");
  //   navigation.replace("login");
  // };

  // var myHeaders = new Headers();
  // myHeaders.append("x-auth-token", authUser.token);

  // var requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };

  //method the fetch the statistics from server using API call
  // const fetchStats = () => {
  //   fetch(`${network.serverip}/dashboard`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.success == true) {
  //         //set the fetched data to Data state
  //         setData([
  //           {
  //             id: 1,
  //             title: "Users",
  //             value: result.data?.usersCount,
  //             iconName: "person",
  //             type: "parimary",
  //             screenName: "viewusers",
  //           },
  //           {
  //             id: 2,
  //             title: "Orders",
  //             value: result.data?.ordersCount,
  //             iconName: "cart",
  //             type: "secondary",
  //             screenName: "vieworder",
  //           },
  //           {
  //             id: 3,
  //             title: "Products",
  //             value: result.data?.productsCount,
  //             iconName: "md-square",
  //             type: "warning",
  //             screenName: "viewproduct",
  //           },
  //           {
  //             id: 4,
  //             title: "Categories",
  //             value: result.data?.categoriesCount,
  //             iconName: "menu",
  //             type: "muted",
  //             screenName: "viewcategories",
  //           },
  //         ]);
  //         setError("");
  //         setIsloading(false);
  //       } else {
  //         console.log(result.err);
  //         if (result.err == "jwt expired") {
  //           logout();
  //         }
  //         setError(result.message);
  //         setIsloading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       console.log("error", error);
  //       setIsloading(false);
  //     });
  // };

  //method call on Pull refresh
  // const handleOnRefresh = () => {
  //   setRefreshing(true);
  //   fetchStats();
  //   setRefreshing(false);
  // };

  //call the fetch function initial render
  // useEffect(() => {
  //   fetchStats();
  // }, []);

  return (
    <InternetConnectionAlert onChange={(connectionState) => {}}>
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <ProgressDialog visible={isloading} label={label} />
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("authUser");
              navigation.replace("login");
            }}
          >
            <AntDesign name="logout" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.toBarText}>School Sphare</Text>
          </View>
          <TouchableOpacity>
            <Avatar
              size={32}
              rounded
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <MaterialCommunityIcons name="menu-right" size={30} color="black" />
          <Text style={styles.headingText}>Welcome,Bhuwan</Text>
        </View>

        <View style={{ flex: 1, width: "100%" }}>
          <ScrollView style={styles.actionContainer}>
            <PricingCard
              color={lightColors.primary}
              title="Attendance"
              price="24 Days"
              info={["June", "2023"]}
              button={{ title: "See Full Attendance" }}
            />
            <OptionList
              text={"Assignment"}
              Icon={Ionicons}
              iconName={"md-square"}
              // onPress={() =>
              //   navigation.navigate("viewproduct", { authUser: user })
              // }
              // onPressSecondary={() =>
              //   navigation.navigate("addproduct", { authUser: user })
              // }
              // type="morden"
            />
            {/* <BarChart
              // style={graphStyle}
              data={barData}
              // width={screenWidth}
              height={220}
              yAxisLabel={"$"}
              // chartConfig={chartConfig}
            /> */}

            <OptionList
              text={"Classes"}
              Icon={Ionicons}
              iconName={"menu"}
              // onPress={() =>
              //   navigation.navigate("viewcategories", { authUser: user })
              // }
              // onPressSecondary={() =>
              //   navigation.navigate("addcategories", { authUser: user })
              // }
              // type="morden"
            />
            <OptionList
              text={"Subjects"}
              Icon={Ionicons}
              iconName={"person"}
              // onPress={() =>
              //   navigation.navigate("viewusers", { authUser: user })
              // }
              // type="morden"
            />
          </ScrollView>
          <View style={styles.TabBar}>
            <View>
              <Entypo name="home" size={24} color="black" />
              <Text style={styles.tabBarText}>Home</Text>
            </View>
            <View>
              <MaterialCommunityIcons
                name="face-woman-outline"
                size={24}
                color="black"
                onPress={() => {
                  navigation.replace("profile");
                }}
              />
              <Text style={styles.tabBarText}>Profile</Text>
            </View>
            <View>
              <Ionicons
                onPress={() => {
                  navigation.replace("userList");
                }}
                name="md-chatbubble-outline"
                size={24}
                color="black"
              />
              <Text style={styles.tabBarText}>Chat</Text>
            </View>
            <View>
              <Ionicons
                style={{ paddingLeft: 15 }}
                onPress={() => {
                  navigation.replace("notify");
                }}
                name="notifications-outline"
                size={24}
                color="black"
              />
              <Text style={styles.tabBarText}>Notification</Text>
            </View>
          </View>
        </View>
      </View>
    </InternetConnectionAlert>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },

  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
  TabBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
  tabBarText: {
    fontSize: 10,
    color: colors.muted,
  },
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.tertiary,
    padding: 18,
  },
  toBarText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.secondary,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: 20,
    color: colors.muted,
    fontWeight: "800",
  },
  actionContainer: { padding: 20, width: "100%", flex: 1 },
});
