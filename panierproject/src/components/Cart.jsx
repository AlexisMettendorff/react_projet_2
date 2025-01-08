import React from "react";
import { useCart } from "../context/CartProvider"; 

function Cart() {
    const { cartItems, removeFromCart } = useCart(); 

    const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    return (
        <div>
            <h1>Panier</h1>
            {cartItems.length === 0 ? (
                <p>Le panier est vide.</p>
            ) : (
                <div>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    marginBottom: "16px",
                                }}
                            >
                                <h2>{item.title}</h2>
                                <p>Prix : {item.price} €</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{
                                        padding: "8px 16px",
                                        backgroundColor: "#DC3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Retirer l'article
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total : {total} €</h3>
                </div>
            )}
        </div>
    );
}

export default Cart;
