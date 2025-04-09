import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <Link
            to={`/movie/${movie.imdbID}`}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
                alt={movie.Title}
                className="w-full h-72 object-cover"
            />
            <div className="p-3">
                <h3 className="text-lg font-semibold mb-1">{movie.Title}</h3>
                <p className="text-sm text-gray-400">{movie.Year}</p>
            </div>
        </Link>
    );
};

export default MovieCard;

