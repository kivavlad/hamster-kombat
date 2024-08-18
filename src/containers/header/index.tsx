import {useEffect} from "react";
import {useStore} from "../../store";
import LayoutHeader from "../../components/layout-header";
import Level from "../../components/level";
import Profit from "../../components/profit";

const levelNames = [
  "Bronze",    // From 0 to 4999 coins
  "Silver",    // From 5000 coins to 24,999 coins
  "Gold",      // From 25,000 coins to 99,999 coins
  "Platinum",  // From 100,000 coins to 999,999 coins
  "Diamond",   // From 1,000,000 coins to 2,000,000 coins
  "Epic",      // From 2,000,000 coins to 10,000,000 coins
  "Legendary", // From 10,000,000 coins to 50,000,000 coins
  "Master",    // From 50,000,000 coins to 100,000,000 coins
  "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
  "Lord"       // From 1,000,000,000 coins to ∞
]

const levelMinPoints = [
  0,        // Bronze
  5000,     // Silver
  25000,    // Gold
  100000,   // Platinum
  1000000,  // Diamond
  2000000,  // Epic
  10000000, // Legendary
  50000000, // Master
  100000000,// GrandMaster
  1000000000// Lord
]

const Header: React.FC = () => {
  const store = useStore(state => state);

  const calculateProgress = () => {
    if (store.level >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[store.level];
    const nextLevelMin = levelMinPoints[store.level + 1];
    const progress = ((store.coins - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  }

  useEffect(() => {
    const currentLevelMin = levelMinPoints[store.level];
    const nextLevelMin = levelMinPoints[store.level + 1];
    if (store.coins >= nextLevelMin && store.level < levelNames.length - 1) {
      store.setLevel(store.level + 1);
    } else if (store.coins < currentLevelMin && store.level > 0) {
      store.setLevel(store.level - 1);
    }
  }, [store.coins, store.level])

  useEffect(() => {
    const pointsPerSecond = Math.floor(store.profitPerHour / 3600);
    const interval = setInterval(() => {
      store.setCoins(pointsPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [store.profitPerHour])

  return (
    <LayoutHeader>
      <Level
        levelName={levelNames[store.level]}
        currentLevel={store.level + 1}
        maxLevel={levelNames.length}
        progress={calculateProgress()}
      />
      <Profit profitPerHour={store.profitPerHour}/>
    </LayoutHeader>
  )
}

export default Header;