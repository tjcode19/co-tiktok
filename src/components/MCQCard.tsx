// IconWithText.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native"; // You might need to install this package
import { useRevealAnswer } from "../hooks/useRevealAnswer";

interface MCQCardProps {
  answer: string;
  answerId: string;
  id: number;
}

const MCQCard: React.FC<MCQCardProps> = ({ answer, answerId, id }) => {
  const { revealAnswer, loading, errorMsg, answerData } = useRevealAnswer(id!);

  return (
    <Pressable onPress={revealAnswer}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              answerId === answerData?.id
                ? "green"
                : "rgba(255, 255, 255, 0.6)",
          },
        ]}
      >
        {loading && <ActivityIndicator size={"large"} color={"white"} />}
        {<Text style={styles.text}>{answer}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    fontSize: 20,
    elevation: 4,
  },
});

export default MCQCard;
