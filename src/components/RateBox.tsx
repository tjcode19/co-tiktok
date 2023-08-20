import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface FlashCardRateBoxProps {
  // Add any props you might have
}

const FlashCardRateBox: React.FC<FlashCardRateBoxProps> = () => {
  const numBoxes = 5;
  const colors = ["#FFA500", "#FFC000", "#FFD800", "#FFE900", "#9ACD32"];

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 1; i <= numBoxes; i++) {
      boxes.push(
        <View key={i} style={[styles.box, { backgroundColor: colors[i-1] }]}>
          <Text>{i}</Text>
        </View>
      );
    }
    return boxes;
  };

  return <View style={styles.container}>{renderBoxes()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom:10,
    justifyContent:'space-between'
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
  },
});

export default FlashCardRateBox;
