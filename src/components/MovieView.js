import React from 'react';
import { runGraphQLQuery } from '../utils/Utils';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

const uuidv1 = require('uuid/v1');
/*

Display detailed information about a movie in a single page.

*/
class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.state.graphData && <C3Chart data={this.state.graphData} />}
      </div>
    );
  }

  getUserId = () => {
    // Denne funksjonen henter/ lager en unik userId.
    // Sjekk først om den er i state, hvis ikke sjekk om den er i localstorage, hvis ikke lag ny.
    if (this.state.userId !== undefined) {
      return this.state.userId;
    }
    const storedID = localStorage.getItem('userId');
    if (storedID !== null) {
      this.setState({ userId: storedID });
      return storedID;
    }
    const id = uuidv1();
    localStorage.setItem('userId', id);
    this.setState({ userId: id });
    return id;
  }

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
    const movieId = 5
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
        let ratings = ["Rating"]
        let xValues = ["x"]
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
            columns: [
              xValues,
              ratings
            ]
          }
        });
      });
  }
}

export default MovieView;
