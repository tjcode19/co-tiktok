import { View, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";

const ErrorItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessage}>Something went wrong at the moment</Text>
      <Feather name="frown" size={100} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "red",
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
});

export default ErrorItem;
