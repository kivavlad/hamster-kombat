import { mainCharacter } from "../../assets/images";
import "./style.css";

interface IProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTouch: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const Clicker: React.FC<IProps> = ({onClick, onTouch}) => {
  return (
    <div className="px-4 mt-4 flex justify-center">
      <div
        className="w-80 h-80 p-4 rounded-full circle-outer"
        onClick={(e) => onClick(e)}
        onTouchStart={(e) => onTouch(e)}
      >
        <div className="w-full h-full rounded-full circle-inner">
          <img src={mainCharacter} alt="Main Character" className="w-full h-full"/>
        </div>
      </div>
    </div>
  )
}

export default Clicker;