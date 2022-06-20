import styled from "styled-components";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Index, IsLeaving } from "../atoms";

const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;
const Title = styled.h2`
	margin-bottom: 10px;
	font-size: 68px;
`;
const Overview = styled.p`
	font-size: 28px;
	width: 50%;
`;

function TopBanner() {
	const offset = 6;
	const setIndex = useSetRecoilState(Index);
	const [leaving, setLeaving] = useRecoilState(IsLeaving);
	const { data } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMovies
	);
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data?.results.length - 2;
			const maxIndex = Math.ceil(totalMovies / offset) - 1;

			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	return (
		<Banner
			onClick={increaseIndex}
			bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
		>
			<Title>{data?.results[0].title}</Title>
			<Overview>{data?.results[0].overview}</Overview>
		</Banner>
	);
}

export default TopBanner;
