import {create} from "zustand";
import type {IStore} from "../types/i-store";

export const useStore = create<IStore>((set) => ({
  coins: 22749365,
  profitPerHour: 126420,
  pointsToAdd: 5,
  level: 6,

  setCoins(newCoins) {
    set({coins: newCoins});
  },

  setLevel(newLevel) {
    set({level: newLevel});
  },

}))