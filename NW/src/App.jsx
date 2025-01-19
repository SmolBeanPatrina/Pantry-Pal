import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipePage from './recipepage';
import Header from './componenets/Header';
import Testimonials from './componenets/Testimonials';
import Preferences from './componenets/PreferencesForm';
import AboutPage from './componenets/About';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/recipes" element={<RecipePage />} />
            <Route path="/Testimonials" element={<Testimonials />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
