import {memo, useEffect} from "react";
import {useStoreProfile} from "../../store/profile";
import {levelNames, levelMinPoints} from "../../utils/level";
import LayoutHeader from "../../components/layout-header";
import Level from "../../components/level";
import Profit from "../../components/profit";

const Header: React.FC = () => {
  const {level, coins, profitPerHour, setLevel} = useStoreProfile(state => state);

  const calculateProgress = () => {
    if (level >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[level];
    const nextLevelMin = levelMinPoints[level + 1];
    const progress = ((coins - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  }

  useEffect(() => {
    const currentLevelMin = levelMinPoints[level];
    const nextLevelMin = levelMinPoints[level + 1];
    if (coins >= nextLevelMin && level < levelNames.length - 1) {
      setLevel(level + 1);
    } else if (coins < currentLevelMin && level > 0) {
      setLevel(level - 1);
    }
  }, [coins, level])

  return (
    <LayoutHeader>
      <Level
        levelName={levelNames[level]}
        currentLevel={level + 1}
        maxLevel={levelNames.length}
        progress={calculateProgress()}
      />
      <Profit profitPerHour={profitPerHour}/>
    </LayoutHeader>
  )
}

export default memo(Header);