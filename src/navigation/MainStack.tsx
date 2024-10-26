import React from "react"
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import HomeScreen from "../screens/HomeScreen"
import { ForecastScreen } from "../screens/ForecastScreen"
import { CitySearch } from "../screens/CitySearch"
import { SavedLocations } from "../screens/SavedLocations"

export type MainStackParamList = {
  Home: undefined
  WeeklyForecast: undefined
  CitySearch: undefined
  SavedLocations: undefined
  //   Forecast: { latitude: number; longitude: number }; // Example params for Forecast
}

// Create the stack navigator with typed params
const Stack = createStackNavigator<MainStackParamList>()

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
            name="Forecast"
            component={ForecastScreen}
            initialParams={{ latitude: 0, longitude: 0 }} // Example initial params if needed
          /> */}
        <Stack.Screen
          name="WeeklyForecast"
          component={ForecastScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CitySearch"
          component={CitySearch}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="SavedLocations"
          component={SavedLocations}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
