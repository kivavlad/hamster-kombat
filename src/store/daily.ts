import {create} from "zustand";
import type {IStoreDaily} from "../types/i-store-daily";

export const useStoreDaily = create<IStoreDaily>((set) => ({
  rewardTime: '',
  cipherTime: '',
  comboTime: '',

  setRewardTime: (time) => {
    set({
      rewardTime: time,
    })
  },
  setCipherTime: (time) => {
    set({
      cipherTime: time,
    })
  },
  setComboTime: (time) => {
    set({
      comboTime: time,
    })
  },

}))