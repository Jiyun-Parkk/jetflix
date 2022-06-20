import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { Index, IsLeaving, windowSize } from "../atoms";
import { getMovies, IGetMoviesResult, IMovie } from "../api";
import { makeImagePath } from "../utils";

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

function ContentSlider() {
	const history = useNavigate();

	const offset = 6;
	const [index, setIndex] = useRecoilState(Index);
	const [leaving, setLeaving] = useRecoilState(IsLeaving);
	const { data } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMovies
	);
	const toggleLeaving = () => setLeaving((prev) => !prev);
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
	const onBoxClicked = (movieId: number) => {
		history(`/movies/${movieId}`);
	};

	return (
		<Slider>
			{/* onExitComplete animation이 끝나면 다시 False로 변환하도록 함수 호출 */}
			{/* initial={false} => 초기에 애니메이션이 실행되지 않도록 해준다 */}
			<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
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
						.slice(offset * index, offset * index + offset)
						.map((movie) => (
							// 부모 컴포넌트가 variants를 가지고 있으면 동일한 키 이름을(이벤트의) 가진 variants를 자식컴포넌트에 넣어주면 이벤트가 상속이 된다. 그래서 아래 컴포넌트에서 Hover이벤트가 상속이 되어 자식 컴포넌트도 함께 적용된다.
							<Box
								layoutId={movie.id + ""}
								key={movie.id}
								variants={BoxesVariants}
								initial="normal"
								whileHover="hover"
								transition={{ type: "linear" }}
								onClick={() => onBoxClicked(movie.id)}
								$bgPhoto={makeImagePath(movie.backdrop_path)}
							>
								<Info variants={infoVariants}>
									<h4>{movie.title}</h4>
								</Info>
							</Box>
						))}
				</Row>
			</AnimatePresence>
		</Slider>
	);
}

export default ContentSlider;
