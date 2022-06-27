import { useNavigate, PathMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { topRateTv, airingTv, popularTv, IGetTvResult } from "../api";

const Overlay = styled(motion.div)`
	position: fixed;
	z-index: 119;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: fixed;
	z-index: 120;
	width: 50vw;
	height: auto;
	top: 40px;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: ${(props) => props.theme.black.lighter};
	border-radius: 20px;
`;

const BigCover = styled.div`
	background-size: 100% 100%;
	width: 100%;
	height: 500px;
	border-radius: 20px 20px 0 0;
`;

const BigTitle = styled.h3`
	position: relative;
	top: -60px;
	color: ${(props) => props.theme.white.lighter};
	text-align: left;
	font-size: 30px;
	margin: 10px 0;
	padding-left: 20px;
`;

const BigOverview = styled.div`
	width: 70%;
	margin: 0 auto;
	padding: 10px;
	color: ${(props) => props.theme.white.lighter};
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin-bottom: 30px;
`;
const DetailBox = styled.div`
	margin-bottom: 20px;
`;
const Detail = styled.div``;
const DetailTitle = styled.span`
	font-size: 20px;
	font-weight: 600;
	color: #cdc2ae;
`;

interface IModalProps {
	bigMovieMatch: PathMatch<string> | null;
}
function Modal({ bigMovieMatch }: IModalProps) {
	const history = useNavigate();
	const onOverlayClick = () => history("/tv");
	const getContent = ["top_rate", "aring", "popular"];
	const { data: dataTopRate, isLoading } = useQuery<IGetTvResult>(
		["movies", getContent[0]],
		topRateTv
	);
	const { data: dataAiring } = useQuery<IGetTvResult>(
		["movies", getContent[1]],
		airingTv
	);
	const { data: dataPoplur } = useQuery<IGetTvResult>(
		["movies", getContent[2]],
		popularTv
	);

	const getMovies = [dataTopRate, dataAiring, dataPoplur];
	const index = getContent.indexOf(String(bigMovieMatch?.params.rate));
	const data = getMovies[index];

	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.results.find(
			(movie) => String(movie.id) === bigMovieMatch.params.movieId
		);
	console.log(clickedMovie);

	return (
		<AnimatePresence>
			<>
				<Overlay
					onClick={onOverlayClick}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				/>
				<BigMovie
					layoutId={`${bigMovieMatch?.params.content}+${bigMovieMatch?.params.rate}+${bigMovieMatch?.params.movieId}`}
				>
					{clickedMovie && (
						<>
							<BigCover
								style={{
									backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${makeImagePath(
										clickedMovie.backdrop_path
									)})`,
								}}
							/>
							<BigTitle>Title: {clickedMovie.name}</BigTitle>
							<BigOverview>
								<div>
									<DetailTitle>Overview</DetailTitle>
									<Detail style={{ marginTop: "20px" }}>
										{clickedMovie.overview}
									</Detail>
								</div>
								<div style={{ margin: "0 auto" }}>
									<DetailBox>
										<DetailTitle>Release Date</DetailTitle>
										<Detail>
											{clickedMovie.release_date}
										</Detail>
									</DetailBox>
									<DetailBox>
										<DetailTitle>Vote Average</DetailTitle>
										<Detail>
											★ {clickedMovie.vote_average}
										</Detail>
									</DetailBox>
									<DetailBox>
										<DetailTitle>Vote Count </DetailTitle>
										<Detail>
											{clickedMovie.vote_count}
										</Detail>
									</DetailBox>
								</div>
							</BigOverview>
						</>
					)}
				</BigMovie>
			</>
		</AnimatePresence>
	);
}
export default Modal;
