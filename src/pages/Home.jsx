import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from '../components/MovieCard'
import axios from "axios";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const { search } = useLocation();
    const inputname = new URLSearchParams(search).get("search") || "batman";

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://www.omdbapi.com/?s=${inputname}&apikey=e20e14d9`
                );
                setMovies(res.data.Search || []);
            } catch (err) {
                console.error("Erreur lors de la récupération des films", err);
                setMovies([]);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [inputname]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">
                Résultats pour : <span className="text-orange-500">{inputname}</span>
            </h2>

            {loading ? (
                <div className="text-center mt-10 animate-pulse">Chargement...</div>
            ) : movies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-red-500 mt-10">
                    Aucun film trouvé pour cette recherche.
                </p>
            )}
        </div>
    );
};

export default Home;
