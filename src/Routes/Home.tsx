import { useMatch, PathMatch } from "react-router-dom";
import { useQuery } from "react-query";
import {
	getNowMovies,
	getTopMovies,
	getUpcomingMovies,
	IGetMoviesResult,
} from "../api";
import styled from "styled-components";
import TopBanner from "../components/TopBanner";
import Modal from "../components/ModalMovie";
import MakeSwiper from "../components/MakeSwiper";

const Wrapper = styled.div`
	background: #000;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SlideTitle = styled.h3`
	position: relative;
	font-size: 30px;
	padding: 20px;
	padding-left: 35px;
	text-shadow: 5px 5px 2px rgba(255, 255, 255, 0.2);
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

					{getContent.map((content, idx) => {
						return (
							<div
								key={idx}
								style={{ position: "relative", top: "-200px" }}
							>
								<SlideTitle>
									{getContent[idx]
										.replace("_", " ")
										.toUpperCase()}
								</SlideTitle>
								<MakeSwiper
									data={getMovies[idx]}
									rate={content}
									content="movies"
								/>
							</div>
						);
					})}
					{bigMovieMatch ? (
						<Modal bigMovieMatch={bigMovieMatch} />
					) : null}
				</>
			)}
		</Wrapper>
	);
}
export default Home;
