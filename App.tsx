import { StatusBar } from "expo-status-bar";
import { AppState, AppStateStatus } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CustomBottomTabNavigator from "./src/components/CustomButtomTabNavigator";
import { useState, useEffect, useRef } from "react";
import React from "react";

import { AppRegistry } from "react-native";
// import App from "./App"; // Replace with your main component

AppRegistry.registerComponent("MyApp", () => App);

export default function App() {
  const appState = useRef(AppState.currentState);
  const startTime = useRef(new Date().getTime());
  const [timeSpent, setTimeSpent] = useState(0);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // App comes to the foreground
      startTime.current = new Date().getTime();
    } else if (appState.current === "active" && nextAppState === "inactive") {
      // App goes to the background
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime.current;
      setTimeSpent((prevTimeSpent) => prevTimeSpent + elapsedTime);
      console.log("Time spent in milliseconds:", timeSpent);
    }
    appState.current = nextAppState;
  };

  const convertMillisecondsToTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    if (seconds < 59 && minutes < 1) {
      return `${seconds}s`;
    } else if (minutes > 0 && hours < 1) {
      return `${minutes}m`;
    } else {
      return `${hours}h`;
    }
  };

  useEffect(() => {
    const sub = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      sub.remove();
    };
  }, []);

  useEffect(() => {
    const minuteInterval = setInterval(() => {
      setTimeSpent((prevTimeSpent) => prevTimeSpent + 60000); // 60000 milliseconds = 1 minute
    }, 60000);

    return () => {
      clearInterval(minuteInterval);
    };
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <CustomBottomTabNavigator
          timeSpent={convertMillisecondsToTime(timeSpent)}
        />
      </NavigationContainer>
    </>
  );
}
