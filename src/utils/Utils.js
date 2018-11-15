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


export function castCrewStringToJson(inputString) {
  // Beklager veldig stygg hack, men noe av dataen i databasen vår er så rart formatert at vi må gjøre dette.
  // Hadde vi startet på nytt hadde vi brukt lenger tid til å finne finere dataset uten alt dette tullet her.

  // Pga dataen var på rart format i SQL databasen vår må vi håndtere det her.
  // Bytter ut ' med " og bytter ut None med null etc etc.
  // Fikk også problemer med at data var slik i databasen:
  // 'name': "Kelly O'Connell"
  // Dette skaper problemer når jeg replacer alle.
  // for å fikse:
  // 'name': "Kelly O'Connell"
  // finn index til første " og gå gjennom helt du finner index til ' og så fjerne ' tegnet.

  // De bruker bare " i databasen om det er navn som inneholder '.
  let doublyIndex = inputString.indexOf('"');
  // while istedenfor if i tilfelle det er flere tilfeller av dette i samme string.
  while (doublyIndex >= 0) {
    let index = doublyIndex + 1;
    let howManySingly = 0;
    let lastDoublyIndex = 0;
    while (true) {
      if (inputString[index] === "'") {
        howManySingly++;
      } else if (inputString[index] === '"') {
        lastDoublyIndex = index;
        break;
      }
      index++;
    }
    if (howManySingly === 0) {
      // Da er det navn som 'Florencia "Flo" Fuentes' og da kan vi bare fjerne de to første "ene.
      inputString = inputString.replace('"', "");
      inputString = inputString.replace('"', "");

      doublyIndex = inputString.indexOf('"');
      continue;
    }
    // Strings er immutable... så det blir litt stygg kode her.
    // Dette er delen av stringen før første "
    const start = inputString.substr(0, doublyIndex) + "'";
    // Dette er mellom "ene. Så tar jeg split og join som gjør at jeg replacer alle ' med ingenting.
    const withoutSingly =
      inputString
        .substr(doublyIndex + 1, lastDoublyIndex - doublyIndex - 1)
        .split("'")
        .join("") + "'";
    // Dette er resten av stringen.
    const end = inputString.substr(lastDoublyIndex + 1);
    // Setter tilbake til inputString
    inputString = start + withoutSingly + end;
    // Sjekker om det er flere jeg må gjøre dette med.
    doublyIndex = inputString.indexOf('"');
  }

  // split og join blir som replaceAll.
  const formattedCast = inputString
    .split("'")
    .join('"')
    .split("None")
    .join("null");
  // Vi velger bare de 3 første (om de ikke har 3 blir det så mange som de har).
  return JSON.parse(formattedCast).slice(0, 3);
};