const API_KEY = "9617ae0d2cf3dd9e864493e4307477da";
const BASE_PATH = "https://api.themoviedb.org";

export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
}

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}
export interface IGetTvResult {
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export function getNowMovies() {
	return fetch(`${BASE_PATH}/3/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
export function getTopMovies() {
	return fetch(`${BASE_PATH}/3/movie/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
export function getUpcomingMovies() {
	return fetch(`${BASE_PATH}/3/movie/upcoming?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function topRateTv() {
	return fetch(`${BASE_PATH}/3/tv/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
export function airingTv() {
	return fetch(`${BASE_PATH}/3/tv/airing_today?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
export function popularTv() {
	return fetch(`${BASE_PATH}/3/tv/popular?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
export function searchMovie(searchWord: string | null) {
	return fetch(
		`${BASE_PATH}/3/search/movie?api_key=${API_KEY}&query=${searchWord}`
	).then((response) => response.json());
}
export function searchTv(searchWord: string | null) {
	return fetch(
		`${BASE_PATH}/3/search/tv?api_key=${API_KEY}&query=${searchWord}`
	).then((response) => response.json());
}
