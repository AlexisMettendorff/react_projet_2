import React, { createContext, useContext, useState, useEffect } from "react";

// Créer le contexte
export const WishlistContext = createContext();

// Hook personnalisé pour accéder au contexte
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};

// Fonction pour charger la wishlist depuis le localStorage
const loadWishlistFromLocalStorage = () => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
};

// Fournisseur du contexte
export const WishlistProvider = ({ children }) => {
    // Initialiser la wishlist depuis le localStorage
    const [wishlist, setWishlist] = useState(loadWishlistFromLocalStorage);

    // Ajouter un film à la wishlist
    const addToWishlist = (movie) => {
        setWishlist((prev) => {
            const newWishlist = [...prev, movie];
            localStorage.setItem("wishlist", JSON.stringify(newWishlist)); // Sauvegarder dans localStorage
            return newWishlist;
        });
    };

    // Retirer un film de la wishlist
    const removeFromWishlist = (movie) => {
        setWishlist((prev) => {
            const newWishlist = prev.filter((item) => item.id !== movie.id);
            localStorage.setItem("wishlist", JSON.stringify(newWishlist)); // Sauvegarder dans localStorage
            return newWishlist;
        });
    };

    // Sauvegarder la wishlist dans localStorage chaque fois qu'elle change
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
