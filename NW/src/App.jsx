import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipePage from './recipepage';
import './App.css';
import Header from './componenets/Header';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header appears first */}
        <Header />

        {/* Main content follows below */}
        <main>
          <Routes>
            <Route path="/" element={<RecipePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
