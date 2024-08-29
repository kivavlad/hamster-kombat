import {useState, useEffect} from "react";
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
  const pointsToAdd = 11;

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

  const handleClickPosition = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Определяем, какой тип события произошел
    const isTouchEvent = 'touches' in e; // Проверяем, является ли событие касанием
  
    // Получаем координаты клика или касания
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
  
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
    setTimeout(() => (card.style.transform = ''), 80);
  
    // Добавляем логику для обработки кликов или касаний
    setClicks((prevClicks) => [...prevClicks, {id: Date.now(), x: clientX, y: clientY}]);
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((window.innerWidth > 768)) {
      handleClickPosition(e)
      store.setCoins(store.coins + pointsToAdd);
    }
  }

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if ((window.innerWidth < 768)) {
      const touchCount = e.touches.length;
      handleClickPosition(e)
      store.setCoins(store.coins + pointsToAdd * touchCount);
    }
  }

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  }

  return (
    <>
      <LayoutMain>
        <Daily cipher={cipherTime} combo={comboTime} reward={rewardTime}/>
        <Score points={store.coins}/>
        <Clicker onClick={handleClick} onTouch={onTouchStart}/>
      </LayoutMain>
      <Clicks clicks={clicks} pointsToAdd={pointsToAdd} onAnimationEnd={handleAnimationEnd}/>
    </>
  )
}

export default Main;