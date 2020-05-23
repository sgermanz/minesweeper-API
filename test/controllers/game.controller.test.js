const supertest = require('supertest');
const sinon = require('sinon');
const gameExpectations = require('../expectations/game.expectations');
const gameService = require('../../services/game.service');
const repository = require('../../repositories/init')
const gameController = require('../../controllers/game.controller')
const jwt = require('./jwt');
const passport = require('../../helpers/passport.helper')

describe('Game Controller Tests', () => {
    let passportStub;
    let app;
    let request;
    beforeAll(()=>{
      passportStub = sinon.stub (passport, 'getPassport').returns(jwt.passport);
      app = require('../../app');
      request = supertest.agent(app);
    })
    afterAll(async ()=>{
      // app.close(done);
      passportStub.restore();
      await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    })
    describe('getGames Tests', () => {
      describe('GET /games', () => {
        test('GET /games Succesfully', async () => {
          let storageStub = sinon.stub (repository, 'initialize').returns({});
          let gameServiceStub = sinon.stub(gameService, 'getGames').returns(gameExpectations.getGames());
          var response = await request
          .get('/games')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + jwt.token)
          .expect('Content-Type', /json/)
          .expect(200)
          
          expect(response.body).toEqual(gameExpectations.getGames());

          gameServiceStub.restore();
          storageStub.restore();
        })
      });
    });

    describe('getGame Tests', () => {
      describe('GET /games/:id', () => {
        test('GET /games/:id Succesfully', async () => {
          
          let storageStub = sinon.stub (repository, 'initialize').returns({});
          let gameServiceStub = sinon.stub(gameService, 'getGameById').returns(gameExpectations.getGameByID());
          var response = await request
          .get('/games/' + gameExpectations.getGameByID()._id)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + jwt.token)
          .expect('Content-Type', /json/)
          .expect(200);
          
          expect(response.body).toEqual(gameExpectations.getGameByID());

          gameServiceStub.restore();
          storageStub.restore();
        })
      });
    });

    describe('createGame Tests', () => {
      describe('POST /games', () => {
        test('POST /games Succesfully', async () => {
          
          let storageStub = sinon.stub (repository, 'initialize').returns({});
          let gameServiceStub = sinon.stub(gameService, 'createGame').returns(gameExpectations.getGameByID());
          var response = await request
          .post('/games')
          .send(gameExpectations.getGameByID())
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + jwt.token)
          .expect('Content-Type', /json/)
          .expect(201);
          
          expect(response.body).toEqual(gameExpectations.getGameByID());

          gameServiceStub.restore();
          storageStub.restore();
        })
      });
    });

    describe('updateGame Tests', () => {
      describe('PUT /games/:id', () => {
        test('PUT /games/:id Succesfully', async () => {
          
          let storageStub = sinon.stub (repository, 'initialize').returns({});
          let gameServiceStub = sinon.stub(gameService, 'updateGame').returns(gameExpectations.getGameByID());
          var response = await request
          .put('/games/' + gameExpectations.getGameByID()._id)
          .send(gameExpectations.getGameByID())
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + jwt.token)
          .expect('Content-Type', /json/)
          .expect(200);
          
          expect(response.body).toEqual(gameExpectations.getGameByID());

          gameServiceStub.restore();
          storageStub.restore();
        })
      });
    });

    describe('deleteGame Tests', () => {
      describe('DELETE /games/:id', () => {
        test('DELETE /games/:id Succesfully', async () => {
          
          let storageStub = sinon.stub (repository, 'initialize').returns({});
          let gameServiceStub = sinon.stub(gameService, 'removeGame').returns(gameExpectations.getGameByID());
          var response = await request
          .delete('/games/' + gameExpectations.getGameByID()._id)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + jwt.token)
          .expect('Content-Type', /json/)
          .expect(200);

          expect(response.body.message).toEqual(gameController.GAME_DELETED_SUCCESSFULLY);
          gameServiceStub.restore();
          storageStub.restore();
        })
      });
    });
});