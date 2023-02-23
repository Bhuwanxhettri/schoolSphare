import React, { useState } from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";

const Notify = ({ navigation }) => {
  const data = [
    {
      id: 1,
      image: "https://bootdey.com/img/Content/avatar/avatar1.png",
      name: "Frank Odalthh",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 2,
      image: "https://bootdey.com/img/Content/avatar/avatar6.png",
      name: "John DoeLink",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 3,
      image: "https://bootdey.com/img/Content/avatar/avatar7.png",
      name: "March SoulLaComa",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 4,
      image: "https://bootdey.com/img/Content/avatar/avatar2.png",
      name: "Finn DoRemiFaso",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 5,
      image: "https://bootdey.com/img/Content/avatar/avatar3.png",
      name: "Maria More More",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 6,
      image: "https://bootdey.com/img/Content/avatar/avatar4.png",
      name: "Clark June Boom!",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
    {
      id: 7,
      image: "https://bootdey.com/img/Content/avatar/avatar5.png",
      name: "The googler",
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    },
  ];

  const [comments, setComments] = useState(data);

  return (
    <>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("dashboard");
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles.toBarText}>School Sphare</Text>
        </View>
        <TouchableOpacity>
          <Avatar
            size={35}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.root}
        data={comments}
        // extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={styles.image}
                  source={{ uri: Notification.image }}
                />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{Notification.name}</Text>
                  <Text style={styles.time}>9:58 am</Text>
                </View>
                <Text rkType="primary3 mediumLine">{Notification.comment}</Text>
              </View>
            </View>
          );
        }}
      />
    </>
  );
};

export default Notify;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.tertiary,
    padding: 12,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  toBarText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.secondary,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
