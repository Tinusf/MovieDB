import React from "react";
import styled from "styled-components";
import MovieGridItem from "./MovieGridItem";
import MovieView from "./MovieView";
import { connect } from "react-redux";
import { setView, loadNewPage } from "../store/actions/MovieActions";
import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@material-ui/core/CircularProgress";

/*

Viser enten et grid med flere thumbsnails for filmer, eller detaljert visning om en film (MovieView)

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

  // Om du trykker på en av thumbsnailsene så blir denne funksjonen kjørt. Den kjører en action setView som endrer hvilket view som er i redux. og den setter state til movieId til filmen du trykket på.
  updateView = movieId => {
    this.props.dispatch(setView("movieview"));
    this.setState({ chosenMovieId: movieId });
  };

  loadMore = () => {
    // Kjøres når du er på bunnen og må laste inn flere filmer.
    this.props.dispatch(loadNewPage(this.props.searchText, this.props.asc, this.props.pagenr, this.props.ordering));
  };

  render() {
    let movieItems;
    if (this.props.moviesData) {
      // her blir movieItems variabelen et array med MovieGridItem's (altså våre thumbnails)
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
