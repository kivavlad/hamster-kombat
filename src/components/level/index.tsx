import {memo} from "react";
import "./style.css";

interface IProps {
  levelName: string;
  currentLevel: number;
  maxLevel: number;
  progress: number;
}

const Level: React.FC<IProps> = ({levelName, currentLevel, maxLevel, progress}) => {
  return (
    <div className="flex items-center w-1/3">
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-sm">{levelName}</p>
          <p className="text-sm">{currentLevel} <span className="text-[#95908a]">/ {maxLevel}</span></p>
        </div>
        <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
          <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
            <div className="progress-gradient h-2 rounded-full" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Level);