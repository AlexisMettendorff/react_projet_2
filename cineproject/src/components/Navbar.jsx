import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { WishlistContext } from "../context/WishlistProvider";

function Navbar() {
    const { wishlist } = useContext(WishlistContext); 
    const wishlistCount = wishlist.length; 
    const location = useLocation(); 

    const isWishlistPage = location.pathname === "/wishlist";

    return (
        <nav style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#333", color: "white" }}>
            <Link to="/" style={{ color: "white", fontSize: "1.5rem" }}>Films à gogo</Link>
            <div>
                <Link to="/wishlist" style={{ color: "white", textDecoration: "none", position: "relative" }}>
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
                        Wishlist {isWishlistPage && `(${wishlistCount})`} 
                    </button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
