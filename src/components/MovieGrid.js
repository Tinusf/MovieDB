import React from "react";
import styled from "styled-components";
import MovieGridItem from "./MovieGridItem";

/*

Display information about a movie. Should be viewed in "fullscreen"

*/
const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  padding-top: 70px;
`;

class MovieGrid extends React.Component {
  render() {
    const movies = [
      {
        name: "The walking dead",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      },
      {
        name: "Test",
        url: "https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg"
      }
    ];

    const movieItems = movies.map(movie => <MovieGridItem name={movie.name} url={movie.url} />);
    movieItems.push(Array.from(new Array(10), item => <MovieGridItem />));

    return (
      <div>
        <Grid>{movieItems}</Grid>
      </div>
    );
  }
}

export default MovieGrid;
