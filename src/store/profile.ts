import {create} from "zustand";
import type {IStoreProfile} from "../types/i-store-profile";

export const useStoreProfile = create<IStoreProfile>((set) => ({
  coins: 22749365,
  profitPerHour: 126420,
  pointsToAdd: 5,
  level: 6,

  setCoins(newCoins) {
    set({
      coins: newCoins,
    })
  },

  setLevel(newLevel) {
    set({
      level: newLevel,
    })
  },

}))