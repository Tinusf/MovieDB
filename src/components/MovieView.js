import React from "react";
import { runGraphQLQuery, castCrewStringToJson } from "../utils/Utils";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import MovieRating from "./MovieRating";

import StarRate from "@material-ui/icons/StarRate";
import C3Chart from "react-c3js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

import "c3/c3.css";
import { format } from "url";

const uuidv1 = require("uuid/v1");

/*

Display detailed information about a movie in a single page.

*/
class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  runMovieQuery = movieId => {
    const query = `
    query MovieView_Query($movieId: Int!) {
      movie(id: $movieId) {
        title
        budget
        homepage
        imdb_id
        poster_path
        overview
        release_date
        vote_average
        vote_count
      }
    }`;
    runGraphQLQuery(query, { movieId }).then(data => {
      this.setState({ movieMetaData: data.movie });
    });
  };

  calculateAverageRating = () => {
    // calculate what the average rating for a specific movie is using the graphData.
    // The reason we don't just use the vote_average column in the database is because that one is outdated and we never update it.
    if (this.state.graphData) {
      let sumScores = 0;
      let ratingCount = 0;
      for (let i = 1; i < this.state.graphData.columns[0].length; i++) {
        let rating = this.state.graphData.columns[0][i];
        let count = this.state.graphData.columns[1][i];
        ratingCount += count;
        sumScores += rating * count;
      }
      return (sumScores / ratingCount).toFixed(1);
    }
    return "-";
  };

  getYourRatingForAMovieQuery = (movieId, userId) => {
    const query = `
    query rating($movieId: Int!, $userId: String!) {
      rating(movieId: $movieId, userId: $userId) {
        rating
      }
    }`;
    runGraphQLQuery(query, { movieId, userId }).then(data => {
      // Bare lagre til state om du har faktisk ratet denne filmen.
      if (data !== null && data.rating) {
        this.setState({ myRating: data.rating.rating * 2 });
      }
    });
  };

  getRatingsForAMovieQuery = movieId => {
    const query2 = `
    query ratingsForAMovieQuery($movieId: Int!) {
          ratingsForAMovie(movieId: $movieId) {
          rating
        count
        }
      }`;
    runGraphQLQuery(query2, { movieId })
      .then(data => data.ratingsForAMovie)
      .then(data => {
        // Lager to tomme arrays
        let ratings = ["Rating", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let xValues = ["x", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // Går gjennom hvert element i arrayet jeg fikk fra serveren og legger til rating verdi
        data.forEach(rating => (ratings[rating.rating * 2] = rating.count));

        // Så setter jeg state og dette blir på riktig c3js format så grafen ser fin ut.
        this.setState({
          graphData: {
            x: "x",
            columns: [xValues, ratings],
            type: "bar",
            colors: {
              Rating: "#ffffff"
            }
          }
        });
      });
  };

  runCastCrewQuery = movieId => {
    const query = `
    query castAndCrewQuery($movieId: Int!) {
      credits(id: $movieId) {
        crew
        cast
      }
    }`;
    runGraphQLQuery(query, { movieId }).then(data => {
      const cast = castCrewStringToJson(data.credits.cast);
      const crew = castCrewStringToJson(data.credits.crew);
      this.setState({ movieCast: cast });
      this.setState({ movieCrew: crew });
    });
  };

  ratingHasUpdated = () => {
    this.getYourRatingForAMovieQuery(this.props.movieId, this.getUserId());
    this.getRatingsForAMovieQuery(this.props.movieId);
  };

  render() {
    const Container = styled.div`
      background-size: cover;
      background-size: cover;
      background-position: center;
      height: 100%;
    `;

    const MoviePoster = styled.img`
      max-width: 100%;
      max-height: 500px;
      margin: 30px;
      width: 300px;
      margin-left: 0px;
      border-radius: 4px;
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    `;

    const LeftSection = styled.div`
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-content: flex-start;
    `;

    const MovieContainer = styled.div`
      background: radial-gradient(circle at 20% 50%, rgba(77, 50, 77, 0.85) 0%, rgba(49, 70, 81, 0.68) 100%);
      height: 100%;
      min-height: 100vh
      padding-top: 70px;
    `;

    const MovieInfo = styled.div`
      margin: auto;
      padding-top: 50px;
      width: 80%;
      display: flex;
      justify-content: center
      flex-wrap: wrap;
    `;
    const MovieDetails = styled.div`
      margin: 30px;
      color: white;
      max-width: 90%;
    `;
    const Row = styled.div`
      display: flex;
    `;
    const Section = styled.div`
      margin-bottom: 35px;
    `;

    const fontStyle = {
      color: "white",
      textAlign: "left"
    };

    let crewRow;
    if (this.state.movieCrew) {
      crewRow = this.state.movieCrew.map((crew, index) => {
        return (
          <div style={{ marginRight: "30px" }} key={index}>
            <Typography style={{ ...fontStyle }} variant="subtitle2" gutterBottom>
              {crew.name}
            </Typography>
            <Typography style={{ ...fontStyle }} variant="body1" gutterBottom>
              {crew.job}
            </Typography>
          </div>
        );
      });
    }

    let castRow;
    if (this.state.movieCast) {
      castRow = this.state.movieCast.map((cast, index) => {
        return (
          <div style={{ marginRight: "30px" }} key={index}>
            <Typography style={{ ...fontStyle }} variant="subtitle2" gutterBottom>
              {cast.name}
            </Typography>
            <Typography style={{ ...fontStyle }} variant="body1" gutterBottom>
              {cast.character}
            </Typography>
          </div>
        );
      });
    }

    const url = this.state.movieMetaData ? this.state.movieMetaData.poster_path : "error.jpg";
    return (
      <Container
        style={{
          backgroundImage: "url('https://image.tmdb.org/t/p/w1280/" + url + "')"
        }}
      >
        <MovieContainer>
          {this.state.movieMetaData && (
            <MovieInfo>
              <LeftSection>
                <MoviePoster src={"https://image.tmdb.org/t/p/w1280/" + this.state.movieMetaData.poster_path} />
                <Section>
                  <Row>
                    <Button
                      className="imdbButton"
                      style={{ marginRight: 10 }}
                      variant="contained"
                      color="primary"
                      onClick={e => window.open("https://www.imdb.com/title/" + this.state.movieMetaData.imdb_id, "_blank")}
                    >
                      IMDB link
                    </Button>
                    <Button
                      className="tmbdButton"
                      style={{ marginRight: 10 }}
                      variant="contained"
                      color="primary"
                      onClick={e => window.open("https://www.themoviedb.org/movie/" + this.props.movieId, "_blank")}
                    >
                      TMDB link
                    </Button>
                  </Row>
                </Section>
                {this.state.graphData && (
                  <Section>
                    <Row style={{ alignItems: "flex-end" }}>
                      <StarRate style={{ fontSize: 65, color: this.state.myRating ? "#ff9800" : "white" }} />
                      <Typography style={{ ...fontStyle, fontSize: 30 }} variant="subtitle2" gutterBottom>
                        {this.calculateAverageRating()}
                      </Typography>
                      <Typography style={{ ...fontStyle, fontSize: 15, marginBottom: 17 }} variant="subtitle2" gutterBottom>
                        / 10
                      </Typography>
                    </Row>
                    {this.state.myRating && (
                      <Row>
                        <Typography style={{ ...fontStyle, fontSize: 30 }} variant="subtitle2" gutterBottom className="myRating">
                          {"Your rating " + this.state.myRating}
                        </Typography>
                        <Typography style={{ ...fontStyle, fontSize: 15, position: "relative", bottom: "-16px" }} variant="subtitle2" gutterBottom>
                          / 10
                        </Typography>
                      </Row>
                    )}
                    {!this.state.myRating && (
                      <Row>
                        <MovieRating userId={this.getUserId()} movieId={this.props.movieId} ratingHasUpdated={this.ratingHasUpdated} />

                        <Row />
                      </Row>
                    )}
                  </Section>
                )}
              </LeftSection>

              <MovieDetails>
                <Section>
                  <Typography style={{ ...fontStyle }} variant="h4" color="white" gutterBottom className="title">
                    {this.state.movieMetaData.title}
                    <Typography style={{ ...fontStyle }} variant="h5" gutterBottom>
                      {this.state.movieMetaData.release_date}
                    </Typography>
                  </Typography>
                </Section>
                <Section>
                  <Typography style={{ ...fontStyle }} variant="h6" gutterBottom>
                    Overview
                  </Typography>
                  <Typography style={{ ...fontStyle, width: "700px", maxWidth: "100%" }} variant="body1" gutterBottom className="overView">
                    {this.state.movieMetaData.overview}
                  </Typography>
                </Section>
                {this.state.movieCrew && (
                  <Section>
                    <Typography style={{ ...fontStyle }} variant="h6" gutterBottom>
                      Crew
                    </Typography>
                    <Row>{crewRow}</Row>
                  </Section>
                )}
                {this.state.movieCast && (
                  <Section>
                    <Typography style={{ ...fontStyle }} variant="h6" gutterBottom>
                      Cast
                    </Typography>
                    <Row>{castRow}</Row>
                  </Section>
                )}
                <Section>
                  <Row style={{ color: "black" }}>
                    {this.state.graphData && <C3Chart data={this.state.graphData} style={{ maxWidth: "100%", margin: "0px", padding: "0px" }} />}
                    {!this.state.graphData && <CircularProgress style={{ color: "white" }} />}
                  </Row>
                </Section>
              </MovieDetails>
            </MovieInfo>
          )}
          {!this.state.movieMetaData && <CircularProgress style={{ color: "white" }} />}
        </MovieContainer>
      </Container>
    );
  }

  getUserId = () => {
    // Denne funksjonen henter/ lager en unik userId.
    // Sjekk først om den er i state, hvis ikke sjekk om den er i localstorage, hvis ikke lag ny.
    if (this.state.userId !== undefined) {
      return this.state.userId;
    }
    const storedID = localStorage.getItem("userId");
    if (storedID !== null) {
      this.setState({ userId: storedID });
      return storedID;
    }
    const id = uuidv1();
    localStorage.setItem("userId", id);
    this.setState({ userId: id });
    return id;
  };

  componentDidMount() {
    this.runMovieQuery(this.props.movieId);
    this.runCastCrewQuery(this.props.movieId);
    this.getRatingsForAMovieQuery(this.props.movieId);
    this.getYourRatingForAMovieQuery(this.props.movieId, this.getUserId());
  }
}

export default connect(state => ({ viewName: state.movies.viewName }))(MovieView);
