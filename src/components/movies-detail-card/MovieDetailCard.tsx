import type { FC } from "react";
import type { IMovie } from "../../models/IMovies/IMovie.ts";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../user-info/UserInfo.ts";
import { useGenreNames } from "../hook/useGenreNames.ts";
import StarRatings from "react-star-ratings";

type MoviePropsType = {
    movie: IMovie;
};

export const MovieDetailCard: FC<MoviePropsType> = ({ movie }) => {
    const genreNames = useGenreNames(movie.genre_ids ?? []);

    return (
        <Link to={`/movie/${movie.id}`}>
            <div
                className="w-48 h-[420px] bg-blue-50 rounded-xl shadow-md overflow-hidden cursor-pointer
             hover:shadow-2xl"
            >
                <img
                    src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-70 object-cover"
                />

                <div className="p-3 text-center">
                    <h3 className="text-base font-semibold text-gray-800 truncate">
                        {movie.title}
                    </h3>
                    <p className="text-base font-semibold text-gray-800 truncate">
                        {movie.release_date}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                        {genreNames.join(", ")}
                    </p>
                    <StarRatings
                        rating={movie.vote_average / 2}
                        starRatedColor="gold"
                        starEmptyColor="#e5e7eb"
                        starDimension="20px"
                        starSpacing="2px"
                        numberOfStars={5}
                        name={`rating-${movie.id}`}
                    />
                    <p className="text-base font-semibold text-gray-800 truncate">
                        {movie.vote_average / 2}
                    </p>

                </div>
            </div>
        </Link>
    );
};
