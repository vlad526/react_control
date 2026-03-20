import MoviesList from "../components/movies-list/MoviesList.tsx";
import {Outlet} from "react-router-dom";



const MoviesPage = () => {
    return (
        <div>

            <MoviesList/>
            <Outlet/>

        </div>
    );
};

export default MoviesPage;