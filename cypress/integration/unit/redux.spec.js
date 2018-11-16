import reducer from "../../../src/store/reducers/Reducer";
import { SET_SEARCH_SETTINGS, SET_VIEW, setView } from "../../../src/store/actions/MovieActions";

import configureStore from "redux-mock-store";
let mockStore = configureStore();
let store;

describe("Redux tests", () => {
  beforeEach(() => {
    store = mockStore();
  });
  // Blir det riktig action når du kjører setView.
  it("Dispatches the correct action and payload", () => {
    const expectedActions = [
      {
        type: SET_VIEW,
        viewName: "movieview"
      }
    ];
    store.dispatch(setView("movieview"));
    expect(store.getActions()).to.deep.equal(expectedActions);
  });

  it("Reducer saves the correct variables to the redux state.", () => {
    expect(
      // Om reducer får inn dette:
      reducer([], {
        type: SET_SEARCH_SETTINGS + "_FULFILLED",
        payload: {
          movies: [{ testMovie: "is good" }],
          searchText: "harry potter",
          asc: true,
          pagenr: 0,
          ordering: "title"
        }
      })
      // Blir da movies reducern vår slik?
    ).to.deep.equal({
      movies: {
        movies: [{ testMovie: "is good" }],
        moreToLoad: true,
        searchText: "harry potter",
        asc: true,
        pagenr: 1,
        ordering: "title",
        viewName: "moviegrid"
      }
    });
  });
});
