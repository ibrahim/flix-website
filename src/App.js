import React from 'react';
import Slider from './components/NetflixSlider'
import useSWR from 'swr'

import './App.scss'

const fetcher = (...args) => fetch(...args).then(res => res.json())
const App = () => {
	const API_KEY = process.env.REACT_APP_API_KEY
	const url = `https://api.themoviedb.org/3/movie/popular?api_key=${ API_KEY }&language=en-US&page=1`
	
  const { data, error } = useSWR(url, fetcher)
	const [movies, setMovies] = React.useState(null)
	React.useEffect(() => {
		if(data && Array.isArray(data.results) && data.results.length > 0){
			const movies = data.results.map((movie) => ({
				id: movie.id,
				image: "https://image.tmdb.org/t/p/w220_and_h330_face" + movie.poster_path,
				imageBg: "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + movie.backdrop_path,
				title: movie.original_title
			}))
			console.log({movies})
			setMovies(movies)
		}
	},[data])
	if(!API_KEY){
		alert("API KEY is not configured use environment file.")
	}
	const has_movies = Array.isArray(movies)
	return (
		<div className="app">
     {error ? <p style={{ color: "red" }}>{error.message}</p> : null}
		{ has_movies && (
		<Slider>
		{Array.isArray(movies) && movies.map(movie => (
			<Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
		))}
			</Slider>
		)}
		</div>
	);
}

export default App;
