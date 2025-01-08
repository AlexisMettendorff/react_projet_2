import React, { useEffect, useState } from "react";
import { useCart } from "./context/CartProvider";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des produits");
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 

    if (loading) {
        return <p>Chargement des produits...</p>;
    }

    if (error) {
        return <p>Erreur : {error}</p>;
    }

    return (
        <div>
            <h1>Liste des produits</h1>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {products.map((product) => (
                    <li
                        key={product.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "16px",
                            marginBottom: "16px",
                        }}
                    >
                        <h2>{product.title}</h2>
                        <p>Prix : {product.price} €</p>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{ width: "100px", height: "100px", objectFit: "contain" }}
                        />
                        <br />
                        <button
                            onClick={() => addToCart(product)}
                            style={{
                                marginTop: "8px",
                                padding: "8px 16px",
                                backgroundColor: "#007BFF",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Ajouter au panier
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
