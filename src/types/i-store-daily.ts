export interface IStoreDaily {
  rewardTime: string;
  cipherTime: string;
  comboTime: string;
  setRewardTime: (time: string) => void;
  setCipherTime: (time: string) => void;
  setComboTime: (time: string) => void;
}