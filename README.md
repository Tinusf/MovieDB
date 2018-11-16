# Prosjekt 4: The Movie Database

## Innholdsfortegnelse
- [Nettsidens virkemåte](#nettsidens-virkemåte)
- [Backend](#backend)
    - [SQLite](#sqlite)
    - [GraphQL](#graphql)
    - [Express](#express)
- [Frontend](#frontend)
    - [React](#react)
    - [Redux](#redux)
- [Testing med Cypress](#testing-med-cypress)
    - [End-To-End testing](#end-to-end-testing)
    - [Snapshot testing](#snapshot-testing)
    - [Unit testing](#unit-testing)
- [Git](#git)
- [Screenshot](#screenshot)

## Nettsidens virkemåte
Dette er en nettside hvor man kan søke etter filmer og gi filmene en rating. Man kan sortere filmer på flere premisser som for eksempel Revenue, budget og popularity. Ved å trykke på pilen øverst til høyre endrer man sorteringen fra desc til asc eller motsatt. Backend betår av en sqlite database som er koblet opp mot et GraphQL API gjennom en Express server. Til sammen er det lagret over 45 000 filmer og 26 000 000 ratings i databasen.

Link til nettsiden: http://it2810-36.idi.ntnu.no/prosjekt4/

For å kjøre lokalt kan du kjøre

```
npm start
```
Da vil nettsiden være tilgjengelig på http://localhost:3000/

## Backend
Vi har utviklet backend for nettsiden selvstendig. For å starte backend servern så skriver du 
```
npm run start-graphql-server
```
Da kan du åpne http://localhost:4000/graphql i nettleseren din for å kjøre GraphQL queries. 


#### SQLite

Datasettet hentet vi fra https://www.kaggle.com/rounakbanik/the-movies-dataset. Dette datasettet består av .csv filer som førte til at vi tidlig bestemte oss for å bruke SQLite. Det er enkelt å importere .csv filer til SQLite databasen. Det eneste vi måtte gjøre selv var å definere primary og foreign keys, og [schema](/server/database/schema.sql).


Et problem vi møtte ved å bruke dette datasettet er at mye av dataen er formatert som ugyldig json. Credits tabellen er et eksempel på dette. Problemet oppstår fordi datasattet bruker ' istedenfor ", og de bruker None istedenfor null etc etc.. Lignende problem vil også oppstå hvis en karakter har et kallenavn. Et eksempel er fra The Matrix vil hovedkarakteren være lagret som Thomas "Neo" Anderson. Vi løste dette ved å lagre disse kolonnene som strings i databasen for så å rette opp formatet til gyldig json ([her](/src/utils/Utils.js#L17)) etter vi har hentet dataen. Da kan vi parse dataen som json på vanlig måte

#### GraphQL
GraphQL er et spørrings og datamanipulering språk utviklet av facebook. Det ses på som et mer effektivt, kraftfullt og fleksibelt alternativ til REST. Mye på grunn av at man definere eksakt hva slags data man ønsker og derav redusere datatrafikk. GraphQL tar ikke seg av oppgaver knyttet til lagring og henting av data. Det vil si at man må ha en egen database system i bunn. I vårt tilfelle valgte vi å bruke SQLite 

I GraphQL begynner man med å beskrive strukturen på dataen. Den kan for eksempel beskrives slik:
```
type movies_metadata {
  """Movie budget"""
  budget: Int

  """Movie genres"""
  genres: String

  """Movie homepage"""
  homepage: String

  """Movie id"""
  id: Int!

  """Original movie title"""
  original_title: String

  """Movie overview"""
  overview: String
}
```



Deretter kan man lage en spørring
```
query MovieView_Query {
  movie(id: 24428) {
      original_title
      overview
  }
}
```


Og man vil deretter motta data som kan se slik ut
``` json
{
  "data": {
    "movie": {
      "original_title": "The Avengers",
      "overview": "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!"
    }
  }
}
```

Du kan prøve det her: http://it2810-36.idi.ntnu.no:4000/graphql 


 #### Express
Express beskrives som raskt, minimalistisk web rammeverk for node.js. 

Kort fortalt bruker vi Express som HTTP serveren til GraphQL.
``` javascript
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: GraphQLSchema,
  graphiql: true
}));

app.listen(4000);
```
Vi satt dette opp ved hjelp av å se på dette prosjektet: https://github.com/mrblueblue/graphql-express-sqlite

## Frontend
#### React
 
##### Infinite scrolling
Siden laster inn nye sider dynamisk når man scroller ned til bunnen av siden. Måten vi gjorde dette på var å legge inn async payloads i en action ved å bruke redux-promise-middleware. Dette brukte vi til å laste ned dataen til den neste siden med GraphQL spørring som payload. Videre blir dataen liste over resultater i Redux. Dataen fra redux er igjen linket opp til resultat siden. 

 
##### Styled components
Vi har brukt biblioteket styled components for å generere CSS til komponenter i React. Biblioteket gjør at man kan skrive vanlig CSS som blir konvertert til React komponenter. 

##### Material-UI
Vi bruker Google sitt Material Design på nettsiden gjennom bruk av biblioteket Material-UI 


##### Komponenter
Nettsiden har tre hovedkomponenter: MovieGrid,  MovieView og MovieSearch. MovieView brukes til å kunne vise detaljer for en film. MovieGrid brukes til å vise et grid av filmer, men den laster da kun ned begrenset informasjon om hver film. MovieSearch komponentet vises hele tiden som en menu bar på toppen og er grensesnittet for å søke igjennom filmer.

##### Grafer
Vi bruker biblioteket C3js som er bygget opp på D3js. I tillegg har vi en wrapper rundt C3js for å optimalisere den mot React. Grafene som vises er data på hvilke ratings en film har fått. 


##### Rating av filmer
For å få til rating av filmer, lagres en unik id (UUID) i local storage. Denne ID sendes med hver gang man gir en rating av en film. I tillegg brukes denne ID til å kunne identifisere om man har gitt en rating av en film.


##### Responsive design
Vi har også tatt oss tid til å legge inn responsive design, slik at nettsiden fungerer fint på forskjellige flater. 

#### Redux
Redux brukes for å lagre tilstanden til JavaScript programmer. Den gjør endring av tilstand forutsigbart, og pålegger restriksjoner rundt hvordan og når oppdateringer av tilstand kan skje. Dette er med på å øke kodekvaliteten og gjør det enklere å løse problemer knyttet kommunikasjon av tilstand mellom ulike komponenter.

Rammeverket introduserer flere konsepter man må forholde seg til. Man operer med en tilstand av hele programmet, man kan ikke endre denne tilstanden direkte. For å kunne endre tilstanden må man innføre «actions» som et nytt konsept. Disse beskriver bare hva slags handling som skal utføres, og eventuelle parametere. Videre innfører man et siste konsept som er «reducer», som knytter actions til tilstanden av programmet. En reducer tar inn tilstanden til programmet og action, deretter returnerer den neste tilstand av programmet. Man skriver en reducer for hver action. 

Store deler av Redux er kode man skriver selv, selve rammeverket er på 2kb. Når alle konseptene er på plass, så utfører man en action for å endre tilstanden. For komponenter i React kobler man disse til Redux, og deretter mapper tilstandsvariabler til props i komponenten.


Et bruksområde var å lagre hvilken view vi var på. Om vi var på moviegrid view, altså der hvor du ser mange små thumbsnails og mange filmer. Eller om vi er på movieview hvor du ser en detaljert visning av en spesifikk film.

Vi brukte også redux til å ta å hente ut resultat på et søk og når du blar.
Når du blar så legger vi til det nye søkeresultatet i reduceren vår. Når det er første gang du søker på noe så får du bare maks 35 filmer fra servern i reduceren.


## Testing med Cypress
For å kjøre testene er det viktig at du har tilgang til nettsiden på http://localhost:3000/ ved å kjøre:
```
npm start
```
Når du har det kan du kjøre:
```
npm test
```
Da vil et nytt Cypress vindu åpne seg. For å kjøre alle testene kan du trykke "Run all specs" øverst til høyre, eller kjøre enkelttester ved å dobbelt trykke på filen.  
**OBS!:** Vi hadde problemer med å få snapshot testene til å fungere med Node v10.

Vi har valgt å bare bruke Cypress til testing fordi det har støtte for end-to-end testing, snapshot testing og unit testing, og vi bruker dermed ikke jest.

#### End-To-End testing
Vi brukte litt tid før vi kom i gang med å skrive tester, spesielt end-to-end tester. Dette var på grunn av at veldig mye backend og frontend måtte være på plass før det var noe hensikt å front-end teste. Etter vi hadde en fungerende nettside kunne vi begynne å skrive end-to-end tester. Her tester vi at søking og sortering gir korrekt film, og vi tester at det fungerer å gi en film en rating. Vi erfarte tidlig at det er viktig å ha en ventetid etter man har trykket noe for å være sikker på at alt har lastet inn. Hvis noen av testene ikke fungerer kan det være fordi ventetiden ikke er lang nok.
#### Snapshot testing

Snapshot testing med Cypress fungerer litt annerledes enn snapshot testing med Jest. Med Cypress kan ikke ta snapshot av ett og ett komponent. Man må derimot velge et element som har blitt renderet i DOMet med CSS IDer og klasser litt som jQuery sin selector.

Et problem vi møtte på var at klassenavnenet ble tilfeldig generert. Dette klarte vi å løse for stolpediagrammet siden den brukte Math.random(). Vi mocket random slik at Math.random vil gi samme resultat hver gang. Til tross for dette renderer stolpediagrammet forskjellig på ulike operativsystemer. Dermed fikk vi ikke snapshotteste dette. Styled components lager også tilfeldige klassenavn, men den bruker ikke Math.random(). Dette førte til at to av snapshottestene våre ikke fungerer siden snapshottet vil endre seg hver gang. Vi har kommentert ut disse testene og sitter igjen med bare 1 snapshot test.

Som tidligere nevnt hadde vi problemer med å få snapshot testene til å fungere med Node v10. Du kan sjekke hva slags versjon av Node du har ved å kjøre:
```
node -v
```
Alle testene funker for oss både på Windows, Mac og Ubuntu med node versjon 8.

#### Unit testing
En viktig funksjon for oss å teste var castCrewStringToJson(inputString) som gjør om stringen vi lagrer i databasen til gyldig json. Hvis denne funksjonen ikke fungerer som den skal vil vi ikke få vist blant annet skuespillere for en film. Nettsiden vil også krasje på chrome.

Vi har også testet Redux ved å sjekke om vi får riktig action når man kjører en action-funksjon. Etter det sjekker vi om man får riktig informasjon i din reducer når den får inn en action.
Grunnen til at vi ikke har flere tester, eller noe som tester alt vi har i redux er på grunn av vi har brukt redux-promise-middleware for å ha async payloads med i en action. Dette gjorde det vrient å teste alt, derfor har vi bare litt tester som viser at vi klarer å gjøre det.

## Git
Som de tidligere prosjektene baserte vi vår bruk av git på Git Workflow. Etter vi hadde satt opp prosjektet på gitlab lagde vi en dev branch. Denne branchen funket som vår hoved utviklings branch hvor vi merget inn ny funksjonalitet. Vi branchet ut fra denne for å legge til ny funksjonalitet for så å merge branchen inn i dev igjen. For å holde oversikt over hva som måtte gjøres lagde vi utviklingsoppgaver (issues) på gitlab. Vi linket commitsene våre opp mot utviklingsoppgavene ved å legge IDen i commit-meldingen.

## Screenshot
![Movie Grid](http://folk.ntnu.no/tinussf/it2810/p4/moviegrid.png)
   
![Movie View](http://folk.ntnu.no/tinussf/it2810/p4/movieview.png)
