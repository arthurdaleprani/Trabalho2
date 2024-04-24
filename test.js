import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';
test('##Testing options configuration file', async (t) => {
    const app = await build(options);

t.after(async () => {
    await app.close();
});

describe('### Tests for Authentication Route', async () => {
    test('Should authenticate user and return token', async () => {
        const app = await build(options);

        after(async () => {
            await app.close();
        });

        const user = {
            username: 'testuser',
            password: 'testpassword'
        };

        const response = await app.inject({
            method: 'POST',
            url: '/auth',
            body: user
        });

        equal(response.statusCode, 200);
        const responseBody = JSON.parse(response.body);
        equal(typeof responseBody['x-access-token'], 'string');
    });
});

describe('### Tests for Games Route', async () => {
    test('Should get list of games', async () => {
        const app = await build(options);

        after(async () => {
            await app.close();
        });

        const response = await app.inject({
            method: 'GET',
            url: '/games'
        });

        equal(response.statusCode, 200);
        const games = JSON.parse(response.body);
        equal(Array.isArray(games), true);
    });

    test('new game', async () => {
        const app = await build(options);

        after(async () => {
            await app.close();
        });

        const newGame = {
            id: 1,
            name: 'EAFC',
            notaGame: 1,
            generoGame: 'Esportes',
            descGame: 'Jogo de futebol'
        };

        const response = await app.inject({
            method: 'POST',
            url: '/games',
            body: newGame
        });

        equal(response.statusCode, 201);
    });

});

describe('### Tests for Genero Route', async () => {
    test('Should get list of genres', async () => {
        const app = await build(options);

        after(async () => {
            await app.close();
        });

        const response = await app.inject({
            method: 'GET',
            url: '/generos'
        });

        equal(response.statusCode, 200);
        const genres = JSON.parse(response.body);
        equal(Array.isArray(genres), true);
    });

    test('novo genero', async () => {
        const app = await build(options);

        after(async () => {
            await app.close();
        });

        const newGenre = {
            id: 1,
            name: 'Esportes'
        };

        const response = await app.inject({
            method: 'POST',
            url: '/generos',
            body: newGenre
        });

        equal(response.statusCode, 201);
    });

});

describe('### Tests for Register New User Route', async () => {
    test('Should register a new user', async () => {
        const app = await build(options);

        after(async () => {
            await app.close();
        });

        const newUser = {
            username: 'Olaaa',
            password: '$2b$10$HH5kMWC8skViiCBu35edRuCH2ifw/gzsImx/Cj29ov0Xc.m/edGna'
        };

        const response = await app.inject({
            method: 'POST',
            url: '/register',
            body: newUser
        });

        equal(response.statusCode, 201);
        const responseBody = JSON.parse(response.body);
        equal(typeof responseBody.token, 'string');
    });

});
})