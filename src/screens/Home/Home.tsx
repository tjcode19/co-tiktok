import {
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";

import { useState } from "react";

import TopRow from "./component/TopRow";
import ForYouSection from "./component/ForYou";
import FollowingSection from "./component/Following";
import { useGetFollowing } from "../../hooks/useGetFollowing";
import ErrorItem from "../../components/ErrorItem";
import React from "react";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";

const screenHeight = Dimensions.get("window").height;

export default function HomeScreen(timeSpent: { timeSpent: string }) {
  const page = () => {
    const kV = Math.random();
    return (
      <ImageBackground
        key={kV}
        style={styles.background}
        source={require("../../../assets/images/bg.jpg")}
      >
        <ForYouSection />
      </ImageBackground>
    );
  };

  const { data: loading, errorMsg, followingData } = useGetFollowing();

  const [forYou, setForYou] = useState(true);
  const [dataBox, setDataBox] = useState([page(), page()]); //Initialise with 2 pages

  const toggleForYou = () => {
    setForYou(!forYou);
  };

  const [slideUp] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gestureStartOffset, setGestureStartOffset] = useState(0);

  const onPanGestureStateChange = (event: {
    nativeEvent: { state: number; translationY: number };
  }) => {
    const gestureY = event.nativeEvent.translationY;

    if (event.nativeEvent.state === State.BEGAN) {
      setGestureStartOffset(gestureY);
    } else if (event.nativeEvent.state === State.END) {
      const distance = gestureY - gestureStartOffset;

      if (distance < -20 && currentIndex < dataBox.length) {
        // Slide up more than 20% of screen height, animate to top
        const targetIndex = currentIndex + 1;
        const targetValue = -targetIndex * screenHeight;

        Animated.timing(slideUp, {
          toValue: targetValue,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setCurrentIndex(targetIndex);

        if (dataBox.length - currentIndex < 2) {
          setDataBox((d) => {
            d.push(page()); // Add the new value to the array
            return [...d]; //I returned the value here
          });
        }
      } else if (distance > 20 && currentIndex > 0) {
        const targetIndex = currentIndex - 1;
        const targetValue = -targetIndex * screenHeight;

        Animated.timing(slideUp, {
          toValue: targetValue,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setCurrentIndex(targetIndex);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topBar]}>
        <TopRow
          time={timeSpent.timeSpent}
          toggle={toggleForYou}
          foryou={forYou}
        />
      </View>

      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", backgroundColor: "red" }}
        >
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      )}
      {!loading && errorMsg && <ErrorItem />}
      {forYou && (
        <View style={styles.forYouHolder}>
          <GestureHandlerRootView>
            <PanGestureHandler
              // onGestureEvent={onPanGestureEvent}
              onHandlerStateChange={onPanGestureStateChange}
            >
              <Animated.View
                style={[{ flex: 1, transform: [{ translateY: slideUp }] }]}
              >
                {dataBox}
              </Animated.View>
            </PanGestureHandler>
          </GestureHandlerRootView>
        </View>
      )}

      {!forYou && !loading && followingData && (
        <View style={{ backgroundColor: "#003366", flex: 1 }}>
          <FollowingSection fData={followingData} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
  },

  forYouHolder: {
    position: "absolute",
    backgroundColor: "blue",
    zIndex: 0,
    height: screenHeight,
    width: "100%",
  },

  background: {
    paddingBottom: 20,
    height: screenHeight,
  },

  topBar: {
    position: "absolute",
    width: "100%",
    top: 50,
    left: 0,
    zIndex: 4,
  },
});
