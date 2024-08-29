import {motion} from "framer-motion";
import Hamster from "../svg/Hamster";

interface IProps {
  children: React.ReactNode;
}

const LayoutHeader: React.FC<IProps> = ({children}) => {
  const hidden = {opacity: 0, transform: 'translateY(-100%)'};
  const visible = {opacity: 1, transform: 'translateY(0)'};

  return (
    <motion.div 
      initial={hidden}
      animate={visible}
      transition={{delay: 0.2}}
      viewport={{once: true}}
      className="px-4 z-10"
    >
      <div className="flex items-center space-x-2 pt-4">
        <div className="p-1 rounded-lg bg-[#1d2025]">
          <Hamster size={24} className="text-[#d4d4d4]"/>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4 mt-1">
        {children}   
      </div>
    </motion.div>
  )
}

export default LayoutHeader;