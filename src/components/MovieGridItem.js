import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

/*

Dette er en av de små thumbsnailsene på moviegrid. Et lite bildet og tittel også er den klikkbar. 

*/
class MovieGridItem extends React.Component {
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
      <Container onClick={this.props.onClick} style={this.props.ghost && { marginBottom: 0, marginTop: 0, height: 0 }} className="clickableMovieGridItem">
        <MoviePoster style={this.props.ghost && { visibility: "hidden", height: 0 }} src={this.props.url} />
        <Typography style={{ color: "white", margin: 0, maxWidth: 200, height: 50 }} variant="subtitle1" gutterBottom className="movieTitle">
          {this.props.name}
        </Typography>
      </Container>
    );
  }
}

export default MovieGridItem;
