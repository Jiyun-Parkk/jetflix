import { IGetMoviesResult, searchMovie, IGetTvResult } from "../api";
import { makeImagePath } from "../utils";
import { BoxWrap, Box, Loader } from "../Routes/Search";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

interface IGetKey {
	searchKey: string | null;
}
function GetMovieList({ searchKey }: IGetKey) {
	const { data: searchMovieData, isLoading: isLoadingMovie } =
		useQuery<IGetTvResult>(["movies", "searched"], () =>
			searchMovie(searchKey)
		);
	console.log("movie");
	console.log(searchMovieData);

	return (
		<BoxWrap>
			{searchMovieData?.results.length !== 0 ? (
				isLoadingMovie ? (
					<Loader>Loading</Loader>
				) : (
					searchMovieData?.results.map((movie, idx) => (
						<Box
							key={idx}
							bg={
								movie.poster_path
									? `url( ${makeImagePath(
											movie.poster_path
									  )}) no-repeat center /
                    100% 100%`
									: "gray"
							}
						>
							{movie.poster_path !== null
								? ""
								: `no poster title: ${movie.name}`}
						</Box>
					))
				)
			) : (
				`The '${searchKey}' is not found`
			)}
		</BoxWrap>
	);
}

export default GetMovieList;
