export interface IStoreProfile {
  coins: number;
  profitPerHour: number;
  pointsToAdd: number;
  level: number;
  setCoins: (coin: number) => void;
  setLevel: (level: number) => void;
}