import React from "react";
import { runGraphQLQuery } from "../utils/Utils";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import StarRate from "@material-ui/icons/StarRate";
import C3Chart from "react-c3js";
import "c3/c3.css";

const uuidv1 = require("uuid/v1");
/*

Display detailed information about a movie in a single page.

*/
class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Container = styled.div`
      background: url("https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg");
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

    //this.testx()
    return (
      <Container>
        <MovieContainer>
          <MovieInfo>
            <div>
              <MoviePoster src="https://image.tmdb.org/t/p/w1280/yn7psGTZsHumHOkLUmYpyrIcA2G.jpg" />
            </div>

            <MovieDetails>
              <Section>
                <Typography style={{ ...fontStyle }} variant="h4" color="white" gutterBottom>
                  Movie title
                  <Typography style={{ ...fontStyle }} variant="h5" gutterBottom>
                    (2010)
                  </Typography>
                </Typography>
              </Section>
              <Section>
                <Typography style={{ ...fontStyle }} variant="h6" gutterBottom>
                  Overview
                </Typography>
                <Typography style={{ ...fontStyle }} variant="body1" gutterBottom>
                  Body overview text
                </Typography>
              </Section>
              <Section>
                <Typography style={{ ...fontStyle }} variant="h6" gutterBottom>
                  Crew
                </Typography>
                <Row>
                  <div style={{ marginRight: "30px" }}>
                    <Typography style={{ ...fontStyle }} variant="subtitle2" gutterBottom>
                      Person 1
                    </Typography>
                    <Typography style={{ ...fontStyle }} variant="body1" gutterBottom>
                      Title
                    </Typography>
                  </div>
                  <div style={{ marginRight: "30px" }}>
                    <Typography style={{ ...fontStyle }} variant="subtitle2" gutterBottom>
                      Person 2
                    </Typography>
                    <Typography style={{ ...fontStyle }} variant="body1" gutterBottom>
                      Title
                    </Typography>
                  </div>
                  <div style={{ marginRight: "30px" }}>
                    <Typography style={{ ...fontStyle }} variant="subtitle2" gutterBottom>
                      Person 3
                    </Typography>
                    <Typography style={{ ...fontStyle }} variant="body1" gutterBottom>
                      Title
                    </Typography>
                  </div>
                </Row>
              </Section>

              <Section>
                <Row>
                  <Button style={{ marginRight: 10 }} variant="contained" color="primary">
                    IMDB link
                  </Button>
                  <Button style={{ marginRight: 10 }} variant="contained" color="primary">
                    TMDB link
                  </Button>
                </Row>
              </Section>

              <Section>
                <Row style={{ alignItems: "flex-end" }}>
                  <StarRate style={{ fontSize: 65, color: "gray" }} />
                  <Typography style={{ ...fontStyle, fontSize: 30 }} variant="subtitle2" gutterBottom>
                    8.3
                  </Typography>
                  <Typography style={{ ...fontStyle, fontSize: 15, marginBottom: 17 }} variant="subtitle2" gutterBottom>
                    / 10
                  </Typography>
                  <Typography style={{ ...fontStyle, fontSize: 40, marginBottom: 0, marginLeft: 10 }} variant="subtitle2" gutterBottom>
                    |
                  </Typography>
                  <StarRate style={{ fontSize: 65, color: "#3b4fbc" }} />
                  <Typography style={{ ...fontStyle, fontSize: 30 }} variant="subtitle2" gutterBottom>
                    Your rating 8
                  </Typography>
                  <Typography style={{ ...fontStyle, fontSize: 15, marginBottom: 17 }} variant="subtitle2" gutterBottom>
                    / 10
                  </Typography>
                </Row>
              </Section>
              <Section>
                <Row>{this.state.graphData && <C3Chart data={this.state.graphData} />}</Row>
              </Section>
            </MovieDetails>
          </MovieInfo>
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
    var query = `
    query MovieView_Query($movieId: Int!) {
      movie(id: $movieId) {
        title,
        budget,
        homepage,
        imdb_id
      }
    }`;
    const movieId = 5;
    runGraphQLQuery(query, { movieId }).then(data => this.setState({ movie: data }));

    var query2 = `
    query ratingsForAMovieQuery($movieId: Int!) {
      ratingsForAMovie(movieId: $movieId) {
        rating
        count
      }
    }`;

    runGraphQLQuery(query2, { movieId })
      .then(data => data.data.ratingsForAMovie)
      .then(data => {
        // Lager to tomme arrays
        let ratings = ["Rating"];
        let xValues = ["x"];
        // Går gjennom hvert element i arrayet jeg fikk fra serveren.
        data.forEach(rating => {
          // Legger til verdiene i arrayene mine over.
          ratings.push(rating.count);
          xValues.push(rating.rating);
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
}

export default MovieView;
