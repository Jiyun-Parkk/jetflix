import styled from "styled-components";
import { AiFillGithub, AiOutlineCopyrightCircle } from "react-icons/ai";

const FoooterBox = styled.footer`
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 120px;
	padding: 20px;
`;
const FooterDetail = styled.div`
	width: 180px;
	margin: 0 auto;
	font-size: 17px;
	text-align: center;
	display: flex;
`;
const FooterInfo = styled.span`
	margin-right: 20px;
	line-height: 80px;
`;
function Footer() {
	return (
		<FoooterBox>
			<FooterDetail>
				<FooterInfo>JIYUN PARK</FooterInfo>
				<a
					href="https://github.com/jiyun-par/jetflix"
					target="_blank"
					style={{
						fontSize: "30px",
						cursor: "pointer",
						display: "inline-block",
						marginTop: "25px",
					}}
				>
					<AiFillGithub></AiFillGithub>
				</a>
			</FooterDetail>
		</FoooterBox>
	);
}

export default Footer;
