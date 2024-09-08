import {useEffect} from 'react';
import {useStoreProfile} from '../store/profile';
import Header from '../containers/header';
import Main from '../containers/main';
import Menu from '../components/menu';
import Layout from '../components/layout';

const App: React.FC = () => {
  const {coins, profitPerHour, setCoins} = useStoreProfile(state => state);

  useEffect(() => {
    const pointsPerSecond = Math.floor(profitPerHour / 3600);
    const interval = setInterval(() => {
      setCoins(coins + pointsPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [profitPerHour, coins])

  return (
    <Layout>
      <Header/>
      <Main/>
      <Menu/>
    </Layout>   
  )
}

export default App;
