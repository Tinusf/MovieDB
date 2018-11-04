import {
  Environment,
  Network,
  Store,
  RecordSource
} from 'relay-runtime';

const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
  return (
    fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          query: operation.text,
          variables,
        }),
      }).then( response => {
        return response.json();
      }).catch( err => console.log(err) )
  );
}

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(fetchQuery);
const handlerProvider = null;

export default new Environment({
  handlerProvider,
  network,
  store,
});