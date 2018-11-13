import React from "react";
import styled from "styled-components";
import MovieGridItem from "./MovieGridItem";
import { runGraphQLQuery } from "../utils/Utils";
import MovieView from "./MovieView";
import { connect } from "react-redux";
import { setView } from "../store/actions/MovieActions";

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
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateView = movieId => {
    this.props.dispatch(setView("movieview"));
    this.setState({ chosenMovieId: movieId });
  };

  render() {
    let movieItems;
    if (this.props.moviesData) {
      movieItems = this.props.moviesData.map((movie, i) => (
        <MovieGridItem
          key={i}
          name={movie.title}
          url={"https://image.tmdb.org/t/p/w1280/" + movie.poster_path}
          movieId={movie.id}
          onClick={e => this.updateView(movie.id)}
        />
      ));
      // For å få alle fint til venstre så må vi legge til noen ghost items.
      movieItems.push(Array.from(new Array(10), (item, index) => <MovieGridItem ghost={true} url={"./noposter.png"} key={index + 1000} />));
    }

    return (
      <div>
        {this.state.chosenMovieId && <MovieView movieId={this.state.chosenMovieId} />}
        {!this.state.chosenMovieId && <Grid>{movieItems}</Grid>}
      </div>
    );
  }
}

export default connect(state => ({ moviesData: state.movies.movies }))(MovieGrid);
