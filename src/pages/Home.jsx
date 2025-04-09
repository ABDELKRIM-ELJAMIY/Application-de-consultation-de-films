import MovieCard from '../components/MovieCard'

const Home = () => {
    const movies = [
        {
            Title: "Batman Begins",
            Year: "2005",
            imdbID: "tt0372784",
            Type: "movie",
            Poster: "test"
        },
        {
            Title: "The Dark Knight",
            Year: "2008",
            imdbID: "tt0468569",
            Type: "movie",
            Poster: "test"
        },
        {
            Title: "The Dark Knight Rises",
            Year: "2012",
            imdbID: "tt1345836",
            Type: "movie",
            Poster: "test"
        }
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">
                Résultats pour : <span className="text-orange-500">films</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Home;
