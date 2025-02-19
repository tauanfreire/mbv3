import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {useFonts} from "expo-font";

import { LocationUserContext } from "./src/Context/LocationUserContext";

import StackComponent from "./src/routes/stack";

import * as Location from "expo-location";

// Criando o Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permissão de localização não concedida");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location)
    }

    getCurrentLocation();
  }, []);

  return (
    <LocationUserContext.Provider value={{location, setLocation}}>
      <StackComponent />
    </LocationUserContext.Provider>
  );
}
