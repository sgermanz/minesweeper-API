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

  test('user insert test', async () => {
    let response = await userRepository.createUser(userExpectations.userToInsert());

    expect(response.username).toEqual(userExpectations.userToInsert().username);
    expect(response.password).toEqual(userExpectations.userToInsert().password);
    expect(response.email).toEqual(userExpectations.userToInsert().email);
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