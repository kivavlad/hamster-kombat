import {motion} from "framer-motion";
import { dailyReward, dailyCipher, dailyCombo } from "../../assets/images";
import "./style.css";

interface IProps {
  reward: string;
  cipher: string;
  combo: string;
}

const Daily: React.FC<IProps> = ({reward, cipher, combo}) => {
  const hidden = {opacity: 0, transform: 'translateX(100%)'};
  const visible = {opacity: 1, transform: 'translateX(0)'};

  return (
    <motion.div 
      initial={hidden}
      animate={visible}
      transition={{delay: 0.2}}
      className="px-4 mt-6 flex justify-between gap-2"
    >
      <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
        <div className="dot"></div>
        <img src={dailyReward} alt="Daily Reward" className="mx-auto w-12 h-12" />
        <p className="text-[10px] text-center text-white mt-1">Daily reward</p>
        <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{reward}</p>
      </div>
      <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
        <div className="dot"></div>
        <img src={dailyCipher} alt="Daily Cipher" className="mx-auto w-12 h-12" />
        <p className="text-[10px] text-center text-white mt-1">Daily cipher</p>
        <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{cipher}</p>
      </div>
      <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
        <div className="dot"></div>
        <img src={dailyCombo} alt="Daily Combo" className="mx-auto w-12 h-12" />
        <p className="text-[10px] text-center text-white mt-1">Daily combo</p>
        <p className="text-[10px] font-medium text-center text-gray-400 mt-2">{combo}</p>
      </div>
    </motion.div>
  )
}

export default Daily;