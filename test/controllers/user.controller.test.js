const supertest = require('supertest');
const sinon = require('sinon');
const userExpectations = require('../expectations/user.expectations');
const userService = require('../../services/user.service');
const repository = require('../../repositories/init')
const userController = require('../../controllers/userController')
const jwt = require('./jwt');
const passport = require('../../helpers/passport.helper')

test("user controller", ()=>{
  expect(1).toEqual(1);
})
describe('User Controller Tests', () => {
  let passportStub;
  let app;
  let request;
  beforeAll(()=>{
    passportStub = sinon.stub (passport, 'getPassport').returns(jwt.passport);
    app = require('../../app');
    request = supertest.agent(app);
  })
  afterAll(async ()=>{
    // await app.close(done);
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    passportStub.restore();
  })
    describe('Register User Tests', () => {
      describe('POST /users/register', () => {
        test('POST /users Succesfully', async () => {
          let storageStub = sinon.stub (repository, 'initialize').returns({});
          let userServiceCreateStub = sinon.stub(userService, 'createUser').returns(userExpectations.getUserByID());
          let userServiceGetUserByUsernameStub = sinon.stub(userService, 'getUserByUsername').returns(undefined);
          var response = await request
          .post('/users/register')
          .send(userExpectations.getUserByID())
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          expect(response.body.data).toEqual(userExpectations.getUserByID());

          storageStub.restore()
          userServiceCreateStub.restore();
          userServiceGetUserByUsernameStub.restore();
        })
      });
    });
    describe('Login User Tests', () => {
      describe('POST /users/login', () => {
        test('POST /users Succesfully', async () => {
          let storageStub = sinon.stub (repository, 'initialize').returns({});
          let userServiceCreateStub = sinon.stub(userService, 'createUser').returns(userExpectations.getUserByID());
          let userServiceGetUserByUsernameStub = sinon.stub(userService, 'getUserByUsername').returns(userExpectations.getUserByID());
          var response = await request
          .post('/users/login')
          .send(userExpectations.getUserByID())
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          
          expect(response.body.data).toHaveProperty('token');

          storageStub.restore()
          userServiceCreateStub.restore();
          userServiceGetUserByUsernameStub.restore();
        })
      });
    });

});