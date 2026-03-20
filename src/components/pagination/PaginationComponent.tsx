import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {useSearchParams} from "react-router-dom";
import {movieActions} from "../../slices/movieSlice.ts";
import  {useMemo} from "react";

const PaginationComponent = () => {
    const dispatch = useAppDispatch();
    const [urlParams, setUrlParams] = useSearchParams();


    const moviesPageState = useAppSelector(state => state.movieStoreSlice.moviesPage);
    const queryTerm = useAppSelector(state => state.movieStoreSlice.searchQuery);
    const searchTotalPages = useAppSelector(state => state.movieStoreSlice.totalSearchPages);


    const {
        currentPageIndex,
        currentGenreIdParam,
        finalTotalPages,
    } = useMemo(() => {

        const pageFromUrl = Number(urlParams.get("page") || "1");
        const genreParam = urlParams.get("genre");


        const total = queryTerm
            ? searchTotalPages || 1
            : moviesPageState?.total_pages || 1;

        return {
            currentPageIndex: pageFromUrl,
            currentGenreIdParam: genreParam,
            finalTotalPages: total,
        };
    }, [urlParams, queryTerm, searchTotalPages, moviesPageState]);


    const updateUrlAndFetchData = (targetPage: number) => {

        const newParams = new URLSearchParams(urlParams);
        newParams.set("page", targetPage.toString());
        setUrlParams(newParams);


        if (queryTerm) {
            dispatch(movieActions.loadMoviesBySearch({
                query: queryTerm,
                page: targetPage
            }));
        } else if (currentGenreIdParam) {
            dispatch(movieActions.loadMoviesByGenre({
                genreId: Number(currentGenreIdParam),
                page: targetPage,
                sort: "popularity.desc"
            }));
        } else {
            dispatch(movieActions.loadMovies(targetPage.toString()));
        }
    };

    const generatePageLinkItems = () => {
        const pageItems: (number | string)[] = [];
        const pageNum = currentPageIndex;
        const totalPagesCount = finalTotalPages;

        if (totalPagesCount <= 10) {
            for (let i = 1; i <= totalPagesCount; i++) pageItems.push(i);
        } else {
            pageItems.push(1);

            if (pageNum > 4) pageItems.push("...");

            const startPoint = Math.max(2, pageNum - 2);
            const endPoint = Math.min(totalPagesCount - 1, pageNum + 2);
            for (let i = startPoint; i <= endPoint; i++) pageItems.push(i);

            if (pageNum < totalPagesCount - 3) pageItems.push("...");

            pageItems.push(totalPagesCount);


            return pageItems.filter((item, index, arr) => item !== arr[index - 1] || item !== '...');
        }

        return pageItems;
    };

    const displayedPages = generatePageLinkItems();

    return (
        <div className="flex justify-center items-center gap-2 py-6 px-4 flex-wrap bg-gray-50 border-t border-gray-200 mt-10 mb-10">
            <button disabled={currentPageIndex === 1}
                    className="px-4 py-2 border rounded-full hover:bg-red-100 disabled:opacity-40 text-red-700 font-medium transition duration-200"
                    onClick={() => updateUrlAndFetchData(currentPageIndex - 1)}
            >
                &larr; Назад
            </button>

            {displayedPages.map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => updateUrlAndFetchData(page)}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition duration-200 ${ 
                            page === currentPageIndex
                                ? "bg-red-600 text-white shadow-md border-red-600" 
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-2 text-gray-500 select-none font-bold">&hellip;</span>
                )
            )}

            <button disabled={currentPageIndex === finalTotalPages}
                    className="px-4 py-2 border rounded-full hover:bg-red-100 disabled:opacity-40 text-red-700 font-medium transition duration-200"
                    onClick={() => updateUrlAndFetchData(currentPageIndex + 1)}
            >
                Вперед &rarr;
            </button>
        </div>
    );
};

export default PaginationComponent;