import './App.css';
import Login from './components/login/Login';
import Panel from './components/panel/Panel';

function App() {
  return (
    <div className="App">
      { localStorage.getItem('user')=="log" ? <Panel /> : <Login /> }
    </div>
  );
}

export default App;
