import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipePage from './recipepage';
import Header from './componenets/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/recipes" element={<RecipePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
