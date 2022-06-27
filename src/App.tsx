import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Header";
import { Helmet } from "react-helmet";

function App() {
	return (
		<>
			<Helmet>
				<title>JETFLIX</title>
			</Helmet>
			<GlobalStyle />
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Header />
				<Routes>
					<Route path="/*" element={<Home />}>
						<Route
							path="movies/:rate/:movieId"
							element={<Home />}
						/>
					</Route>
					<Route path="tv/*" element={<Tv />} />
					<Route path="search" element={<Search />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
