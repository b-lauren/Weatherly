import React from "react"
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { Platform } from "react-native"
import HomeScreen from "../screens/HomeScreen"
import { ForecastScreen } from "../screens/ForecastScreen"
import { CitySearch } from "../screens/CitySearch"
import { SavedLocations } from "../screens/SavedLocations"
import NavBar from "../components/NavBar"

export type MainStackParamList = {
  Home: { latitude: number; longitude: number } | undefined
  WeeklyForecast: { latitude: number; longitude: number; cityName: string }
  CitySearch: undefined
  SavedLocations: undefined
}

const Stack = createStackNavigator<MainStackParamList>()

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          header: () => <NavBar currentRoute={route.name} />,
        })}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="WeeklyForecast"
          component={ForecastScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CitySearch"
          component={CitySearch}
          options={{
            headerShown: true,
            cardStyleInterpolator: Platform.select({
              ios: CardStyleInterpolators.forVerticalIOS,
              android: CardStyleInterpolators.forFadeFromBottomAndroid,
            }),
          }}
        />
        <Stack.Screen
          name="SavedLocations"
          component={SavedLocations}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator
