import React from 'react';
import { runGraphQLQuery } from '../utils/Utils'

/*

Display detailed information about a movie in a single page.

*/
class MovieView extends React.Component {
  render() {
    //this.testx()
    return (
      <div></div>
    );
  }

  componentDidMount() {
    var query = `
    query MovieView_Query($movieId: Int!) {
      movies(id: $movieId) {
        title,
        budget,
        homepage,
        imdbId
      }
    }`;
    const movieId = 5
    runGraphQLQuery(query, {movieId}).then(data => this.setState({movie: data}));
  }
}

export default MovieView;
