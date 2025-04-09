import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { GiFilmSpool,  } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";



const Navbar = () => {
    const [inputname, setinputname] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/?search=${inputname}`);
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <Link
                to="/"
                className="text-xl font-bold">    
                 <GiFilmSpool /> <span>MovieFlix</span>
            </Link>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    className="px-4 py-2 rounded-l bg-gray-700 text-white"
                    value={inputname}
                    onChange={(e) => setinputname(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-blue-400 px-4 py-2 rounded-r"
                >
                    <FaSearch />

                </button>
            </form>
        </nav>
    );
};

export default Navbar;
