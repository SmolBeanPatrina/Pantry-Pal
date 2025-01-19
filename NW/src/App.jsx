//import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import StartPage from './startPage'
import RecipePage from './recipepage'
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<StartPage/>} /> */}
          <Route path="/" element={<RecipePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;