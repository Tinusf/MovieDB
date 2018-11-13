import React from "react";
import StarRate from "@material-ui/icons/StarRate";
import Button from "@material-ui/core/Button";
import { runGraphQLQuery } from "../utils/Utils";

/*

Add a rating for a move
*/
class MovieRating extends React.Component {
  state = {
    rating: -1
  };

  updateRating = n => {
    if (!this.state.ratingFinal) this.setState({ rating: n });
  };

  setFinal = n => {
    this.setState({ rating: n, ratingFinal: true });
  };

  // graphql query for å legge til ny rating på en film
  submitRating = () => {
    const query = `
    mutation addRating($userId: String!, $movieId: Int!, $rating: Float!) {
      addRating(userId: $userId, movieId: $movieId, rating: $rating) {
        rating
        timestamp
        count
      }
    }`;
    // Datasettet vi bruker gir filmer rating mellom 0.5 og 5 hvor man kan gi f.eks 2.5
    // Vi ønsket å ha ratings som heltall mellom 1 og 10. Derfor plusser vi på en og ganger med to.
    runGraphQLQuery(query, { movieId: this.props.movieId, userId: this.props.userId, rating: (this.state.rating + 1) / 2 });
    this.props.ratingHasUpdated();
  };

  render() {
    const stars = [...Array(10)].map((n, i) => (
      <StarRate
        key={i}
        onMouseOver={() => this.updateRating(i)}
        onClick={() => this.setFinal(i)}
        style={{ fontSize: 30, color: this.state.rating >= i ? "white" : "gray" }}
      />
    ));
    return (
      <div onMouseOut={() => this.updateRating(-1)}>
        {" "}
        {stars}{" "}
        <Button style={{ marginRight: 10 }} variant="contained" color="primary" onClick={this.submitRating}>
          Rate this movie
        </Button>
      </div>
    );
  }
}

export default MovieRating;
