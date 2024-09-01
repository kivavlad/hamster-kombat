import {memo, useEffect} from "react";
import {useStore} from "../../store";
import {levelNames, levelMinPoints} from "../../utils/level";
import LayoutHeader from "../../components/layout-header";
import Level from "../../components/level";
import Profit from "../../components/profit";

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

export default memo(Header);