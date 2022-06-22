import { useMatch, PathMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { Index, IsLeaving, MovieId, windowSize } from "../atoms";

import {
	getNowMovies,
	getTopMovies,
	getUpcomingMovies,
	IGetMoviesResult,
} from "../api";
import styled from "styled-components";
import TopBanner from "../components/TopBanner";
import ContentSlider from "../components/Slider";
import Modal from "../components/ModalMovie";

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
	const bigMovieMatch: PathMatch<string> | null = useMatch(
		"/:content/:rate/:movieId"
	);

	const getContent = ["now_playing", "top_rated", "upcoming"];
	const { data: dataNow, isLoading } = useQuery<IGetMoviesResult>(
		["movies", getContent[0]],
		getNowMovies
	);
	const { data: dataTop } = useQuery<IGetMoviesResult>(
		["movies", getContent[1]],
		getTopMovies
	);
	const { data: dataUpcoming } = useQuery<IGetMoviesResult>(
		["movies", getContent[2]],
		getUpcomingMovies
	);

	const getMovies = [dataNow, dataTop, dataUpcoming];
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<TopBanner data={dataNow} />

					<div style={{ position: "relative", top: "-100px" }}>
						{getContent.map((content, idx) => {
							return (
								<ContentSlider
									data={getMovies[idx]}
									rate={content}
									key={idx}
									content="movies"
								/>
							);
						})}
					</div>
					{bigMovieMatch ? (
						<Modal bigMovieMatch={bigMovieMatch} />
					) : null}
				</>
			)}
		</Wrapper>
	);
}
export default Home;
