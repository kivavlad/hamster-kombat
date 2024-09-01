import {memo, useRef, useEffect} from "react";
import {motion} from "framer-motion";
import { mainCharacter } from "../../assets/images";
import "./style.css";

interface IProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const Clicker: React.FC<IProps> = ({onClick, onTouchStart}) => {
  const circleRef = useRef<any>();
  const hidden = {opacity: 0, transform: 'scale(0.7)'};
  const visible = {opacity: 1, transform: 'scale(1)'};

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (circleRef.current && circleRef.current.contains(e.target as Node)) {
        e.preventDefault(); 
        onTouchStart(e as unknown as React.TouchEvent<HTMLDivElement>);
      }
    }

    const currentRef = circleRef.current;

    if (currentRef) {
      currentRef.addEventListener("touchstart", handleTouchStart, {passive: false});
    }

    return () => {
      if (currentRef) currentRef.removeEventListener("touchstart", handleTouchStart);
    }
  }, [onTouchStart])

  return (
    <motion.div
      initial={hidden}
      animate={visible}
      transition={{delay: 0.2}}
    >
      <div className="px-4 mt-4 flex justify-center">
        <div className="w-80 h-80 p-4 rounded-full circle-outer"
          ref={circleRef}
          onClick={(e) => onClick(e)}
        >
          <div className="w-full h-full rounded-full circle-inner">
            <img src={mainCharacter} alt="Main Character" className="w-full h-full"/>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(Clicker);