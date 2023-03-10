import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/details/:id" element={<MovieDetails />} />
        </Route>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
