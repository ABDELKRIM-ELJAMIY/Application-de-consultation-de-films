import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";


const Navbar = () => {
    const [inputname, setinputname] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/?search=${inputname}`);
    };

    const goToFavorites = () => {
        navigate("/favorites");
    };

    return (
        <nav className="bg-gray-900 shadow-md px-4 py-3 flex justify-between items-center">
            <Link
                to="/"
                className="flex items-center space-x-2 group"
            >
                <GiFilmSpool className="text-red-500 text-2xl transition-transform group-hover:rotate-12" />
                <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                    MovieFlix
                </span>
            </Link>

            <form onSubmit={handleSubmit} className="flex w-full max-w-sm mx-4">
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    className="w-full px-4 py-2 rounded-l-lg bg-gray-800 border-2 border-gray-700 border-r-0 text-white focus:outline-none focus:border-red-500 transition-colors"
                    value={inputname}
                    onChange={(e) => setinputname(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center"
                >
                    <FaSearch className="text-white" />
                </button>
            </form>

            <button
                onClick={goToFavorites}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
                <GrFavorite />

            </button>
        </nav>
    );
};

export default Navbar;
