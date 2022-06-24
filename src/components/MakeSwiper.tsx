import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IGetMoviesResult, IGetTvResult } from "../api";
import { makeImagePath } from "../utils";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/virtual";

const NaviBtn = styled.div`
	width: 70px;
	height: 70px;
	position: absolute;
	top: 50%;
	z-index: 20;
	transform: translateY(-50%);
	line-height: 85px;
	font-size: 50px;
	text-align: center;
	border-radius: 35px;
	background-color: rgba(113, 111, 129, 0.5);
	cursor: pointer;
`;

interface ISwiperStyle {
	width: string;
	height: string;
	top: string;
	marginBottom: string;
	overflow: string;
}
const SwiperStyle: ISwiperStyle = {
	width: "95%",
	height: "300px",
	top: "-100px",
	marginBottom: "50px",
	overflow: "visible",
};
interface IContentProps {
	rate?: string;
	content?: string;
	data?: IGetMoviesResult | IGetTvResult;
}

const BoxesVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.5,
		y: -30,
		zIndex: 105,
		transition: {
			delay: 0.2,
			type: "linear",
			duration: 0.3,
		},
	},
};

function MakeSwiper({ data, content, rate }: IContentProps) {
	const history = useNavigate();
	const onBoxClicked = (movieId: number) => {
		history(`/${content}/${rate}/${movieId}`);
	};
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);

	return (
		<Swiper
			style={SwiperStyle}
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			navigation={{
				prevEl: navigationPrevRef.current,
				nextEl: navigationNextRef.current,
			}}
			spaceBetween={40}
			slidesPerView={6}
		>
			{data?.results.slice(1).map((movie, idx) => (
				<SwiperSlide key={movie.id}>
					<motion.div
						layoutId={`${content}+${rate}+${movie.id}`}
						variants={BoxesVariants}
						whileHover="hover"
						onClick={() => onBoxClicked(movie.id)}
						style={{
							position: "relative",
							width: "100%",
							height: "100%",
							background: `url(${makeImagePath(
								movie.poster_path
									? movie.poster_path
									: movie.backdrop_path
							)}) no-repeat center / 100% 100%`,
							cursor: "pointer",
						}}
					></motion.div>
				</SwiperSlide>
			))}
			<NaviBtn style={{ left: "-31px" }} ref={navigationPrevRef}>
				<HiOutlineChevronLeft />
			</NaviBtn>
			<NaviBtn style={{ right: "-31px" }} ref={navigationNextRef}>
				<HiOutlineChevronRight />
			</NaviBtn>
		</Swiper>
	);
}

export default MakeSwiper;
