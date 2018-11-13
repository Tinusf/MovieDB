import MovieView from "../../../src/components/MovieView";
const mv = new MovieView();
describe('MovieView string to json parsing', () => {
  // Alle testene er fordi databasen vår har lagret noen verdier som en string som vi må formatere riktig for så å parse med json. Dette gjør at det ble en litt lang funksjon som vi vil teste at blir riktig alltid her. 


  // Helt vanlig case.
  it(`Test with no extra " or '`, () => {
    const output = mv.castCrewStringToJson(`[{'name': 'frank'}]`);
    const expected = JSON.parse(`[{ "name": "frank" }]`);
    expect(output).to.deep.eq(expected);
  });

  it(`Test with extra '`, () => {
    // Denne skal bare fjerne ' en og så endre None til null. 
    const output = mv.castCrewStringToJson(`[{'cast_id': 48, 'character': 'FedEx Man', 'credit_id': '52fe425bc3a36847f80181f3', 'gender': 0, 'id': 1209249, 'name': "David O'Connor", 'order': 24, 'profile_path': None}]`);
    const expected = JSON.parse(`[{"cast_id": 48, "character": "FedEx Man", "credit_id": "52fe425bc3a36847f80181f3", "gender": 0, "id": 1209249, "name": "David OConnor", "order": 24, "profile_path": null}]`);
    expect(output).to.deep.eq(expected);
  });


  it(`Test with multiple extra '`, () => {
    const output = mv.castCrewStringToJson(`[{'cast_id': 48, 'character': "FedEx'O Man", 'credit_id': '52fe425bc3a36847f80181f3', 'gender': 0, 'id': 1209249, 'name': "David O'O'O'Connor", 'order': 24, 'profile_path': None}]`);
    const expected = JSON.parse(`[{"cast_id": 48, "character": "FedExO Man", "credit_id": "52fe425bc3a36847f80181f3", "gender": 0, "id": 1209249, "name": "David OOOConnor", "order": 24, "profile_path": null}]`);
    expect(output).to.deep.eq(expected);
  });

  it('Test with extra "s.', () => {
    // Så her burde den bare fjerne "ene rundt Neo.
    const output = mv.castCrewStringToJson(`[{ 'cast_id': 34,  'character': 'Thomas "Neo" Anderson', 'credit_id': '52fe425bc3a36847f80181c1', 'gender': 2, 'id': 6384, 'name': 'Keanu Reeves', 'order': 0, 'profile_path': '/1wpzvf5PaQ1AZjl5rPNjWQobLLP.jpg'}]`);
    const expected = JSON.parse(`[{ "cast_id": 34, "character": "Thomas Neo Anderson", "credit_id": "52fe425bc3a36847f80181c1", "gender": 2, "id": 6384, "name": "Keanu Reeves", "order": 0, "profile_path": "/1wpzvf5PaQ1AZjl5rPNjWQobLLP.jpg" }]`);
    expect(output).to.deep.eq(expected);
  });

  it('Test with many extra "s.', () => {
    // Så her burde den bare fjerne "ene rundt Neo.
    const output = mv.castCrewStringToJson(`[{ 'cast_id': 34,  'character': 'Thomas "Neo" "Big Boy" "My Dude" Anderson', 'credit_id': '52fe425bc3a36847f80181c1', 'gender': 2, 'id': 6384, 'name': 'Keanu "lol" Reeves', 'order': 0, 'profile_path': '/1wpzvf5PaQ1AZjl5rPNjWQobLLP.jpg'}]`)
    const expected = JSON.parse(`[{ "cast_id": 34, "character": "Thomas Neo Big Boy My Dude Anderson", "credit_id": "52fe425bc3a36847f80181c1", "gender": 2, "id": 6384, "name": "Keanu lol Reeves", "order": 0, "profile_path": "/1wpzvf5PaQ1AZjl5rPNjWQobLLP.jpg" }]`);
    expect(output).to.deep.eq(expected);
  });

  // Denne skal bare returnere de 3 første. Og ikke kræsje pga ekstra " og '. 
  it(`Real test with both ' and "`, () => {
    const output = mv.castCrewStringToJson(`[{'cast_id': 34, 'character': 'Thomas "Neo" Anderson', 'credit_id': '52fe425bc3a36847f80181c1', 'gender': 2, 'id': 6384, 'name': 'Keanu Reeves', 'order': 0, 'profile_path': '/1wpzvf5PaQ1AZjl5rPNjWQobLLP.jpg'}, {'cast_id': 21, 'character': 'Morpheus', 'credit_id': '52fe425bc3a36847f801818d', 'gender': 2, 'id': 2975, 'name': 'Laurence Fishburne', 'order': 1, 'profile_path': '/8suOhUmPbfKqDQ17jQ1Gy0mI3P4.jpg'}, {'cast_id': 22, 'character': 'Trinity', 'credit_id': '52fe425bc3a36847f8018191', 'gender': 1, 'id': 530, 'name': 'Carrie-Anne Moss', 'order': 2, 'profile_path': '/pgyBbrapYBoGvg5M3OIvVQ5Ne7m.jpg'}, {'cast_id': 23, 'character': 'Agent Smith', 'credit_id': '52fe425bc3a36847f8018195', 'gender': 2, 'id': 1331, 'name': 'Hugo Weaving', 'order': 3, 'profile_path': '/di4A3qhYBIVdlH9DKjqbWfo3FWw.jpg'}, {'cast_id': 24, 'character': 'Oracle', 'credit_id': '52fe425bc3a36847f8018199', 'gender': 1, 'id': 9364, 'name': 'Gloria Foster', 'order': 4, 'profile_path': '/8peApNX6ms84dK07Xguf84CNFJK.jpg'}, {'cast_id': 25, 'character': 'Cypher', 'credit_id': '52fe425bc3a36847f801819d', 'gender': 2, 'id': 532, 'name': 'Joe Pantoliano', 'order': 5, 'profile_path': '/zBvDX2HWepvW9im6ikgoyOL2Xj0.jpg'}, {'cast_id': 26, 'character': 'Tank', 'credit_id': '52fe425bc3a36847f80181a1', 'gender': 2, 'id': 9372, 'name': 'Marcus Chong', 'order': 6, 'profile_path': '/zYfXjMszFajTb93phn2Fi6LwEGN.jpg'}, {'cast_id': 31, 'character': 'Agent Brown', 'credit_id': '52fe425bc3a36847f80181b5', 'gender': 2, 'id': 9380, 'name': 'Paul Goddard', 'order': 7, 'profile_path': '/4OalonKRAdZhXreaDWig3bZkELo.jpg'}, {'cast_id': 38, 'character': 'Agent Jones', 'credit_id': '52fe425bc3a36847f80181cb', 'gender': 2, 'id': 39545, 'name': 'Robert Taylor', 'order': 8, 'profile_path': '/aqRJQj0KBPhGLDxfmOAXCUzCcSJ.jpg'}, {'cast_id': 27, 'character': 'Apoc', 'credit_id': '52fe425bc3a36847f80181a5', 'gender': 2, 'id': 7244, 'name': 'Julian Arahanga', 'order': 9, 'profile_path': '/jFNdkOB6UhQEsN5Bo5Q5d2qT9YX.jpg'}, {'cast_id': 28, 'character': 'Mouse', 'credit_id': '52fe425bc3a36847f80181a9', 'gender': 2, 'id': 9374, 'name': 'Matt Doran', 'order': 10, 'profile_path': '/movt7tOlmzrlDbUIIiYdV9UemyK.jpg'}, {'cast_id': 29, 'character': 'Switch', 'credit_id': '52fe425bc3a36847f80181ad', 'gender': 1, 'id': 9376, 'name': 'Belinda McClory', 'order': 11, 'profile_path': '/kH5KJ0QuSN2MgYqRP4JSdnCcE9K.jpg'}, {'cast_id': 30, 'character': 'Dozer', 'credit_id': '52fe425bc3a36847f80181b1', 'gender': 2, 'id': 9378, 'name': 'Anthony Ray Parker', 'order': 12, 'profile_path': '/2mMPyDmhPlW1HGIMJVpuZAYA3TP.jpg'}, {'cast_id': 32, 'character': 'Rhineheart', 'credit_id': '52fe425bc3a36847f80181b9', 'gender': 0, 'id': 9383, 'name': 'David Aston', 'order': 13, 'profile_path': '/aO7w5K2BjeQaAUN3ogo9NuAD1qI.jpg'}, {'cast_id': 33, 'character': 'Choi', 'credit_id': '52fe425bc3a36847f80181bd', 'gender': 2, 'id': 9384, 'name': 'Marc Aden', 'order': 14, 'profile_path': '/h42Zd2L1srUxw1VihY1fceUgDZe.jpg'}, {'cast_id': 39, 'character': 'Dujour', 'credit_id': '52fe425bc3a36847f80181cf', 'gender': 1, 'id': 181214, 'name': 'Ada Nicodemou', 'order': 15, 'profile_path': '/zkgw0AuxuLe7UaNRWVjUNeFs3gI.jpg'}, {'cast_id': 40, 'character': 'Priestess', 'credit_id': '52fe425bc3a36847f80181d3', 'gender': 0, 'id': 1090466, 'name': 'Deni Gordon', 'order': 16, 'profile_path': '/5TQlwo1T3EnORzkmLQMKaDZCvpa.jpg'}, {'cast_id': 41, 'character': 'Spoon Boy', 'credit_id': '52fe425bc3a36847f80181d7', 'gender': 2, 'id': 218366, 'name': 'Rowan Witt', 'order': 17, 'profile_path': '/kJot5sckPZRFVzkKEEJtaod423s.jpg'}, {'cast_id': 43, 'character': 'Potential', 'credit_id': '52fe425bc3a36847f80181df', 'gender': 0, 'id': 1209244, 'name': 'Eleanor Witt', 'order': 18, 'profile_path': '/7lo8gg0j6OLzuAqXg1giQWAsY4F.jpg'}, {'cast_id': 44, 'character': 'Potential', 'credit_id': '52fe425bc3a36847f80181e3', 'gender': 0, 'id': 1209245, 'name': 'Tamara Brown', 'order': 19, 'profile_path': None}, {'cast_id': 45, 'character': 'Potential', 'credit_id': '52fe425bc3a36847f80181e7', 'gender': 0, 'id': 1209246, 'name': 'Janaya Pender', 'order': 20, 'profile_path': None}, {'cast_id': 46, 'character': 'Potential', 'credit_id': '52fe425bc3a36847f80181eb', 'gender': 0, 'id': 1209247, 'name': 'Adryn White', 'order': 21, 'profile_path': None}, {'cast_id': 47, 'character': 'Potential', 'credit_id': '52fe425bc3a36847f80181ef', 'gender': 0, 'id': 1209248, 'name': 'Natalie Tjen', 'order': 22, 'profile_path': None}, {'cast_id': 42, 'character': 'Lieutenant', 'credit_id': '52fe425bc3a36847f80181db', 'gender': 2, 'id': 57799, 'name': 'Bill Young', 'order': 23, 'profile_path': '/1B3amfg9o97EurkYl9BAlXZPC60.jpg'}, {'cast_id': 48, 'character': 'FedEx Man', 'credit_id': '52fe425bc3a36847f80181f3', 'gender': 0, 'id': 1209249, 'name': "David O'Connor", 'order': 24, 'profile_path': None}, {'cast_id': 49, 'character': 'Businessman', 'credit_id': '52fe425bc3a36847f80181f7', 'gender': 0, 'id': 1209250, 'name': 'Jeremy Ball', 'order': 25, 'profile_path': '/o81K9lM34FbCxwHakzXdtIM1JP9.jpg'}, {'cast_id': 50, 'character': 'Woman in Red', 'credit_id': '52fe425bc3a36847f80181fb', 'gender': 0, 'id': 1209251, 'name': 'Fiona Johnson', 'order': 26, 'profile_path': '/tdbzgopHXZMpiLNt64TuLhsPlPA.jpg'}, {'cast_id': 51, 'character': 'Old Man', 'credit_id': '52fe425bc3a36847f80181ff', 'gender': 2, 'id': 110411, 'name': 'Harry Lawrence', 'order': 27, 'profile_path': None}, {'cast_id': 52, 'character': 'Blind Man', 'credit_id': '52fe425bc3a36847f8018203', 'gender': 0, 'id': 212562, 'name': 'Steve Dodd', 'order': 28, 'profile_path': '/30pDtMIblGP1yDsFUaT5p0FJL1L.jpg'}, {'cast_id': 53, 'character': 'Security Guard', 'credit_id': '52fe425bc3a36847f8018207', 'gender': 0, 'id': 1209252, 'name': 'Luke Quinton', 'order': 29, 'profile_path': '/9W6abwKWcCCu4FHtQZuWvOb2MBP.jpg'}, {'cast_id': 54, 'character': 'Guard', 'credit_id': '52fe425cc3a36847f801820b', 'gender': 0, 'id': 75715, 'name': 'Lawrence Woodward', 'order': 30, 'profile_path': '/dAcZMeJmn5WzdD9SdAHGDlDq7CO.jpg'}, {'cast_id': 55, 'character': 'Cop Who Captures Neo', 'credit_id': '52fe425cc3a36847f801820f', 'gender': 0, 'id': 1209253, 'name': 'Michael Butcher', 'order': 31, 'profile_path': None}, {'cast_id': 56, 'character': 'Big Cop', 'credit_id': '52fe425cc3a36847f8018213', 'gender': 0, 'id': 1209254, 'name': 'Bernard Ledger', 'order': 32, 'profile_path': None}, {'cast_id': 57, 'character': 'Cop', 'credit_id': '52fe425cc3a36847f8018217', 'gender': 2, 'id': 26753, 'name': 'Robert Simper', 'order': 33, 'profile_path': '/8lBlkhZlTBfkIi6i0iWugZaiIkY.jpg'}, {'cast_id': 58, 'character': 'Cop', 'credit_id': '52fe425cc3a36847f801821b', 'gender': 0, 'id': 1209255, 'name': 'Chris Pattinson', 'order': 34, 'profile_path': '/aB6AlYxCtiSydRpaHpnyf2mLCVw.jpg'}, {'cast_id': 59, 'character': 'Parking Cop', 'credit_id': '52fe425cc3a36847f801821f', 'gender': 2, 'id': 1209256, 'name': 'Nigel Harbach', 'order': 35, 'profile_path': '/ugpQA7MIoEZty4WB2l0uqTRniBy.jpg'}]`);
    const expected = JSON.parse(`[{"cast_id": 34, "character": "Thomas Neo Anderson", "credit_id": "52fe425bc3a36847f80181c1", "gender": 2, "id": 6384, "name": "Keanu Reeves", "order": 0, "profile_path": "/1wpzvf5PaQ1AZjl5rPNjWQobLLP.jpg"}, {"cast_id": 21, "character": "Morpheus", "credit_id": "52fe425bc3a36847f801818d", "gender": 2, "id": 2975, "name": "Laurence Fishburne", "order": 1, "profile_path": "/8suOhUmPbfKqDQ17jQ1Gy0mI3P4.jpg"}, {"cast_id": 22, "character": "Trinity", "credit_id": "52fe425bc3a36847f8018191", "gender": 1, "id": 530, "name": "Carrie-Anne Moss", "order": 2, "profile_path": "/pgyBbrapYBoGvg5M3OIvVQ5Ne7m.jpg"}]`);
    expect(output).to.deep.eq(expected);
  });
})