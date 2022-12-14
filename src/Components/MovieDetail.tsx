import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { MovieType, Poster } from './Movie';

// Poster_path is the url extension to access the movies poster image
export const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
// Backdrop_path is the url extension to acess the movies backdrop image
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

interface MoviesDetailProps {
  match: {
    params: {
      id: string;
    };
  };
}

const MoviesDetail = ({ match }: MoviesDetailProps) => {
  const [movie, setMovie] = useState<MovieType>();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const result = await fetch(
          `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=2a208bd9217b421273ab1506025ce6e6&language=en-US`,
        );
        // Set movie equal to the json from the fetch
        const movie = await result.json();
        // We then update our state to that movie
        setMovie(movie);
      } catch (err) {
        throw err;
      }
    };

    fetchMovie();
  }, []);

  if (!movie) return null;

  return (
    // Our div is styled to have a background of the movie backdrop from our repsonse
    <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
      <MovieInfo>
        {/* Overdrive is what creates our animations for the page, requires a unique id */}
        <Overdrive id={movie.id}>
          {movie.poster_path ? (
            <Poster
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <p>IMAGE UNAVAIABLE</p>
          )}
        </Overdrive>
        <div>
          <h1 data-testid="movie-title">{movie.title}</h1>
          <p>{movie.overview}</p>
          <h3>{`ReleaseDate: ${movie.release_date}`}</h3>
        </div>
      </MovieInfo>
    </MovieWrapper>
  );
};

export default MoviesDetail;

const MovieWrapper = styled.div`
    position: relative;
    padding-top: 50vh;
    background: url(${props => props.backdrop}) no-repeat
    background-size: cover 
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
