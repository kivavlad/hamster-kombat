import "./style.css";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({children}) => {
  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        {children}
      </div>
    </div>
  )
}

export default Layout;