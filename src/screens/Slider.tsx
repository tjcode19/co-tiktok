// import React, { useState, useRef } from "react";
// import {
//   View,
//   Animated,
//   Dimensions,
//   Text,
//   ScrollView,
//   PanResponder,
// } from "react-native";
// import {
//   PanGestureHandler,
//   State,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";

// const ScreenSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const transition = new Animated.Value(0);

//   const windowHeight = Dimensions.get("window").height;

//   const handleSlideUp = () => {
//     if (currentIndex < 2) {
//       Animated.timing(transition, {
//         toValue: -currentIndex * windowHeight,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const handleSlideDown = () => {
//     if (currentIndex > 0) {
//       Animated.timing(transition, {
//         toValue: -(currentIndex - 1) * windowHeight,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gestureState) => {
//       if (gestureState.dy > 20) {
//         handleSlideDown();
//       } else if (gestureState.dy < -20) {
//         handleSlideUp();
//       }
//     },
//     onPanResponderRelease: () => {},
//   });

//   return (
// //     <GestureHandlerRootView style={{ flex: 1 }}>
// <View {...panResponder.panHandlers} style={{ flex: 1, overflow: "hidden" }}>
//   <Animated.View
//     style={{
//       flexDirection: "column",
//       transform: [{ translateY: transition }],
//     }}
//   >
//     {/* Screen One */}
//     <View
//       style={{
//         height: windowHeight,
//         padding: 50,
//         backgroundColor: "#ff2ff2",
//       }}
//     >
//       {/* Content for Screen One */}

//       <Text>Screen One</Text>
//     </View>

//     {/* Screen Two */}
//     <View style={{ height: windowHeight }}>
//       {/* Content for Screen Two */}
//       <Text>Screen Two</Text>
//     </View>

//     {/* Screen Three */}
//     <View style={{ height: windowHeight }}>
//       {/* Content for Screen Three */}
//       <Text>Screen Three</Text>
//     </View>
//   </Animated.View>
// </View>;
//     </GestureHandlerRootView>
//   );
// };

// export default ScreenSlider;

import React, { useState } from "react";
import {
  View,
  Animated,
  Dimensions,
  Text,
  StyleSheet,
  PanResponder,
} from "react-native";

import {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
} from "react-native-gesture-handler";

const ScreenSlider: React.FC = () => {
  const screenHeight = Dimensions.get("window").height;

  // const screens: [] = [
  //   {
  //     component: (
  //       <View
  //         style={{
  //           height: screenHeight,
  //           padding: 50,
  //           backgroundColor: "#ff2ff2",
  //         }}
  //       >
  //         {/* Content for Screen One */}

  //         <Text>Screen One</Text>
  //       </View>
  //     ),
  //     translateX: new Animated.Value(0),
  //   },
  //   {
  //     component: (
  //       <View style={{ height: screenHeight }}>
  //         {/* Content for Screen Two */}
  //         <Text>Screen Two</Text>
  //       </View>
  //     ),
  //     translateX: new Animated.Value(0),
  //   },
  //   {
  //     component: (
  //       <View style={{ height: screenHeight }}>
  //         {/* Content for Screen Two */}
  //         <Text>Screen Three</Text>
  //       </View>
  //     ),
  //     translateX: new Animated.Value(0),
  //   },
  // ];

  const [slideUp] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gestureStartOffset, setGestureStartOffset] = useState(0);

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: slideUp } }],
    { useNativeDriver: false }
  );

  const onPanGestureStateChange = (event: {
    nativeEvent: { state: number; translationY: number };
  }) => {
    const gestureY = event.nativeEvent.translationY;

    if (event.nativeEvent.state === State.BEGAN) {
      setGestureStartOffset(gestureY);
    } else if (event.nativeEvent.state === State.END) {
      const distance = gestureY - gestureStartOffset;

      if (distance < -20 && currentIndex < 2) {
        // Slide up more than 20% of screen height, animate to top
        const targetIndex = currentIndex + 1;
        const targetValue = -targetIndex * screenHeight;

        Animated.timing(slideUp, {
          toValue: targetValue,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setCurrentIndex(targetIndex);
      } else if (distance > 20 && currentIndex > 0) {
        // Slide down more than 20% of screen height, animate to previous screen
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
    <GestureHandlerRootView>
      <PanGestureHandler
        // onGestureEvent={onPanGestureEvent}
        onHandlerStateChange={onPanGestureStateChange}
      >
        <Animated.View style={[{ transform: [{ translateY: slideUp }] }]}>
          <View
            style={{
              height: screenHeight,
              padding: 50,
              backgroundColor: "#ff2ff2",
            }}
          >
            {/* Content for Screen One */}

            <Text>Screen One</Text>
          </View>
          <View
            style={{
              height: screenHeight,
              padding: 50,
              backgroundColor: "#ffffff",
            }}
          >
            {/* Content for Screen One */}

            <Text>Screen Two</Text>
          </View>
          <View
            style={{
              height: screenHeight,
              padding: 50,
              backgroundColor: "#ff2ff2",
            }}
          >
            {/* Content for Screen One */}

            <Text>Screen Three</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
});

export default ScreenSlider;
