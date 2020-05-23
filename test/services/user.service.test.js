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
        test("Create User error", async () => {
            var myStub = sinon.stub(userRepository, 'createUser').throws(userExpectations.createUserError());
            try{
                var response = await userService.createUser(userExpectations.getUserByID());
            }
            catch(error){
                expect(error).toContain(userExpectations.createUserError())
            }
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
        test("Get User error", async () => {
            var myStub = sinon.stub(userRepository, 'getUserById').throws(userExpectations.getUserByIDError());
            try{
                var response = await userService.getUserById(userExpectations.getUserByID()._id);
            }
            catch(error){
                expect(error).toContain(userExpectations.getUserByIDError())
            }
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
        test("Get User error", async () => {
            var myStub = sinon.stub(userRepository, 'getUserByUsername').throws(userExpectations.getUserByUsernameError());
            try{
                var response = await userService.getUserByUsername(userExpectations.getUserByID()._id);
            }
            catch(error){
                expect(error).toContain(userExpectations.getUserByUsernameError())
            }
            myStub.restore();
        });
    })
    describe("Get Users test", () => {
        test("Get Users succesfully", async () => {
            myStub = sinon.stub(userRepository, 'getUsers').returns(userExpectations.getUsers());
            var response = await userService.getUsers(userExpectations.getUsers());
            
            expect(response).toEqual(userExpectations.getUsers());
            myStub.restore();
        });
        test("Get Users error", async () => {
            var myStub = sinon.stub(userRepository, 'getUsers').throws(userExpectations.getUsersError());
            try{
                var response = await userService.getUsers(userExpectations.getUserByID());
            }
            catch(error){
                expect(error).toContain(userExpectations.getUsersError())
            }
            myStub.restore();
        });
    })
    describe("Delete User test", () => {
        test("Delete User succesfully", async () => {
            myStub = sinon.stub(userRepository, 'removeUser').returns(userExpectations.getUserByID());
            var response = await userService.removeUser(userExpectations.getUserByID()._id);
            
            expect(response).toEqual(userExpectations.getUserByID());
            myStub.restore();
        });
        test("Delete User error", async () => {
            var myStub = sinon.stub(userRepository, 'removeUser').throws(userExpectations.deleteUserError());
            try{
                var response = await userService.removeUser(userExpectations.getUserByID()._id);
            }
            catch(error){
                expect(error).toContain(userExpectations.deleteUserError())
            }
            myStub.restore();
        });
    })
    describe("Update User test", () => {
        test("Update User succesfully", async () => {
            myStub = sinon.stub(userRepository, 'updateUser').returns(userExpectations.getUserByID());
            var response = await userService.updateUser(userExpectations.getUserByID());
            
            expect(response).toEqual(userExpectations.getUserByID());
            myStub.restore();
        });
        test("Update User error", async () => {
            var myStub = sinon.stub(userRepository, 'updateUser').throws(userExpectations.updateUserError());
            try{
                var response = await userService.updateUser(userExpectations.getUserByID());
            }
            catch(error){
                expect(error).toContain(userExpectations.updateUserError())
            }
            myStub.restore();
        });
    })
})

