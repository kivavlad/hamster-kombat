import {memo} from "react";
import type {IClick} from "../../types/i-clicks";
import "./style.css";

interface IProps {
  clicks: IClick[];
  pointsToAdd: number;
}

const Clicks: React.FC<IProps> = ({clicks, pointsToAdd}) => {
  return (
    <>
      {clicks.map((click) => (
        <div  className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          key={click.id}    
          style={{
            top: `${click.y - 50}px`,
            left: `${click.x - 30}px`,
            animation: `float 0.8s ease-out`
          }}
        >
          {pointsToAdd}
        </div>
      ))}
    </>
  )
}

export default memo(Clicks);