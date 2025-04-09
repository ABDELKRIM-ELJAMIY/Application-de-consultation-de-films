import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(
                    `http://www.omdbapi.com/?i=${id}&apikey=e20e14d9`
                );
                setMovie(res.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des détails", err);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div className="text-center mt-10 animate-pulse">Chargement...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full md:w-1/3 rounded shadow-lg"
            />
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
                <p className="mb-2 text-sm text-gray-400">{movie.Year} • {movie.Genre}</p>
                <p className="mb-4">{movie.Plot}</p>
                <p><strong>Réalisateur:</strong> {movie.Director}</p>
                <p><strong>Acteurs:</strong> {movie.Actors}</p>
                <p><strong>Note:</strong> {movie.imdbRating} <FaStar/></p>
                <p><strong>Durée:</strong> {movie.Runtime}</p>
            </div>
        </div>
    );
};

export default MovieDetail;
