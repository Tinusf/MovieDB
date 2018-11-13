import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

/*

Add a review about a move

*/
class MovieGridItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url
    };
  }

  render() {
    const Container = styled.div`
      cursor: pointer;
      margin: 30px;
    `;

    const MoviePoster = styled.img`
      height: 300px;
      width: 200px;
      margin-bottom: 0px;
      border-radius: 4px;
      background-image: url("./noposter.jpg");
    `;
    return (
      <Container onClick={this.props.onClick} className="clickableMovieGridItem">
        <MoviePoster
          style={this.props.ghost && { visibility: "hidden", height: 0 }}
          src={this.props.url} />
        <Typography style={{ color: "white", margin: 0, maxWidth: 200, height: 50 }} variant="subtitle1" gutterBottom className="movieTitle">
          {this.props.name}
        </Typography>
      </Container>
    );
  }
}

export default MovieGridItem;
