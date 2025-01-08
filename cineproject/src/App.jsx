import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Wishlist from './components/Wishlist'; 
import { WishlistProvider } from './context/WishlistProvider'; 
import Navbar from "./components/Navbar"; 

function App() {
    return (
        <WishlistProvider>       
            <Router>
              <Navbar />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/wishlist" element={<Wishlist />} /> 
                </Routes>
            </Router>
        </WishlistProvider>
    );
}

export default App;
