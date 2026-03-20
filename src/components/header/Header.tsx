import {useState} from "react";
import {useAppDispatch} from "../store/store.ts";
import {movieActions} from "../../slices/movieSlice.ts";
import {useNavigate} from "react-router-dom";
import * as React from "react";

const Header = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        const trimmedQuery = query.trim();
        if (trimmedQuery.length > 0) {
            dispatch(movieActions.setQuery(trimmedQuery));
            dispatch(movieActions.loadMoviesBySearch({ query: query.trim(), page: 1 }));
            navigate("search/movie");
            setQuery("");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch();
    };


    return (
        <div className="w-full">

            <header
                className="bg-gradient-to-r from-pink-500 via-rose-300 to-orange-500  p-4 flex flex-col items-center">

                <form onSubmit={handleSubmit} className="relative w-80">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="bg-white h-10 w-full px-10 pr-4 rounded-full text-sm "
                    />
                    <button
                        type="submit"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    >
                        <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
                            />
                        </svg>
                    </button>
                </form>
            </header>
        </div>

    );
};

export default Header;


