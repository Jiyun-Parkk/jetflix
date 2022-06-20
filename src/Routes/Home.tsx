import { useMatch, PathMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import TopBanner from "../components/TopBanner";
import ContentSlider from "../components/Slider";
import Modal from "../components/Modal";

const Wrapper = styled.div`
	background: #000;
	padding-bottom: 200px;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

function Home() {
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMovies
	);
	const bigMovieMatch: PathMatch<string> | null =
		useMatch("/movies/:movieId");

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<TopBanner />
					<ContentSlider />
					{bigMovieMatch ? <Modal /> : null}
				</>
			)}
		</Wrapper>
	);
}
export default Home;
