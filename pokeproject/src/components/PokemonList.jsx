import { useState, useEffect } from 'react';
import './PokemonList.css';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
                const data = await response.json();

                const detailedPokemonPromises = data.results.map(async (pokemon) => {
                    const detailsResponse = await fetch(pokemon.url);
                    return await detailsResponse.json();
                });

                const detailedPokemon = await Promise.all(detailedPokemonPromises);
                setPokemonList(detailedPokemon);
                setFilteredPokemon(detailedPokemon); // Par défaut, la liste filtrée est la liste complète
            } catch (error) {
                console.error('Erreur lors de la récupération des données Pokémon :', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPokemon();
    }, []);

    // Met à jour les résultats filtrés en fonction du terme de recherche
    useEffect(() => {
        const filtered = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPokemon(filtered);
    }, [searchTerm, pokemonList]);

    if (loading) {
        return <p>Chargement en cours...</p>;
    }

    return (
        <div>
            <h1>Pokécyclopédie</h1>
            
            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher un Pokémon"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <div className="pokemon-grid">
                {filteredPokemon.map((pokemon) => (
                    <div key={pokemon.id} className="pokemon-card">
                        <img
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={pokemon.name}
                            className="pokemon-image"
                        />
                        <h2>{pokemon.name}</h2>
                        <p><strong>Type(s):</strong> {pokemon.types.map((type) => type.type.name).join(', ')}</p>
                        <p><strong>Caractéristiques:</strong></p>
                        <ul>
                            <li><strong>HP:</strong> {pokemon.stats[0].base_stat}</li>
                            <li><strong>Attaque:</strong> {pokemon.stats[1].base_stat}</li>
                            <li><strong>Défense:</strong> {pokemon.stats[2].base_stat}</li>
                            <li><strong>Poids:</strong> {pokemon.stats[3].base_stat}</li>
                            <li><strong>Expérience:</strong> {pokemon.stats[4].base_stat}</li>
                            <li><strong>Vitesse:</strong> {pokemon.stats[5].base_stat}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
