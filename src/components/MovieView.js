import React from 'react';
import { runGraphQLQuery } from '../utils/Utils'

/*

Display detailed information about a movie in a single page.

*/
class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //this.testx()
    return (
      <div></div>
    );
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
    runGraphQLQuery(query, {movieId}).then(data => this.setState({movie: data}));
  }
}

export default MovieView;
