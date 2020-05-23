var sinon = require('sinon');
var gameRepository = require('../../repositories/game.repository');
var gameService = require('../../services/game.service');
var gameExpectations = require('../expectations/game.expectations');

describe("Game Service Tests", () => {
    describe("Create Game test", () => {
        test("Create Game succesfully", async () => {
            myStub = sinon.stub(gameRepository, 'createGame').returns(gameExpectations.getGameByID());
            var response = await gameService.createGame(gameExpectations.getGameByID());
            
            expect(response).toEqual(gameExpectations.getGameByID());
            myStub.restore();
        });
        test("Create Game error", async () => {
            var myStub = sinon.stub(gameRepository, 'createGame').throws(gameExpectations.createGameError());
            try{
                var response = await gameService.createGame(gameExpectations.getGameByID());
            }
            catch(error){
                expect(error).toContain(gameExpectations.createGameError())
            }
            myStub.restore();
        });
    })
    describe("Get Game by ID test", () => {
        test("Get Game succesfully", async () => {
            myStub = sinon.stub(gameRepository, 'getGameById').returns(gameExpectations.getGameByID());
            var response = await gameService.getGameById(gameExpectations.getGameByID()._id);
            
            expect(response).toEqual(gameExpectations.getGameByID());
            myStub.restore();
        });
        test("Get Game error", async () => {
            var myStub = sinon.stub(gameRepository, 'getGameById').throws(gameExpectations.getGameByIDError());
            try{
                var response = await gameService.getGameById(gameExpectations.getGameByID()._id);
            }
            catch(error){
                expect(error).toContain(gameExpectations.getGameByIDError())
            }
            myStub.restore();
        });
    })
    describe("Get Games test", () => {
        test("Get Games succesfully", async () => {
            myStub = sinon.stub(gameRepository, 'getGames').returns(gameExpectations.getGames());
            var response = await gameService.getGames(gameExpectations.getGames());
            
            expect(response).toEqual(gameExpectations.getGames());
            myStub.restore();
        });
        test("Get Games error", async () => {
            var myStub = sinon.stub(gameRepository, 'getGames').throws(gameExpectations.getGamesError());
            try{
                var response = await gameService.getGames(gameExpectations.getGameByID());
            }
            catch(error){
                expect(error).toContain(gameExpectations.getGamesError())
            }
            myStub.restore();
        });
    })
    describe("Delete Game test", () => {
        test("Delete Game succesfully", async () => {
            myStub = sinon.stub(gameRepository, 'removeGame').returns(gameExpectations.getGameByID());
            var response = await gameService.removeGame(gameExpectations.getGameByID()._id);
            
            expect(response).toEqual(gameExpectations.getGameByID());
            myStub.restore();
        });
        test("Delete Game error", async () => {
            var myStub = sinon.stub(gameRepository, 'removeGame').throws(gameExpectations.deleteGameError());
            try{
                var response = await gameService.removeGame(gameExpectations.getGameByID()._id);
            }
            catch(error){
                expect(error).toContain(gameExpectations.deleteGameError())
            }
            myStub.restore();
        });
    })
    describe("Update Game test", () => {
        test("Update Game succesfully", async () => {
            myStub = sinon.stub(gameRepository, 'updateGame').returns(gameExpectations.getGameByID());
            var response = await gameService.updateGame(gameExpectations.getGameByID());
            
            expect(response).toEqual(gameExpectations.getGameByID());
            myStub.restore();
        });
        test("Update Game error", async () => {
            var myStub = sinon.stub(gameRepository, 'updateGame').throws(gameExpectations.updateGameError());
            try{
                var response = await gameService.updateGame(gameExpectations.getGameByID());
            }
            catch(error){
                expect(error).toContain(gameExpectations.updateGameError())
            }
            myStub.restore();
        });
    })
})

