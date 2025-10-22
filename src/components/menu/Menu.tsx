import {Link} from "react-router-dom";

const Menu = () => {
    return (


            <div className="flex flex-col items-center mt-10">
                <h2 className="text-5xl font-bold mb-4 space-y-6 mb-4">Menu</h2>
                <nav className="space-y-6 mt-6">

                    <Link to="/" className="text-3xl block hover:text-blue-300">Main</Link>
                    <Link to="/movie" className="text-3xl block hover:text-blue-300">Movies</Link>
                    <Link to="/genre/movie/list" className="text-3xl block hover:text-blue-300">Genres</Link>

                </nav>
            </div>



    );

};

export default Menu;