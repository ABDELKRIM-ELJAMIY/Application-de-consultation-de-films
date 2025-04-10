import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { FaRegTrashAlt } from "react-icons/fa";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleRemoveFavorite = (imdbID) => {
        const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        toast.success('Film supprimé des favoris !');

    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Films favoris</h1>
            {favorites.length === 0 ? (
                <p className="text-center text-gray-400">Aucun film ajouté aux favoris.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {favorites.map((movie) => (
                        <div
                            key={movie.imdbID}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            <Link
                                to={`/movie/${movie.imdbID}`}
                                className="block"
                            >
                                <img
                                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                                    alt={movie.Title}
                                    className="w-full h-72 object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-lg font-semibold mb-1">{movie.Title}</h3>
                                    <p className="text-sm text-gray-400">{movie.Year}</p>
                                    <p className="text-sm text-gray-400">{movie.Language}</p><span> {movie.Country}</span>
                                </div>
                            </Link>
                            <button
                                onClick={() => handleRemoveFavorite(movie.imdbID)}
                                className="absolute top-2 right-2 p-2 bg-red-600 bg-opacity-70 rounded-full hover:bg-orange-600 transition-colors"
                            >
                                <FaRegTrashAlt />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
