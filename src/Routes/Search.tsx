import { useLocation } from "react-router-dom";
//https://api.themoviedb.org/3/search/movie?api_key=9617ae0d2cf3dd9e864493e4307477da&query=harry&page=1
function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");
	console.log(keyword);
	return null;
}
export default Search;
