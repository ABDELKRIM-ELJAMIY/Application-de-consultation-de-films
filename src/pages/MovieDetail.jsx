import { useParams } from "react-router-dom";
import Batman_Begins_Poster from './Batman_Begins_Poster.jpg';
const dummyMovies = [
    {
        Title: "Batman Begins",
        Year: "2005",
        imdbID: "tt0372784",
        Genre: "Action, Adventure",
        Plot: "Bruce Wayne becomes Batman to fight crime in Gotham.",
        Director: "Christopher Nolan",
        Actors: "Christian Bale, Michael Caine, Liam Neeson",
        imdbRating: "8.2",
        Runtime: "140 min",
        Poster: "test"
    },
    {
        Title: "The Dark Knight",
        Year: "2008",
        imdbID: "tt0468569",
        Genre: "Action, Crime, Drama",
        Plot: "Batman battles the Joker, a criminal mastermind.",
        Director: "Christopher Nolan",
        Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
        imdbRating: "9.0",
        Runtime: "152 min",
        Poster: "test"
    }
];

const MovieDetail = () => {
    const { id } = useParams();
    const movie = dummyMovies.find(m => m.imdbID === id);

    if (!movie) {
        return <div className="text-center mt-10 text-red-500">Film non trouvé.</div>;
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
                <p><strong>Note:</strong> {movie.imdbRating} ⭐</p>
                <p><strong>Durée:</strong> {movie.Runtime}</p>
            </div>
        </div>
    );
};

export default MovieDetail;
