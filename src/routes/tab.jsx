import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// import { FontAwesome5 } from "react-native-vector-icons"; // Importando o FontAwesome5
import Icon from "react-native-vector-icons/FontAwesome5";
import Main from "../screens/tabs/Main";
import Rotas from "../screens/tabs/Rotas";
import Profile from "../screens/tabs/Profile";
import Corrida from "../screens/tabs/Settings";

const Tab = createBottomTabNavigator();

function Settings() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

export default function TabComponent() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Routes") {
            iconName = "route";
          } else if (route.name === "Profile") {
            iconName = "user-alt";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Main}
        options={{ title: "Bem-vindo" }}
      />
      <Tab.Screen
        name="Routes"
        component={Rotas}
        options={{ title: "Rotas" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Perfil" }}
      />
      <Tab.Screen
        name="Settings"
        component={Corrida}
        options={{ title: "Configurações" }}
      />
    </Tab.Navigator>
  );
}
