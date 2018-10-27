import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../NetworkLayer';

/*

Display detailed information about a movie in a single page.

*/
class MovieView extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query ExampleQuery($pageID: ID!) {
            page(id: $pageID) {
              name
            }
          }
        `}
        variables={{
          pageID: '110798995619330',
        }}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            //Render film detailjer
            return <div>{props.page.name} is great!</div>;
          }
          return <div>Loading</div>;
        }}
      />
    );
  }
}

export default MovieView;
