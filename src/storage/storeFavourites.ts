import { observable } from "@legendapp/state";

  interface Store {
    cities: string[];
    addCity: (city: string) => void;
    // removeCity: (city: string) => void;
  }

  export const store$ = observable<Store>({
    cities: [],

    //check if already exists, if it doesn't push
   
    addCity: (city: string) => {
        store$.cities.set(store$.cities.concat([city]));
      },
  });
