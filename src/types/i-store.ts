export interface IStore {
  coins: number;
  profitPerHour: number;
  level: number;
  setCoins: (coin: number) => void;
  setLevel: (level: number) => void;
}