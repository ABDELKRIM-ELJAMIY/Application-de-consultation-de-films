import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaClock, FaCalendarAlt, FaFilm, FaUserFriends } from "react-icons/fa";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://www.omdbapi.com/?i=${id}&apikey=e20e14d9`
                );
                setMovie(res.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des détails", err);
                setError("Impossible de charger les détails du film");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-lg text-gray-600">Chargement les details  de  film...</p>
                </div>
            </div>
        );
    }

   


    const getRatingColor = (rating) => {
        const numRating = parseFloat(rating);
        if (numRating >= 8) return "text-green-500";
        if (numRating >= 6) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
                <div className="relative h-24 md:h-32 bg-gray-800">
                    <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.Title}</h1>
                        <div className="flex items-center text-gray-300">
                            <FaCalendarAlt className="mr-1" />
                            <span className="mr-4">{movie.Year}</span>
                            <FaClock className="mr-1" />
                            <span>{movie.Runtime}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row p-6">
                    <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:pr-6">
                        <div className="relative rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"}
                                alt={movie.Title}
                                className="w-full h-auto rounded-lg"
                            />

                            <div className="absolute top-0 right-0 bg-black bg-opacity-75 p-2 rounded-bl-lg">
                                <div className="flex items-center">
                                    <FaStar className={`${getRatingColor(movie.imdbRating)} mr-1`} />
                                    <span className="text-white font-bold">{movie.imdbRating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-white mb-2">Informations</h3>
                            <div className="space-y-2 text-gray-300">
                                <p><span className="text-gray-400">Pays:</span> {movie.Country}</p>
                                <p><span className="text-gray-400">Langue:</span> {movie.Language}</p>
                                <p><span className="text-gray-400">Sortie:</span> {movie.Released}</p>
                                {movie.BoxOffice && <p><span className="text-gray-400">Box Office:</span> {movie.BoxOffice}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="mb-6 p-5 bg-gray-800 rounded-lg">
                            <h2 className="text-xl font-semibold text-white mb-2">Synopsis</h2>
                            <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 bg-gray-800 rounded-lg">
                                <div className="flex items-center mb-3">
                                    <FaFilm className="text-blue-500 mr-2" />
                                    <h2 className="text-xl font-semibold text-white">Production</h2>
                                </div>
                                <p className="text-gray-300 mb-2"><span className="text-gray-400">Réalisateur:</span> {movie.Director}</p>
                                <p className="text-gray-300 mb-2"><span className="text-gray-400">Scénariste:</span> {movie.Writer}</p>
                                <p className="text-gray-300"><span className="text-gray-400">Genre:</span> {movie.Genre}</p>
                            </div>

                            <div className="p-5 bg-gray-800 rounded-lg">
                                <div className="flex items-center mb-3">
                                    <FaUserFriends className="text-purple-500 mr-2" />
                                    <h2 className="text-xl font-semibold text-white">Distribution</h2>
                                </div>
                                <p className="text-gray-300">{movie.Actors}</p>
                            </div>
                        </div>

                        {movie.Ratings && movie.Ratings.length > 0 && (
                            <div className="mt-6 p-5 bg-gray-800 rounded-lg">
                                <h2 className="text-xl font-semibold text-white mb-3">Notes</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {movie.Ratings.map((rating, index) => (
                                        <div key={index} className="bg-gray-700 p-3 rounded text-center">
                                            <p className="text-gray-300 text-sm mb-1">{rating.Source}</p>
                                            <p className="font-bold text-lg text-white">{rating.Value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;