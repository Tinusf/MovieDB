import React from "react";
import styled from "styled-components";
import MovieGridItem from "./MovieGridItem";
import { runGraphQLQuery } from "../utils/Utils";
import MovieView from "./MovieView";
import { connect } from "react-redux";
import { setView, loadNewPage } from "../store/actions/MovieActions";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

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

  loadMore = () => {
    this.props.dispatch(loadNewPage(this.props.searchText, this.props.asc, this.props.pagenr, this.props.ordering));
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
        {this.props.viewName && this.props.viewName === "movieview" && <MovieView movieId={this.state.chosenMovieId} />}
        {this.props.viewName && this.props.viewName === "moviegrid" && (
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.props.moreToLoad}
            loader={
              <div className="loader" key={0}>
                <CircularProgress style={{ color: "white" }} />
              </div>
            }
          >
            <Grid>{movieItems}</Grid>
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  searchText: state.movies.searchText,
  asc: state.movies.asc,
  pagenr: state.movies.pagenr,
  ordering: state.movies.ordering,
  moviesData: state.movies.movies,
  moreToLoad: state.movies.moreToLoad,
  viewName: state.movies.viewName
}))(MovieGrid);
