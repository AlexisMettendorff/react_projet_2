import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { WishlistContext } from "../context/WishlistProvider";
import { Link } from "react-router-dom";
import styles from "./movieDetails.module.css"; 

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]); 
  const [error, setError] = useState(null);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const API_KEY = "1bbd1700bf530ef3d9458ad1071f45ab";
  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`;
  const API_CAST_URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`;
  const SIMILAR_API_URL = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR&page=1`;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des détails du film");
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchActors = async () => {
      try {
        const response = await fetch(API_CAST_URL);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des acteurs");
        }
        const data = await response.json();
        setActors(data.cast.slice(0, 10)); 
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(SIMILAR_API_URL);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des films similaires");
        }
        const data = await response.json();
        setSimilarMovies(data.results.slice(0, 10)); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovie();
    fetchActors();
    fetchSimilarMovies();
  }, [id]);

  const isMovieInWishlist = () =>
    wishlist.some((item) => item.id === movie?.id);

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!movie) {
    return <p>Chargement...</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/">
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#f50057",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Revenir à la liste des films
        </button>
      </Link>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "300px", borderRadius: "8px" }}
      />
      <p>{movie.overview}</p>
      <p>Note moyenne : {movie.vote_average}</p>

      <h3>Acteurs principaux :</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", 
          gap: "1rem", 
          marginBottom: "1rem",
        }}
      >
        {actors.length > 0 ? (
          actors.map((actor) => (
            <div
              key={actor.id}
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  marginBottom: "0.5rem",
                }}
              />
              <p>{actor.name}</p>
            </div>
          ))
        ) : (
          <p>Aucun acteur trouvé.</p>
        )}
      </div>

      <button
        onClick={() =>
          isMovieInWishlist() ? removeFromWishlist(movie) : addToWishlist(movie)
        }
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: isMovieInWishlist() ? "#f50057" : "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isMovieInWishlist()
          ? "Retirer de la wishlist"
          : "Ajouter à la wishlist"}
      </button>

      {similarMovies.length > 0 && (
        <div>
          <h3 style={{ marginTop: "2rem" }}>Films similaires</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {similarMovies.map((similarMovie) => (
              <div
                key={similarMovie.id}
                style={{
                  textAlign: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "1rem",
                  position: "relative",
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                  alt={similarMovie.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <p>{similarMovie.title}</p>
                <Link to={`/movie/${similarMovie.id}`}>
                  <button
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.3rem 0.7rem",
                      backgroundColor: "#007BFF",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Détails
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
