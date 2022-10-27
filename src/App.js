import './App.css';
import Map from './components/Map/Map.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Map rows_number="3" columns_number="3"/>
      </header>
    </div>
  );
}

export default App;
