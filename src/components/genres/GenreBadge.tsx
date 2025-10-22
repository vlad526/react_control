import type { FC } from "react";

type GenreBadgeTypeProps = {
    name: string;
    id: number;
    onClick: (genreId: number, page: number, sort: string) => void;
};

const GenreBadge: FC<GenreBadgeTypeProps> = ({ name, id, onClick }) => {
    return (

        <div
            className="px-4 py-2 bg-gradient-to-r from-pink-500 via-rose-300 to-orange-500  text-white text-lg
               rounded-full font-semibold transition-all duration-200 shadow-sm
               whitespace-nowrap inline-block m-2 cursor-pointer
               hover:scale-105 hover:brightness-110"
            onClick={() => onClick(id, 1, "popularity.desc")}
        >
            {name}
        </div>

    );
};

export default GenreBadge;