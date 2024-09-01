import {memo} from "react";
import "./style.css";

interface IProps {
  children: React.ReactNode;
}

const LayoutMain: React.FC<IProps> = ({children}) => {
  return (
    <div className="relative flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
      <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
        {children}
      </div>
    </div>
  )
}

export default memo(LayoutMain);