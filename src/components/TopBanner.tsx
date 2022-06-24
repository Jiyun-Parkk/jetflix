import styled from "styled-components";
import { IGetTvResult, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

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
interface Topbanner {
	data?: IGetMoviesResult | IGetTvResult;
}

function TopBanner(data: Topbanner) {
	return (
		<Banner
			bgPhoto={
				data
					? makeImagePath(data.data?.results[0].backdrop_path || "")
					: ""
			}
		>
			<Title>{data.data?.results[0].title}</Title>
			<Overview>{data.data?.results[0].overview}</Overview>
		</Banner>
	);
}

export default TopBanner;
