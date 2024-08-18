import { dollarCoin } from "../../assets/images";
import "./style.css";

interface IProps {
  points: number;
}

const Score: React.FC<IProps> = ({points}) => {
  return (
    <div className="px-4 mt-4 flex justify-center">
      <div className="px-4 py-2 flex items-center space-x-2">
        <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
        <p className="text-4xl text-white">{points.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default Score;