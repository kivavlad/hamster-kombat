import {memo, useState, useEffect, useCallback} from "react";
import {useStoreProfile} from "../../store/profile";
import {useStoreDaily} from "../../store/daily";
import {calculateTime, genUUID} from "../../utils/helper";
import {IClick} from "../../types/i-clicks";
import LayoutMain from "../../components/layout-main";
import Daily from "../../components/daily";
import Score from "../../components/score";
import Clicker from "../../components/clicker";
import Clicks from "../../components/clicks";

const Main: React.FC = () => {
  const {coins, pointsToAdd, setCoins} = useStoreProfile(state => state);
  const {rewardTime, cipherTime, comboTime, setCipherTime, setComboTime, setRewardTime} = useStoreDaily(state => state);
  const [clicks, setClicks] = useState<IClick[]>([]);

  useEffect(() => {
    const updateCountdowns = () => {
      setRewardTime(calculateTime(0));
      setCipherTime(calculateTime(19));
      setComboTime(calculateTime(12));
    }

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);

    return () => clearInterval(interval);
  }, [])

  const handleClickPosition = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>, touchId: string, touchIndex: number) => {
    const isTouchEvent = 'touches' in e;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const clientX = isTouchEvent ? e.touches[touchIndex].clientX : e.clientX;
    const clientY = isTouchEvent ? e.touches[touchIndex].clientY : e.clientY;
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;

    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setClicks((prev) => [...prev, {id: touchId, x: clientX, y: clientY}]);
    setTimeout(() => (card.style.transform = ''), 80);
    setTimeout(() => setClicks((prev) => prev.filter((item) => item.id !== touchId)), 1000);
  }

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLButtonElement>) => {
    if ((window.innerWidth <= 768)) {
      const touches = e.touches.length;
      Array.from({length: touches}).forEach((_, index) => {
        const touchId = genUUID();
        handleClickPosition(e, touchId, index);
        setCoins(coins + pointsToAdd);
      })
    }
  }, [coins, pointsToAdd])

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if ((window.innerWidth > 768)) {
      const clickId = genUUID();
      const touchIndex = 0;
      handleClickPosition(e, clickId, touchIndex);
      setCoins(coins + pointsToAdd);
    }
  }, [coins, pointsToAdd])

  return (
    <>
      <LayoutMain>
        <Daily cipher={cipherTime} combo={comboTime} reward={rewardTime}/>
        <Score points={coins}/>
        <Clicker onClick={handleClick} onTouchStart={handleTouchStart}/>
      </LayoutMain>
      <Clicks clicks={clicks} pointsToAdd={pointsToAdd}/>
    </>
  )
}

export default memo(Main);