// var gameSchema = Schema({
//     rows: Number,
//     columns: Number,
//     mines: Number,
//     field: [[{
//         flagged: Boolean,
//         mined: Boolean,
//         question: Boolean,
//         revealed: Boolean
//     }]]
// });

var mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const gameExpectations = require('../expectations/game.expectations');
const gameRepository = require('../../repositories/game.repository');
const repositoryHelper = require('../../helpers/repository.helper')
 
describe('game repository test', () => {
 
  beforeAll(async () => {
    const mongod = new MongoMemoryServer();
    const dbUri = await mongod.getUri();
    mongoose.connect(dbUri);
  });
 
  afterAll(async () => {
    await mongod.stop();
  });
  afterEach(async () =>{
    await gameRepository.removeAllGames();
  })

  describe('game getGames tests', () => {
    let firstInserted;
    let secondInserted;
    beforeAll(async () => {
      let gamesToInsert = gameExpectations.gamesToInsert();

      firstInserted = await gameRepository.createGame(gamesToInsert[0]);
      secondInserted = await gameRepository.createGame(gamesToInsert[1]);
    })
    test('getGames test', async () => {
      let response = await gameRepository.getGames({});
      expect(response[0].compare(firstInserted)).toEqual(true);
      expect(response[1].compare(secondInserted)).toEqual(true);
    });
  })

  test('game insert test', async () => {
    let response = await gameRepository.createGame(gameExpectations.gameToInsert());

    expect(gameExpectations.gameToInsert().compare(response)).toEqual(true);
  });

  test('game remove test', async () => {
    let toInsert = gameExpectations.gameToInsert();
    let inserted = await gameRepository.createGame(toInsert);
    let response = await gameRepository.removeGame(inserted._id);
    expect(inserted.compare(response)).toEqual(true);
  });
  test('game update test', async () => {
    let toInsert = gameExpectations.gameToInsert();
    let inserted = await gameRepository.createGame(toInsert);

    inserted.rows = gameExpectations.gamesToInsert()[1].rows;
    inserted.columns = gameExpectations.gamesToInsert()[1].columns;
    inserted.mines = gameExpectations.gamesToInsert()[1].mines;
    inserted.field = gameExpectations.gamesToInsert()[1].field;

    let response = await gameRepository.updateGame(inserted);
    expect(response.compare(inserted)).toEqual(true);
  });

  describe('game getGame tests', () => {
    let inserted;
    beforeEach( async() => {
        let toInsert = gameExpectations.gameToInsert();
        inserted = await gameRepository.createGame(toInsert);
    })
    afterEach(async ()=> {
        await gameRepository.removeAllGames();
    });

    test('game getById test', async () => {
        let response = await gameRepository.getGameById(inserted._id);

        expect(response.compare(inserted)).toEqual(true);
    });
  });
});