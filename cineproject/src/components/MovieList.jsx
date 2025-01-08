import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistProvider";
import styles from "./movieList.module.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const API_KEY = "1bbd1700bf530ef3d9458ad1071f45ab";
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${currentPage}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des films");
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovies();
  }, [currentPage, API_URL]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isMovieInWishlist = (movie) =>
    wishlist.some((item) => item.id === movie.id);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1>Films populaires</h1>
        <Link to="/wishlist">
          <button className="{styles.wishlist-button}">Wishlist</button>
        </Link>
      </div>
      <input
        className="{styles.search-input}"
        type="text"
        placeholder="Rechercher un film..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          fontSize: "1rem",
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                width: "200px",
                position: "relative",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h2 style={{ fontSize: "1.2rem" }}>{movie.title}</h2>
              <p>Note moyenne : {movie.vote_average}</p>
              <Link to={`/movie/${movie.id}`}>
                <button style={{ marginTop: "0.5rem" }}>Détails</button>
              </Link>
              <button
                className="details-button"
                onClick={() =>
                  isMovieInWishlist(movie)
                    ? removeFromWishlist(movie)
                    : addToWishlist(movie)
                }
              >
                {isMovieInWishlist(movie) ? "♥" : "♡"}
              </button>
            </div>
          ))
        ) : (
          <p>Aucun film trouvé pour "{searchQuery}"</p>
        )}
      </div>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          className="page-button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <button
          className="page-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default MovieList;
