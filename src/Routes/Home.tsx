import { useState, useEffect } from "react";
import { useMatch, useNavigate, PathMatch } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult, IMovie } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useRecoilState } from "recoil";
import { windowSize } from "../atoms";

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

// slider
const Slider = styled.div`
	position: relative;
	top: -100px;
`;
const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;
const Box = styled(motion.div)<{ $bgPhoto: string }>`
	background-image: url(${(props) => props.$bgPhoto});
	background-size: 100% 100%;
	height: 200px;
	font-size: 25px;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;
const Info = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	padding: 10px;
	background-color: ${(props) => props.theme.black.darker};
	opacity: 0;
	h4 {
		text-align: center;
		font-size: 16px;
	}
`;

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
	width: 80vw;
	height: 80vh;
	top: 50px;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: ${(props) => props.theme.black.lighter};
	border-radius: 20px;
	overflow: hidden;
`;

const BigCover = styled.div`
	background-size: cover;
	width: 100%;
	height: 50%;
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
const BoxesVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.5,
		y: -30,
		transition: {
			delay: 0.2,
			type: "linear",
			duration: 0.3,
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.2,
			type: "linear",
			duration: 0.3,
		},
	},
};

function Home() {
	const history = useNavigate();
	const { scrollY } = useViewportScroll();
	const bigMovieMatch: PathMatch<string> | null =
		useMatch("/movies/:movieId");

	const [getWindowSize, setWindowSize] = useRecoilState(windowSize);
	useEffect(() => {
		window.addEventListener("resize", () =>
			setWindowSize((prev) => window.innerWidth)
		);
	}, [getWindowSize]);

	const rowVariants = {
		hidden: {
			x: getWindowSize + 10,
		},
		visible: {
			x: 0,
		},
		exit: {
			x: -getWindowSize - 10,
		},
	};

	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMovies
	);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data?.results.length - 2;
			const maxIndex = Math.ceil(totalMovies / offset) - 1;

			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onBoxClicked = (movieId: number) => {
		history(`/movies/${movieId}`);
	};

	const offset = 6;

	const onOverlayClick = () => history("/");
	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.results.find(
			(movie) => String(movie.id) === bigMovieMatch.params.movieId
		);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						bgPhoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>

					<Slider>
						{/* onExitComplete animation이 끝나면 다시 False로 변환하도록 함수 호출 */}
						{/* initial={false} => 초기에 애니메이션이 실행되지 않도록 해준다 */}
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeaving}
						>
							{/* key가 바뀌면 animatepresene는 새로운 row가 생겼다고 감지하고 새로운 것을 렌더한다 */}
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={index}
							>
								{data?.results
									.slice(1)
									.slice(
										offset * index,
										offset * index + offset
									)
									.map((movie) => (
										// 부모 컴포넌트가 variants를 가지고 있으면 동일한 키 이름을(이벤트의) 가진 variants를 자식컴포넌트에 넣어주면 이벤트가 상속이 된다. 그래서 아래 컴포넌트에서 Hover이벤트가 상속이 되어 자식 컴포넌트도 함께 적용된다.
										<Box
											layoutId={movie.id + ""}
											key={movie.id}
											variants={BoxesVariants}
											initial="normal"
											whileHover="hover"
											transition={{ type: "linear" }}
											onClick={() =>
												onBoxClicked(movie.id)
											}
											$bgPhoto={makeImagePath(
												movie.backdrop_path
											)}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>

					{bigMovieMatch ? (
						<AnimatePresence>
							<>
								<Overlay
									onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
								<BigMovie
									layoutId={bigMovieMatch.params.movieId}
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
											<BigTitle>
												{clickedMovie.title}
											</BigTitle>
											<BigOverview>
												{clickedMovie.overview}
											</BigOverview>
										</>
									)}
								</BigMovie>
							</>
						</AnimatePresence>
					) : null}
				</>
			)}
		</Wrapper>
	);
}
export default Home;
