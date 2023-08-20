import { View, Text, StyleSheet, Pressable } from "react-native";
import IconWithText from "../../../components/IconWithText"; // Import the IconWithText component
import React, { useState } from "react";
import FlashCardRateBox from "../../../components/RateBox";
import { Feather } from "@expo/vector-icons";
import LowerContent from "../../../components/LowerContent";

const FollowingSection: React.FC<FlashcardProps> = ({ fData }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const flipFlashCard = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.textContainer1}>
          <View style={[styles.textContainer]}>
            <Pressable onPress={flipFlashCard}>
              <Text style={[styles.text, styles.largeText]}>
                {fData?.flashcard_front}
              </Text>
            </Pressable>
            {showAnswer && (
              <View
                style={{
                  paddingTop: 20,
                  borderTopColor: "#ffffff2c",
                  borderTopWidth: 1,
                  marginTop: 20,
                }}
              >
                <Text style={[styles.text, styles.answerTextTitle]}>
                  Answer
                </Text>
                <Text style={[styles.text, styles.answerText]}>
                  {fData?.flashcard_back}
                </Text>
                <View
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Text style={[styles.text]}>How well did you know this?</Text>
                  <FlashCardRateBox />
                </View>
              </View>
            )}
          </View>
          <LowerContent
            title={fData?.user?.name!}
            content={fData?.description!}
          />
        </View>

        <View style={styles.iconContainer}>
          <View
            style={[
              styles.circle,
              {
                marginBottom: 15,
                backgroundColor: "#5C4033",
                borderColor: "white",
                borderWidth: 1,
              },
            ]}
          >
            <Feather name={"book"} color={"orange"} size={20} />
          </View>
          <IconWithText iconName="heart" text="34" />
          <IconWithText iconName="message-circle" text="2" />
          <IconWithText iconName="bookmark" text="34" />
          <IconWithText iconName="share" text="34" />
          <Pressable onPress={flipFlashCard} style={{ alignItems: "center" }}>
            <View style={styles.circle}>
              <Feather name={"refresh-cw"} color={"#f1f1f1"} size={20} />
            </View>
            <Text style={styles.text}>Flip</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <View
          style={{
            backgroundColor: "#010101",
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Feather name={"airplay"} color={"white"} size={20} />
            <Text style={styles.text}>{fData?.playlist}</Text>
          </View>
          <Feather name={"arrow-right"} size={30} color={"white"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingBottom: 30,
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: 100,
  },
  textContainer1: {
    flex: 4,
  },
  text: {
    color: "white",
  },
  largeText: {
    fontSize: 25,
  },
  answerTextTitle: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  answerText: {
    fontSize: 23,
    fontWeight: "300",
    color: "#f2f2f2",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half of width or height
    backgroundColor: "#9ACD32",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FollowingSection;
