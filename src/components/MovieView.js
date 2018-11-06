import React from 'react';
import { runGraphQLQuery } from '../utils/Utils'
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
    //this.testx()
    return (
      <div></div>
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
    this.setState({userId: id});
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
    runGraphQLQuery(query, {movieId}).then(data => this.setState({movie: data}));
  }
}

export default MovieView;
