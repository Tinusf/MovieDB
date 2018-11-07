export async function runGraphQLQuery(query, variables) {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: variables,
    })
  });
  const json = await response.json();
  return json;
}