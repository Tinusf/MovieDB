import React from "react";
import StarRate from "@material-ui/icons/StarRate";
import Button from "@material-ui/core/Button";
import { runGraphQLQuery } from "../utils/Utils";
import styled from "styled-components";

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

  submitRating = () => {
    if (this.state.rating <= 0) {
      alert("You must choose a rating before clicking send.")
      return;
    }
    const query = `
    mutation addRating($userId: String!, $movieId: Int!, $rating: Float!) {
      addRating(userId: $userId, movieId: $movieId, rating: $rating) {
        rating
        timestamp
        count
      }
    }`;
    runGraphQLQuery(query, { movieId: this.props.movieId, userId: this.props.userId, rating: (this.state.rating + 1) / 2 }).then(() => {
      this.props.ratingHasUpdated();
    });
  };

  render() {
    const stars = [...Array(10)].map((n, i) => (
      <StarRate
        key={i}
        onMouseEnter={() => this.updateRating(i)}
        onClick={() => this.setFinal(i)}
        style={{ fontSize: 30, cursor: "pointer", color: this.state.rating >= i ? "#ff9800" : "gray" }}
      />
    ));
    const RateBox = styled.div`
      display: flex;
      justify-content: center
      flex-direction: column;
      padding: 10px;
    `;
    return (
      <RateBox onMouseLeave={() => this.updateRating(-1)}>
        <div>{stars}</div>
        <Button style={{ marginRight: 10 }} variant="contained" color="primary" onClick={this.submitRating}>
          Rate this movie
        </Button>
      </RateBox>
    );
  }
}

export default MovieRating;
