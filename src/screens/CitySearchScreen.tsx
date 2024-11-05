import React, { useCallback, useState } from "react"
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native"
import Entypo from "@expo/vector-icons/Entypo"
import { debounce } from "lodash"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { MainStackParamList } from "../navigation/MainStack"
import { fetchLocationsAPI, CityData } from "../services/fetchLocations"
import StatusMessage from "../components/StatusMessage"

const CitySearchScreen = () => {
  const [text, setText] = useState("")
  const [cities, setCities] = useState<CityData[]>([])
  const [error, setError] = useState<string | null>(null)

  const navigation = useNavigation<NavigationProp<MainStackParamList>>()

  const fetchCityData = async (cityName: string) => {
    try {
      const response = await fetchLocationsAPI({ cityName })

      const removeDuplicateCities = response.data.reduce(
        (accumulator: CityData[], city: CityData) => {
          const isDuplicate = accumulator.some(
            (c) => c.name === city.name && c.country === city.country
          )
          if (!isDuplicate) {
            accumulator.push(city)
          }
          return accumulator
        },
        []
      )

      setCities(removeDuplicateCities)
    } catch (error) {
      setError("Oops - failed to fetch any city data. Please try again.")
    }
  }

  const debouncedFetchCityData = useCallback(debounce(fetchCityData, 400), [])

  const handleChangeText = (cityName: string) => {
    setText(cityName)
    if (cityName.trim()) {
      debouncedFetchCityData(cityName)
    } else {
      debouncedFetchCityData.cancel()
      setCities([])
    }
  }

  const clearInput = () => {
    setText("")
    setCities([])
    setError(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Entypo
          name="magnifying-glass"
          size={20}
          color="white"
          style={styles.iconLeft}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          value={text}
          placeholder="Search for a city"
          placeholderTextColor="#b0b0b0"
        />
        {text ? (
          <TouchableOpacity onPress={clearInput}>
            <Entypo
              name="circle-with-cross"
              size={20}
              color="white"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.resultsContainer}>
        {error ? (
          <StatusMessage subtitle={error} />
        ) : (
          cities.map((city) => (
            <TouchableOpacity
              key={`${city.name}-${city.lat}`}
              onPress={() =>
                navigation.navigate("Home", {
                  latitude: city.lat,
                  longitude: city.lon,
                })
              }
            >
              <View style={styles.cityBox}>
                <Text key={`${city.name}-${city.lat}`} style={styles.cityText}>
                  {city.name}, {city.country}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D5A6C",
    paddingTop: 30,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    borderRadius: 12,
    width: "84%",
    height: 40,
  },
  input: {
    flex: 1,
    color: "white",
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  cityText: {
    color: "white",
  },
  resultsContainer: {
    width: "84%",
    marginTop: 16,
  },
  cityBox: {
    backgroundColor: "#1E6D81",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 6,
    justifyContent: "center",
  },
})

export default CitySearchScreen
