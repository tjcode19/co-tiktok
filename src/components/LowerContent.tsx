import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LowerContentProps {
  title: string;
  content: string;
}

const LowerContent: React.FC<LowerContentProps> = ({ title, content }) => {
  return (
    <View>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: "#f1f1f1",
    fontWeight: "bold",
  },
  text: {
    color: "#f1f1f1",
  },
});

export default LowerContent;
