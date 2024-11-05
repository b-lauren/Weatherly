const {
  fetchCurrentWeatherAPI,
} = require("../src/services/fetchCurrentWeather")

const axios = require("axios")

jest.mock("axios")

const mockWeatherData = {
  name: "Sheffield",
  main: {
    temp: 11,
    feels_like: 12,
    humidity: 65,
  },
  weather: [
    {
      main: "Clouds",
      icon: "04d",
    },
  ],
  wind: {
    speed: 3.2,
  },
  sys: {
    country: "GB",
  },
}

it("returns the current weather for a city", async () => {
  axios.get.mockResolvedValue({ data: mockWeatherData })

  const response = await fetchCurrentWeatherAPI({ city: "Sheffield" })

  expect(response.data).toEqual(mockWeatherData)
})
