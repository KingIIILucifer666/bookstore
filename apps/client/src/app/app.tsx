import Favourites from '../components/Favourites';
import NavBar from '../components/NavBar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import BookDetails from '../components/BookDetails';

export function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
