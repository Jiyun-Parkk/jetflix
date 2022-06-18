import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Header";

const Wrapper = styled.div``;

function App() {
	return (
		<>
			<GlobalStyle />
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="tv" element={<Tv />} />
					<Route path="search" element={<Search />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
