import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import IconWithText from "../../../components/IconWithText"; //
import MCQCard from "../../../components/MCQCard";
import LowerContent from "../../../components/LowerContent";
import { Feather } from "@expo/vector-icons";
import { useGetFollowing } from "../../../hooks/useGetFollowing";

interface DataItem {
  answer: string;
  id: string;
}

const ForYouSection: React.FC = () => {
  const { data: loading, forYouData } = useGetFollowing();

  const renderItem = ({ item }: { item: DataItem }) => {
    return (
      <MCQCard answer={item.answer} answerId={item.id} id={forYouData?.id!} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      )}
      <View style={styles.mcqcontainer}>
        <View style={styles.textContainer}>
          <View style={styles.textBox}>
            <View style={styles.textBackground}>
              <Text style={[styles.text, styles.largeText]}>
                {forYouData?.question}
              </Text>
            </View>
          </View>
          <View>
            <FlatList
              data={forYouData?.options}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.id}
            />
            <LowerContent
              title={forYouData?.user?.name!}
              content={forYouData?.description!}
            />
          </View>
        </View>

        <View style={styles.iconContainer}>
          <IconWithText iconName="heart" text="34" />
          <IconWithText iconName="message-circle" text="2" />
          <IconWithText iconName="bookmark" text="34" />
          <IconWithText iconName="share" text="34" />
        </View>
      </View>

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
          <Text style={styles.text}>{forYouData?.playlist}</Text>
        </View>
        <Feather name={"arrow-right"} size={30} color={"white"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mcqcontainer: {
    paddingLeft: 20,
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    marginTop: 100,
    flex: 4,
    justifyContent: "space-between",
  },
  textBox: {
    alignItems: "flex-start",
  },
  textBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 6,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
  },
  largeText: {
    fontSize: 25,
  },

  textTitle: {
    color: "#f1f1f1",
    fontWeight: "bold",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default ForYouSection;
