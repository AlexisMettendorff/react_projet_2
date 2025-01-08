import React from "react";
import { useWishlist } from "../context/WishlistProvider";
import styles from "./wishlist.module.css";
import { Link } from "react-router-dom"; 


function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.backButton}>
          Retour à la liste des films
        </Link>
          <h1 className={styles.title}>Ma Wishlist</h1>          
          <div className={styles.wishlistContainer}>
            {wishlist.length > 0 ? (
              wishlist.map((movie) => (
                <div key={movie.id} className={styles.movieCard}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.movieImage}
                  />
                  <h2 className={styles.movieTitle}>{movie.title}</h2>
                  <p>Note moyenne : {movie.vote_average}</p>
                  <button
                    onClick={() => removeFromWishlist(movie)}
                    className={styles.removeButton}
                  >
                    Retirer de la wishlist
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.emptyMessage}>Aucun film dans votre wishlist.</p>
            )}
          </div>
        </div>
      );
    }
    
    export default Wishlist;
