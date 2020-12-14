import server from '../index';
import request from 'supertest';

test('User registratrion', async (done)=> {
    await request(server).post('/register')
        .send({
            "username": "testuserNew",
            "email": "testuserNew@email.com",
            "password": "password123"
        }).expect(200)

    done()
});

test('Username is already takan', async (done)=> {
    await request(server).post('/register')
    .send({
        "username": "testuser",
        "email": "testuser@email.com",
        "password": "password"
    }).expect(401)

    done()
});

test('No email when registering', async(done) => {
    await request(server).post('/register')
        .send({
            "username": "testuser",
            "password": "password"
        }).expect(401);

    done();
});

test('Password shorter then 6 chars', async(done) => {
    await request(server).post('/register')
        .send({
            "username": "testuser",
            "email": "testuser@email.com",
            "password": "passw"
        }).expect(401);

    done();
});

afterAll(()=> {
    server.close();
})