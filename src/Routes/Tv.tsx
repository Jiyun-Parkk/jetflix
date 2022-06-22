import { useMatch, PathMatch } from "react-router-dom";
import { useQuery } from "react-query";

import { topRateTv, airingTv, popularTv, IGetTvResult } from "../api";
import styled from "styled-components";
import TopBanner from "../components/TopBanner";
import ContentSlider from "../components/Slider";
import Modal from "../components/ModalTv";

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

function Tv() {
	const bigMovieMatch: PathMatch<string> | null = useMatch(
		"/:content/:rate/:movieId"
	);

	const getContent = ["top_rate", "aring", "popular"];
	const { data: dataTopRate, isLoading } = useQuery<IGetTvResult>(
		["tv", getContent[0]],
		topRateTv
	);
	const { data: dataAiring } = useQuery<IGetTvResult>(
		["tv", getContent[1]],
		airingTv
	);
	const { data: dataPoplur } = useQuery<IGetTvResult>(
		["tv", getContent[2]],
		popularTv
	);

	const getMovies = [dataTopRate, dataAiring, dataPoplur];
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<TopBanner data={dataPoplur} />

					<div style={{ position: "relative", top: "-100px" }}>
						{getContent.map((content, idx) => {
							return (
								<ContentSlider
									data={getMovies[idx]}
									rate={content}
									key={idx}
									content="tv"
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
export default Tv;
