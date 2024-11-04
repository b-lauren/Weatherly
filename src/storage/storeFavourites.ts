import { observable } from "@legendapp/state"

interface Store {
  cities: string[]
  addCity: (city: string) => void
  removeCity: (city: string) => void
}

export const store$ = observable<Store>({
  cities: [],

  addCity: (city: string) => {
    store$.cities.set(store$.cities.concat([city]))
  },

  removeCity: (city: string) => {
    store$.cities.set(store$.cities.get().filter((c) => c !== city))
  },
})
