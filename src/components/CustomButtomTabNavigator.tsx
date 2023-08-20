import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons"; // Make sure you have this import
import HomeScreen from "../screens/Home/Home"; // Import your screen components
import ActivityScreen from "../screens/Activity";
import DiscoverScreen from "../screens/Discover";
import BookmarkScreen from "../screens/Bookmarks";
import ProfileScreen from "../screens/Profile";

const Tab = createBottomTabNavigator();

interface CustomTab {
  timeSpent: string;
}


const CustomBottomTabNavigator: React.FC<CustomTab> = ({timeSpent}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f1f1f1",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: "#010101",
        },
        headerStyle: {
          backgroundColor: "#010101",
        },
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: "bold",
          color: "#f1f1f1",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={25}
              color={focused ? "#f1f1f1" : "grey"}
            />
          ),
          headerShown: false,
        }}
      > 
      {() => <HomeScreen timeSpent={timeSpent} />}
      </Tab.Screen> 
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="compass"
              size={25}
              color={focused ? "#f1f1f1" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="clock"
              size={25}
              color={focused ? "#f1f1f1" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="bookmark"
              size={25}
              color={focused ? "#f1f1f1" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={25}
              color={focused ? "#f1f1f1" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// options={{
//     tabBarIcon: ({ focused }) => (
//       <Feather
//         name="home"
//         size={25}
//         color={focused ? "#f1f1f1" : "grey"}
//       />
//     ),

export default CustomBottomTabNavigator;
