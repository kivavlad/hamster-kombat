import {create} from "zustand";
import type {IStore} from "../types/i-store";

export const useStore = create<IStore>((set, get) => ({
  coins: 22749365,
  profitPerHour: 126420,
  level: 6,

  setCoins(coin) {
    const {coins} = get();    
    set({coins: coins + coin})
  },

  setLevel(newLevel) {
    set({level: newLevel});
  },

}))