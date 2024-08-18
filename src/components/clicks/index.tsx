import type { IClick } from "../../types/i-clicks";
import "./style.css";

interface IProps {
  clicks: IClick[];
  pointsToAdd: number;
  onAnimationEnd: (id: number) => void;
}

const Clicks: React.FC<IProps> = ({clicks, pointsToAdd, onAnimationEnd}) => {
  return (
    <>
      {clicks.map((click) => (
        <div  className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none"
          key={click.id}    
          style={{
            top: `${click.y - 150}px`,
            left: `${click.x - 30}px`,
            animation: `float 1s ease-out`
          }}
          onAnimationEnd={() => onAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </>
  )
}

export default Clicks;