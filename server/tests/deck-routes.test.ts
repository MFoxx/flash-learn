import request from 'supertest';
import server from '../index';

// Decks --> GetAll
test('Get all decks from test user', async(done) => {
    await request(server).get('/testuser/deck/all')
        .expect(200)

    done()
})

test('Attempt to get all decks from nonexistant user', async(done)=> {
    await request(server).get('//deck/all').expect(404)

    done()
})

// Deck --> create
test('Create new deck in test user', async(done) => {
    await request(server).post('/testuser/deck/create')
        .send({
            name: "Test"
        })
        .expect(200)

    done();
})

test('Attempt to create new deck in non existant user', async(done) => {
    await request(server).post('/wronguser/deck/create')
        .send({
            name: "Test"
        })
        .expect(404)

    done();
})

test('Attempt to create new deck without name', async(done) => {
    await request(server).post('/testuser/deck/create')
        .send({
        })
        .expect(400)

    done();
})

// Deck --> delete
test('Delete deck', async(done)=> {
    await request(server).post('/testuser/deck/B3noD/delete')
        .expect(200);
    done();
})

test('Attempt to delete deck in nonexistant user', async(done) => {
    await request(server).post('/nouser/deck/B3noD/delete')
        .expect(404)
    done();
})

test('Attempt to delete deck with wrong id', async(done) => {
    await request(server).post('/testuser/deck/hgvjkjhvb/delete')
        .expect(404)
    done();
})

// Deck --> update
test('Update deck name for user', async(done)=> {
    await request(server).post('/testuser/deck/B3noD/update')
        .send({
            name: "This is test"
        })
        .expect(200)
    done();
})

test('Attempt to update deck name for non existant user', async(done)=> {
    await request(server).post('/wronguser/deck/B3noD/update')
        .expect(404)
    done();
})

// Card --> create
test('Create card', async (done)=> {
    await request(server).post('/testuser/deck/B3noD/card/create')
        .send({
            question: 'This is test question',
            explanation: 'This is text explanation'
        })
        .expect(200)

    done();
})

test('Attempt to create card in non existant user', async (done) => {
    await request(server).post('/nonexistatnuser/deck/B3noD/card/create')
        .send({
            question: 'This is test question',
            explanation: 'This is text explanation'
        })
        .expect(404)

    done();
})

test('Attempt to create card without all info', async (done) => {
    await request(server).post('/testuser/deck/B3noD/card/create')
        .send({
            question: 'This is test question',
        })
        .expect(400)

    done();
})

test('Attempt to create card with wrong deck id', async (done) => {
    await request(server).post('/testuser/deck/wrongid/card/create')
        .send({
            question: 'This is test question',
            explanation: 'This has to be here bcs its validated first'
        })
        .expect(404)

    done();
})

// Card --> delete
test('Delete card', async (done)=> {
    await request(server).post('/testuser/deck/B3noD/card/delete/dzZgH')
        .expect(200)

    done();
})

test('Attempt to delete card in non existing user', async (done)=> {
    await request(server).post('/nouser/deck/B3noD/card/delete/dzZgH')
        .expect(404)

    done();
})

test('Attempt to delete card in non existant deck', async (done)=> {
    await request(server).post('/testuser/deck/noid/card/delete/noid')
        .expect(404)

    done();
})

test('Attempt to delete card in non existant deck', async (done)=> {
    await request(server).post('/testuser/deck/B3noD/card/delete/noid')
        .expect(404)

    done();
})

// Card --> edit
test('Edit card', async (done)=> {
    await request(server).post('/testuser/deck/B3noD/card/edit/dzZgH')
        .send({
            question: 'This is test question',
            explanation: 'This is text explanation'
        })
        .expect(200)

    done();
});

test('Attempt to update card in non existing user', async (done)=> {
    await request(server).post('/nouser/deck/noid/card/edit/noid')
        .send({
        })
        .expect(404)

    done();
});

test('Attempt to update card in non existing deck', async (done)=> {
    await request(server).post('/testuser/deck/noid/card/edit/noid')
        .send({
        })
        .expect(404)

    done();
});

test('Attempt to update non existing card', async (done)=> {
    await request(server).post('/testuser/deck/B3noD/card/edit/noid')
        .send({
        })
        .expect(404)

    done();
});

test('Attempt to update card without submiting correct data', async (done)=> {
    await request(server).post('/testuser/deck/B3noD/card/edit/dzZgH')
        .send({
        })
        .expect(400)

    done();
});

server.close();
