import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { IGetMoviesResult, searchMovie, searchTv } from "../api";
import { makeImagePath } from "../utils";

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const BoxWrap = styled.div`
	width: 95%;
	margin: 0 auto;
	margin-top: 200px;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 20px;
`;
const Box = styled(motion.div)<{ bg: string }>`
	height: 380px;
	background: url(${(props) => makeImagePath(props.bg)}) no-repeat center /
		100% 100%;
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

	const { data: searchMovieData, isLoading: isLoadingMovie } =
		useQuery<IGetMoviesResult>(["movies", "searched"], () =>
			searchMovie(keyword)
		);
	const { data: searchTDatav, isLoading: isLoadingTv } =
		useQuery<IGetMoviesResult>(["tv", "searched"], () => searchTv(keyword));

	const setContent = () => {
		setIsMovie((prev) => !prev);
	};

	return (
		<>
			<BtnBox>
				<SetMovieBtn isMovie={isMovie} onClick={setContent}>
					MOVIE
				</SetMovieBtn>
				<SetTvBtn isMovie={isMovie} onClick={setContent}>
					TV SHOW
				</SetTvBtn>
			</BtnBox>
			{isMovie ? (
				isLoadingMovie ? (
					<Loader>Loading...</Loader>
				) : (
					<BoxWrap>
						{searchMovieData?.results.map((movie, idx) => (
							<Box
								key={idx}
								bg={
									movie.poster_path
										? movie.poster_path
										: movie.backdrop_path
								}
							/>
						))}
					</BoxWrap>
				)
			) : isLoadingTv ? (
				<Loader>Loading...</Loader>
			) : (
				<BoxWrap>
					{searchTDatav?.results.map((tv, idx) => (
						<Box
							key={idx}
							bg={
								tv.poster_path
									? tv.poster_path
									: tv.backdrop_path
							}
						/>
					))}
				</BoxWrap>
			)}
		</>
	);
}
export default Search;
