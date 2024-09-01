import {memo, useState, useEffect, useCallback} from "react";
import {useStore} from "../../store";
import {calculateTime} from "../../utils/helper";
import {IClick} from "../../types/i-clicks";
import LayoutMain from "../../components/layout-main";
import Daily from "../../components/daily";
import Score from "../../components/score";
import Clicker from "../../components/clicker";
import Clicks from "../../components/clicks";

const Main: React.FC = () => {
  const store = useStore(state => state);
  const pointsToAdd = 5;

  const [rewardTime, setRewardTime] = useState<string>('');
  const [cipherTime, setCipherTime] = useState<string>('');
  const [comboTime, setComboTime] = useState<string>('');
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

  const handleClickPosition = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>, touchId: number) => {
    const isTouchEvent = 'touches' in e;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setClicks((prev) => [...prev, {id: touchId, x: clientX, y: clientY}]);

    setTimeout(() => (card.style.transform = ''), 80);
    setTimeout(() => setClicks((prev) => prev.filter((item) => item.id !== touchId)), 1000);
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    if ((window.innerWidth < 768)) {
      Array.from(e.touches).forEach(() => {
        const touchId = Date.now();
        handleClickPosition(e, touchId);
        store.setCoins(store.coins + pointsToAdd);
      })
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((window.innerWidth > 768)) {
      const clickId = Date.now();
      handleClickPosition(e, clickId);
      store.setCoins(store.coins + pointsToAdd);
    }
  }

  const callbacks = {
    onClick: useCallback((e: React.MouseEvent<HTMLButtonElement>) => handleClick(e), [store]),
    onTouchStart: useCallback((e: React.TouchEvent<HTMLButtonElement>) => handleTouchStart(e), [store]),
  }

  return (
    <>
      <LayoutMain>
        <Daily cipher={cipherTime} combo={comboTime} reward={rewardTime}/>
        <Score points={store.coins}/>
        <Clicker onClick={callbacks.onClick} onTouchStart={callbacks.onTouchStart}/>
      </LayoutMain>
      <Clicks clicks={clicks} pointsToAdd={pointsToAdd}/>
    </>
  )
}

export default memo(Main);