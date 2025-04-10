import { Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import { toast } from "react-hot-toast";  

const MovieCard = ({ movie }) => {
    const addToFavorites = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isAlreadyFavorited = favorites.some(fav => fav.imdbID === movie.imdbID);

        if (!isAlreadyFavorited) {
            favorites.push(movie);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            toast.success(`${movie.Title} ajouté aux favoris !`); 
        } else {
            toast.error(`${movie.Title} est déjà dans vos favoris.`); 
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 relative">
            <button
                onClick={addToFavorites}
                className="absolute top-2 right-2 p-2 bg-gray-800 bg-opacity-70 rounded-full hover:bg-orange-600 transition-colors"
            >
                <GrFavorite className="text-white" />
            </button>

            <Link to={`/movie/${movie.imdbID}`}>
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                    alt={movie.Title}
                    className="w-full h-72 object-cover"
                />
                <div className="p-3">
                    <h3 className="text-lg font-semibold mb-1">{movie.Title}</h3>
                    <p className="text-sm text-gray-400">{movie.Year}</p>
                    <p className="text-sm text-gray-400">
                        {movie.Language}
                        <span> {movie.Country}</span>
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
