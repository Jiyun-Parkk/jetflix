import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
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
				<Footer />
			</BrowserRouter>
		</>
	);
}

export default App;
