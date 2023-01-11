import './style/app.css';
import TopBar from './main/top_bar';
import MainBord from './main/main_bord';
import SideMenu from './main/side_menu';

function App() {
  return (
      <div className="content">
        <TopBar />
        <MainBord />
        <SideMenu />
      </div>

  );
}

export default App;
