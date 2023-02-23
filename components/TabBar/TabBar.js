import React from "react";

const TabBar = () => {
  return (
    <>
      <View style={styles.TabBar}>
        <View>
          <Text> Home</Text>
        </View>
        <View>
          <Text> Chat</Text>
        </View>
        <View>
          <Text>Notification</Text>
        </View>
      </View>
    </>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  TabBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
