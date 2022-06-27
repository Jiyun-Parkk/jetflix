import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import GetMovieList from "../components/GetMovieList";
import GetTvList from "../components/GetTvList";
import { useRecoilState } from "recoil";
import { ShowKeyword } from "../atoms";

export const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const BoxWrap = styled.div`
	width: 95%;
	margin: 0 auto;
	margin-top: 200px;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 20px;
	padding-bottom: 150px;
`;
export const Box = styled(motion.div)<{ bg: string }>`
	height: 380px;
	background: ${(props) => props.bg};
	color: #fff;
	font-size: 20px;
	padding: 10px;
	line-height: 370px;
`;
const BtnBox = styled.div`
	height: 80px;
	position: relative;
	top: 120px;
`;
const SetBtn = styled.button`
	width: 100px;
	height: 50px;
	color: #fff;
	margin: 0 20px;
	border: 1px solid #fff;
	border-radius: 20px;
	cursor: pointer;
	font-weight: 600;
`;
const SetMovieBtn = styled(SetBtn)<{ isMovie: boolean }>`
	margin-left: 60px;
	background: ${(props) => props.isMovie && "rgb(252, 248, 232)"};
	color: ${(props) => props.isMovie && "#000"};
`;
const SetTvBtn = styled(SetBtn)<{ isMovie: boolean }>`
	background: ${(props) => !props.isMovie && "rgb(252, 248, 232)"};
	color: ${(props) => !props.isMovie && "#000"};
`;

function Search() {
	const location = useLocation();
	const [isMovie, setIsMovie] = useState(true);
	const keyword = new URLSearchParams(location.search).get("keyword");
	const [key, setKeyword] = useRecoilState(ShowKeyword);
	console.log(key);

	return (
		<>
			<BtnBox>
				<SetMovieBtn
					isMovie={isMovie}
					onClick={() => {
						setIsMovie(true);
					}}
				>
					MOVIE
				</SetMovieBtn>
				<SetTvBtn isMovie={isMovie} onClick={() => setIsMovie(false)}>
					TV SHOW
				</SetTvBtn>
			</BtnBox>
			{isMovie ? (
				<GetMovieList searchKey={key ? key : keyword} />
			) : (
				<GetTvList searchKey={key ? key : keyword} />
			)}
		</>
	);
}
export default Search;
