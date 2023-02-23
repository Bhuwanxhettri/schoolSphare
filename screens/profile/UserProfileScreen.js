import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { Ionicons } from "@expo/vector-icons";
import OptionList from "../../components/OptionList/OptionList";
import { colors } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "@rneui/themed";
const UserProfileScreen = ({ navigation, route }) => {
  const handleEditPress = () => {};
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.coverPhoto}
          source={{
            uri: "https://wallpaperaccess.com/full/124378.jpg",
          }}
        />
        <View style={styles.profileContainer}>
          <Avatar
            style={styles.profilePhoto}
            size={140}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
          <Text style={styles.nameText}>Bhuwan</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email : jane.doe@example.com</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Phone No: 93238231</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Department: BCA</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Address : Nepalgunj</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Semister : 8</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfileScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  infoContainer: {
    marginTop: 20,
    paddingLeft: 25,
  },
  headerContainer: {
    alignItems: "center",
  },
  coverPhoto: {
    width: "100%",
    height: 200,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -50,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  statContainer: {
    alignItems: "center",
    flex: 1,
  },
  statCount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
  },
  button: {
    backgroundColor: "#0066cc",
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
};
