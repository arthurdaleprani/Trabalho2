import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

test('##Testing options configuration file', async (t) => {
    const app = await build(options);

    t.after(async () => {
        await app.close();
    });

    deepEqual(options.stage, 'dev');
    deepEqual(options.port, '3000');
    deepEqual(options.host, '127.0.0.1');
    deepEqual(options.jwt_secret, 'Abcd@1234');
    deepEqual(options.db_url, 'mongodb://127.0.0.1:27017/trabalho2');
    deepEqual(options.ncrypt, 'somesecretkeyThisOne')
});

// rota games
describe("## rotas games authenticate", async (t) =>{
    test("#POST /games", async (t) =>{
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/games',
            body: {
                "_id": 1234,
                "name":"SKATE 3",
                "notaGame": 10,
                "generoGame":"Simulador",
                "descGame":"um jogo sobre andar de skate"
            },
            headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
            }
        });
        equal(response.statusCode, 201);
    });

    test("#GET /games", async (t) => {
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/games',
            headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
            }
        });

        equal(response.statusCode, 200);
    });

    // id = 1234
    test("#GET /games/1234", async (t) =>{
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/games/1234',
            headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
            }
        });

        equal(response.statusCode, 200); 
        
    });

    test('#PUT /games/1234', async (t) =>{
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'PUT',
            url: '/games/1234',
            body: {
                "name": "SKATE 3",
                "descGame": "jogo sobre não andar de skate"
            },
            headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
            }
        });

        equal(response.statusCode, 204);
    });
    
    test('#DELETE /games/1234', async (t) =>{
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/games/1234',
            headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
            }
        });

        equal(response.statusCode, 204);
    });
});

// rota generos
describe("## rotas generos authenticate", async (t) =>{
        test("#POST /generos", async (t) =>{
            const app = await build(options);

            t.after(async () =>{
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/generos',
                body:{
                    "_id": 1234,
                    "name":"Ação",
                    "img_Url":"Imagem de jogos de Ação"
                },
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
                }
            });

            equal(response.statusCode, 201);
        });

        test("#GET /generos", async (t) =>{
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/generos',
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
                }
            });

            equal(response.statusCode, 200);
        });

        test("#GET /generos/1234", async (t) =>{
            const app = await build(options);

            t.after(async () =>{
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/generos/1234',
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
                }
            });

            equal(response.statusCode, 200);
        });

        test("#PUT /generos/1234", async (t) =>{
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/generos/1234',
                body: {
                    "name":"Corrida",
                    "img_Url":"Imagem de jogos de Corrida"
                },
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
                }
            });

            equal(response.statusCode, 201);
        });

        test("#DELETE /generos/1234", async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'DELETE',
                url: '/generos/1234',
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlZHJvIiwiaWF0IjoxNzE0MDcyOTM2fQ.Yce-z12kC6zoQLpigc2LYPQeytMf4Y6LwcQ0HSDTdl0"
                }
            });

            equal(response.statusCode, 204);
        });

});

// rota Register
describe("## rota Register", async (t) =>{
    test("#POST /register", async (t) => {
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method:'POST',
            url:'/register',
            body:{
                "_id":"1234",
                "username":"newuser",
                "password":"12345"
            }
        });

        equal(response.statusCode, 201);
    });

});

// rota register (usuario ja existe)
describe("## rota Register", async (t) =>{
    test("#POST /register", async (t) => {
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method:'POST',
            url:'/register',
            body:{
                "_id":"1234",
                "username":"newuser",
                "password":"12345"
            }
        });

        equal(response.statusCode, 204);
    });
});

// rota Auth
describe("## rota Auth", async (t) =>{
    test("#POST /auth", async (t) =>{
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/auth',
            body:{
                "username":"newuser",
                "password":"12345"
            }
        });

        equal(response.statusCode, 200);
    });
});

//rota auth não autenticada
describe("## rota Auth unauthenticated", async (t) =>{
    test("#POST /auth", async (t) =>{
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/auth',
            body:{
                "username":"arhtur",
                "password":"12345"
            }
        });

        equal(response.statusCode, 401);
    });
})