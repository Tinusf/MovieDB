import React from "react";
import { runGraphQLQuery } from "../utils/Utils";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import StarRate from "@material-ui/icons/StarRate";
import C3Chart from "react-c3js";
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

  runMovieQuery = (movieId) => {
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
    runGraphQLQuery(query, { movieId })
      .then(data => {
        this.setState({ movieMetaData: data.movie });
      });
  }

  castCrewStringToJson = (inputString) => {
    // Beklager veldig stygg hack, men noe av dataen i databasen vår er så rart formatert at vi må gjøre dette.
    // Hadde vi startet på nytt hadde vi brukt lenger tid til å finne finere dataset uten alt dette tullet her.

    // Pga dataen var på rart format i SQL databasen vår må vi håndtere det her.
    // Bytter ut ' med " og bytter ut None med null etc etc.
    // Fikk også problemer med at data var slik i databasen: 
    // 'name': "Kelly O'Connell"
    // Dette skaper problemer når jeg replacer alle. 
    // for å fikse:
    // 'name': "Kelly O'Connell"
    // finn index til første " og gå gjennom helt du finner index til ' og så fjerne ' tegnet.

    // De bruker bare " i databasen om det er navn som inneholder '.
    let doublyIndex = inputString.indexOf('"');
    // while istedenfor if i tilfelle det er flere tilfeller av dette i samme string.
    while (doublyIndex >= 0) {
      let index = doublyIndex + 1;
      let howManySingly = 0;
      let lastDoublyIndex = 0;
      while (true) {
        if (inputString[index] === "'") {
          howManySingly++;
        } else if (inputString[index] === '"') {
          lastDoublyIndex = index;
          break;
        }
        index++;
      }
      // Strings er immutable... så det blir litt stygg kode her.
      // Dette er delen av stringen før første "
      const start = inputString.substr(0, doublyIndex) + "'"
      // Dette er mellom "ene. Så tar jeg split og join som gjør at jeg replacer alle ' med ingenting.
      const withoutSingly = inputString.substr(doublyIndex + 1, lastDoublyIndex - doublyIndex - howManySingly).split("'").join("") + "'";
      // Dette er resten av stringen.
      const end = inputString.substr(lastDoublyIndex + 1);
      // Setter tilbake til inputString
      inputString = start + withoutSingly + end;
      // Sjekker om det er flere jeg må gjøre dette med.
      doublyIndex = inputString.indexOf('"');
    }

    // split og join blir som replaceAll. 
    const formattedCast = inputString.split("'").join('"').split("None").join("null");
    // Vi velger bare de 3 første (om de ikke har 3 blir det så mange som de har).
    return JSON.parse(formattedCast).slice(0, 3);
  }

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
    return 0.0;
  }

  getYourRatingForAMovieQuery = (movieId, userId) => {
    const query = `
    query rating($movieId: Int!, $userId: String!) {
      rating(movieId: $movieId, userId: $userId) {
        rating
      }
    }`;
    runGraphQLQuery(query, { movieId, userId })
      .then(data => {
        // Bare lagre til state om du har faktisk ratet denne filmen.
        if (data !== null) {
          this.setState({ myRating: data.rating.rating * 2 })
        }
      });
  }

  getRatingsForAMovieQuery = (movieId) => {
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
        let ratings = ["Rating"];
        let xValues = ["x"];
        // Går gjennom hvert element i arrayet jeg fikk fra serveren.
        data.forEach(rating => {
          // Legger til verdiene i arrayene mine over.
          ratings.push(rating.count);
          xValues.push(rating.rating * 2);
        });
        // Så setter jeg state og dette blir på riktig c3js format så grafen ser fin ut.
        this.setState({
          graphData: {
            x: "x",
            columns: [xValues, ratings]
          }
        });
      });
  }

  runCastCrewQuery = (movieId) => {
    const query = `
    query castAndCrewQuery($movieId: Int!) {
      credits(id: $movieId) {
        crew
        cast
      }
    }`;
    runGraphQLQuery(query, { movieId })
      .then(data => {
        const cast = this.castCrewStringToJson(data.credits.cast);
        const crew = this.castCrewStringToJson(data.credits.crew);
        this.setState({ movieCast: cast });
        this.setState({ movieCrew: crew });
      });
  }

  render() {
    const Container = styled.div`
      background-size: cover;
    `;

    const MoviePoster = styled.img`
      height: 500px;
      margin: 30px;
      border-radius: 4px;
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    `;

    const MovieContainer = styled.div`
      background: radial-gradient(circle at 20% 50%, rgba(77, 50, 77, 0.85) 0%, rgba(49, 70, 81, 0.68) 100%);
      height: 100vh;
    `;

    const MovieInfo = styled.div`
      margin: auto;
      padding-top: 50px;
      width: 80%;
      display: flex;
    `;
    const MovieDetails = styled.div`
      margin: 30px;
      color: white;
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
      <Container style={{
        background: "url('https://image.tmdb.org/t/p/w1280/" + url + "')"
      }
      }>
        <MovieContainer>
          {this.state.movieMetaData &&
            <MovieInfo>
              <div>
                <MoviePoster src={"https://image.tmdb.org/t/p/w1280/" + this.state.movieMetaData.poster_path} />
              </div>

              <MovieDetails>
                <Section>
                  <Typography style={{ ...fontStyle }} variant="h4" color="white" gutterBottom>
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
                  <Typography style={{ ...fontStyle }} variant="body1" gutterBottom>
                    {this.state.movieMetaData.overview}
                  </Typography>
                </Section>
                {this.state.movieCrew &&
                  <Section>
                    <Typography style={{ ...fontStyle }} variant="h6" gutterBottom>
                      Crew
                    </Typography>
                    <Row>
                      {crewRow}
                    </Row>
                  </Section>
                }
                {this.state.movieCast &&
                  <Section>
                    <Typography style={{ ...fontStyle }} variant="h6" gutterBottom>
                      Cast
                    </Typography>
                    <Row>
                      {castRow}
                    </Row>
                  </Section>
                }
                <Section>
                  <Row>
                    <Button style={{ marginRight: 10 }} variant="contained" color="primary"
                      onClick={e => window.open("https://www.imdb.com/title/" + this.state.movieMetaData.imdb_id, '_blank')}>
                      IMDB link
                    </Button>
                    <Button style={{ marginRight: 10 }} variant="contained" color="primary"
                      onClick={e => window.open("https://www.themoviedb.org/movie/" + this.props.movieId, '_blank')}>
                      TMDB link
                  </Button>
                  </Row>
                </Section>

                <Section>
                  <Row style={{ alignItems: "flex-end" }}>
                    <StarRate style={{ fontSize: 65, color: "gray" }} />
                    <Typography style={{ ...fontStyle, fontSize: 30 }} variant="subtitle2" gutterBottom>
                      {this.calculateAverageRating()}
                    </Typography>
                    <Typography style={{ ...fontStyle, fontSize: 15, marginBottom: 17 }} variant="subtitle2" gutterBottom>
                      / 10
                    </Typography>
                    <Typography style={{ ...fontStyle, fontSize: 40, marginBottom: 0, marginLeft: 10 }} variant="subtitle2" gutterBottom>
                      |
                  </Typography>
                    <StarRate style={{ fontSize: 65, color: "#3b4fbc" }} />
                    <Typography style={{ ...fontStyle, fontSize: 30 }} variant="subtitle2" gutterBottom>
                      {this.state.myRating && "Your rating " + this.state.myRating}
                      {!this.state.myRating && "Not rated by you"}
                    </Typography>
                    <Typography style={{ ...fontStyle, fontSize: 15, marginBottom: 17 }} variant="subtitle2" gutterBottom>
                      / 10
                  </Typography>
                  </Row>
                </Section>
                <Section>
                  <Row style={{ color: "black" }}>{this.state.graphData && <C3Chart data={this.state.graphData} />}</Row>
                </Section>
              </MovieDetails>
            </MovieInfo>
          }
          {!this.state.movieMetaData &&
            <p>LOADING</p>
          }
        </MovieContainer>
      </Container >
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

export default MovieView;
