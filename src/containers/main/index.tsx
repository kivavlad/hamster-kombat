import {memo, useState, useEffect, useCallback} from "react";
import {useStore} from "../../store";
import {calculateTime, genUUID} from "../../utils/helper";
import {IClick} from "../../types/i-clicks";
import LayoutMain from "../../components/layout-main";
import Daily from "../../components/daily";
import Score from "../../components/score";
import Clicker from "../../components/clicker";
import Clicks from "../../components/clicks";

const Main: React.FC = () => {
  const store = useStore(state => state);

  const [rewardTime, setRewardTime] = useState<string>('');
  const [cipherTime, setCipherTime] = useState<string>('');
  const [comboTime, setComboTime] = useState<string>('');
  const [clicks, setClicks] = useState<IClick[]>([]);
  const [touches, setTouches] = useState<number>(0);

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

  const handleClickPosition = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>, touchId: string) => {
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
      setTouches(e.touches.length);
      Array.from(e.touches).forEach(() => {
        const touchId = genUUID();
        handleClickPosition(e, touchId);
        store.setCoins(store.coins + store.pointsToAdd);
      })
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((window.innerWidth > 768)) {
      const clickId = genUUID();
      handleClickPosition(e, clickId);
      store.setCoins(store.coins + store.pointsToAdd);
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
        <div 
          style={{
            width: '100%',
            height: '100px',
            border: '1px solid white',
            textAlign: 'center',
            padding: '20px',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {touches}
        </div>
      </LayoutMain>
      <Clicks clicks={clicks} pointsToAdd={store.pointsToAdd}/>
    </>
  )
}

export default memo(Main);