import { useNavigate, PathMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import {
	getNowMovies,
	getTopMovies,
	getUpcomingMovies,
	IGetMoviesResult,
} from "../api";

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: fixed;
	width: 50vw;
	height: 90vh;
	top: 50px;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: ${(props) => props.theme.black.lighter};
	border-radius: 20px;
	overflow: hidden;
`;

const BigCover = styled.div`
	background-size: 100% 100%;
	width: 100%;
	height: 65%;
`;
const BigTitle = styled.h3`
	position: relative;
	top: -60px;
	color: ${(props) => props.theme.white.lighter};
	text-align: center;
	font-size: 30px;
	margin: 10px 0;
`;

const BigOverview = styled.p`
	padding: 10px;
	color: ${(props) => props.theme.white.lighter};
`;
interface IModalProps {
	bigMovieMatch: PathMatch<string> | null;
}
function Modal({ bigMovieMatch }: IModalProps) {
	const history = useNavigate();
	const onOverlayClick = () => history("/");
	const getContent = ["now_playing", "top_rated", "upcoming"];
	const { data: dataNow } = useQuery<IGetMoviesResult>(
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
	const index = getContent.indexOf(String(bigMovieMatch?.params.rate));
	const data = getMovies[index];

	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.results.find(
			(movie) => String(movie.id) === bigMovieMatch.params.movieId
		);

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
							<BigTitle>{clickedMovie.title}</BigTitle>
							<BigOverview>{clickedMovie.overview}</BigOverview>
						</>
					)}
				</BigMovie>
			</>
		</AnimatePresence>
	);
}
export default Modal;
