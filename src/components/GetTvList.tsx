import { IGetMoviesResult, searchTv } from "../api";
import { makeImagePath } from "../utils";
import { BoxWrap, Box, Loader } from "../Routes/Search";
import { useQuery } from "react-query";
interface IGetKey {
	searchKey: string | null;
}

function GetTvList({ searchKey }: IGetKey) {
	const { data: searchTDatav, isLoading: isLoadingTv } =
		useQuery<IGetMoviesResult>(["tv", "searched"], () =>
			searchTv(searchKey)
		);
	console.log("tv");

	return (
		<BoxWrap>
			{searchTDatav?.results.length !== 0 ? (
				isLoadingTv ? (
					<Loader>Loading</Loader>
				) : (
					searchTDatav?.results.map((tv, idx) => (
						<Box
							key={idx}
							bg={
								tv.poster_path
									? `url( ${makeImagePath(
											tv.poster_path
									  )}) no-repeat center /
                        100% 100%`
									: "gray"
							}
						>
							{tv.poster_path !== null
								? ""
								: `no poster title: ${tv.name}`}
						</Box>
					))
				)
			) : (
				`The '${searchKey} is not found'`
			)}
		</BoxWrap>
	);
}
export default GetTvList;
