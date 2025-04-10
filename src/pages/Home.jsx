import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const { search } = useLocation();

    const inputname = new URLSearchParams(search).get("search");

    useEffect(() => {
        if (!inputname) return;

        const fetchMovies = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://www.omdbapi.com/?s=${inputname}&apikey=e20e14d9`
                );

                if (res.data.Response === "False") {
                    setMovies([]);
                    setLoading(false);
                    return;
                }

                const basicMovies = res.data.Search || [];

                const moviesWithDetails = await Promise.all(
                    basicMovies.map(async (movie) => {
                        const detailRes = await axios.get(
                            `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=e20e14d9`
                        );
                        return detailRes.data;
                    })
                );

                setMovies(moviesWithDetails);
            } catch (err) {
                console.error("Erreur lors de la récupération des films", err);
                setMovies([]);
            }
            setLoading(false);
        };

        fetchMovies();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [inputname]);

    const filteredMovies = movies.filter((movie) => {
        const genreMatch = selectedGenre
            ? movie.Genre?.toLowerCase().split(", ").includes(selectedGenre.toLowerCase())
            : true;

        const typeMatch = selectedType
            ? selectedType === "animation"
                ? movie.Genre?.toLowerCase().includes("animation")
                : movie.Type === selectedType
            : true;

        return genreMatch && typeMatch;
    });

    const sortedMovies = [...filteredMovies].sort((a, b) => {
        const ratingA = parseFloat(a.imdbRating) || 0;
        const ratingB = parseFloat(b.imdbRating) || 0;
        return ratingB - ratingA;
    });

    return (
        <div>
            {!inputname ? (
                <p className="text-center text-gray-400 mt-10">
                    Faites une recherche pour voir des films 🎬
                </p>
            ) : loading ? (
                <div className="text-center mt-10 animate-pulse">Chargement...</div>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-4">
                        Résultats pour : <span className="text-orange-500">{inputname}</span>
                    </h2>

                    <div className="mb-6 grid md:grid-cols-3 gap-4">
                        <select
                            id="typeFilter"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5"
                        >
                            <option value="">Tous les types</option>
                            <option value="movie">Film</option>
                            <option value="series">Série</option>
                            <option value="animation">Animation</option>
                        </select>

                        <select
                            id="genreFilter"
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5"
                        >
                            <option value="">Tous les genres</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Aventure</option>
                            <option value="Comedy">Comédie</option>
                            <option value="Drama">Drame</option>
                            <option value="Horror">Horreur</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-Fi">Science-fiction</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Fantasy">Fantasy</option>
                        </select>
                    </div>

                    
                    {sortedMovies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {sortedMovies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-red-500 mt-10">
                            Aucun film trouvé avec ces filtres.
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
