import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

interface TopRowProps {
  time: string;
  toggle: any;
  foryou: boolean;
}

const TopRow: React.FC<TopRowProps> = ({ time, toggle, foryou }) => {
  return (
    <View style={styles.topRow}>
      <View style={styles.iconWithText}>
        <Feather name="clock" style={styles.icon} color="white" />
        <Text style={styles.textInactive}>{time}</Text>
      </View>

      <View style={styles.followContainer}>
        <Pressable onPress={toggle}>
          <View style={styles.followStyle}>
            <Text style={!foryou? styles.textActive: styles.textInactive}>Following</Text>
            {!foryou ? <View style={styles.customBorder} /> : <></>}
          </View>
        </Pressable>
        <Pressable onPress={toggle}>
          <View style={styles.followStyle}>
            <Text style={foryou? styles.textActive: styles.textInactive}>For You</Text>
            {foryou ? <View style={styles.customBorder} /> : <></>}
          </View>
        </Pressable>
      </View>

      <Feather name="search" color="white" size={21} />
    </View>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    // flex: 1,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  textActive: {
    color: "white",
  },
  textInactive: {
    color: 'rgba(255, 255, 255, 0.7)',

  },
  followContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  followStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  customBorder: {
    flex: 1,
    borderBottomWidth: 4,
    borderColor: "white", // Change this to your desired color
    width: "60%",
    marginTop: 5,
  },
});

export default TopRow;
