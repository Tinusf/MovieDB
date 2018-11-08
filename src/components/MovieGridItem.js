import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

/*

Add a review about a move

*/
class MovieGridItem extends React.Component {
  render() {
    const Container = styled.div`
      cursor: pointer;
      margin: 30px;
    `;

    const MoviePoster = styled.img`
      max-height: 300px;
      width: 200px;
      margin-bottom: 0px;
      border-radius: 4px;
    `;

    return (
      <Container>
        <MoviePoster src={this.props.url} />
        <Typography style={{ color: "white", margin: 0 }} variant="subtitle1" gutterBottom>
          {this.props.name}
        </Typography>
      </Container>
    );
  }
}

export default MovieGridItem;
