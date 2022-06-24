import { useMatch, PathMatch } from "react-router-dom";
import { useQuery } from "react-query";

import { topRateTv, airingTv, popularTv, IGetTvResult } from "../api";
import styled from "styled-components";
import TopBanner from "../components/TopBanner";
import Modal from "../components/ModalTv";
import MakeSwiper from "../components/MakeSwiper";

const Wrapper = styled.div`
	background: #000;
	padding-bottom: 100px;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SlideTitle = styled.h3`
	position: relative;
	top: -100px;
	font-size: 30px;
	padding: 20px;
	padding-left: 35px;
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
					{getContent.map((content, idx) => {
						return (
							<div key={idx}>
								<SlideTitle>
									{getContent[idx]
										.replace("_", " ")
										.toUpperCase()}
								</SlideTitle>
								<MakeSwiper
									data={getMovies[idx]}
									rate={content}
									content="tv"
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
export default Tv;
