// CONCERTAR
app.get('/generos/:id/games', {
    config:{
        requireAuthentication: true
    }
}, async (request, reply) => {
    let id = request.params.id;
});

// rota games NÂO autenticada
describe("## rotas games NOT authenticate", async (t) =>{
    test("#POST /games", async (t) =>{
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/games',
            body: {
                "id": 1234,
                "name":"SKATE 3",
                "notaGame": 10,
                "generoGame":"Simulador",
                "descGame":"um jogo sobre andar de skate"
            }
        });

        equal(response.statusCode, 400);
    });

    test("#GET /games", async (t) => {
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/games'
        });

        equal(response.statusCode, 400);
    });

    // id = 1234
    test("#GET /games/1234", async (t) =>{
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/games/1234'
        });

        equal(response.statusCode, 400);
    });

    test('#DELETE /games/1234', async (t) =>{
        const app = await build(options);

        t.after(async () =>{
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/games/1234'
        });

        equal(response.statusCode, 400);
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
            }
        });

        equal(response.statusCode, 400);
    });
    
});