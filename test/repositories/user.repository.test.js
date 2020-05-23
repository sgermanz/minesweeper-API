// var userSchema = Schema({
//     username: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true}
// });

var mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const userExpectations = require('../expectations/user.expectations');
const userRepository = require('../../repositories/user.repository');
 
describe('user repository test', () => {
 
  beforeAll(async () => {
    const mongod = new MongoMemoryServer();
    const dbUri = await mongod.getUri();
    mongoose.connect(dbUri);
  });
 
  afterAll(async () => {
    await mongod.stop();
  });
  afterEach(async () =>{
    await userRepository.removeAllUsers();
  })

  describe('user getUsers tests', () => {
    let firstInserted;
    let secondInserted;
    beforeAll(async () => {
      let usersToInsert = userExpectations.usersToInsert();

      firstInserted = await userRepository.createUser(usersToInsert[0]);
      secondInserted = await userRepository.createUser(usersToInsert[1]);
    })
    test('getUsers test', async () => {
      let response = await userRepository.getUsers({});
  
      expect(response[0].username).toEqual(firstInserted.username);
      expect(response[0].password).toEqual(firstInserted.password);
      expect(response[0].email).toEqual(firstInserted.email);

      expect(response[1].username).toEqual(secondInserted.username);
      expect(response[1].password).toEqual(secondInserted.password);
      expect(response[1].email).toEqual(secondInserted.email);
    });
  })

  test('user insert test', async () => {
    let response = await userRepository.createUser(userExpectations.userToInsert());

    expect(response.username).toEqual(userExpectations.userToInsert().username);
    expect(response.password).toEqual(userExpectations.userToInsert().password);
    expect(response.email).toEqual(userExpectations.userToInsert().email);
  });

  test('user remove test', async () => {
    let toInsert = userExpectations.userToInsert();
    let inserted = await userRepository.createUser(toInsert);
    let response = await userRepository.removeUser(inserted._id);

    expect(response.username).toEqual(inserted.username);
    expect(response.password).toEqual(inserted.password);
    expect(response.email).toEqual(inserted.email);
  });
  test('user update test', async () => {
    let toInsert = userExpectations.userToInsert();
    let inserted = await userRepository.createUser(toInsert);

    inserted.username = "another username";
    inserted.password = "another password";
    inserted.email = "another email";

    let response = await userRepository.updateUser(inserted);
    expect(response.username).toEqual(inserted.username);
    expect(response.password).toEqual(inserted.password);
    expect(response.email).toEqual(inserted.email);
  });

  describe('user getUser tests', () => {
    let inserted;
    beforeEach( async() => {
        let toInsert = userExpectations.userToInsert();
        inserted = await userRepository.createUser(toInsert);
    })
    afterEach(async ()=> {
        await userRepository.removeAllUsers();
    });

    test('user getById test', async () => {
        let response = await userRepository.getUserById(inserted._id);

        expect(response.username).toEqual(inserted.username);
        expect(response.password).toEqual(inserted.password);
        expect(response.email).toEqual(inserted.email);
    });

    test('user getByUsername test', async () => {
        let response = await userRepository.getUserByUsername(inserted.username);
        expect(response.username).toEqual(inserted.username);
        expect(response.password).toEqual(inserted.password);
        expect(response.email).toEqual(inserted.email);
    });
  });
});