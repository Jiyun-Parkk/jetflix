import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
	*{
		box-sizing:border-box;
	}

	body {
		font-family:'Source Sans Pro', sans-serif;
		color: ${(props) => props.theme.white.darker};
		line-height:1.2;
		background-color : rgba(0,0,0,1);
		overflow-x:hidden;
	}
	a{
		color:inherit;
		text-decoration:none;
	}
	li{
		list-style:none;
	}
	button{
		margin:0;
		padding:0;
		background: transparent;
		border:none;
	}

`;
export default GlobalStyle;
