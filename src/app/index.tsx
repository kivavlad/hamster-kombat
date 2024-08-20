import {useEffect} from 'react';
import {useStore} from '../store';
import Header from '../containers/header';
import Main from '../containers/main';
import Menu from '../components/menu';
import Layout from '../components/layout';

const App: React.FC = () => {
  const store = useStore(state => state);

  useEffect(() => {
    const pointsPerSecond = Math.floor(store.profitPerHour / 3600);
    const interval = setInterval(() => {
      store.setCoins(store.coins + pointsPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [store.profitPerHour, store.coins])

  return (
    <Layout>
      <Header/>
      <Main/>
      <Menu/>
    </Layout>   
  )
}

export default App;
