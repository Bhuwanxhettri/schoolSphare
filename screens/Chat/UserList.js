import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

const UserList = ({ navigation }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "555-555-5555",
      image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "444-444-4444",
      image: "https://www.bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      id: 3,
      name: "Bobbie Doeman",
      phone: "333-333-3333",
      image: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      id: 4,
      name: "Cabnth Johnson",
      phone: "333-333-3333",
      image: "https://www.bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      id: 5,
      name: "Krekvh Martin",
      phone: "333-333-3333",
      image: "https://www.bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      id: 6,
      name: "Jose Cassti",
      phone: "333-333-3333",
      image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
    },
    {
      id: 7,
      name: "John Mrtiuhg",
      phone: "333-333-3333",
      image: "https://www.bootdey.com/img/Content/avatar/avatar7.png",
    },
  ]);
  const stories = [
    {
      id: 1,
      name: "Jane",
      image: "https://www.bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      id: 2,
      name: "John",
      image: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      id: 3,
      name: "Katie",
      image: "https://www.bootdey.com/img/Content/avatar/avatar4.png",
    },
    {
      id: 4,
      name: "Michael",
      image: "https://www.bootdey.com/img/Content/avatar/avatar5.png",
    },
    {
      id: 5,
      name: "Sarah",
      image: "https://www.bootdey.com/img/Content/avatar/avatar6.png",
    },
    {
      id: 6,
      name: "Sarah",
      image: "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 7,
      name: "Sarah",
      image: "https://www.bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      id: 8,
      name: "Sarah",
      image: "https://www.bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      id: 9,
      name: "Sarah",
      image: "https://www.bootdey.com/img/Content/avatar/avatar4.png",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredContacts(filtered);
  };

  return (
    <View>
      <View>
        <Text style={styles.toBarText}>School Sphare</Text>
      </View>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <Octicons
            style={[styles.icon, styles.inputIcon]}
            name="search"
            size={24}
            color="black"
          />
          <TextInput
            style={styles.inputs}
            placeholder="Search..."
            underlineColorAndroid="transparent"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View style={styles.storyList}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {stories.map((story) => (
            <View style={styles.storyContainer} key={story.id}>
              <Image style={styles.storyImage} source={{ uri: story.image }} />
              <Text style={styles.storyName}>{story.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredContacts}
        renderItem={({ item }) => (
          <Text
            onPress={() => {
              navigation.replace("conversation");
            }}
          >
            <View style={styles.itemContainer}>
              <Image style={styles.image} source={{ uri: item.image }} />

              <Text style={{ fontSize: 30, color: "green" }}>.</Text>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text>
                  Hello how are y {""}
                  {""} {""} {""} {""} {""} {""} {""}
                  <Text style={{ fontSize: 9, marginLeft: 4, color: "black" }}>
                    2:40 PM
                  </Text>
                </Text>
              </View>
            </View>
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default UserList;
const styles = StyleSheet.create({
  formContent: {
    flexDirection: "row",
    marginTop: 40,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  storyList: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  storyContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  storyName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "#eee",
    padding: 8,
    marginTop: 60,
  },
  toBarText: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    color: colors.secondary,
    marginBottom: -40,
    marginTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  textContainer: {
    marginLeft: 16,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneText: {
    fontSize: 16,
    color: "#999",
  },
});
