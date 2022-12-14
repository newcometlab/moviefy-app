import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MovieType } from '../Components/Movie';
import MovieDetail, { POSTER_PATH } from '../Components/MovieDetail';

// Initialize jest-fetch-mock for mock api calls
global.fetch = require('jest-fetch-mock');

// After each test, clear the mockErrors
afterEach(() => {
  cleanup();
});

// This builds out the fake mock route that the compnents utilizies
const match = {
  params: {
    id: 'hello',
  },
};

// This is the fake json object we would recieve from our API
const movie: MovieType = {
  id: 'hi',
  title: 'Star Wars',
  release_date: 'yesterday',
  poster_path: `${POSTER_PATH}PostImage`,
  backdrop_path: 'backdropPath',
  overview: 'some over view of movie',
};

test('<MovieDetail>', async () => {
  // Fake Api call to grab our movie data
  /* @ts-ignore */
  fetch.mockResponseOnce(JSON.stringify(movie));

  const { getByTestId } = render(<MovieDetail match={match} />);
  // await for the movie api call to fire first
  await waitForElement(() => getByTestId('movie-title'));
  // We expect the text content of our movie title to be what comes from our api call
  expect(getByTestId('movie-title').textContent).toBe(movie.title);
});
