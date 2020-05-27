var sinon = require('sinon');
var userRepository = require('../../repositories/user.repository');
var userService = require('../../services/user.service');
var userExpectations = require('../expectations/user.expectations');

describe("User Service Tests", () => {
    describe("Create User test", () => {
        test("Create User succesfully", async () => {
            myStub = sinon.stub(userRepository, 'createUser').returns(userExpectations.getUserByID());
            var response = await userService.createUser(userExpectations.getUserByID());
            
            expect(response).toEqual(userExpectations.getUserByID());
            myStub.restore();
        });
    })
    describe("Get User by ID test", () => {
        test("Get User succesfully", async () => {
            myStub = sinon.stub(userRepository, 'getUserById').returns(userExpectations.getUserByID());
            var response = await userService.getUserById(userExpectations.getUserByID()._id);
            
            expect(response).toEqual(userExpectations.getUserByID());
            myStub.restore();
        });
    })
    describe("Get User by Username test", () => {
        test("Get User succesfully", async () => {
            myStub = sinon.stub(userRepository, 'getUserByUsername').returns(userExpectations.getUserByID());
            var response = await userService.getUserByUsername(userExpectations.getUserByID()._id);
            
            expect(response).toEqual(userExpectations.getUserByID());
            myStub.restore();
        });
    })
})

