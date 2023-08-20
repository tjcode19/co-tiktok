// IconWithText.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // You might need to install this package

interface IconWithTextProps {
  iconName: any;
  text: string;
  size?: number
}

const IconWithText: React.FC<IconWithTextProps> = ({ iconName, text, size=30 }) => {
  return (
    <View style={styles.container}>
      <Feather name={iconName} color={"#f1f1f1"} size={size} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    color: "white",
  },
});

export default IconWithText;
