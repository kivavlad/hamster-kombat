import {memo} from "react";
import {motion} from "framer-motion";
import { dollarCoin } from "../../assets/images";
import "./style.css";

interface IProps {
  points: number;
}

const Score: React.FC<IProps> = ({points}) => {
  const hidden = {opacity: 0, transform: 'scale(0.7)'};
  const visible = {opacity: 1, transform: 'scale(1)'};

  return (
    <motion.div 
      initial={hidden}
      animate={visible}
      transition={{delay: 0.2}}
      className="px-4 mt-4 flex justify-center"
    >
      <div className="px-4 py-2 flex items-center space-x-2">
        <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
        <p className="text-4xl text-white">{points.toLocaleString()}</p>
      </div>
    </motion.div>
  )
}

export default memo(Score);