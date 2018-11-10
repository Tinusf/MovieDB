export async function runGraphQLQuery(query, variables) {
  const response = await fetch('http://it2810-36.idi.ntnu.no:4000/graphql', {
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
  return json ? json.data : json;
}