import Hamster from "../svg/Hamster";

interface IProps {
  children: React.ReactNode;
}

const LayoutHeader: React.FC<IProps> = ({children}) => {
  return (
    <div className="px-4 z-10">
      <div className="flex items-center space-x-2 pt-4">
        <div className="p-1 rounded-lg bg-[#1d2025]">
          <Hamster size={24} className="text-[#d4d4d4]"/>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4 mt-1">
        {children}   
      </div>
    </div>
  )
}

export default LayoutHeader;