import Header from '../containers/header';
import Main from '../containers/main';
import Menu from '../components/menu';
import Layout from '../components/layout';

const App: React.FC = () => {
  return (
    <Layout>
      <Header/>
      <Main/>
      <Menu/>
    </Layout>   
  )
}

export default App;
